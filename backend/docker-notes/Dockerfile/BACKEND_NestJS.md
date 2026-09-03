백엔드 프로젝트(Nest.js)를 Docker로 실행시키기
================


1\. Nest.js 프로젝트 만들기
-----------------------------
```
$ npm i -g @nestjs/cli  : Nest CLI 설치
$ nest new my-server    : nest new {프로젝트명}
```

2\. Dockerfile 작성하기
-----------------------------
```
        FROM node
        
        WORKDIR /app
        
        COPY . .
        
        RUN npm install
        
        RUN npm run build
        
        EXPOSE 3000
        
        ENTRYPOINT [ "node", "dist/main.js" ]
```

3\. .dockerignore 작성하기
-----------------------------
[.dockerignore](../.dockerignore)


4\. 빌드 및 실행
-----------------------------
```
    $ docker build -t my-server .           : Dockerfile을 바탕으로 이미지 빌드하기
    $ docker image ls                       : 이미지가 잘 생성됐는 지 확인하기
    $ docker run -d -p 3000:3000 my-server  : 생성한 이미지를 컨테이너로 실행시켜보기
    $ docker ps                             : 컨테이너 잘 실행되고 있는 지 확인하기
    localhost:3000으로 들어가보기
    $ docker stop {컨테이너 ID}               : 실행시킨 컨테이너 중지
    $ docker rm {컨테이너 ID}                 : 실행시킨 컨테이너 삭제하기
    $ docker image rm {이미지 ID}             : 이미지 삭제하기
```
