MySQL, Redis 컨테이너 동시에 띄워보기
================


1\. 
-----------------------------
```
```


2\. compose.yml
-----------------------------
``` 
services:
  my-db:
    image: mysql
    environment:
      MYSQL_ROOT_PASSWORD: pwd1234
    volumes:
      - ./mysql_data:/var/lib/mysql
    ports:
      - 3306:3306

  my-cache-server:
    image: redis
    ports:
      - 6379:6379

```


3\. Docker Compose로 컨테이너를 실행시킬 때
-----------------------------
``` 
$ docker compose up -d      : compose 파일 실행시키기
$ docker compose ps         : compose 실행 현황 보기
$ docker ps                 : 일반 실행 현황에도 같이 나옴
$ docker compose down       : compose로 실행된 컨테이너 삭제
```