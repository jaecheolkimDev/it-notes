Nginx
=================

9\. Nginx, Certbot을 활용해 HTTPS 적용시키기
-----------
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
-----------
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