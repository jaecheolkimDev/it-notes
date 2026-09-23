VMware ESXi
======================

1\. 정의
--------------
```
VMware사에서 개발한 베어메탈(Bare-metal) 타입 1 하이퍼바이저로, 물리 서버 하드웨어 위에 호스트 OS 없이 직접 설치되어 다수의 가상 
머신(VM)을 생성하고 관리하는 가상화 플랫폼입니다.
```

1\. 핵심 특징 및 동작 구조
--------------
하드웨어와 가상 머신 사이에 별도의 범용 운영체제(Windows, Linux 등)를 거치지 않고 직접 제어하기 때문에 낮은 오버헤드와 높은 처리 
성능을 제공합니다.
```
1) Microkernel 아키텍처 : 커널 크기가 수백 MB 수준으로 매우 가볍습니다. OS 레이어가 얇아 보안 공격 표면(Attack Surface)이 적고 
                        패치/업데이트가 간결합니다.
2) VMkernel             : ESXi의 자체 전용 커널로, CPU, 메모리, 네트워크, 스토리지 등 하드웨어 자원을 직접 스케줄링하고 각 VM에 
                            할당합니다.
3) 독립된 VM 환경        : 각 가상 머신은 완전히 격리된 가상 하드웨어 자원을 받아 동작하므로, 한 VM의 장애가 다른 VM이나 호스트 
                        시스템 전체로 전파되지 않습니다.
```

1\. 주요 기능
--------------
```
분류          핵심 기능                               설명
자원 관리   DRS (Distributed Resource Scheduler)    VM의 컴퓨팅 수요에 따라 ESXi 호스트 간 부하를 동적으로 균등 분산
고가용성    vSphere HA                              호스트 장애 발생 시 해당 호스트의 VM들을 다른 ESXi 호스트에서 자동 재부팅
무중단 이동  vMotion                                 서비스 중단(Zero-downtime) 없이 실행 중인 VM을 다른 물리 호스트로 실시간 이동
스토리지    VMFS (Virtual Machine File System)      다중 ESXi 호스트가 동일한 SAN/NAS 스토리지에 동시 접근할 수 있는 클러스터 파일 시스템
```

1\. Type 1 vs Type 2 하이퍼바이저 비교
--------------
ESXi와 같은 Type 1 하이퍼바이저는 개발자나 일반 사용자가 흔히 사용하는 Workstation/VirtualBox(Type 2)와 구조적으로 차이가 
있습니다.
```
구분              Type 1 (Bare-metal)                         Type 2 (Hosted)
대표 제품       "VMware ESXi, Microsoft Hyper-V, Proxmox VE"    "VMware Workstation, Oracle VirtualBox"
설치 위치       물리 하드웨어 바로 위                            기존 호스트 OS(Windows/macOS 등) 위
성능 및 효율     오버헤드가 거의 없음 (엔터프라이즈급)               호스트 OS 오버헤드로 인한 성능 손실 존재
주요 용도       "데이터센터, 기업용 서버 인프라, 클라우드 환경"        "개인 개발 환경, 테스트 및 학습용"
```

1\. 주요 활용 및 관리 방안
--------------
```
1) vCenter Server 연동    : 단일 ESXi 호스트는 웹 기반 UI(ESXi Embedded Host Client)로 직접 접속해 관리할 수 있지만, 여러 
                            대의 ESXi 호스트를 클러스터로 묶어 DRS, HA, vMotion 등 엔터프라이즈 기능을 사용하려면 vCenter 
                            Server를 필수적으로 함께 구성합니다.
2) 서버 Consolidation (통합): 여러 대의 물리 서버를 대형 물리 서버 몇 대의 ESXi 환경으로 통합하여 전력, 공간, 하드웨어 비용을 대폭 
                            절감합니다.
```

1\.
--------------
```
```

1\.
--------------
```
```

1\.
--------------
```
```