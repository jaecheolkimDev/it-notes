Nginx Backend(Spring Boot) 배포
=====================

1\. JDK 17 설치하기
--------------------------------------
```
$ sudo yum update
$ sudo yum install openjdk-17-jdk -y

# 잘 설치됐는 지 확인하기
    $ java -version
```


2\. Github으로부터 Spring Boot 프로젝트 클론 받기
--------------------------------------
```
$ cd /usr/share/nginx/
$ git clone https://github.com/JSCODE-COURSE/nginx-backend-springboot.git
$ cd nginx-backend-springboot
```

3\. Spring Boot 서버 실행시키기
--------------------------------------
```
$ ./gradlew clean build -x test
$ cd build/libs
$ nohup java -jar nginx-backend-springboot-0.0.1-SNAPSHOT.jar &
```

4\. Spring Boot 서버가 잘 작동하는 지 확인하기
--------------------------------------
```
# 8080번 포트에서 실행되고 있는 프로세스 조회
    $ lsof -i:8080
```


5\. Nginx 설정 파일 작성하기
--------------------------------------
```
$ cd /etc/nginx/conf.d/websites
$ sudo vi api.jscode.p-e.kr.conf

/etc/nginx/conf.d/websites/api.jscode.p-e.kr.conf
    server {
            # api.jscode.p-e.kr:80로 들어온 요청을 이 server 블록이 처리
            listen 80;
            server_name api.jscode.p-e.kr;
            
            # / 으로 시작하는 모든 경로를 처리
            location / {
                    # 들어온 요청을 전부 http://localhost:8080(Spring Boot 서버)로 전달
                    # 리버스 프록시
                    proxy_pass http://localhost:8080;
            }       
    }
```


6\. 변경된 Nginx 설정 내용 적용하기
--------------------------------------
[설정 파일 수정 후 명령어](./Config.md)