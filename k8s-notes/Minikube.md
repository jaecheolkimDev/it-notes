k8s Minikube 공부 노트
==========================================================================================================================================================================

1\. Minikube 설치 및 세팅
--------
/Users/jaecheol/Documents/minikube
```
1) Minikube 바이너리 다운로드 및 설치
    - $ curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
    - $ sudo install minikube-linux-amd64 /usr/local/bin/minikube
    
2) 클러스터 시작 (도커 드라이버 사용)
    - $ minikube start --driver=docker
    - $ minikube start --driver=docker --force      : 강제 실행( 루트 계정으로 직접 실행을 권장하지 않음 )
    
3) 상태 확인
    - $ minikube status
    - $ minikube kubectl get nodes
```

2\. 개념
--------
```
쿠버네티스라는 거대한 시스템을 공부하기 위해 내 PC에 설치하는 '쿠버네티스'입니다.
```

3\. 공간
--------
```
여기서 한 가지 더 체크해야 할 것이 있습니다. "내 도커"와 "미니쿠베의 도커"는 서로 다른 공간입니다.
일반 터미널에서 docker build를 하면 윈도우/WSL2 도커에 저장됩니다.
하지만 미니쿠베는 자기 안의 격리된 도커 엔진에서 이미지를 찾습니다.
따라서 IfNotPresent 설정을 해도 이미지를 못 찾는다면, 아래 명령어를 통해 미니쿠베 도커 환경으로 접속한 뒤 다시 빌드해야 합니다.
    # 1. 현재 터미널의 도커 대상을 미니쿠베로 전환        : eval $(minikube docker-env)
    # 2. 이 상태에서 다시 빌드 (이래야 미니쿠베가 인식함)  : docker build -t spring-server .
    # 3. 그 다음 YAML 실행                           : kubectl apply -f [파일명].yaml
```