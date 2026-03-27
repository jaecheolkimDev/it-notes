1시간만에 치킨콤보값으로 배우는 서버 배포 공부 노트
================

3\. DOCKER 강의
-----------------------------
```
#### 치킨콤보값으로 스프링부트를 수동배포 -> 도커로 배포 -> Github Action CI/CD 순으로 배포과정을 배웁니다.

- 서비스를 실행해도 작동을 안하는데, AWS에 존재하는 보안그룹 설정을 해줘야함.
- 인스턴스 > 보안 > 보안 그룹 > 인바운드 규칙 편집 > 규칙 추가(포트 범위:8080 , CIDR 블록:0.0.0.0/0)
- http 로 접속해야함.

* CIDR 블록:0.0.0.0/0 :: 모든곳에서 요청 허용을 하겠다.

* Docker_Host : docker daemon(Containers , images)
* Registry : application image

* 도커 플랫폼 지정 빌드
* docker build--platform linux/amd64/v3-t {본인도커허브ID}/{프로젝트이름} .

* yml 파일에 대한 보안처리
* 1. 암호화
2. 외부 환경변수를 통한 세팅
3. 도커 허브의 private 기능을 통한 이미지 암호화
4. 도커 허브 레지스트리를 만들어서 개인 저장소를 구축함
5. AWS , Google Cloud에서 사용하는 도커 허브의 private 기능 사용

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
* docker build--platform linux/amd64/v3-t {본인도커허브ID}/{프로젝트이름} .
```