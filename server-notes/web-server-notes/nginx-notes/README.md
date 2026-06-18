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
```
[설정 파일 수정 후 명령어](./Config.md)
``` 
3) 웹 페이지 접속해보기
    Nginx의 설정이 잘 적용됐는 지 [jscode.p-e.kr](http://jscode.p-e.kr) 주소와 [admin.jscode.p-e.kr](http://admin.jscode.p-e.kr) 주소로 접속해보자.
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
```
[설정 파일 수정 후 명령어](./Config.md)
``` 
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
```
[설정 파일 수정 후 명령어](./Config.md)
``` 
5) 실제로 로드 밸런싱이 되는 지 확인하기
    http://dist.localhost/health 새로고침 계속 해보면 Server ID가 계속 바뀜.
```