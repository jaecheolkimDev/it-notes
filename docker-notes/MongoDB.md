DOCKER MongoDB 공부 노트
================

1\. 사전 작업
-----------------------------
```
1) `$ cd /Users/jaecheol/Documents/Develop/docker-mongodb`     : MongoDB 데이터를 저장하고 싶은 폴더 만들기

* {호스트의 절대경로}     : /Users/jaecheol/Documents/Develop/docker-mongodb
```


1\. docker에서 MongoDB 실행
-----------------------------
```
1) `$ docker run -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=password123 -p 27017:27017 -v /Users/jaecheol/Documents/Develop/docker-mongodb/mongodb_data:/data/db -d mongo`
        : MongoDB 이미지를 바탕으로 컨테이너 실행시키기
2) `$ docker exec -it [컨테이너명 또는 컨테이너 ID] bash`     : MongoDB 컨테이너로 접속
3) `$ mongosh`      : 컨테이너에서 MongoDB에 접근하기

* mongodb_data 디렉토리를 미리 만들어 놓으면 안 된다.
  그래야 처음 이미지를 실행시킬 때 mysql 내부에 있는 /data/db 파일들을 호스트 컴퓨터로 공유받을 수 있다. 
  mongodb_data 디렉토리를 미리 만들어놓을 경우, 기존 컨테이너의 /data/db 파일들을 전부 삭제한 뒤에 mongodb_data로 덮어씌워 버린다. 
* DB에 관련된 데이터가 저장되는 곳이 /data/db인지는 Dockerhub MongoDB의 공식 문서에 나와있다.
* 볼륨으로 설정해둔 폴더에 이미 비밀번호 정보가 저장되어서 삭제 후 다시 띄울때 비밀번호 변경해도 바뀌지 않는다.
```
