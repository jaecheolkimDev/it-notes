Docker Compose로 Redis 실행시키기
================


1\. Docker CLI로 컨테이너를 실행시킬 때
-----------------------------
```
$ docker run -d -p 6379:6379 redis
```


2\. compose.yml
-----------------------------
``` 
services:
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
$ docker logs [컨테이너 ID 또는 컨테이너명]            : 컨테이너 실행시킬 때 에러 없이 잘 실행됐는 지 로그 체크
$ docker exec -it [컨테이너 ID 또는 컨테이너명] bash   : Redis 컨테이너에 접속
    $ redis-cli             : 컨테이너에서 redis 사용해보기
        127.0.0.1:6379> set 1 jscode
        127.0.0.1:6379> get 1
$ docker compose down       : compose로 실행된 컨테이너 삭제
```