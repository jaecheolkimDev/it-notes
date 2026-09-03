웹 프론트엔드 프로젝트(Next.js)를 Docker로 배포하기
================


1\. Nest.js 프로젝트 만들기
-----------------------------
```
$ npx create-next-app@latest    : Next.js 프로젝트 만들기
```

2\. Dockerfile 작성하기
-----------------------------
```
        # 불필요한 프로그램을 포함하지 않고 이미지 크기를 최소화한 버전. 실제 배포 할 때도 되도록이면 alpine 버전을 사용한다. 
        FROM node:20-alpine
        
        WORKDIR /app
        
        COPY . .
        
        RUN npm install
        
        RUN npm run build
        
        EXPOSE 3000
        
        ENTRYPOINT [ "npm", "run", "start" ]
```

3\. .dockerignore 작성하기
-----------------------------
[.dockerignore](../.dockerignore)

4\. 빌드 및 실행
-----------------------------
```
    $ docker build -t my-server .           : Dockerfile을 바탕으로 이미지 빌드하기
    $ docker image ls                       : 이미지가 잘 생성됐는 지 확인하기
    $ docker run -d -p 80:3000 my-server  : 생성한 이미지를 컨테이너로 실행시켜보기
    $ docker ps                             : 컨테이너 잘 실행되고 있는 지 확인하기
    localhost:80으로 들어가보기
    $ docker stop {컨테이너 ID}               : 실행시킨 컨테이너 중지
    $ docker rm {컨테이너 ID}                 : 실행시킨 컨테이너 삭제하기
    $ docker image rm {이미지 ID}             : 이미지 삭제하기
```
