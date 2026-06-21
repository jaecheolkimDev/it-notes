DOCKER Redis
================

1\. 
-----------------------------
```
1) `$ docker run -d -p 6379:6379 redis`   : redis 이미지를 바탕으로 컨테이너 실행시키기
2) `$ docker exec -it [컨테이너 ID] bash`     : redis 컨테이너로 접속
3) `$ redis-cli`
4) `127.0.0.1:6379> set 1 jscode`
5) `127.0.0.1:6379> get 1`
```
