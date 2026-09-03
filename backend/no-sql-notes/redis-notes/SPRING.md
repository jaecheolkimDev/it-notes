spring-data-redis:2.2.5
===============


1\. Spring에서 사용하는 Redis 인터페이스
-----------
```
1) 추상화 계층 구조    : Spring Data Redis는 하부 라이브러리(Lettuce 또는 Jedis)를 직접 다루지 않고, 개발자가 편리하게 사용할 수 있도록 계층을 
                       나누어 제공합니다.
    - Low-Level: RedisConnection (바이트 배열 위주)
    - High-Level: RedisTemplate (객체 직렬화 지원)
    - View-Level: Operations 인터페이스 (opsForValue(), opsForSet() 등)

2) RedisConnection (Low-Level)  : RedisConnection은 Redis 서버와의 로우 레벨 통신을 담당합니다.
    특징: 모든 데이터를 byte[] 형태로 주고받습니다. 즉, 개발자가 직접 데이터를 바이트로 변환(직렬화)하고 다시 복원(역직렬화)해야 합니다.
    사용 용도:        
        - Redis의 아주 기초적인 기능만 사용할 때.
        - 성능 최적화를 위해 직렬화 오버헤드를 극한으로 줄여야 할 때.
        - sAdd, sMembers, expire 같은 명령어를 직접 호출하는 방식입니다.
    단점: 코드가 장황해지고 객체를 저장하기가 매우 번거롭습니다.

3) RedisTemplate (High-Level)   : 가장 많이 쓰이는 방식입니다. RedisConnection을 감싸서 객체 직렬화 기능을 추가한 클래스입니다.    
    특징: String, Integer는 물론, 사용자 정의 Java 객체를 JSON 등으로 자동 변환해서 저장해 줍니다.
    사용 용도: Spring Application에서 Redis를 데이터베이스나 캐시로 활용할 때 가장 일반적인 선택지입니다.

4) Operations 인터페이스 (opsFor...)
   RedisTemplate은 Redis의 수많은 자료구조(String, List, Set, Hash 등) 명령어를 모두 가지고 있습니다. 
   이를 깔끔하게 분리해 놓은 것이 Operations 인터페이스입니다.
        메서드           대상 자료구조       주요 기능
        opsForValue()   String          가장 기본적인 Key-Value 쌍 저장 (set, get)
        opsForSet()     Set             중복 없는 집합 자료구조 (sAdd, sMembers)
        opsForHash()    Hash            객체 형태의 필드-값 구조 저장 (hSet, hGet)
        opsForList()    List            순서가 있는 목록 (lPush, rPop)
        opsForZSet()    Sorted Set      점수(Score) 기준 정렬된 집합 (zAdd)
```


2\. RedisTemplate 명령어 사용법
-----------
```
String 자료구조
    opsForValue()   : Key-Value(문자열) 구조의 데이터를 저장, 조회, 수정, 삭제(CRUD)할 때 사용하는
                      ValueOperations 인터페이스를 가져오는 메서드입니다. 
        데이터 저장 (Set): redisTemplate.opsForValue().set(key, value) - 데이터를 저장하거나 덮어씁니다.
        데이터 조회 (Get): redisTemplate.opsForValue().get(key) - key에 해당하는 값을 가져옵니다.
    
    redis-client 명령어
        단일 조회: GET {key}
        여러 개 조회: MGET {key1} {key2}
    
Map<String, Map<K, V>> 자료구조
    opsForHash()    : 레디스의 Hash(해시) 자료구조를 다루기 위한 전용 작업 객체를 리턴합니다.
    
    redis-client 명령어
        특정 필드 하나만: HGET {key} {field}
        모든 필드와 값 전체: HGETALL {key}
        모든 필드명만: HKEYS {key}
        해시 내 필드 개수: HLEN {key}

List 자료구조
    opsForList()    : 순서가 있는 데이터 묶음. 주로 Lpush/Rpop을 이용해 메시지 큐(Queue)나 최근 본 상품 목록 등을 구현할 때 씁니다.
    
    redis-client 명령어
        전체 조회: LRANGE {key} 0 -1
        특정 범위: LRANGE {key} {start} {stop} (예: 0 5는 첫 6개)
        리스트 길이: LLEN {key}

Set 자료구조
    opsForSet()     : 중복을 허용하지 않는 집합. 친구 목록, 오늘 방문한 사용자 ID 관리 등 유니크한 값을 다룰 때 사용합니다.
    
    redis-client 명령어
        모든 멤버 조회: SMEMBERS {key}
        멤버 개수: SCARD {key}
        특정 값이 있는지 확인: SISMEMBER {key} {value}

Sorted Set 자료구조
    opsForZSet()    : 각 값에 Score를 부여하여 정렬된 상태를 유지하는 집합. 실시간 랭킹 시스템 구현 시 필수적입니다.
    
    redis-client 명령어
        전체 조회 (점수 낮은 순): ZRANGE {key} 0 -1 WITHSCORES
        전체 조회 (점수 높은 순): ZREVRANGE {key} 0 -1 WITHSCORES
```
