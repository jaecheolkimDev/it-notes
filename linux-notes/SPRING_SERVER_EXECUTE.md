SPRING SERVER EXECUTE
======================

1\. 사전 환경 셋팅
-----------------------
1) JDK 설치하기 : Java 17을 기준으로 구성된 Spring Boot 서버를 실행시킬 예정이다. 
   Spring Boot 서버를 실행시키려면 JDK가 설치되어 있어야 한다. 따라서 JDK 17버전을 설치해보자.
```
$ sudo yum update # 패키지 목록 최신화
$ sudo yum list java*jdk-devel                  : 설치 가능한 JDK 목록 확인
$ sudo yum installl java-17-openjdk-devel.x86_64: java-17-openjdk-devel.x86_64라는 패키지 설치
```
2) 잘 설치됐는지 확인하기
```
$ sudo yum list --installed | grep java-17-openjdk-devel.x86_64 # 설치된 패키지 확인하기
$ java -version # 설치된 자바 버전 확인하기
```
3) Github으로부터 Spring Boot 프로젝트 clone하기
```
$ sudo yum install git                                              : git 설치
$ cd ~
$ git clone https://github.com/JSCODE-EDU/linux-springboot.git
$ cd linux-springboot
```
4) 서버 실행시키기
```
$ ./gradlew clean build # 기존 빌드된 파일을 삭제하고 새롭게 JAR로 빌드
$ cd build/libs
$ java -jar linux-springboot-0.0.1-SNAPSHOT.jar          # 포그라운드로 실행
$ nohup java -jar linux-springboot-0.0.1-SNAPSHOT.jar &  # 백그라운드로 실행
```

2\. Spring Boot 서버가 출력하는 로그를 파일로 남기기
-----------------------
5) 실행시킨 서버 종료시키기 ( ctrl + c )
6) 표준 출력과 표준 에러 출력을 파일로 리다이렉션하기
```
$ java -jar linux-springboot-0.0.1-SNAPSHOT.jar >> app.log 2>&1 
```


3\. 윈도우에서 접속하기.
-----------------------
```
윈도우 방화벽이 WSL의 네트워크 트래픽을 차단하고 있는지 확인하기.

이 경우 아래 명령어를 **Windows 파워쉘(관리자 권한)**에서 실행하여 WSL의 미러링된 트래픽을 허용해 주어야 합니다.
New-NetFirewallRule -DisplayName "WSL Mirrored Networking" -Direction Inbound -Action Allow -Protocol TCP
```