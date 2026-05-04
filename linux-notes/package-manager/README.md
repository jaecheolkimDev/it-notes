리눅스 Package Manager 공부 note
======================

1\. 패키지 매니저(Package Manager)
-----------------------
패키지를 설치하고 삭제하는 '엔진' 역할
```
1) 패키지 매니저(Package Manager)란?
    갤럭시(Android)에서 앱을 받을 때는 Play Store를 활용하고, 아이폰(iOS)에서 앱을 받을 때는 App Store를 활용할 것이다. 
    
    이런 것처럼 개발 환경에서는 프로그램(소프트웨어, 라이브러리 등)을 설치할 때 패키지 매니저를 사용한다.
    패키지 매니저는 운영체제 또는 개발 환경에 따라 그에 맞는 패키지 매니저를 사용해야 한다.
    
    - node 환경 → `npm`, `yarn`
    - spring 환경 → `gradle`, `maven`
    - python 환경 → `pip`
    - 리눅스 환경 → `apt`, `yum`, `dnf` 등
        - Ubuntu에서 `apt`를 사용한다.
        - CentOS에서 `yum` 또는 `dnf`를 사용한다.
            - CentOS9부터 `dnf`를 사용한다. [고질적인 문제를 해결하고 성능을 개선한 "다음 세대(Dandified YUM)" 버전]
        
         운영체제 또는 개발 환경에 따라 다른 패키지 매니저를 사용한다. 
        
    사실 패키지 매니저는 프로그램을 설치할 때 뿐만 아니라, 업데이트 및 제거를 할 때도 사용한다.
    따라서 패키지 매니저는 프로그램을 설치, 업데이트, 제거를 쉽게 관리해주는 도구라고 할 수 있다.


2) 명령어
    $ sudo dnf install [패키지명]                   : 패키지 설치
    $ sudo dnf update                               : 패키지 목록 최신화(수동 동기화: 실시간 동기화를 제공해주지 않음)
    $ sudo dnf list --installed                     : 현재 컴퓨터에 설치된 모든 패키지 목록을 출력 
    $ sudo dnf list --installed | grep [패키지명]   : 설치된 특정 패키지 확인
    $ sudo apt purge --auto-remove [패키지명]       : 설치된 패키지에 관련된 모든 파일을 깔끔하게 삭제
     - apt remove 명령어는 설정 파일이 남겨지고 삭제되기 때문에 apt purge 명령어를 주로 사용한다.
    $ sudo dnf remove [패키지명]                    : dnf에서는 apt처럼 purge와 remove차이가 없어서 하나로 사용함.
    $ sudo dnf list java*jdk-devel                  : 설치 가능한 JDK 목록 확인
     - *을 통해 LIKE 검색이 가능하다.
    
    sudo를 안쓸때 오류나는 경로의 파일 권한을 확인해보면 root 이외의 사용자에게는 아무런 권한도 없는 경우가 많다.
```


2\. 패키지 관리 보조(필수 확장 팩)
-----------------------
```
yum-utils   : 표준 관리 도구 모음 패키지
 - 사용 시점              : 프로그램을 처음 설치하거나 업데이트할 때
 - yum-config-manager   : 새로운 앱스토어(저장소) 주소를 시스템에 등록
 - debuginfo-install    : 프로그램 오류 분석 시 필요한 디버깅 정보를 설치해 줌
 - repoquery            : 설치하지 않은 패키지에 어떤 파일들이 들어있는지 목록을 보여줌
 - reposync             : 원격 저장소의 모든 패키지를 내 로컬 서버로 동기화함 (폐쇄망 환경 구축 시 필수)
```


3\. 실행/운영 도구(서비스 관리)
-----------------------
```
service / systemd / systemctl
 - 사용 시점    : 설치된 프로그램을 켜고 끄거나 상태를 볼 때
 - service (Legacy)     : 과거 리눅스에서 사용하던 init.d 스크립트를 실행하는 방식입니다. 기능이 단순하고 서비스의 상태를 상세하게 확인하기 어렵습니다.
 - systemctl (Modern)   : 최신 리눅스(CentOS 7 이상, Ubuntu 16.04 이상 등)의 표준인 systemd를 제어하는 도구입니다. 
                          부팅 시 자동 실행 설정(enable), 서비스 간의 의존성 관리, 상세 로그 확인 등이 가능합니다.
    - 1) 사용 확인법    : $ systemctl 명령어 입력
        - $ systemctl start docker
        - $ systemctl status docker
        - $ systemctl enable docker     # 부팅할 때마다 도커가 알아서 켜지도록 설정
    - 2) 활성화 방법
        2-1) 설정 파일 열기 (또는 생성)   : /etc/wsl.conf 경로
        2-2) 내용 입력 후 저장           :
            [boot]
            systemd=true
        2-3) WSL 재시작
```