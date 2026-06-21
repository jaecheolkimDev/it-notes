DOCKER Nginx
================

1\. 
-----------------------------
```
1) `$ docker run --name webserver -d -p 80:80 nginx`   : Nginx 이미지를 바탕으로 컨테이너 실행시키기
2) Nginx 서버가 잘 실행되는 지 확인하기
3) `$ docker exec -it [컨테이너 ID] bash`     : Nginx 컨테이너로 접속
```
