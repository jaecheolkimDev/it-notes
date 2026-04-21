백엔드(Spring Boot) 서버를 파드(Pod)로 띄워보기
================

0\. 최초 작성 / 서버 업데이트
-----------------------------
```
```

1\. Spring Boot 프로젝트 셋팅
-----------------------------
```
1) 간단한 코드 작성
2) 프로젝트 실행시켜보기
3) Spring Boot 프로젝트 빌드하기
    $ ./gradlew clean build
```


2\. Dockerfile 작성하기
-----------------------------
[spring 도커파일](../docker-notes/Dockerfile/Dockerfile_spring)

3\. Dockerfile을 바탕으로 이미지 빌드하기
-----------------------------
``` 
1-1) Dockerfile을 바탕으로 이미지 빌드하기           : $ docker build -t spring-server .
1-2) 빌드된 jar 파일을 기반으로 새로 이미지 빌드하기    : $ docker build -t spring-server:1.0 .
2) 이미지가 잘 생성됐는 지 확인하기                   : $ docker image ls
```


4\. 매니페스트 파일 작성하기
-----------------------------
[매니페스트](./Manifest-File/spring-pod/single.yaml)


5\. 매니페스트 파일을 기반으로 파드(Pod) 생성하기
-----------------------------
``` 
1) 매니페스트 파일을 기반으로 파드(Pod) 생성하기  : $ kubectl apply -f spring-pod.yaml 
2) 파드(Pod)가 잘 생성됐는 지 확인             : $ kubectl get pods
```