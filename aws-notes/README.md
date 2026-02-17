AWS 공부 노트
=================

1\. 개요
----------------------------------------
```
EC2(Elastic Compute Cloud) : 컴퓨터를 빌려서 원격으로 접속해 사용하는 서비스
 - 백엔드 서버 배포
vercel, netlify, AWS S3
 - 프론트엔드 웹 페이지 배포
리전(Region) : 인프라를 지리적으로 나누어 배포한 각각의 데이터 센터
 - 애플리케이션의 주된 사용자들의 위치와 지리적으로 가까운 리전(Region)을 선택하는 것이 유리하다.
 - 리전(Region)마다 EC2가 따로따로 관리가 되고 있으니 이 점 유의하자. 
```


2\. S3
----------------------------------------
```
파일 업로드/다운로드에 특화된 서비스이다.

EC2 내부에 저장해도 되긴함
```


3\. S3를 활용한 아키텍처 구성
----------------------------------------
```
1. 업로드
 1) 사용자 -> EC2  : 파일 업로드 API로 요청
 2) EC2 -> S3     : S3에 파일 업로드
 3) S3 -> EC2     : 파일가 저장된 URL을 리턴
 4) EC2 -> RDS    : DB에 파일가 저장된 URL을 저장
 
2. 다운로드
 1) 사용자 -> EC2  : 파일 조회 API로 쵸어
 2) EC2 -> RDS    : DB에 조회 SQL문 날림
 3) RDS -> EC2    : 저장되어 있던 파일 URL 응답
 4) EC2 -> 사용자  : 사용자한테 파일 URL 응답
 5) S3 -> 사용자   : 사용자가 파일 URL을 사용할 경우, S3로부터 파일 다운로드
```


4\. S3 버킷 생성하기
----------------------------------------
```
1. S3 서비스 검색
2. 버킷 만들기
 - 버킷 이름 작성
 - 나머지 Default 설정 그대로 두기
3. 버킷에 정책 추가하기
 - 버킷 > 정책 편집 > 새 문 추가
  - ex) 특정 서비스에서 상품 이미지를 모든 사용자한테 보여주고 싶다고 가정해보자. 그러면 버킷에서 상품 이미지를 다운로드해서 사용할 수 있어야 한다. 
        버킷에서 이미지 파일을 조회할 수 있게 정책을 추가해보겠다.
            {
                "Version": "2012-10-17",
                "Statement": [
                    {
                        "Sid": "Statement1",
                        "Principal": {},
                        "Effect": "Allow",
                        "Action": [
                            "s3:GetObject"
                        ],
                        "Resource": []
                    }
                ]
            }
            
            arn:aws:s3:::{BucketName}/{ObjectName}


* 버킷(Bucket) : 깃헙(Github)을 보면 여러 개의 Repository를 만들 수 있다. S3에서도 여러 개의 저장소를 만들 수 있다. 
                여기서 하나의 저장소를 버킷(Bucket)이라고 부른다.
* 객체(Object) : S3에 업로드한 파일을 보고, S3에서는 파일(File)이라 부르지 않고 객체(Object)라고 부른다. 즉, 객체(Object)란 S3 버킷에 업로드된 파일을 의미한다.
* 정책(Policy) : 권한(Permission)을 정의하는 JSON 문서를 의미한다. AWS는 기본적으로 대부분의 권한이 주어져있지 않다. 
                AWS의 특정 소스에 접근하려면 권한을 허용해주어야 한다. 권한을 허용할 때 작성해야 하는 게 정책(Policy)이다. 
* ARN(Amazon Resource Number)   : AWS에 존재하는 리소스를 표현하는 문법이다. 
```


5\. S3에 파일 업로드 할 수 있도록 IAM에서 액세스 키 발급받기
----------------------------------------
```
기본적으로 AWS의 리소스에 아무나 접근을 못하게 막아놨기 때문에 S3에 접근해서 파일을 업로드할 수가 없다.
하지만 백엔드 서버가 S3에 접근해서 파일을 업로드할 수 있어야 한다.
S3에 접근할 수 있는 권한을 받기 위해 IAM이라는 곳에서 권한을 부여받아야 한다. 

1) IAM > 액세스 관리 > 사용자 >
 1) 사용자 생성 > 권한 설정 > 직접 정책 연결 > 권한 정책(AmazonS3FullAccess)
 2) 보안 자격 증명 > 액세스 키 만들기 > 액세스 키 모범 사례 및 대안(AWS 외부에서 실행되는 애플리케이션)
    > 액세스 키 만들기(액세스 키, 비밀 액세스 키)
```


6\. S3를 활용해 Express 서버에 이미지 업로드 기능 구현하기
----------------------------------------
```
1. EC2 인스턴스에서 Expr6ess 서버 clone하기
    $ git clone https://github.com/JSCODE-EDU/s3-express-sample.git
    $ cd s3-express-sample
    $ npm i
2. .env 파일 수정하기
    내가 발급받은 액세스 키와 버킷명에 맞게 `.env` 파일을 수정하면 된다. 
    
    .env
        AWS_ACCESS_KEY=____
        AWS_SECRET_ACCESS_KEY=____
        AWS_S3_BUCKET=____
    
    주의) 개인의 `.env` 파일은 반드시 `.gitignore`에 추가해서 Github에 올라가지 않게 해야 합니다.
    (위 Github Repository는 편의상 `.env`를 Github에 올린 것 뿐입니다.)
3. S3에 파일 업로드가 잘 되는 지 확인하기
4. S3에 저장된 URL로 이미지 잘 조회되는 지 확인
    방법 1) HTML에서 확인하기
    
    index.html
        <!doctype html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport"
                content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <title>Document</title>
        </head>
        <body>
          <h1>이미지 테스트</h1>
          **<img src="______"/>**
        </body>
        </html>
    
    방법 2) 주소창에 주소 쳐보기
```


7\. S3를 활용해 Spring Boot 서버에 이미지 업로드 기능 구현하기
----------------------------------------
```
1) EC2 인스턴스에서 Spring Boot 서버 clone하기
 $ git clone https://github.com/JSCODE-BOOK/aws-s3-springboot.git
2) application.yml 파일 수정하기
 - 스프링 부트에서 참조하는 AWS 자원의 정보를 설정하기 위해 application.yml 파일을 엽니다.
  $ cd aws-s3-springboot/src/main/resources
  $ vi application.yml
3) application.yml
server:
	port: 80
spring:
	datasource:
		url: jdbc:mysql://_________:3306/instagram # RDS 인스턴스 엔드포인트
		username: ______ # RDS 마스터 사용자 이름
		password: ______ # RDS 마스터 암호
		driver-class-name: com.mysql.cj.jdbc.Driver
	jpa:
		hibernate:
			ddl-auto: create
		show-sql: true
	cloud:
		aws:
			credentials:
				access-key: _________ # IAM 통해서 발급받은 액세스 키
				secret-key: _________ # IAM 통해서 발급받은 비밀 액세스 키
			s3:
				bucket: _______ # 생성한 S3 버킷명
			region:
				static: ap-northeast-2
4)
```




998\. 비용 나가지 않게 EC2 깔끔하게 종료하기
----------------------------------------
```
1) 인스턴스 종료
2) 탄력적 IP 릴리스하기
```


999\. 대략적으로 AWS 비용 얼마나 나오는 지
----------------------------------------
```
1) EC2
- EC2 인스턴스 (t3a.small) : 시간당 0.026 USD (24시간당 약 800원)
- 데이터 전송 비용 : 1 GB당 0.1368 USD (1GB당 약 200원)
- Public IPv4 비용 : 시간당 0.005 USD (24시간당 약 200원)

2) RDS
- RDS 인스턴스 (t4g.micro) : 시간당 0.026 USD (24시간당 약 800원)

  (프리티어일 경우 월 750시간까지 무료)

- 스토리지 비용 : GB-월당 0.131 USD (20GB-24시간당 약 200원)

  (프리티어일 경우 20GB까지 무료)

- Public IPv4 비용 : 시간당 0.005 USD (24시간당 약 200원)

3) ElasitCache
- 캐시 (cache.t3micro) : 시간당 0.025 USD (24시간당 약 800원)

  (프리티어일 경우 월 750시간까지 무료)
```