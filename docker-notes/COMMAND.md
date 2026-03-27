DOCKER 명령어 공부 노트
================

0\. 명령어
-----------------------------
```
docker version  : 버전 확인
```

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
$ docker rmi [이미지 ID 또는 이미지명]

[전체 이미지 삭제]
$ docker image rm $(docker images -q)       : 컨테이너에서 사용하고 있지 않은 이미지만 전체 삭제
$ docker image rm -f $(docker images -q)    : 컨테이너에서 사용하고 있는 이미지를 포함해서 전체 이미지 삭제
    - docker images -q  : 시스템에 있는 모든 이미지의 ID를 반환한다. 여기서 -q 옵션은 quite를 의미하며, 
                          상세 정보 대신에 각 이미지의 고유한 ID만 표시하도록 지시한다. 

[이미지 빌드]
$ docker build -t hello-server .    : Dockerfile을 바탕으로 이미지 빌드하기
    - `.`       : 현재 디렉토리를 빌드 컨텍스트로 설정한다는 뜻입니다.
    - 제약       : Dockerfile 내의 COPY나 ADD 명령문은 빌드 컨텍스트(현재 폴더) 외부의 파일에 접근할 수 없습니다.
    - `t`       : (tag) 빌드된 이미지에 '이름(이름:태그)'을 붙여주는 옵션
    
[이미지 이름 변경]
$ docker tag [기존 이미지 이름] [새로운 이미지 이름]
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
    - $ docker ps -a --no-trunc     : 잘림 없이 전체 내용 확인하기
$ docker ps     : 실행중인 컨테이너 조회

[컨테이너 실행]
$ docker start 컨테이너명[또는 컨테이너 ID]    : 정지되어 있는 컨테이너를 실행시킨다.
$ docker run nginx                         : 이미지를 바탕으로 컨테이너를 생성한 뒤, 컨테이너를 실행까지 시킨다. 
    - 이미지를 내려받고(pull) + 컨테이너를 생성하고(created) + 실행(start)
    - 포그라운드에서 실행 (추가적인 명령어 조작을 할 수가 없음)
    - Ctrl + C로 종료할 수 있음
    - 로컬 환경에 다운받은 이미지가 없다면 Dockerhub으로부터 이미지를 다운(docker pull)받아서 실행시킨다.
- 주요 옵션:
    - `-d`  : 백그라운드 실행
    - `--name [컨테이너 이름] 이미지명[:태그명]`  : 컨테이너에 이름 붙여서 생성 및 실행하기
    - `-p [호스트 포트]:[컨테이너 포트] 이미지명[:태그명]`    : 호스트의 포트와 컨테이너의 포트를 연결하기{포트바인딩}
    - `-v [호스트의 디렉토리 절대경로]:[컨테이너의 디렉토리 절대경로] [이미지명]:[태그명]`  : 볼륨(Volume)을 사용하는 명령어
        - [호스트의 디렉토리 절대 경로]에 디렉토리가 이미 존재할 경우, 호스트의 디렉터리가 컨테이너의 디렉터리를 덮어씌운다.
        - [호스트의 디렉토리 절대 경로]에 디렉토리가 존재하지 않을 경우, 호스트의 디렉터리 절대 경로에 디렉터리를 새로 만들고 
          컨테이너의 디렉터리에 있는 파일들을 호스트의 디렉터리로 복사해온다.
    - `-e`  : 환경 변수를 설정하는 옵션
- 사용 예시:
    - `$ docker run -d --name my-web-server nginx`
    - `$ docker run --name webserver -d -p 80:80 nginx`
    - `$ docker run -d -p 80:80 nginx`
    - `$ docker run -e MYSQL_ROOT_PASSWORD=password123 -p 3306:3306 -d mysql`
    - `$ docker run -e MYSQL_ROOT_PASSWORD=password123 -p 3306:3306 -v {호스트의 절대경로}/mysql_data:/var/lib/mysql -d mysql`
$ docker run --rm hello-world               : Hello from Docker!

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
$ docker exec -it [컨테이너 ID 또는 컨테이너명] bash
    $ ls # 컨테이너 내부 파일 조회
    $ cd /etc/nginx 
    $ cat nginx.conf
    - 컨테이너 내부에서 나오려면 Ctrl + D 또는 exit을 입력하면 된다.
    - -it옵션을 사용해야 명령어를 입력하고 결과를 확인할 수 있다. -it옵션을 적지 않으면 명령어를 1번만 실행시키고 종료되어 버린다. 
       즉, -it 옵션을 적어야 계속해서 명령어를 입력할 수 있다.  
```


3\. compose 명령어
-----------------------------
docker-compose로 시작하는 명령어는 더 이상 업데이트를 지원하지 않는 Docker Compose의 v1 명령어이므로 되도록이면 사용하지 말자. 
v2부터는 docker compose로 시작하는 명령어를 사용한다.
```
[컨테이너 실행]
$ docker compse up      : 포그라운드에서 실행(이미지 없을때만 빌드, 재빌드는 안함)
$ docker compse up -d   : 백그라운드에서 실행(이미지 없을때만 빌드, 재빌드는 안함)
$ docker compose up --build     : 포그라운드에서 실행(컨테이너를 실행하기 전에 이미지 재빌드하기)
$ docker compose up --build -d  : 백그라운드에서 실행(컨테이너를 실행하기 전에 이미지 재빌드하기)
    * compose.yml에서 정의한 이미지 파일에서 코드가 변경 됐을 경우, 이미지를 다시 빌드해서 컨테이너를 실행시켜야 코드 변경된 부분이 적용된다. 
      그러므로 이럴 때에는 --build 옵션을 추가해서 사용해야 한다. 

[compose로 실행시킨 컨테이너 조회]
$ docker compose ps         : compose.yml에 정의된 컨테이너 중 실행 중인 컨테이너만 보여준다. 
$ docker compose ps -a      : compose.yml에 정의된 모든 컨테이너를 보여준다.

[compose 로그 조회]
$ docker compose logs       : compose.yml에 정의된 모든 컨테이너의 로그를 모아서 출력한다.

[이미지 다운받기 / 업데이트하기]
$ docker compose pull
    - `compose.yml`에서 정의된 이미지를 다운 받거나 업데이트 한다.
        - 로컬 환경에 이미지가 없다면 이미지를 다운 받는다.
        - 로컬 환경에 이미 이미지가 있는데, Dockerhub의 이미지와 다른 이미지일 경우 이미지를 업데이트 한다.

[Docker Compose에서 이용한 컨테이너 종료하기]
$ docker compose down
```