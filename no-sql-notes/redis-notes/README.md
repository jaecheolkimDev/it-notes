REDIS(Remote Dictionary Server) 공부 노트
===============

```
- 정의 : Redis는 데이터 처리 속도가 엄청 빠른 NoSQL 데이터베이스이다.
- 장점 : 레디스(Redis)는 인메모리(in-memory)에 모든 데이터를 저장한다.  
  그래서 데이터의 처리 성능이 굉장히 빠르다.

그룹이라는 개념이 존재하지 않는다.
서버가 2대면 하나의 기능이 2번 작동한다.
서버가 내려가면 그동안 publicsh된 메시지는 사라지게 된다.
```

1\. 명령어 사용법
-----------
```
### ✅ 데이터(Key, Value) 저장하기
\# set [key 이름] [value]  
  $ set jaeseong:name "jaeseong park" # 띄워쓰기 해서 저장하려면 쌍따옴표로 묶어주면 됨  
  $ set jaeseong:hobby soccer
  $ set 1 jscode

### ✅ 데이터 조회하기 (Key로 Value 값 조회하기)
\# get [key 이름]  
  $ get jaeseong:name  
  $ get jaeseong:hobby
  $ get pjs:name # 없는 데이터를 조회할 경우 (nil)이라고 출력됨

### ✅ 저장된 모든 key 조회하기
  $ keys *

### ✅ 데이터 삭제하기 (Key로 데이터 삭제하기)
\# del [key 이름]  
  $ del jaeseong:hobby
  $ get jaeseong:hobby # 삭제됐는 지 확인

### ✅ 데이터 저장 시 만료시간(TTL) 정하기
레디스는 RDBMS와는 다르게 데이터 저장 시 만료시간을 설정할 수 있다. 
즉, 영구적으로 데이터를 저장하지 않고 일정 시간이 되면 데이터가 삭제되도록 셋팅할 수 있다.   
레디스의 특성상 메모리 공간이 한정 되어 있기 때문에 모든 데이터를 레디스에 저장할 수 없다. 
따라서 만료시간(TTL)을 활용해 자주 사용하는 데이터만 레디스에 저장해놓고 쓰는 식으로 활용한다.   
\# set [key 이름] [value] ex [만료 시간(초)]  
  $ set jaeseong:pet dog ex 30

### ✅ 만료시간(TTL) 확인하기
\# ttl [key 이름]  
\# 만료 시간이 몇 초 남았는 지 반환  
\# 키가 없는 경우 -2를 반환  
\# 키는 존재하지만 만료 시간이 설정돼 있지 않은 경우에는 -1을 반환  
  $ ttl jaeseong:pet   
  $ ttl jaeseong:name  
  $ ttl pjs:name

### ✅ 모든 데이터 삭제하기
  $ flushall
```

2\. 네이밍 컨벤션
-----------
```
> 콜론(`:`)을 활용해 계층적으로 의미를 구분해서 사용

예시
- `users:100:profile` : 사용자들(users) 중에서 PK가 100인 사용자(user)의 프로필(profile)
- `products:123:details` : 상품들(products) 중에서 PK가 123인 상품(product)의 세부사항(details)

장점
- 1. 가독성 : 데이터의 의미와 용도를 쉽게 파악할 수 있다.
- 2. 일관성 : 컨벤션을 따름으로써 코드의 일관성이 높아지고 유지보수가 쉬워진다.
- 3. 검색 및 필터링 용이성 : 패턴 매칭을 사용해 특정 유형의 Key를 쉽게 찾을 수 있다 .
- 4. 확장성 : 서로 다른 Key와 이름이 겹쳐 충돌할 일이 적어진다.
```

3\. 캐싱
-----------
```
- 캐시(Cache) : 원본 저장소보다 빠르게 가져올 수 있는 임시 데이터 저장소
- 캐싱(Caching) : 캐시(Cache, 임시 데이터 저장소)에 접근해서 데이터를 빠르게 가져오는 방식
  - 캐싱으로 조회 성능 개선을 하기 전 SQL튜닝을 항상 먼저해야 한다!
  - 현업에서는 아래와 같이 얘기하는 편이다.
    > “이 API는 응답 속도가 너무 느린데? 이 응답 데이터는 캐싱(Cahing) 해두고 쓰는 게 어때?’
  - 캐싱 전략
    - Cache Aside (= Look Aside, Lazy Loading) 전략
      - 캐시(Cache)에서 데이터를 확인하고, 없다면 DB를 통해 조회해오는 방식
      - @Cacheable 어노테이션을 붙이면 Cache Aside 전략으로 캐싱이 적용된다.
        - 즉, 해당 메서드로 요청이 들어오면 레디스를 확인한 후에 데이터가 있다면 레디스의 데이터를 조회해서 바로 응답한다.
          만약 데이터가 없다면 메서드 내부의 로직을 실행시킨 뒤에 return 값으로 응답한다.      
          그리고 그 return 값을 레디스에 저장한다.
        - ex) @Cacheable(cacheNames = "getBoards", key = "'boards:page:' + #page + ':size:' + #size", cacheManager = "boardCacheManager")
          - `cacheNames` : 캐시 이름을 설정
          - `key` : Redis에 저장할 Key의 이름을 설정
          - `cacheManager` : 사용할 `cacheManager`의 Bean 이름을 지정
      - @Cacheable 어노테이션만 주석처리하면 DB조회와 캐시 조회 비교 성능 테스트 가능함.
    - Write Around 전략
      - 쓰기 작업(저장, 수정, 삭제)을 캐시에는 반영하지 않고, DB에만 반영하는 방식
    - 위 2가지 전략의 한계점
      - 캐시된 데이터와 DB 데이터가 일치하지 않을 수 있다.
      - 캐시에 저장할 수 있는 공간이 비교적 작다.
    - 해결방안 : TTL 기능(만료 시간 설정 기능)
      - 활용하면 캐시의 공간을 효율적으로 쓸 수 있다.   
        왜냐면 자주 조회하지 않는 데이터는 만료 시간에 의해 데이터가 삭제되기 때문이다.
- 주요 사용 사례 : 캐싱(데이터 조회 성능 향상)
```

4\. PUB/SUB
-----------
메시지가 발행되면 Redis가 모든 구독자에게 '전파'하고 메시지 자체를 보관하지 않습니다. (한 번 쏘고 끝나는 방식)
```
이중화 환경에서 문제를 피하기 위한 방법은 다음과 같습니다.
1) 전체 적용이 필요한 경우: 로그 레벨 변경처럼 모든 서버가 알아야 하는 정보는 현재 코드(Pub/Sub)를 그대로 유지하세요.
2) 한 번만 처리가 필요한 경우:
    - Redis List (Queue) 사용: LPOP이나 RPOP을 사용하면 여러 서버 중 먼저 가져가는 서버 하나만 메시지를 처리하게 됩니다.
    - 분산 락 (Distributed Lock): 메시지를 처리하기 전 Redis에 특정 키를 선점(SETNX)하여 성공한 서버만 로직을 태우는 방식입니다.
* SETNX (Set if Not eXists)



--------------------------------------------------------------------------------

Spring Data Redis를 이용한 간단한 구현 (SETNX)
추가 라이브러리 없이 기존에 사용 중인 RedisTemplate을 활용하는 방식입니다.

핵심 원리: SETNX (Set if Not Exists) 명령으로 특정 키를 먼저 선점한 서버만 로직을 수행하고, 작업이 끝나면 키를 삭제합니다.

@Autowired
private StringRedisTemplate redisTemplate;

private void processWithLock(String jobId, Runnable task) {
    String lockKey = "lock:" + jobId;
    // 1. 락 획득 시도 (5분 후 자동 만료 설정으로 데드락 방지)
    Boolean isLocked = redisTemplate.opsForValue()
            .setIfAbsent(lockKey, "locked", Duration.ofMinutes(5));

    if (Boolean.TRUE.equals(isLocked)) {
        try {
            task.run(); // 실제 로직 수행
        } finally {
            // 2. 작업 완료 후 락 해제
            redisTemplate.delete(lockKey);
        }
    } else {
        LOGGER.debug("Skip task. Lock already acquired by another server for: {}", jobId);
    }
}


--------------------------------------------------------------------------------

Redis Master-Slave 구조의 분산 락 동작 (Race Condition)
Redis의 마스터-슬레이브 복제는 비동기(Asynchronous) 방식으로 이루어집니다. 이 지점에서 아주 짧은 찰나의 허점이 생길 수 있습니다.

서버 A가 Master Redis에 락을 생성합니다 (SETNX lock:job1 "locked").

Master Redis는 성공 응답을 보냅니다.

Master가 이 데이터를 Slave로 복제하기 직전에 갑자기 Master 서버가 다운됩니다.

Slave 1이 새로운 Master로 승격됩니다.

하지만 새로운 Master(구 Slave 1)에는 아직 lock:job1 데이터가 없습니다.

이때 서버 B가 락을 요청하면, 새로운 Master는 락이 없으므로 서버 B에게도 락을 허용해 버립니다.
```

5\. 
-----------
```
```