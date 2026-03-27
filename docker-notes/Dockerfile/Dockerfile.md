Dockerfile 공부 노트
================


1\. Dockerfile
-----------------------------
```
Docker 이미지를 만들게 해주는 명령어들이 있는 파일이다. 
절차
 1. Dockerfile, .dockerignore 작성
 2. Dockerfile을 바탕으로 이미지 빌드하기(=> 이미지 생성)
 3. 이미지를 바탕으로 컨테이너를 생성한 뒤, 컨테이너를 실행까지 시킨다. 
 4. 실행중인 컨테이너 내부에 접속해서 확인
 
 
.dockerignore   : 복사할 파일들을 필터링합니다.(속도,보안,최적화)
심화) Docker 이미지 생성 시 캐시를 활용해서 최적화할 수 있는 방법이 있다. 입문자한테는 불필요한 내용이기 때문에 별도로 설명하지 않았다.  
```

2\. FROM
-----------------------------
```
FROM은 베이스 이미지를 생성하는 역할을 한다. Docker 컨테이너를 특정 초기 이미지를 기반으로 추가적인 셋팅을 할 수 있다. 
여기서 얘기한 ‘특정 초기 이미지’가 곧 베이스 이미지이다. 
    FROM [이미지명]
    FROM [이미지명]:[태그명]   : 태그명을 적지 않으면 해당 이미지의 최신(latest) 버전을 사용한다. 
```

3\. COPY
-----------------------------
```
COPY는 호스트 컴퓨터에 있는 파일을 복사해서 컨테이너로 전달한다.
    COPY [호스트 컴퓨터에 있는 복사할 파일의 경로] [컨테이너에서 파일이 위치할 경로]
    COPY app.txt /app.txt       : 파일 복사
    COPY my-app /my-app/        : 폴더 복사
    COPY *.txt /text-files/     : *.txt파일들을 폴더로 복사
    COPY ./ /                   : 현재위치의 모든 항목을 복사
    COPY build/libs/*SNAPSHOT.jar app.jar       :  SNAPSHOT.jar파일을 app.jar로 복사
    
특정 파일 또는 폴더만 COPY를 하고 싶지 않을 수 있다. 그럴 때 .dockerignore를 활용한다. 
1) .dockerignore 파일 만들기
    내용 : readme.txt
```

4\. ENTRYPOINT
-----------------------------
컨테이너가 시작할 때 실행되는 명령어
```
ENTRYPOINT는 컨테이너가 생성되고 최초로 실행할 때 수행되는 명령어를 뜻한다. 
쉽게 설명하자면 ENTRYPOINT에는 미니 컴퓨터의 전원을 키고나서 실행시키고 싶은 명령어를 적으면 된다. 
    - ENTRYPOINT ["/bin/bash", "-c", "sleep 500"]       : 종료된 컨테이너에 들어가서 디버깅하고 싶을 때
        - `c`   : 뒤에 오는 문자열을 명령어(Command)로 인식해서 실행해라"라는 옵션입니다.
    - ENTRYPOINT ["java", "-jar", "/app.jar"]           : 컨테이너가 java -jar /app.jar 로 실행
```

5\. RUN
-----------------------------
RUN은 이미지 생성 과정에서 명령어를 실행시켜야 할 때 사용한다.
```
미니 컴퓨터 환경이 centos-stream9으로 구성되었으면 좋겠고 git이 깔려있으면 좋겠다고 가정하자. 
이런 환경을 구성하기 위해 Dockerfile을 활용해 centos-stream9, git이 깔려있는 이미지를 만들면 된다.
Dockerfile
    FROM quay.io/centos/centos:stream9
    RUN dnf update -y && dnf install -y git
    ENTRYPOINT ["/bin/bash", "-c", "sleep 500"]
```

6\. WORKDIR : 작업 디렉토리를 지정
-----------------------------
```
WORKDIR으로 작업 디렉터리를 전환하면 그 이후에 등장하는 모든 RUN, CMD, ENTRYPOINT, COPY, ADD 명령문은 해당 디렉터리를 기준으로 실행된다. 
작업 디렉터리를 굳이 지정해주는 이유는 컨테이너 내부의 폴더를 깔끔하게 관리하기 위해서이다. 
컨테이너도 미니 컴퓨터와 같기 때문에 Dockerfile을 통해 생성되는 파일들을 특정 폴더에 정리해두는 것이 추후에 관리가 쉽다. 
만약 WORKDIR을 쓰지 않으면 컨테이너 내부에 존재하는 기존 파일들과 뒤섞여버린다. 

사용법
    WORKDIR [작업 디렉토리로 사용할 절대 경로]
    WORKDIR /my-dir
```

7\. EXPOSE : 컨테이너 내부에서 사용 중인 포트를 문서화하기
-----------------------------
```
EXPOSE는 컨테이너 내부에서 어떤 포트에 프로그램이 실행되는 지를 문서화하는 역할만 한다. 
docker -p 8080:8080 … 와 같은 명령어의 -p 옵션과 같은 역할은 일체 하지 않는다. 
쉽게 표현하자면 EXPOSE 명령어는 쓰나 안 쓰나 작동하는 방식에는 영향을 미치지 않는다.

사용법 
    EXPOSE [포트 번호]
    EXPOSE 3000
```


999\. Dockerfile 생성 및 수정
-----------------------------
```
1) vi Dockerfile                : 도커파일 생성
    내용 : FROM eclipse-temurin:17-jdk
          COPY app.txt /app.txt
          ENTRYPOINT ["/bin/bash", "-c", "sleep 500"]       : 종료된 컨테이너에 들어가서 디버깅하고 싶을 때
2) $ docker build -t my-jdk17-server .      : Dockerfile로 이미지(Image) 생성하는 문법
3) $ docker run -d my-jdk17-server          : 이미지를 기반으로 컨테이너 띄우기
4) $ docker exec -it [컨테이너 ID] bash       : 컨테이너 접속
    $ java -version                          : JDK 설치되어 있는 지 확인
-----------------------------
1) vi Dockerfile                : 도커파일 수정
    내용 : FROM node
          ENTRYPOINT ["/bin/bash", "-c", "sleep 500"]       : 종료된 컨테이너에 들어가서 디버깅하고 싶을 때
2) $ docker build -t my-node-server .       : Dockerfile로 이미지(Image) 생성하는 문법
3) $ docker run -d my-node-server           : 이미지를 기반으로 컨테이너 띄우기
4) $ docker exec -it [컨테이너 ID] bash       : 컨테이너 접속
    $ node -v                                : Node 설치되어 있는 지 확인
```
