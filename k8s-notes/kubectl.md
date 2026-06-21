k8s kubectl
=================


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
- 쿠버네티스 전용 '표준 명령 도구'입니다.
- 쿠버네티스를 제어하는 명령어 도구
```

3\. 명령어
--------
```
[조회 (Read)]
1) 조회하기: 현재 뭐가 돌아가고 있는지 확인
    $ kubectl get nodes         : 서버(노드) 상태 확인
    $ kubectl get deployment    : 실행중인 deployment 확인
    $ kubectl get replicaset    : 실행중인 replicaset 확인
    $ kubectl get service       : 실행중인 service 확인
    $ kubectl get pods          : 실행 중인 컨테이너(파드) 확인
        - `NAME`    : Pod의 이름
        - `READY`   : (파드 내 준비 완료된 컨테이너 수)/(파드 내 총 컨테이너 수)
        - `STATUS`  : 파드의 상태 (`Running` : 정상적으로 실행 중)
                                ImagePullBackOff
                                ErrImagePull
        - `RESTARTS`: 해당 파드의 컨테이너가 재시작된 횟수
        - `AGE`     : 파드가 생성되어 실행된 시간
    $ kubectl get configmap       : 실행 중인 configmap 확인
    $ kubectl get secret          : 실행 중인 secret 확인
        
[반영 (Write)]
1) 파드(Pod) 생성하기 : 변경사항 적용시키기. (중복 실행하면 변경된 내용만 적용함.)
                      새롭게 오브젝트(디플로이먼트, 파드 등)를 생성할 때도 사용하고, 변경 사항을 적용시킬 때도 사용할 수 있는 편리한 명령어이다.
                       
    $ kubectl apply -f nginx-pod.yaml   : yaml 파일에 적혀져있는 리소스(파드)를 생성
    $ kubectl apply -f mysql-secret.yaml
    $ kubectl apply -f mysql-config.yaml
    $ kubectl apply -f mysql-deployment.yaml
    $ kubectl apply -f mysql-service.yaml
    
2) 삭제하기
    $ kubectl delete pod nginx-pod                              : nginx-pod라는 파드 삭제
    $ kubectl delete pod spring-pod-1 spring-pod-2 spring-pod-3 : 파드 3개 삭제 
    $ kubectl delete deployment spring-deployment               : spring-deployment라는 디플로이먼트 삭제
    $ kubectl delete service spring-service                     : spring-service라는 서비스 삭제
    $ kubectl delete all --all                                  : 모든 리소스 삭제
    
[설정 (Config)]
1) 포트 포워딩(= 포트 연결시키기)
    $ kubectl port-forward pod/nginx-pod 80:80      : /[파드명] [로컬에서의 포트]/[파드에서의 포트]
    
2) 현재 어떤 연결들이 있는지 확인
    $ kubectl config get-contexts

3) 'company-eks'클러스터로 변경 (리모컨 채널 돌리기) (DEV, QA, PROD)
    $ kubectl config use-context company-eks
    
4) 특정 컨텍스트 삭제 (DEV, QA, PROD)
    $ kubectl config unset contexts.<컨텍스트 이름>

[디버깅 (Debugging)]
1) 상세보기: 문제가 생겼을 때 원인 파악(디버깅) ,  파드의 상세 상태와 이벤트 로그를 보여주어 생성 실패 원인 파악에 유용해요.
    kubectl describe pod [파드명]          # 왜 안 켜지는지 상세 로그 확인
    
2) 파드의 로그 확인하기 : 파드 내 컨테이너의 표준 출력 로그를 확인하여 애플리케이션 실행 중 문제를 볼 때 사용해요.
    # kubectl logs [파드명]                : 디버깅
    
3) 파드 내부 환경 접속하기
    $ kubectl exec -it nginx-pod -- bash    : nginx-pod 내부 환경으로 접속
        $ env   : 환경변수 조회 (deployment에서 env로 등록한 환경변수)
    $ kubectl exec -it nginx-pod -- sh      : nginx-pod 내부 환경으로 접속(bash가 설치되어 있지 않을때)


[실행 (Execute)]
1) 실행하기: 새로운 컨테이너 띄우기
    kubectl run my-test --image=nginx  # nginx라는 이름의 테스트 컨테이너 띄우기
    
2) 재시작
    $ kubectl rollout restart deployment spring-deployment      : Deployment 재시작 (무중단: 롤링 업데이트)
        - 기존 파드를 하나씩 죽이고 새 파드를 하나씩 살리면서 점진적으로 교체함.
        - 볼륨 설정을 안하면 재시작했을때 기존 설정정보가 다 날라감.
```