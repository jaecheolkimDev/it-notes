Docker Compose로 프론트엔드(Next.js) 실행시키기
================

0\. 사전작업
-----------------------------
```
1) Next.js 프로젝트 만들기
        $ npx create-next-app@latest    : Next.js 프로젝트 만들기

2) Dockerfile
        FROM node:20-alpine
        
        WORKDIR /app
        
        COPY . .
        
        RUN npm install
        
        RUN npm run build
        
        EXPOSE 3000
        
        ENTRYPOINT [ "npm", "run", "start" ]
        
3) .dockerignore
        node_modules
        
* 이미지를 생성할 때 npm install을 통해 처음부터 깔끔하게 필요한 의존성만 설치한다. 
  따라서 호스트 컴퓨터에 있는 node_modules는 컨테이너로 복사해갈 필요가 없다
```

1\. Docker CLI로 컨테이너를 실행시킬 때
-----------------------------
```
$ docker build -t my-web-server .
$ docker run -d -p 80:3000 my-web-server
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