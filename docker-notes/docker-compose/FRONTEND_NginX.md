Docker Compose로 프론트엔드(HTML, CSS, Nginx) 실행시키기
================

0\. 사전작업
-----------------------------
```
1) index.html
        <!DOCTYPE html>
        <head>
            <meta charset="UTF-8">
            <link rel="stylesheet" href="style.css">
        </head>
        <body>
            <h1>My Web Page</h1>
        </body>
        </html>

2) style.css
        * {
          color: blue;
        }
        
3) Dockerfile
        FROM nginx 
        COPY ./ /usr/share/nginx/html
        
* 주의) Nginx의 기본 설정에 의하면 메인 페이지(첫 페이지)의 파일명을 index.html이라고 지어야 한다. 
```

1\. Docker CLI로 컨테이너를 실행시킬 때
-----------------------------
```
$ docker build -t my-web-server .
$ docker run -d -p 80:80 my-web-server
```


2\. compose.yml
-----------------------------
``` 
services:
  my-server:
    build: .
    ports:
      - 3000:3000
```


3\. Docker Compose로 컨테이너를 실행시킬 때
-----------------------------
``` 
$ docker compose up -d --build      : compose 파일 실행시키기
$ docker compose ps                 : compose 실행 현황 보기
$ docker ps                         : 일반 실행 현황에도 같이 나옴
- `http://localhost:80`으로 들어가보기
$ docker compose down               : compose로 실행된 컨테이너 삭제
```