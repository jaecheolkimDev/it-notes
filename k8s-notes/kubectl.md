k8s kubectl 공부 노트
==========================================================================================================================================================================


1\. kubectl 설치
--------
/Users/jaecheol/Documents/minikube
```
# 1. kubectl 바이너리 다운로드 (최신 버전)
    curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"

# 2. 실행 권한 부여 및 설치
    sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl

# 3. 설치 확인 (버전 정보가 나오면 성공!)
    - $ kubectl version --client
    - $ kubectl version
```

2\. 개념
--------
```
쿠버네티스 전용 '표준 명령 도구'입니다.
```

3\. 명령어
--------
```
조회하기: 현재 뭐가 돌아가고 있는지 확인
    kubectl get nodes    # 서버(노드) 상태 확인
    kubectl get pods     # 실행 중인 컨테이너(포드) 확인
        - `NAME`    : Pod의 이름
        - `READY`   : (파드 내 준비 완료된 컨테이너 수)/(파드 내 총 컨테이너 수)
        - `STATUS`  : 파드의 상태 (`Running` : 정상적으로 실행 중)
                                ImagePullBackOff
                                ErrImagePull
        - `RESTARTS`: 해당 파드의 컨테이너가 재시작된 횟수
        - `AGE`     : 파드가 생성되어 실행된 시간

실행하기: 새로운 컨테이너 띄우기
    kubectl run my-test --image=nginx  # nginx라는 이름의 테스트 컨테이너 띄우기

상세보기: 문제가 생겼을 때 원인 파악
    kubectl describe pod [포드이름]  # 왜 안 켜지는지 상세 로그 확인
    
파드(Pod) 생성하기
    $ kubectl apply -f nginx-pod.yaml   : yaml 파일에 적혀져있는 리소스(파드)를 생성

내부 환경 접속하기
    $ kubectl exec -it nginx-pod -- bash    : nginx-pod 내부 환경으로 접속
    
포트 포워딩(= 포트 연결시키기)
    $ kubectl port-forward pod/nginx-pod 80:80
    
파드(Pod) 삭제하기
    # kubectl delete pod [파드명]
    $ kubectl delete pod nginx-pod # nginx-pod라는 파드 삭제
```