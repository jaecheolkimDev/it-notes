VirtualBox 공부 노트
======================

1\. VirtualBox
--------------
```
1) BIOS 설정에서 가상화 기술 활성화
3) CentOS 공식 홈페이지에서 iso파일 다운로드
    /7.9.2009/isos/x86_64/CentOS-7-x86_64-DVD-2009.iso
4) VirtualBox 최신 버전 다운로드
    - VirtualBox 7.0.x 플랫폼 패키지 (Windows hosts 용): 본 프로그램입니다.
    - VirtualBox Extension Pack (확장 팩): 모든 지원 플랫폼용으로 하나만 있습니다. USB 3.0 지원이나 가상 머신 성능 최적화를 위해 
                                          반드시 함께 설치해 주세요.
5) VirtualBox 설정
    - 메모리 8GB
    - Processors 4
    - Disk 50GB
    - 디스플레이 -> 비디오 메모리: 128MB로 끝까지 밀어주세요. (화면이 덜 버벅입니다.)
    - 네트워크: '어댑터 1'이 NAT로 되어 있는지 확인하세요. (그래야 노트북 인터넷을 공유해서 패키지를 받을 수 있습니다.)
        고급 > 포트 포워딩 > 우측 상단의 [+] (새 규칙 추가) 
            이름: SSH (자유롭게 입력)
                프로토콜: TCP
                호스트 IP: 127.0.0.1 (로컬 접속용)
                호스트 포트: 2222 (보통 22번은 호스트에서 쓸 수 있으므로 2222 같은 번호를 권장합니다.)
                게스트 IP: 위 1단계에서 확인한 IP (예: 10.0.2.15)
                게스트 포트: 22 (SSH 기본 포트)
            이름: ollma (자유롭게 입력)
                프로토콜: TCP
                호스트 IP: 127.0.0.1 (로컬 접속용)
                호스트 포트: 11434 (보통 22번은 호스트에서 쓸 수 있으므로 2222 같은 번호를 권장합니다.)
                게스트 IP: 위 1단계에서 확인한 IP (예: 10.0.2.15)
                게스트 포트: 11434 (SSH 기본 포트)
    - 호스트키 변경(right ctrl -> window키)
    - 설정 > 시스템 > 가속(Acceleration) 탭     : 반가상화 인터페이스(Paravirtualization Interface)설정
                                               CentOS 7(리눅스)은 KVM 설정에서 가장 안정적입니다.
6) 리눅스 설정
    - CentOS 7은 보안과 안정성 때문에 설치 시 네트워크를 기본적으로 비활성화(Disabled) 시켜두는 경우가 아주 많습니다.
        $ nmtui
            Activate a connection을 선택합니다.
                목록에 있는 네트워크(예: enp0s3)를 선택하고 오른쪽에 ****를 누릅니다. (이미 활성화되어 있다면 <Deactivate>라고 뜹니다.)
            Edit a connection을 선택합니다.
                사용 중인 네트워크(예: enp0s3)를 선택하고 Edit을 누릅니다.
                목록 중에 [ ] Automatically connect 항목에 체크해야됨. (스페이스바로 체크 가능)
    - CentOS 7이 2024년 6월부로 공식 지원이 종료되면서, 기존의 업데이트 서버(mirrorlist)가 모두 폐쇄되었기 때문에 발생하는 현상입니다.
        # 1. 기존 저장소 설정에서 mirrorlist 주소를 주석 처리
            sudo sed -i 's/mirrorlist/#mirrorlist/g' /etc/yum.repos.d/CentOS-Base.repo
        # 2. baseurl 주소를 공식 Vault 서버로 변경
            sudo sed -i 's|#baseurl=http://mirror.centos.org|baseurl=http://vault.centos.org|g' /etc/yum.repos.d/CentOS-Base.repo
        # 3. 변경 사항 적용을 위한 캐시 삭제
            sudo yum clean all
            sudo yum makecache
7) 사전 필수 패키지 설치
    sudo yum install -y epel-release
    sudo yum install -y gcc make perl kernel-devel kernel-headers dkms
    sudo yum install -y bzip2 tar
```

2\. 게스트 확장
--------------
```
8) CentOS7 수동 마운트
    - 게스트 확장 CD 삽입... (공유 폴더 사용하기 위해)
        sudo mkdir -p /mnt/cdrom
        sudo mount /dev/sr0 /mnt/cdrom
        sudo /mnt/cdrom/VBoxLinuxAdditions.run
    - 장치 > 공유 폴더 > 공유 추가
        공유 폴더 경로 : $ cd /media/sf_vbox_shared
        폴더 경로: 내 실제 PC(윈도우)에서 공유하고 싶은 폴더 선택(다운로드 폴더)
        폴더 이름: 가상 머신 안에서 보일 이름 (예: vbox_shared - 특수문자/공백 없는 영문 추천)
        자동 마운트: 체크 (부팅 시 자동으로 연결해 줍니다.)
        항상 사용하기: 체크 (가상 머신을 껐다 켜도 유지됩니다.)
    - 공유 폴더 권한 설정   : $ sudo usermod -aG vboxsf $USER
```

3\. 파일 반입
--------------
```
게스트 확장을 통한 공유 폴더로 반입
```

4\. 포트 포워딩 설정
--------------
```
윈도우에 켜진 서버를 리눅스에서 부르고 싶다면, 가상머신의 네트워크 설정을 통해 
윈도우의 IP를 알아내어 호출해야 합니다. 
보통 VirtualBox의 NAT 네트워크 환경에서 윈도우(호스트)는 10.0.2.2라는 IP를 
가집니다.

$ curl http://10.0.2.2:8080/api/logs
```

