웹 프론트엔드 프로젝트(HTML, CSS,  Nginx)를 Docker로 배포하기
================


1\. HTML, CSS 파일 만들기
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

주의) Nginx의 기본 설정에 의하면 메인 페이지(첫 페이지)의 파일명을 index.html이라고 지어야 한다. 
```

2\. Dockerfile 작성하기
-----------------------------
```
        FROM nginx 
        COPY ./ /usr/share/nginx/html
```

3\. .dockerignore 작성하기
-----------------------------
```
```

4\. 빌드 및 실행
-----------------------------
```
    $ docker build -t my-server .           : Dockerfile을 바탕으로 이미지 빌드하기
    $ docker image ls                       : 이미지가 잘 생성됐는 지 확인하기
    $ docker run -d -p 80:80 my-server  : 생성한 이미지를 컨테이너로 실행시켜보기
    $ docker ps                             : 컨테이너 잘 실행되고 있는 지 확인하기
    localhost:80으로 들어가보기
    $ docker stop {컨테이너 ID}               : 실행시킨 컨테이너 중지
    $ docker rm {컨테이너 ID}                 : 실행시킨 컨테이너 삭제하기
    $ docker image rm {이미지 ID}             : 이미지 삭제하기
```
