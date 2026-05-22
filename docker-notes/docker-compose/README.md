Docker Compose 공부 노트
================


1\. Docker Compose
-----------------------------
```
여러 개의 Docker 컨테이너들을 하나의 서비스로 정의하고 구성해 하나의 묶음으로 관리할 수 있게 도와주는 툴이다.   
```

2\. Docker Compose를 사용하는 이유
-----------------------------
```
1. 여러 개의 컨테이너를 관리하는 데 용이
    여러 개의 컨테이너로 이루어진 복잡한 애플리케이션을 한 번에 관리할 수 있게 해준다. 
    여러 컨테이너를 하나의 환경에서 실행하고 관리하는 데 도움이 된다. 
2. 복잡한 명령어로 실행시키던 걸 간소화 시킬 수 있음
    이전에 MySQL 이미지를 컨테이너로 실행시킬 때 아래와 같은 명령어를 실행시켰다. 
        $ docker run -e MYSQL_ROOT_PASSWORD=password123 -p 3306:3306 -v /Users/jaeseong/Documents/Develop/docker-mysql/mysql_data:/var/lib/mysql -d mysql
    너무 복잡하지 않은가? Docker Compose를 사용하면 위와 같이 컨테이너를 실행시킬 때마다 복잡한 명령어를 입력하지 않아도 된다. 
    단순히 `$ docker compose up` 명령어만 실행시키면 된다.
```

3\. compose.yml
-----------------------------
Docker CLI와 Docker Compose 비교
```
1) Docker CLI로 컨테이너를 실행시킬 때
        $ docker run --name webserver -d -p 80:80 nginx
    
2) compose.yml
        services:
            my-web-server:
                container_name: webserver
                image: nginx
                ports: 
                    - 80:80
                    
- `services: my-web-server`     : Docekr Compose에서 하나의 컨테이너를 서비스(service)라고 부른다. 이 옵션은 서비스에 이름을 붙이는 기능이다.
- `container_name: web-server`  : 컨테이너를 띄울 때 붙이는 별칭이다. CLI에서 `--name web-server` 역할과 동일하다.
- `image: nginx`                : 컨테이너를 실행시킬 때 어떤 이미지를 사용할 지 정의하는 명령어이다. 
                                  `$ docker run [이미지명]`와 동일한 역할이다.
- `ports`                       : 포트 매핑은 어떻게 할 지를 설정하는 옵션이다. CLI에서`-p 80:80` 역할과 동일하다.
```

4\. compose NginX 확인 명령어
-----------------------------
```
$ docker compose up -d      : compose 파일 실행시키기(=> 실행 후 `http://localhost:80` 들어가보기)
$ docker compose -f compose1.yml up -d
$ docker compose ps         : compose 실행 현황 보기
$ docker ps                 : 일반 실행 현황에도 같이 나옴
$ docker compose down       : compose로 실행된 컨테이너 삭제
$ docker compose -f compose1.yml down

- 주요 옵션:
    - `-d`: 백그라운드 실행
    - `-f`: 파일을 지정하는 옵션
```

5\. Docker CLI ↔ Docker Compose 쉽게 작성하기
-----------------------------
Docker CLI로 작성할 수 있는 명령어는 전부 compose.yml 파일로 옮길 수 있다. 
반대로 compose.yml에 작성한 모든 값은 Docker CLI로 나타낼 수 있다. 이를 편하게 변환해주는 사이트가 존재한다.
```
Docker CLI → compose.yml로 변환    : https://www.composerize.com/
compose.yml → Docker CLI로 변환    : https://www.decomposerize.com/
```

6\. 
-----------------------------
```
```

7\. 
-----------------------------
```
```


999\. 
-----------------------------
```
```
