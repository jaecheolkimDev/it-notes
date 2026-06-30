DB Config
=================

1\.
------------------
```
HikariConfig (설정문서)         : DB 주소, 아이디, 패스워드, 최대 커넥션 개수 같은 '설정 정보'만 담고 있는 객체입니다.
HikariDataSource (실제 커넥션 풀): HikariConfig를 토대로 실제 DB 연결 다리(Connection)들을 만들고 쥐고 있는 핵심 객체입니다.
LazyConnectionDataSourceProxy (게으른 대리인): 성능 최적화를 위해, 진짜 쿼리가 나가는 순간에만 HikariDataSource에서 커넥션을 
                                            뺴오도록 감싸둔 대리자입니다. 결과적으로 이것도 DataSource 타입입니다.
DataSourceTransactionManager (트랜잭션 감독관): @Transactional의 주인공입니다. 위의 DataSource를 주머니에 차고 있으면서, 
                                            메서드가 시작할 때 커넥션을 열고, 끝날 때 commit이나 rollback 명령을 내립니다.
                                            - PlatformTransactionManager인터페이스의 구현체
JdbcTemplate / NamedParameterJdbcTemplate (일꾼): 실제 INSERT, UPDATE 같은 SQL 쿼리를 실행하는 '도구'일 뿐입니다. 트랜잭션 
                                                능력은 없고, 감독관이 열어준 커넥션을 가져다 쓰기만 합니다.
```

4\.
------------------
```
```

4\.
------------------
```
```

4\.
------------------
```
```

4\.
------------------
```
```

4\.
------------------
```
```

4\.
------------------
```
```