백엔드(Spring Boot) 서버를 파드(Pod)로 띄워보기
================

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
``` 
    FROM openjdk:17-jdk
    
    COPY build/libs/*SNAPSHOT.jar app.jar
    
    ENTRYPOINT ["java", "-jar", "/app.jar"]
```


3\. Dockerfile을 바탕으로 이미지 빌드하기
-----------------------------
``` 
1) Dockerfile을 바탕으로 이미지 빌드하기    : $ docker build -t spring-server .
2) 이미지가 잘 생성됐는 지 확인하기          : $ docker image ls
```


4\. 매니페스트 파일 작성하기
-----------------------------
``` 
apiVersion: v1
kind: Pod
metadata:
  name: spring-pod
spec:
  containers:
    - name: spring-container
      image: spring-server
      ports:
        - containerPort: 8080
```


5\. 매니페스트 파일을 기반으로 파드(Pod) 생성하기
-----------------------------
``` 
1) 매니페스트 파일을 기반으로 파드(Pod) 생성하기  : $ kubectl apply -f spring-pod.yaml 
2) 파드(Pod)가 잘 생성됐는 지 확인             : $ kubectl get pods
```