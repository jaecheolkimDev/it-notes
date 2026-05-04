리눅스 CentOS 9 docker 설치 공부 note
======================


1\. 기존 패키지 정리 및 필수 도구 설치
-----------------------
먼저 충돌 방지를 위해 구버전을 삭제하고 필요한 도구를 설치합니다.
```
# 구버전 삭제 (설치되어 있지 않아도 실행 무방)
sudo dnf remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-engine

# 리포지토리 관리를 위한 도구 설치
sudo dnf install -y yum-utils
```


2\. Docker 공식 리포지토리 추가
-----------------------
CentOS용 공식 Docker 저장소를 시스템에 등록합니다.
```
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
```


3\. Docker Engine 설치
-----------------------
이제 실제 엔진과 커뮤니티 에디션(CE)을 설치합니다.
```
sudo dnf install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```
