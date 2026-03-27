DOCKER PostgreSQL 공부 노트
================

1\. 사전 작업
-----------------------------
```
1) `$ cd /Users/jaecheol/Documents/Develop/docker-postgresql`     : PostgreSQL 데이터를 저장하고 싶은 폴더 만들기

* {호스트의 절대경로}     : /Users/jaecheol/Documents/Develop/docker-postgresql
```


1\. docker에서 PostgreSQL 실행
-----------------------------
```
1) `$ docker run -e POSTGRES_PASSWORD=password123 -p 5432:5432 -v /Users/jaecheol/Documents/Develop/docker-postgresql/postgresql_data:/var/lib/postgresql -d postgres`
        : PostgreSQL 이미지를 바탕으로 컨테이너 실행시키기
2) `$ docker exec -it [컨테이너명 또는 컨테이너 ID] bash`     : PostgreSQL 컨테이너로 접속

* postgresql_data 디렉토리를 미리 만들어 놓으면 안 된다.
  그래야 처음 이미지를 실행시킬 때 mysql 내부에 있는 /var/lib/postgresql 파일들을 호스트 컴퓨터로 공유받을 수 있다. 
  postgresql_data 디렉토리를 미리 만들어놓을 경우, 기존 컨테이너의 /var/lib/postgresql 파일들을 전부 삭제한 뒤에 postgresql_data로 덮어씌워 버린다. 
* DB에 관련된 데이터가 저장되는 곳이 /var/lib/postgresql인지는 Dockerhub PostgreSQL의 공식 문서에 나와있다.
* 볼륨으로 설정해둔 폴더에 이미 비밀번호 정보가 저장되어서 삭제 후 다시 띄울때 비밀번호 변경해도 바뀌지 않는다.
```
