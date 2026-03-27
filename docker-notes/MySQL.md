DOCKER MySQL 공부 노트
================

1\. 사전 작업
-----------------------------
```
1) `$ cd /Users/jaecheol/Documents/Develop/docker-mysql`     : MySQL 데이터를 저장하고 싶은 폴더 만들기

* {호스트의 절대경로}     : /Users/jaecheol/Documents/Develop/docker-mysql
```


1\. docker에서 mysql 실행
-----------------------------
```
1) `$ docker run -e MYSQL_ROOT_PASSWORD=password123 -p 3306:3306 -v /Users/jaecheol/Documents/Develop/docker-mysql/mysql_data:/var/lib/mysql -d mysql`
        : MySQL 이미지를 바탕으로 컨테이너 실행시키기
2) `$ docker exec -it [컨테이너명 또는 컨테이너 ID] bash`     : MySQL 컨테이너로 접속
3) `$ echo $MYSQL_ROOT_PASSWORD`    : MYSQL_ROOT_PASSWORD라는 환경변수 값 출력
4) `$ export`   : 설정되어 있는 모든 환경변수 출력
5) `$ mysql -u root -p`     : root계정으로 MySQL 접속
6) `$ show databases;`      : DB조회
7) `$ create database mydb;`    : mydb 생성
8) `$ show databases;`      : DB조회

* mysql_data 디렉토리를 미리 만들어 놓으면 안 된다.
  그래야 처음 이미지를 실행시킬 때 mysql 내부에 있는 /var/lib/mysql 파일들을 호스트 컴퓨터로 공유받을 수 있다. 
  mysql_data 디렉토리를 미리 만들어놓을 경우, 기존 컨테이너의 /var/lib/mysql 파일들을 전부 삭제한 뒤에 mysql_data로 덮어씌워 버린다. 
* DB에 관련된 데이터가 저장되는 곳이 /var/lib/mysql인지는 Dockerhub MySQL의 공식 문서에 나와있다.
* 볼륨으로 설정해둔 폴더에 이미 비밀번호 정보가 저장되어서 삭제 후 다시 띄울때 비밀번호 변경해도 바뀌지 않는다.
```
