Spring Boot, MySQL 컨테이너 동시에 띄워보기
================


1\. 사전작업
-----------------------------
```
1) application.yml
    spring:
      datasource:
        url: jdbc:mysql://localhost:3306/mydb
        username: root
        password: pwd1234
        driver-class-name: com.mysql.cj.jdbc.Driver
2) 불필요한 테스트 코드 삭제
3) `$ ./gradlew clean build`    : Spring Boot 프로젝트 빌드하기
4) Dockerfile
        FROM openjdk:17-jdk
        
        COPY build/libs/*SNAPSHOT.jar /app.jar
        
        ENTRYPOINT ["java", "-jar", "/app.jar"]
        
```


2\. compose.yml
-----------------------------
``` 
services:
  my-server:
    build: .
    ports:
      - 8080:8080
		# my-db의 컨테이너가 생성되고 healthy 하다고 판단 될 때, 해당 컨테이너를 생성한다. 
    depends_on:
      my-db:
        condition: service_healthy
  my-db:
    image: mysql
    environment:
      MYSQL_ROOT_PASSWORD: pwd1234
      MYSQL_DATABASE: mydb # MySQL 최초 실행 시 mydb라는 데이터베이스를 생성해준다.
    volumes:
      - ./mysql_data:/var/lib/mysql
    ports:
      - 3306:3306
    healthcheck:
      test: [ "CMD", "mysqladmin", "ping" ] # MySQL이 healthy 한 지 판단할 수 있는 명령어
      interval: 5s # 5초 간격으로 체크
      retries: 10 # 10번까지 재시도
```


3\. Docker Compose로 컨테이너를 실행시킬 때
-----------------------------
``` 
$ docker compose up -d - build      : compose 파일 실행시키기
$ docker compose ps                 : compose 실행 현황 보기
$ docker ps                         : 일반 실행 현황에도 같이 나옴
$ docker logs [Container ID]
$ docker compose down               : compose로 실행된 컨테이너 삭제
```