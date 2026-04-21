Spring yml 공부 노트
=================


1\.개념
---------------
```
spring:
  batch:
    jdbc:
      # always: 항상 생성 (테이블이 없으면 생성)
      # embedded: H2 같은 내장 DB일 때만 생성 (기본값)
      # never: 생성하지 않음 (운영 환경 권장)
      initialize-schema: always     # 스프링 배치 메타 테이블 구축
      
  datasource:
    url: jdbc:mysql://${DB_HOST}:${DB_PORT}/${DB_NAME}
    username: ${DB_USERNAME}
    password: ${DB_PASSWORD}
    driver-class-name: com.mysql.cj.jdbc.Driver
```


