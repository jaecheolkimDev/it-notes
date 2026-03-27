Docker Compose로 백엔드(Spring Boot) 실행시키기
================

0\. Dockerfile
-----------------------------
```
        FROM openjdk:17-jdk
        
        COPY build/libs/*SNAPSHOT.jar /app.jar
        
        ENTRYPOINT ["java", "-jar", "/app.jar"]
        
* `$ ./gradlew clean build`가 선행되어야함.(Spring Boot 프로젝트 빌드하기)
```

1\. Docker CLI로 컨테이너를 실행시킬 때
-----------------------------
```
$ docker build -t hello-server .
$ docker run -d -p 8080:8080 hello-server
```


2\. compose.yml
-----------------------------
``` 
services:
  my-server: 
 #compose.yml이 존재하는 디렉토리(.)에 있는 Dockerfile로 이미지를 생성
    build: . 
    ports:
      - 8080:8080
      
- `build: .` : `compose.yml`이 존재하는 디렉토리(`.`)에 있는 `Dockerfile`로 이미지를 생성해 컨테이너를 띄우겠다는 의미이다.
```


3\. Docker Compose로 컨테이너를 실행시킬 때
-----------------------------
``` 
$ docker compose up -d      : compose 파일 실행시키기
$ docker compose ps         : compose 실행 현황 보기
$ docker ps                 : 일반 실행 현황에도 같이 나옴
- `http://localhost:8080`으로 들어가보기
$ docker compose down       : compose로 실행된 컨테이너 삭제
```