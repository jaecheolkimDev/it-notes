DOCKER 공부 노트
================

0\. 공부할것
-----------------------------
```
Harbor : 기업의 내부 프로젝트, 또는 공개하고 싶지 않은 개인 프로젝트를 진행하는 경우 사적인 저장소. 
```

1\. 정리
-----------------------------
```
Docker에서는 Docker Hub라는 공용 Docker Image 관리 서비스를 제공하고 있다. Hub에 올리는 이미지는 누구나 접근 가능하다.
```

2\. DOCKER 강의 수강 예정
-----------------------------
- 비전공자도 이해할 수 있는 Docker 입문/실전 (https://inf.run/UvNen)




3\. DOCKER 강의
-----------------------------

### 1시간만에 치킨콤보값으로 배우는 서버 배포
#### 치킨콤보값으로 스프링부트를 수동배포 -> 도커로 배포 -> Github Action CI/CD 순으로 배포과정을 배웁니다.
[https://www.inflearn.com/course/1%EC%8B%9C%EA%B0%84%EB%A7%8C%EC%97%90-%EC%B9%98%ED%82%A8%EC%BD%A4%EB%B3%B4%EA%B0%92-%EC%84%9C%EB%B2%84-%EB%B0%B0%ED%8F%AC](https://www.inflearn.com/course/1%EC%8B%9C%EA%B0%84%EB%A7%8C%EC%97%90-%EC%B9%98%ED%82%A8%EC%BD%A4%EB%B3%B4%EA%B0%92-%EC%84%9C%EB%B2%84-%EB%B0%B0%ED%8F%AC)


- java project를 build하면 .jar파일이 생성됨.
- 단순 서비스 실행 : java -jar demo-0.0.1-SNAPSHOT.jar
- 서비스를 실행해도 작동을 안하는데, AWS에 존재하는 보안그룹 설정을 해줘야함.
- 인스턴스 > 보안 > 보안 그룹 > 인바운드 규칙 편집 > 규칙 추가(포트 범위:8080 , CIDR 블록:0.0.0.0/0)
- http 로 접속해야함.
- 콘솔이 켜져있는 동안만 서버가 기동되어 있음.
- 리눅스의 백그라운드 실행 기능으로 서버를 기동시켜야함.




* CIDR 블록:0.0.0.0/0 :: 모든곳에서 요청 허용을 하겠다.
- & : 쉘 점유 안함


* Docker : 서버 배포
* Client : docker pull , docker build , docker run , docker push
* Docker_Host : docker daemon(Containers , images)
* Registry : application image

* Dockerfile : 요리 레시피
* Build : 조리
* Docker Image : 조리된 음식(애플리케이션 실행에 필요한 모든 파일과 설정을 담은 정적인 '레시피')
* Run : 서빙(Docker Image를 가져와 새로운 Container를 생성하고 실행하는 역할을 합니다. Image를 Container로 변환하는 과정)
* Docker Container : 서빙된 음식(Image를 기반으로 실제로 실행되는 '인스턴스')

* Docker Desktop이 실행중일때
* Dockerfile(레시피)을 Docker Engine(요리사)이 Docker Build 명령어를 통해
* Docker Image(조리된 요리)를 만들고 Docker Push 명령어를 통해
* Docker Hub(메뉴판)에 올리고 Docker Pull 명령어를 통해
* EC2에 올리고 Docker Run 명령어를 통해
* Docker Container(서빙된 요리)를 사용자가 사용할 수 있게 만든다.

* Docker 사용 이유 : 어느 OS든 어느 환경에서든 빠르게 사용이 가능하다. 공통된 dockerfile을 사용하기 때문에.

* Dockerfile은 프로젝트에서 Dockerfile 로 만들면 됨.
  ### 사용할 재료
    - FROM openjdk:latest  # openjdk 최신버전을 사용하겠다.

  ### 재료를 저장할 위치
    - COPY build/libs/neo-0.0.1-SNAPSHOT.jar /app/app.jar  # build한 jar파일을 도커 파일(/app/app.jar)에 저장을 하겠다.

  ### 재료를 통해 요리를 할 레시피
    - ENTRYPOINT ["java", "-jar", "/app/app.jar"]  # java소스로 된 /app/app.jar로 되있는 .jar파일을 실행을 할 것이다.

* Docker Desktop이 실행중이고, Docker engine이 돌아가고 있어야함.
* 도커 빌드 : docker build -t {본인도커허브ID}/{프로젝트이름} .
* 도커 푸시 : docker push {본인도커허브ID}/{푸쉬할프로젝트이름}

* 도커 실행 명령어 - docker run -d -p 8080:8080 {본인도커허브ID}/{푸쉬할프로젝트이름}
* d : 백그라운드실행
* p : 포트
* 포트바인딩 - 외부로나가는포트번호:내부실행포트번호

* 도커 플랫폼 지정 빌드
* docker build --platform linux/amd64/v3 -t {본인도커허브ID}/{프로젝트이름} .

* yml 파일에 대한 보안처리
* 1. 암호화
2. 외부 환경변수를 통한 세팅
3. 도커 허브의 private 기능을 통한 이미지 암호화
4. 도커 허브 레지스트리를 만들어서 개인 저장소를 구축함
5. AWS , Google Cloud에서 사용하는 도커 허브의 private 기능 사용


* 도커 명령어
* docker ps -a
* docker rm {CONTAINER ID} : 도커 컨테이너 삭제
* docker images
* docker rmi {IMAGE ID} : 도커 이미지 삭제
* docker logs {로그파일} : 로그파일 확인
* docker logs {CONTAINER ID} : 로그파일 확인
* docker stop {CONTAINER ID} : 실행 중지

* docker run을 했을때 Image가 없으면 Image를 받는다고 했음.

* MySQL 설정 - 도커 띄우기
* docker run --name mysql-container -e MYSQL_ROOT_PASSWORD=your_password -d -p 3306:3306 mysql:latest
* 이름 : mysql-container
* e : 환경변수에 대한 설정

* application.yml
* <HOST> : public IP 주소 
* spring:
  datasource:
  url: jdbc:mysql://<HOST>:3306/<DATABASE_NAME>
  driver-class-name: com.mysql.cj.jdbc.Driver
  username: <USERNAME>
  password: <PASSWORD>
  jpa:
  hibernate:
  ddl-auto: update
  show-sql: true
  properties:
  hibernate:
  show_sql: true
  format_sql: true
  dialect: org.hibernate.dialect.MySQLDialect

* EC2 > 보안 > 보안 그룹 > 인바운드 규칙 편집 > 규칙 추가
* MYSQL/Aurora , 공개범위 0.0.0.0/0 > 규칙 저장

* 문제 발생시
* docker stop {CONTAINER ID} : 실행 중지
* ./gradlew clean
* ./gradlew build
* docker build --platform linux/amd64/v3 -t {본인도커허브ID}/{프로젝트이름} .
* docker rm {CONTAINER ID} : 도커 컨테이너 삭제
* docker rmi {IMAGE ID} : 도커 이미지 삭제
* docker run -d -p 8080:8080 {본인도커허브ID}/{푸쉬할프로젝트이름}
