리눅스 부팅 시 자동 실행 설정 공부 note
======================

1\. 실행/운영 도구(서비스 관리)
-----------------------
```
service / systemd / systemctl
 - 사용 시점    : 설치된 프로그램을 켜고 끄거나 상태를 볼 때
 - service (Legacy)     : 과거 리눅스에서 사용하던 init.d 스크립트를 실행하는 방식입니다. 기능이 단순하고 서비스의 상태를 상세하게 확인하기 어렵습니다.
 - systemctl (Modern)   : 최신 리눅스(CentOS 7 이상, Ubuntu 16.04 이상 등)의 표준인 systemd를 제어하는 도구입니다. 
                          부팅 시 자동 실행 설정(enable), 서비스 간의 의존성 관리, 상세 로그 확인 등이 가능합니다.
    - 활성화 방법
        1) 설정 파일 열기 (또는 생성)   : /etc/wsl.conf 경로
        2) 내용 입력 후 저장           :
            [boot]
            systemd=true
        3) WSL 재시작
```

2\. 사례
-----------------------
```
1) 방화벽  : firewalld
    $ sudo systemctl stop firewalld
    $ sudo systemctl disable firewalld
    $ sudo systemctl status firewalld
2) 도커   : docker
    $ systemctl start docker      : 서비스가 꺼져 있다면 시작  
    $ systemctl status docker     : 서비스 상태 확인
    $ systemctl enable docker     : 부팅할 때마다 알아서 켜지도록 설정
3) NginX
    $ systemctl start nginx      : 서비스가 꺼져 있다면 시작  
    $ systemctl stop nginx        : 중지
    $ systemctl disable nginx  : 해지  
    $ systemctl enable docker     : 부팅할 때마다 알아서 켜지도록 설정
    $ systemctl status nginx     : 서비스 상태 확인
```