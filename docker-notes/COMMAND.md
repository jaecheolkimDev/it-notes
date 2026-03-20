DOCKER 명령어 공부 노트
================

1\. 이미지 명령어
-----------------------------
```
[이미지 다운로드]
$ docker pull 이미지명[:태그명]
    $ docker pull nginx             : NginX 이미지 다운로드(최신 버전)
    $ docker pull nginx:latest      : NginX 이미지 다운로드(최신 버전)
    $ docker pull nginx:stable-perl : 특정 버전 이미지 다운로드
 - Dockerhub으로부터 새롭게 갱신된 이미지를 다운 받고 싶다면 docker pull 명령어를 활용해야 한다. 

[이미지 조회]
$ docker image ls       : 다운로드 된 이미지 조회하기
    - `REPOSITORY` : 이미지 이름(이미지명)
    - `TAG` : 이미지 태그명
    - `IMAGE ID` : 이미지 ID
    - `CREATED` : 이미지가 생성된 날짜 (다운받은 날짜 X)
    - `SIZE` : 이미지 크기

[이미지 삭제]
$ docker image rm [이미지 ID 또는 이미지명]       : 다운로드 된 이미지 삭제하기
    - 컨테이너에서 사용하고 있지 않은 이미지만 삭제가 가능하다.
    - $ docker image rm nginx   : Nginx 이미지 삭제
$ docker image rm -f [이미지 ID 또는 이미지명]    : 중지된 컨테이너에서 사용하고 있는 이미지 강제 삭제하기
    - 실행 중인 컨테이너에서 사용하고 있는 이미지는 강제로 삭제할 수 없다. 

[전체 이미지 삭제]
$ docker image rm $(docker images -q)       : 컨테이너에서 사용하고 있지 않은 이미지만 전체 삭제
$ docker image rm -f $(docker images -q)    : 컨테이너에서 사용하고 있는 이미지를 포함해서 전체 이미지 삭제
    - docker images -q  : 시스템에 있는 모든 이미지의 ID를 반환한다. 여기서 -q 옵션은 quite를 의미하며, 
                          상세 정보 대신에 각 이미지의 고유한 ID만 표시하도록 지시한다. 
```


2\. 컨테이너 명령어
-----------------------------
```
[컨테이너 생성]
# docker create 이미지명[:태그명]ㅇ
$ docker create nginx
    - 로컬 환경에 다운받은 이미지가 없다면 Dockerhub으로부터 이미지를 다운(docker pull)받아서 컨테이너를 생성한다.

[컨테이너 조회]
$ docker ps -a  : 모든 컨테이너 조회(작동 중인 컨테이너 + 작동을 멈춘 컨테이너)
$ docker ps     : 실행중인 컨테이너 조회

[컨테이너 실행]
$ docker start 컨테이너명[또는 컨테이너 ID]    : 정지되어 있는 컨테이너를 실행시킨다.
$ docker run nginx                         : 이미지를 바탕으로 컨테이너를 생성한 뒤, 컨테이너를 실행까지 시킨다. 
    - 포그라운드에서 실행 (추가적인 명령어 조작을 할 수가 없음)
    - Ctrl + C로 종료할 수 있음
    - 로컬 환경에 다운받은 이미지가 없다면 Dockerhub으로부터 이미지를 다운(docker pull)받아서 실행시킨다.
$ docker run -d nginx                      : 컨테이너를 백그라운드에서 실행시키기
$ docker run -d --name [컨테이너 이름] 이미지명[:태그명]     : 컨테이너에 이름 붙여서 생성 및 실행하기
    - $ docker run -d --name my-web-server nginx
    - $ docker run --name webserver -d -p 80:80 nginx     : 이미지를 컨테이너에 올려 Nginx 서버 실행시키기
$ docker run -d -p [호스트 포트]:[컨테이너 포트] 이미지명[:태그명]    : 호스트의 포트와 컨테이너의 포트를 연결하기
    - $ docker run -d -p 4000:80 nginx
$ docker run -v [호스트의 디렉토리 절대경로]:[컨테이너의 디렉토리 절대경로] [이미지명]:[태그명] : 볼륨(Volume)을 사용하는 명령어
    - [호스트의 디렉토리 절대 경로]에 디렉토리가 이미 존재할 경우, 호스트의 디렉터리가 컨테이너의 디렉터리를 덮어씌운다.
    - [호스트의 디렉토리 절대 경로]에 디렉토리가 존재하지 않을 경우, 호스트의 디렉터리 절대 경로에 디렉터리를 새로 만들고 
      컨테이너의 디렉터리에 있는 파일들을 호스트의 디렉터리로 복사해온다.

[컨테이너 중단]
$ docker stop 컨테이너명[또는 컨테이너 ID]     : 정상 종료
    - $ docker stop webserver : 특정 컨테이너 정지
$ docker kill 컨테이너명[또는 컨테이너 ID]     : 강제 종료

[컨테이너 삭제]
$ docker rm 컨테이너명[또는 컨테이너 ID]       : 중지되어 있는 특정 컨테이너 삭제
$ docker rm -f 컨테이너명[또는 컨테이너 ID]    : 실행되고 있는 특정 컨테이너 삭제

[전체 컨테이너 삭제]
$ docker rm $(docker ps -qa)        : 중지되어 있는 모든 컨테이너 삭제
$ docker rm -f $(docker ps -qa)     : 실행되고 있는 모든 컨테이너 삭제

[컨테이너 로그 조회]
$ docker logs [nginx가 실행되고 있는 컨테이너 ID]              : 특정 컨테이너의 모든 로그 조회
# dokcer logs --tail [로그 끝부터 표시할 줄 수] [컨테이너 ID 또는 컨테이너명]
    - $ dokcer logs --tail 10 [컨테이너 ID 또는 컨테이너명]    : 최근 로그 10줄만 조회
# docker logs -f [컨테이너 ID 또는 컨테이너명]                 : 기존 로그 조회 + 생성되는 로그를 실시간으로 보고 싶은 경우
$ docker logs --tail 0 -f [컨테이너 ID 또는 컨테이너명]        : 기존 로그는 조회하지 않기 + 생성되는 로그를 실시간으로 보고 싶은 경우

[실행 중인 컨테이너 내부에 접속하기]
$ docker exec -it [Nginx가 실행되고 있는 컨테이너 ID] bash
    $ ls # 컨테이너 내부 파일 조회
    $ cd /etc/nginx 
    $ cat nginx.conf
    - 컨테이너 내부에서 나오려면 Ctrl + D 또는 exit을 입력하면 된다.
    - -it옵션을 사용해야 명령어를 입력하고 결과를 확인할 수 있다. -it옵션을 적지 않으면 명령어를 1번만 실행시키고 종료되어 버린다. 
       즉, -it 옵션을 적어야 계속해서 명령어를 입력할 수 있다.  
```