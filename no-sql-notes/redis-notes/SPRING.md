spring-data-redis:2.2.5 공부 노트
===============

1\. RedisTemplate 명령어 사용법
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