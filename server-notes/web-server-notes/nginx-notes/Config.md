Nginx Config
=================


6\. 설정 파일
-----------
`/etc/nginx/nginx.conf`파일을 읽음
`/etc/nginx/conf.d/default.conf`    : `/etc/nginx/nginx.conf`에서 include하고 있음.
```
1. `/etc/nginx/nginx.conf` 
    - Nginx에서 가장 근본이 되는 설정 파일(루트 설정 파일)
    - 전역적으로 설정되어야 하는 내용(워커 프로세스 개수, 로그 저장 위치 등)이 포함되어 있다.

2. `/etc/nginx/conf.d/default.conf`
    - 기본 웹 서버(Web Server) 설정 파일
        # server : '하나의 웹 사이트에 관련된 설정'을 관리하는 단위 ('server 블럭'이라고 부름)
        server {
            # localhost:80으로 들어오는 요청을 이 server 블럭에서 처리하도록 설정
            # (server_name이 일치하는 server 블럭이 없는 경우 첫 번째 정의되어 있는 server 블럭을 기반으로 처리)
            # (아직은 정확히 몰라도 된다. 나중에 '멀티 도메인' 기능을 배우면 쉽게 이해할 수 있다.)
            listen       80;
            server_name  localhost;
        
            # / 으로 시작하는 모든 경로를 처리 (ex. /index.html)
            location / {
                # /jscode.html로 요청이 들어오면 /usr/share/nginx/html/jscode.html 파일로 응답
                root   /usr/share/nginx/html;
                
                # /로 요청이 들어오면 /usr/share/nginx/html/index.html로 응답
                # 만약 /usr/share/nginx/html/index.html이 없을 경우, /usr/share/nginx/html/index.htm으로 응답
                index  index.html index.htm;
            }
        
            # Nginx에서 500, 502, 503, 504의 상태 코드가 발생했을 때 /50x.html로 redirect
            error_page   500 502 503 504  /50x.html;
            
            # /50x.html과 완전히 일치하는 경로를 처리
            location = /50x.html {
                # /50x.html로 요청이 들어오면 /usr/share/nginx/html/50x.html 파일로 응답
                root   /usr/share/nginx/html;
            }
        }
```
[설정 파일 수정 후 명령어](./명령어.md)


11\. 설정 파일 분리해서 관리하기 (include)
-----------
```
1) server블록별로 conf파일을 하나씩 만든다.
2) nginx.conf에서 `include /etc/nginx/conf.d/*.conf`하고 있음
3) 변경된 Nginx 설정 파일 반영하기
```
[설정 파일 수정 후 명령어](./명령어.md)
```
4) 잘 작동하는지 확인

* /etc/nginx/conf.d/안의 파일들에서는 include하면 안됨.(자기 자신을 다시 include하면서 무한 호출에 빠짐)
```
