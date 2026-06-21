Aurora and RDS
=================

1\. 개요
----------------------------------------
```
 MySQL과 같은 DB를 편하게 관리하고 사용할 수 있게 만든 서비스가 RDS이다.
```


2\. AWS RDS 사용하는 이유
----------------------------------------
```
1) AWS RDS는 여러 편리한 부가기능(자동 백업, 모니터링, 다중 AZ 등)을 많이 가지고 있다.
2) EC2에 같이 구성하면 서버 장애가 나면 같이 서버가 죽음.
```


3\. RDS 생성하기
----------------------------------------
```
1) Aurora and RDS 서비스 들어가기
2) 리전 선택
3) 데이터베이스 종류 선택
 - MySQL
4) 템플릿 선택
 - 프리 티어
  - 많이들 오해하는 게 프리 티어는 학습할 때나 테스트할 때만 쓰는 안 좋은 사양의 컴퓨터라고 생각한다.
    하지만 실제 서비스에서 활용해도 될 정도로 나름 괜찮은 사양이다. 하루 방문자 수가 2,000명 정도였던 서비스를 운영했었는데 문제 없이 잘 돌아갔다. 
    성능에 문제가 직접적으로 생기기 전까지는 너무 걱정하지 말자. 
5) 가용성 및 내구성
 - 단일 AZ DB 인스턴스 배포(인스턴스 1개)
6) 설정
 - DB 인스턴스 식별자
 - 자격 증명 관리
  - 자체 관리
 - 마스터 사용자 이름 / 마스터 암호
  - 데이터베이스에 접근하기 위한 아이디와 비밀번호와 같은 값이다. 따라서 마스터 사용자 이름과 마스터 암호는 따로 적어두자. 
7) 인스턴스 구성, 스토리지
 - 기본값
8) 연결
 - 퍼블릭 엑세스
  - 예   : 여러 환경(로컬 환경, 개발 환경 등)에서 편하게 DB에 접근할 수 있게 된다. 
9) 데이터베이스 인증, 모니터링
 - 기본값
10) 비용
 - 책정된것보다 조금밖에 안나옴
 
* 가용 영역을 영어로 AZ(Availability Zone)이라고 한다.
```


4\. 보안그룹 설정하기
----------------------------------------
```
1) EC2 > 네트워크 및 보안 > 보안 그룹
2) 인바운드 규칙, 아웃바운드 규칙 설정하기
 - 별도의 설정을 하지 않았다면 RDS의 MySQL은 3306번 포트에서 실행된다. DB에 접근하기 위해 3306번 포트를 인바운드 규칙에 추가해주자.
   아웃바운드 규칙에는 모든 트래픽을 허용하는 규칙을 추가해주자. 
3) 생성한 보안그룹을 RDS에 붙이기
```


5\. 파라미터 그룹 추가하기
----------------------------------------
```
1) Aurora and RDS > 파라미터 그룹 > 파라미터 그룹 생성
2) 편집 > 값 변경
    값 : utf8mb4로 설정하기(utf8 대신에 utf8mb4를 사용하는 이유는 ‘한글’ 뿐만 아니라 ‘이모티콘’도 지원이 가능하도록 하기 위해서이다.)
        - `character_set_client`
        - `character_set_connection`
        - `character_set_database`
        - `characater_set_filesystem`
        - `characater_set_results`
        - `character_set_server`
    값 : utf8mb4_unicode_ci로 설정하기(utf8mb4_unicode_ci은 정렬, 비교 방식을 나타낸다. )
        - `collation_connection`
        - `collation_server`
    값 : Asia/Seoul로 설정하기
        - `time_zone`
3) RDS의 파라미터 그룹 변경하기
 - RDS의 DB 인스턴스 수정을 통해 DB 파라미터 그룹 변경하면 된다. 
  - 주의) DB 파라미터 그룹을 변경한 뒤에는 RDS의 DB를 재부팅해야만 정상적으로 적용된다. 
```


6\. AWS Aurora and RDS에 접속하기 
----------------------------------------
DBMS로 연결하기
```
Server Host : Aurora and RDS > 데이터베이스 > {생성한 인스턴스} > 연결 & 보안 > 엔드포인트
Username    : 마스터 사용자 이름(Aurora and RDS 데이터베이스 만들 때 정함)
Password    : 마스터 암호(Aurora and RDS 데이터베이스 만들 때 정함)

* 엔드포인트(Endpoint)   : 특정 리소스(ex. 서버, DB 등)에 접근할 수 있도록 해주는 URL을 의미한다.
```


7\. Express 서버에 AWS Aurora and RDS 연결하기
----------------------------------------
```
1) EC2 인스턴스에서 Express 서버 clone하기
    $ git clone https://github.com/JSCODE-EDU/rds-express-sequelize-sample.git
    $ cd rds-express-sequelize-sample
    $ npm i
2) .env 파일 수정하기
    DATABASE_NAME=instagram
    DATABASE_USERNAME=admin
    DATABASE_PASSWORD=password
    DATABASE_HOST=_______________.ap-northeast-2.rds.amazonaws.com
3) Express 서버가 RDS와 잘 연결되는 지 확인하기
    $ node app.js
    
주의) .env 파일은 반드시 .gitignore에 추가해서 Github에 올라가지 않게 해야 합니다.
     (위 Github Repository는 편의상 .env를 Github에 올린 것 뿐입니다.)
```


8\. Spring Boot 서버에 AWS Aurora and RDS 연결하기
----------------------------------------
```
1) EC2 인스턴스에서 Spring Boot 서버 clone하기
    $ git clone https://github.com/JSCODE-BOOK/aws-rds-springboot.git
2) application.yml 파일 수정하기
    `aws-rds-springboot/src/main/resources/application.yml`
    
    server:
        port: 80
    spring:
        datasource:
            url: jdbc:mysql://___________:3306/instagram # RDS 인스턴스 엔드포인트
            username: ______ # RDS 마스터 사용자 이름
            password: ______ # RDS 마스터 암호
            driver-class-name: com.mysql.cj.jdbc.Driver
        jpa:
            hibernate:
                ddl-auto: update
            show-sql: true
            
    실습에서는 편의를 위해 application.yml 파일을 리포지토리에 업로드했습니다. 
    만약 자신의 스프링 부트 프로젝트를 퍼블릭 깃허브 리포지토리에 업로드한다면 .gitignore를 활용하여 application.yml 파일을 제외해야 합니다.
3) Spring Boot 서버가 RDS와 잘 연결되는 지 확인하기
 - 프로젝트를 내려받은 경로에서 다음 명령어를 입력하여 백엔드 서버를 실행하고, 정상으로 실행되는지 확인합니다.
    $ sudo lsof -i:80 # 80번 포트에서 실행되는 프로세스 확인
    $ sudo kill {PID 값} # 80번 포트에서 실행되는 프로세스가 있다면 종료
    $ cd ~/aws-rds-springboot
    $ ./gradlew clean build -x test # 스프링 부트 프로젝트 빌드
    $ cd build/libs
    $ sudo nohup java -jar aws-rds-springboot-0.0.1-SNAPSHOT.jar &      : JAR 파일 실행
    $ sudo lsof -i:80 # 80번 포트에서 실행되는 프로세스 조회
4) 백엔드 서버로 요청 보내기
    웹 브라우저를 사용해 ELB에 연결해 둔 도메인 주소로 요청을 보내서 백엔드 서버가 정상으로 응답하는지 확인해 보겠습니다. 
    이번에 내려받은 프로젝트에는 데이터베이스에 게시글 데이터를 저장한 뒤에 데이터를 불러오는 로직의 GET /boards API를 추가해 두었습니다. 
    그러므로 응답이 반환된다면 스프링 부트 서버가 RDS 인스턴스와 정상으로 연결된 것입니다.
```


9\. 비용 나가지 않게 AWS Aurora and RDS 깔끔하게 종료하기
----------------------------------------
```
RDS 데이터베이스 삭제하기

* 최종 스냅샷 생성과 자동 백업 보존을 체크하면 비용이 나간다. 따라서 실제 운영용 데이터베이스가 아니라면 체크를 해제하고 삭제를 하자. 
```