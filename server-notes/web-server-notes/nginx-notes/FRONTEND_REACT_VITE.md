Nginx Frontend(React, Vite) 배포 공부 노트
=====================

1\. React 프로젝트를 EC2로 가져오기
--------------------------------------
```
    $ cd /usr/share/nginx
    $ sudo git clone https://github.com/JSCODE-COURSE/nginx-frontend-react.git
```


2\. React 프로젝트 빌드를 위해 Node.js 설치하기
--------------------------------------
``` 
1) NodeSource에서 Node.js 20.x 설정 스크립트 실행
    $ curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -

2) Node.js 재설치
    $ sudo dnf install -y nodejs

3) Node.js가 잘 설치됐는 지 확인하기
    $ node -v
```


3\. React 프로젝트 빌드하기
--------------------------------------
```
    $ cd nginx-frontend-react
    $ sudo npm i
    $ sudo npm run build
```

4\. Nginx 설정 파일 수정하기
--------------------------------------
```
    `/etc/nginx/conf.d/default.conf`
        
        server {
            listen       80; 
            server_name  localhost;
        
            location / {
                root   /usr/share/nginx/nginx-frontend-react/dist;
                index  index.html;
            }
        
            error_page   500 502 503 504  /50x.html;
            
            location = /50x.html {
                root   /usr/share/nginx/html;
            }
        }
```


5\. Nginx 설정 파일 반영하기
--------------------------------------
```
    # Nginx 설정 파일 중 문법 에러가 있는 지 체크
        $ sudo nginx -t
    
    # Nginx의 설정 파일이 바뀐 경우 아래 명령어를 입력해줘야 설정 파일이 반영된다.
        $ sudo nginx -s reload
```


6\. 웹 페이지 접속해보기
--------------------------------------
```
    Nginx의 설정이 잘 적용됐는 지 `http://{EC2 IP 주소}` 주소로 접속해보자.
```