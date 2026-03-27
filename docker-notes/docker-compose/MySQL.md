Docker Compose로 MySQL 실행시키기
================


1\. Docker CLI로 컨테이너를 실행시킬 때
-----------------------------
```
$ docker run -e MYSQL_ROOT_PASSWORD=pwd1234 -p 3306:3306 -v /Users/jaeseong/Documents/Develop/docker-mysql/mysql_data:/var/lib/mysql -d mysql
```


2\. compose.yml
-----------------------------
``` 
services:
  my-db:
    image: mysql
    environment: # -e MYSQL_ROOT_PASSWORD=password 역할
      MYSQL_ROOT_PASSWORD: pwd1234
    volumes:# v {호스트 경로}:/var/lib/mysql 역할
      - ./mysql_data:/var/lib/mysql
    ports:
      - 3306:3306
      
- `environment: ...` : CLI에서 `-e MYSQL_ROOT_PASSWORD=password` 역할과 동일하다.
- `volumes: ...` : CLI에서 `-v {호스트 경로}:/var/lib/mysql` 역할과 동일하다.
```


3\. Docker Compose로 컨테이너를 실행시킬 때
-----------------------------
``` 
$ docker compose up -d      : compose 파일 실행시키기
$ docker compose ps         : compose 실행 현황 보기
$ docker ps                 : 일반 실행 현황에도 같이 나옴
- 잘 작동하는 지 DBeaver에 연결시켜보기
- volume의 경로에 데이터가 저장되고 있는 지 확인하기
$ docker compose down       : compose로 실행된 컨테이너 삭제
```