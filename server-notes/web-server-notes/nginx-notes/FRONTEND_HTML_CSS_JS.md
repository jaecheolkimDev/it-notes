Nginx Frontend(HTML, CSS, JS) 배포
=================

1\. HTML, CSS, JS 웹 프로젝트를 EC2로 가져오기  
-----------
```
    $ cd /usr/share/nginx
    $ sudo git clone https://github.com/JSCODE-COURSE/nginx-frontend-html.git
```


2\. Nginx 설정 파일 수정하기
-----------
``` 
    $ cd /etc/nginx/conf.d
    $ sudo vi default.conf
    
    `/etc/nginx/conf.d/default.conf`
        
        server {
            listen       80; 
            server_name  localhost;
        
            location / {
                root   /usr/share/nginx/nginx-frontend-html;
                index  index.html;
            }
        
            error_page   500 502 503 504  /50x.html;
            
            location = /50x.html {
                root   /usr/share/nginx/html;
            }
        }
```


3\. Nginx 설정 파일 반영하기
-----------
[설정 파일 수정 후 명령어](./명령어.md)

4\. 웹 페이지 접속해보기
-----------
```
Nginx의 설정이 잘 적용됐는 지 `http://{EC2 IP 주소}` 주소로 접속해보자.
```