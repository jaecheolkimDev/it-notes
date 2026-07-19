fluent bit
======================

0\. 개념
--------------
```
Fluent Bit는 "나 혼자서도 가공하고 필터링한다" 스타일:
초경량임에도 불구하고 자체적으로 Filter와 Parser 기능이 잘 정립되어 있습니다.
정규식(Regex)이나 JSON 파서를 설정 파일에 툭 끼워 넣으면, 로그를 추출하자마자 이쁜 JSON 형태로 구조화해서 
HTTP URL로 쏴줄 수 있습니다.

[여러 경로의 로그 파일들] 
      ⬇️ (실시간 모니터링)
[Fluent Bit] ➡️ 'Exception/Error'가 포함된 행과 그 뒤 행들을 하나의 덩어리로 묶음 (Multiline)
      ⬇️ (HTTP POST 호출)
[귀하의 API 서버 (URL)] ➡️ JSON 데이터를 파싱하여 DB에 INSERT
```

1\. 진행 순서
--------------
```
1. 바이너리 파일 다운로드 (Link : https://github.com/fluent/fluent-bit/releases?q=3.2.10&expanded=true)
2. 파일 이동
3. 압축 해제 (tar -xvf fluent-bit-3.2.10.tar.gz)
    특징: 별도의 설치 과정 없이 압축만 풀면 바로 실행되는 바이너리 독립형 패키지입니다.
    장점: 리눅스 시스템 루트(root) 권한 없이 계정 권한만으로 운영이 가능하고, 다른 시스템 파일들을 건드리지 않기 때문에 폐쇄망 
         반입 시 보안 팀의 결재를 받기가 가장 수월합니다.
4. 빌드 필수 패키지 설치 (노트북)
    : sudo yum install -y gcc gcc-c++ cmake make flex bison
    : sudo yum install -y libyaml-devel
    : sudo yum install -y openssl-devel
5. fluent-bit.conf 파일 수정
6. Fluent Bit 빌드 진행
    cd fluent-bit-3.2.10/
    mkdir build
    cd build
    cmake ../
    make -j$(nproc)  # CPU 코어를 모두 써서 빠르게 빌드합니다.
7. 폐쇄망으로 가져갈 배포 패키지 만들기
    # 1. 홈 디렉토리에 배포용 임시 폴더 생성
    mkdir -p ~/fluent-bit-deploy/bin
    mkdir -p ~/fluent-bit-deploy/conf
    
    # 2. 빌드된 실행 파일과 파서/설정 파일 복사
    cp ~/fluent-bit-3.2.10/build/bin/fluent-bit ~/fluent-bit-deploy/bin/
    cp ~/fluent-bit-3.2.10/conf/parsers.conf ~/fluent-bit-deploy/conf/
    # 사용자가 직접 작성/수정한 설정 파일도 여기에 복사
    cp ~/fluent-bit-3.2.10/conf/fluent-bit.conf ~/fluent-bit-deploy/conf/
    
    # 3. 하나로 묶어서 압축파일 만들기
    cd ~/
    tar -czvf fluent-bit-custom.tar.gz fluent-bit-deploy/
8. 폐쇄망 서버에 도착한 후 실행 방법
    # 1. 압축 해제
    tar -xzvf fluent-bit-custom.tar.gz
    cd fluent-bit-deploy/
    
    # 2. (선택) 설정 파일 안의 경로들이 맞는지 최종 점검
    # vi conf/fluent-bit.conf (수집 경로 /hli_app/log/... 확인)
    
    # 3. 바로 백그라운드 실행!
    nohup ./bin/fluent-bit -c ./conf/fluent-bit.conf > ./fluent-bit.log 2>&1 &
9. 테스트용 기본 실행 (CLI 파라미터)
    # bin 폴더로 이동 후 실행 (또는 절대 경로 지정)
    ./fluent-bit -i cpu -o stdout
10. 설정 파일(fluent-bit.conf)을 지정하여 실행
    sudo ./fluent-bit -c /home/1180515/fluent-bit-3.2.10/conf/fluent-bit.conf
11. 테스트 로그 생성: 해당 폴der에 임의의 텍스트 파일을 만들고 테스트용 로그를 입력합니다.
    # 돌릴 때마다 뒤에 새로운 에러 로그가 붙으므로, 실행하는 족족 API가 호출됩니다.
    sudo bash -c 'echo "[ERROR] New test log at $(date)" >> /hli_app/log/was/DEV_PICA_HPF/nohup/test.log'
12. 폴더 권한 부여
    sudo chmod -R 755 /hli_app
```

2\. 준비물(리눅스용 바이너리)
--------------
```
```

3\. 명령어
--------------
```
```

5\. 오류
--------------
```
[jcdoom@localhost build]$ cmake ../
CMake Error at CMakeLists.txt:1 (cmake_minimum_required):
 CMake 3.12 or higher is required. You are running version 2.8.12.2


-- Configuring incomplete, errors occurred!

이 에러는 "Fluent Bit 3.2.10을 빌드하려면 CMake 프로그램 버전이 최소 3.12 이상이어야 하는데, 현재 CentOS 7.9에 설치된 버전은 2.8.12.2로 너무 낮다"라는 뜻입니다. CentOS 7의 기본 yum 저장소에 등록된 CMake가 너무 구버전이라 발생하는 전형적인 문제입니다.

폐쇄망으로 가기 전 노트북 VM(CentOS 7.9) 환경이므로, 인터넷이 연결되어 있을 때 최신 버전의 CMake를 다운받아 설치해주면 간단히 해결됩니다.

# 1. 에러 찌꺼기가 남았을 수 있으니 build 폴더 내부를 비웁니다.
rm -rf *

# 2. CentOS 7 확장 저장소(EPEL)를 설치합니다. (인터넷 연결 필요)
sudo yum install -y epel-release

# 3. CMake 3 버전을 설치합니다.
sudo yum install -y cmake3
```