Nginx Frontend(Next.js) 배포 공부 노트
=====================

1\. Next.js 프로젝트를 EC2로 가져오기
--------------------------------------
```
    $ cd /usr/share/nginx
    $ sudo git clone https://github.com/JSCODE-COURSE/nginx-frontend-next.git
```


2\. Next.js 프로젝트 빌드를 위해 Node.js 설치하기
--------------------------------------

3\. Next.js 프로젝트 빌드하기
--------------------------------------
```
    $ cd nginx-frontend-next
    $ sudo npm i
    $ sudo npm run build
    
    - 주의) 빌드한 결과물이 정상적으로 생성되려면 반드시 아래와 같이 설정해야 한다.
        
        next.config.mjs
        
        / @type {import('next').NextConfig} */
        const nextConfig = {
          output: 'export'
        };
        
        export default nextConfig;
```

4\. Nginx 설정 파일 수정하기
--------------------------------------
```
    $ cd /etc/nginx/conf.d
    $ sudo vi default.conf
    
    `/etc/nginx/conf.d/default.conf`
        
        server {
            listen       80; 
            server_name  localhost;
        
            location / {
                root   /usr/share/nginx/nginx-frontend-next/out;
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