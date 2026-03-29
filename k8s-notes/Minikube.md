k8s Minikube 공부 노트
==========================================================================================================================================================================

1\. Minikube 설치 및 세팅
--------
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
