k8s kubectl 공부 노트
==========================================================================================================================================================================


1\. kubectl 설치
--------
```
# 1. kubectl 바이너리 다운로드 (최신 버전)
    curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"

# 2. 실행 권한 부여 및 설치
    sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl

# 3. 설치 확인 (버전 정보가 나오면 성공!)
    - $ kubectl version --client
    - $ kubectl version
```