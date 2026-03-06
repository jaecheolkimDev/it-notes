spring-data-redis:2.2.5 공부 노트
===============

1\. 명령어 사용법
-----------
```
opsForValue()   : Key-Value(문자열) 구조의 데이터를 저장, 조회, 수정, 삭제(CRUD)할 때 사용하는
                  ValueOperations 인터페이스를 가져오는 메서드입니다. 
    데이터 저장 (Set): redisTemplate.opsForValue().set(key, value) - 데이터를 저장하거나 덮어씁니다.
    데이터 조회 (Get): redisTemplate.opsForValue().get(key) - key에 해당하는 값을 가져옵니다.
```