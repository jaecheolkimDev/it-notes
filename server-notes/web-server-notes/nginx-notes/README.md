Nginx 공부 노트
=====================

1\. 기능  
--------------------------------------
```
- 정적 컨텐츠 제공
- SSL 처리
- 로드 밸런싱
- 장애 대응
- 캐싱
- 보안 처리 (IP 차단, 요청 수 제한)
```


2\. Apache vs Nginx
--------------------------------------
``` 
Nginx가 등장하기 전에는 대부분의 회사에서 Apache를 많이 사용했다. 
그러나 근래에는 Nginx(25년 1월 기준 점유율 1위)의 사용량이 Apache(25년 1월 기준 점유율 2위)를 뛰어넘었다. 

Nginx를 더 많이 사용하는 가장 큰 이유는 Apache에 비해 훨씬 많은 트래픽을 처리할 수 있는 구조를 가지고 있었기 때문이다. 
즉, Nginx가 Apache보다 훨씬 성능이 좋았던 것이다. 이런 이유 때문에 최근 기업에서는 Apache보다 Nginx를 선호하게 되었다.
```

3\. 설치
--------------------------------------
```
1) 시스템 업데이트
    $ sudo yum update
2) Nginx 설치
    $ sudo yum install nginx
```

4\. 실행
--------------------------------------
[systemctl 명령어 참고](../../../linux-notes/setting/systemctl.md)

5\. 로그
--------------------------------------
```
위치         : /var/log/nginx/
access.log  : Nginx 서버로 접근한 요청에 대한 정보가 기록으로 남아있다
error.log   : 에러 메시지에 대한 내용이 담겨있다
```

6\. 설정 파일
--------------------------------------
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

3. Nginx 설정 파일 중 문법 에러가 있는 지 체크
    $ sudo nginx -t 

4. Nginx의 설정 파일이 바뀐 경우 아래 명령어를 입력해줘야 설정 파일이 반영된다.
    $ sudo nginx -s reload
```


7\. Nginx 에러 디버깅 방법
--------------------------------------
```
1. Nginx가 정상적으로 실행되고 있는 지 체크
    $ sudo systemctl status nginx
    
2. 문법 에러 체크하기
    $ sudo nginx -t
    
3. 로그 파일 실시간으로 확인하기
    # 제대로 요청이 들어오고 있는 지 확인
        $ sudo tail -f /var/log/nginx/access.log
    
    # 에러 메시지 확인
        $ sudo tail -f /var/log/nginx/error.log
```


8\. 하나의 EC2에서 여러 웹 사이트 배포하기
--------------------------------------
```
1) Nginx 설정 파일 작성하기
    $ sudo vi default.conf
        `/etc/nginx/conf.d/default.conf`
            server {
                    listen 80;
                    server_name jscode.p-e.kr;
            
                    location / {
                            root /usr/share/nginx/nginx-frontend-react/dist;
                            index index.html;
                    }
            }
            server {
                    listen 80;
                    server_name admin.jscode.p-e.kr;
            
                    location / {
                            root /usr/share/nginx/nginx-frontend-next/out;
                            index index.html;
                    }
            }
    
2) Nginx 설정 파일 반영하기    
    # Nginx 설정 파일 중 문법 에러가 있는 지 체크
        $ sudo nginx -t
    # Nginx의 설정 파일이 바뀐 경우 아래 명령어를 입력해줘야 설정 파일이 반영된다.
        $ sudo nginx -s reload
    
3) 웹 페이지 접속해보기
    Nginx의 설정이 잘 적용됐는 지 [jscode.p-e.kr](http://jscode.p-e.kr) 주소와 [admin.jscode.p-e.kr](http://admin.jscode.p-e.kr) 주소로 접속해보자.
```


9\. Nginx, Certbot을 활용해 HTTPS 적용시키기
--------------------------------------
* Certbot   : 무료 SSL/TLS 인증서를 자동화하여 발급, 갱신 및 설치해주는 오픈소스 도구입니다.
```
1) EPEL 저장소 및 Snapd 설치
    CentOS9에는 기본적으로 snap이 설치되어 있지 않으니 EPEL(Extra Packages for Enterprise Linux) 저장소를 활성화해야 합니다.
        # EPEL 저장소 설치
            $ sudo yum install epel-release -y
        # snapd 설치
            $ sudo yum install snapd -y
        # snap 통신을 위한 소켓 활성화
            $ sudo systemctl enable --now snapd.socket
        # 클래식 스냅 지원을 위한 심볼릭 링크 생성
            $ sudo ln -s /var/lib/snapd/snap /snap
    위 과정을 마친 후, 설정이 시스템에 반영되도록 터미널을 껐다 켜거나 재접속해 주세요.

2) Certbot 설치
    # 최신 버전의 Certbot 설치
        $ sudo snap install --classic certbot
    # 어디서든 실행 가능하게 링크 연결
        $ sudo ln -s /snap/bin/certbot /usr/bin/certbot
                
* WSL환경에서는 HTTPS 테스트는 불가능.(여기까지만)

3) HTTPS 인증서 발급받기
    $ sudo certbot --nginx -d <도메인 주소>
        # 예시
            $ sudo certbot --nginx -d jscode.p-e.kr
            $ sudo certbot --nginx -d admin.jscode.p-e.kr
            
4) HTTPS 잘 적용됐는 지 확인하기
```


10\. Nginx, Certbot이 작성한 HTTPS 관련 코드 해석하기
--------------------------------------
http요청은 80번 포트로 들어오면서 https인 403번 포트로 리다이렉트된다.
https요청은 443번 포트로 들어온다.

```
/etc/nginx/conf.d/default.conf
    # server 블록에서는 일반적으로 listen, server_name을 가장 먼저 처리한다.
    server {
                    # jscode.p-e.kr 주소로 들어온 요청이면서
                # 443번 포트(https)로 들어오는 요청일 때 
                # 이 server 블럭에서 처리하도록 설정
            server_name jscode.p-e.kr;
    
            location / {
                    root /usr/share/nginx/nginx-frontend-react/dist;
                    index index.html;
            }
    
        listen 443 ssl; # managed by Certbot
        
        # (HTTPS 처리 과정에 필요한 로직 -> 자세히는 몰라도 됨)
        ssl_certificate /etc/letsencrypt/live/jscode.p-e.kr/fullchain.pem; # managed by Certbot
        ssl_certificate_key /etc/letsencrypt/live/jscode.p-e.kr/privkey.pem; # managed by Certbot
        include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
        ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
    }
    server {
            # 2. 들어온 요청의 주소의 Host가 jscode.p-e.kr일 경우 (ex. http://jscode.p-e.kr/about)
            #    https://jscode.p-e.kr/...(ex. https://jscode.p-e.kr/about)로 리다이렉트(301) 처리
        if ($host = jscode.p-e.kr) {
            return 301 https://$host$request_uri;
        } # managed by Certbot
    
        # 1. jscode.p-e.kr 주소로 들어온 요청이면서
        #    80번 포트(http)로 들어오는 요청일 때
        #    이 server 블럭에서 처리하도록 설정
            listen 80;
            server_name jscode.p-e.kr;
            
        # 3. 그 이외의 경우에는 404(Not Found)로 응답
        return 404; # managed by Certbot
    }
```


11\. 설정 파일 분리해서 관리하기 (include)
--------------------------------------
```
1) server블록별로 conf파일을 하나씩 만든다.
2) nginx.conf에서 `include /etc/nginx/conf.d/*.conf`하고 있음
3) 변경된 Nginx 설정 파일 반영하기
    # Nginx 설정 파일 중 문법 에러가 있는 지 체크
        $ sudo nginx -t
    # Nginx의 설정 파일이 바뀐 경우 아래 명령어를 입력해줘야 설정 파일이 반영된다.
        $ sudo nginx -s reload
4) 잘 작동하는지 확인

* /etc/nginx/conf.d/안의 파일들에서는 include하면 안됨.(자기 자신을 다시 include하면서 무한 호출에 빠짐)
```


12\. 프록시(Proxy)란?
--------------------------------------
프록시(Proxy)란 ‘중계(중간에서 연결해주는 것)’의 의미를 가진다.
프록시 서버(Proxy Server)    : 중간 역할을 해주는 서버
```
1) 포워드 프록시(Forward Proxy)란?
 - 보내려고 하는 요청을 관리 또는 보안 처리를 위한 용도로 사용하는 서버.
    ex) 회사 방화벽
    
2) 리버스 프록시(Reverse Proxy)란? 
 - 들어오는 요청을 관리 또는 보안 처리를 하기 위한 용도로 사용하는 서버.(과부하 예방)
    ex) HTTPS 처리, 요청 수 제한 및 차단, 로드 밸런싱을 하는 용도로 사용하는 Nginx
```


13\. IP당 요청 수 제한하기
--------------------------------------
```
1) Nginx 설정 파일 수정
/etc/nginx/conf.d/back.conf
    # limit_req_zone : 요청 수를 제한하기 위한 메모리 공간(zone)과 요청 속도(rate)를 정의
    # $binary_remote_addr : 요청 수를 제한하는 기준을 클라이언트의 IP로 설정
    # zone=mylimit:10m : 메모리 공간(zone)의 이름을 mylimit이라고 지정, 
                         메모리 공간의 크기를 10MB 제한 (약 16만개의 IP 주소를 관리할 수 있음)
    # rate=3r/s : 1초에 최대 3개의 요청만 허용
    limit_req_zone $binary_remote_addr zone=mylimit:10m rate=3r/s;
    
    server {
                    # limit_req_zone에서 정의한 mylimit이라는 조건을 이 server 블럭에 적용
            limit_req zone=mylimit;
            # 요청이 제한됐을 때 429(Too Many Requests) 상태 코드를 반환
            limit_req_status 429;
            server_name api.jscode.p-e.kr;
    
            location / {
                    proxy_pass http://localhost:8080;
            }
    
        listen 443 ssl; # managed by Certbot
        ssl_certificate /etc/letsencrypt/live/api.jscode.p-e.kr/fullchain.pem # managed by Certbot
        ssl_certificate_key /etc/letsencrypt/live/api.jscode.p-e.kr/privkey.pm; # managed by Certbot
        include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
        ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
    
    }
    server {
        if ($host = api.jscode.p-e.kr) {
            return 301 https://$host$request_uri;
        } # managed by Certbot
        
            listen 80;
            server_name api.jscode.p-e.kr;
        return 404; # managed by Certbot
    
    }
    
2) Nginx 설정 파일 반영하기    
    # Nginx 설정 파일 중 문법 에러가 있는 지 체크
        $ sudo nginx -t
    # Nginx의 설정 파일이 바뀐 경우 아래 명령어를 입력해줘야 설정 파일이 반영된다.
        $ sudo nginx -s reload
    
3) 요청 수 제한이 적용됐는 지 확인해보기
 - 요청 수 제한을 적용시킨 주소로 새로고침을 통해 여러번 요청을 보내보면, 아래와 같이 429(Too Many Requests) 응답을 받게 된다. 
```


14\. 하나의 EC2에서 백엔드 서버 2개를 로드 밸런싱 시키기
--------------------------------------
```
1) 백엔드 서버(Spring Boot) 2개 띄우기
    $ cd /usr/share/nginx/nginx-backend-springboot/build/libs
    $ nohup java -jar nginx-backend-springboot-0.0.1-SNAPSHOT.jar --server.port=8081 &
    
2) 8080번 포트, 8081번 포트에 Spring Boot 서버가 잘 띄워졌는 지 확인하기
    $ lsof -i:8080
    $ lsof -i:8081
    
3) 3. Nginx 설정 변경하기
/etc/nginx/conf.d/back.conf
    limit_req_zone $binary_remote_addr zone=mylimit:10m rate=3r/s;
    
    # 로드 밸런싱 대상 서버들을 upstream이라는 그룹으로 묶음
    # upstream 그룹의 이름은 backend라고 지정
    upstream backend {
            server localhost:8080;
            server localhost:8081;
    }
    
    server {
            limit_req zone=mylimit;
            limit_req_status 429;
            server_name api.jscode.p-e.kr;
    
    				# upstream 그룹에서 지정한 서버들로 요청이 분산됨
            location / {
                    proxy_pass http://backend;
            }
    
        listen 443 ssl; # managed by Certbot
        ssl_certificate /etc/letsencrypt/live/api.jscode.p-e.kr/fullchain.pem; # managed by Certbot
        ssl_certificate_key /etc/letsencrypt/live/api.jscode.p-e.kr/privkey.pem; # managed by Certbot
        include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
        ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
    
    }
    server {
        if ($host = api.jscode.p-e.kr) {
            return 301 https://$host$request_uri;
        } # managed by Certbot
    
            listen 80;
            server_name api.jscode.p-e.kr;
        return 404; # managed by Certbot
    
    }
    
4) Nginx 설정 파일 반영하기    
    # Nginx 설정 파일 중 문법 에러가 있는 지 체크
        $ sudo nginx -t
    # Nginx의 설정 파일이 바뀐 경우 아래 명령어를 입력해줘야 설정 파일이 반영된다.
        $ sudo nginx -s reload
    
5) 실제로 로드 밸런싱이 되는 지 확인하기
    http://dist.localhost/health 새로고침 계속 해보면 Server ID가 계속 바뀜.
```