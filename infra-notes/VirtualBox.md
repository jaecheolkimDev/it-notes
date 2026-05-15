VirtualBox 공부 노트
======================

1\. VirtualBox
--------------
--------------
일반적으로 리눅스 터미널(CLI 환경) 자체는 GUI 브라우저처럼 우측 스크롤바를 기본으로 제공하지 않습니다.
VirtualBox의 기본 콘솔 창은 해상도나 스크롤 제약이 많습니다. PuTTY를 사용하여 가상 머신에 접속해 보세요.
익숙한 Windows 환경의 스크롤바를 그대로 사용할 수 있어 훨씬 쾌적합니다.
```
1) BIOS 설정에서 가상화 기술 활성화
1) RHEL 7.6과 1:1로 대응되는 무료 버전입니다. (CentOS7)
2) 서버와 동일한 커널 환경
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
8) CentOS7 수동 마운트
    - 게스트 확장 CD 삽입... (공유 폴더 사용하기 위해)
        sudo mkdir -p /mnt/cdrom
        sudo mount /dev/sr0 /mnt/cdrom
        sudo /mnt/cdrom/VBoxLinuxAdditions.run
    - 장치 > 공유 폴더 > 공유 추가 (공유 폴더 경로 : /media/sf_vbox_shared)
        폴더 경로: 내 실제 PC(윈도우)에서 공유하고 싶은 폴더 선택
        폴더 이름: 가상 머신 안에서 보일 이름 (예: vbox_shared - 특수문자/공백 없는 영문 추천)
        자동 마운트: 체크 (부팅 시 자동으로 연결해 줍니다.)
        항상 사용하기: 체크 (가상 머신을 껐다 켜도 유지됩니다.)
    - 공유 폴더 권한 설정   : $ sudo usermod -aG vboxsf $USER
9) PuTTY에서 접속하기   : 로컬에서 PuTTY를 실행합니다. (최신 버전)
    Host Name (or IP address): 127.0.0.1 입력
    Port: 아까 설정한 호스트 포트인 2222 입력
    Connection type: SSH 선택
    [Open] 클릭
    보안 경고 창이 뜨면 [Accept]를 누르고, 가상 머신의 계정과 비밀번호를 입력하여 로그인합니다.
```

2\. PuTTY
--------------
```
1) 가상머신 CPU 설정 체크 (성능 확인)   : $ lscpu | grep flags
    - 노트북   : avx, avx2 존재
    - 실제 개발 환경  : avx, avx2, avx512 존재
2) AI 엔진 바이너리 파일 반입 (ollama)    : VirtualBox 게스트 확장을 통한 공유 폴더로 반입
3) sLLM모델 바이너리 파일 반입 (Meta-Llama-3-8B-Instruct.Q4_K_M.gguf)     : VirtualBox 게스트 확장을 통한 공유 폴더로 반입
```

3\. 로컬 개발 환경 설정
--------------
```
1) openjdk1.8.0_201
    Link    : github.com/ojdkbuild/ojdkbuild/releases/tag/1.8.0.201-1
    설치형   : java-1.8.0-openjdk-1.8.0.201-1.b09.ojdkbuild.windows.x86_64.msi
2) STS 2.7.18
    pom.xml 수정
```

996\. 필요한 리눅스용 바이너리
--------------
```
1)     : Ollama 리눅스용 바이너리 (또는 Docker Image)
   Link     : github.com/ollama/ollama/releases?page=15
   v.0.1.48 > Assets > ollama-linux-amd64 (리눅스용 바이너리)
   $ ./ollama-linux-amd64 --version         : 버전 확인
   $ ./ollama-linux-amd64 serve             : 포그라운드 실행
   $ ./ollama-linux-amd64 serve > ollama.log 2>&1 &         : 서버를 백그라운드로 실행하고 로그는 ollama.log 파일에 저장하기
   $ OLLAMA_HOST=0.0.0.0:11434 nohup ./ollama-linux-amd64 serve > ollama.log 2>&1 &     : 아웃바운딩 열어줌
   $ nohup ./ollama-linux-amd64 serve > ollama.log 2>&1 &   : 터미널이 끊겨도 유지
   systemd 서비스 등록           : 서버가 부팅될 때 자동으로 다시 켜지고, 죽어도 리눅스가 다시 살려냄.
   포트 번호    : 11434
2) LLM 모델   : Llama 3 (Meta): 현재 가장 인기 있는 모델로, 성능이 매우 뛰어나며 다양한 크기(8B, 70B 등)를 제공합니다.
               Meta-Llama-3-8B-Instruct.Q4_K_M.gguf (약 4.9GB, 가장 밸런스가 좋습니다.)
    Link    : huggingface.co/QuantFactory/Meta-Llama-3-8B-Instruct-GGUF/tree/main
    Modelfile작성 (cat 명령어로 파일 내용 바로 밀어넣기)     : 설계도(Modelfile)를 수정하면, 엔진에 다시 반영(Create)해 주어야 합니다.
                                                         커스텀 모델 생성 명령어(빌드) 수행해야함. 
        cat << 'EOF' > Modelfile
        FROM ./Meta-Llama-3-8B-Instruct.Q4_K_M.gguf
        
        # SYSTEM 지시문을 통해 한글 답변을 강제합니다.
        SYSTEM """
        You are a helpful, professional AI assistant. You must always answer and respond in Korean (한국어). 
        개발 관련 질문에는 친절하고 명확한 한글 코드로 답변해 주세요.
        """

        TEMPLATE """{{ if .System }}<|start_header_id|>system<|end_header_id|>
        
        {{ .System }}<|eot_id|>{{ end }}{{ if .Prompt }}<|start_header_id|>user<|end_header_id|>
        
        {{ .Prompt }}<|eot_id|>{{ end }}<|start_header_id|>assistant<|end_header_id|>
        
        {{ .Response }}<|eot_id|>"""
        
        PARAMETER stop "<|start_header_id|>"
        PARAMETER stop "<|end_header_id|>"
        PARAMETER stop "<|eot_id|>"
        EOF
    커스텀 모델 생성 (빌드)   : ollama create [만들 모델 이름] -f [설계도 파일 경로]
                       $ ./ollama-linux-amd64 create paprica-llm -f ./Modelfile
    CLI 테스트 (질문 시작!)    : $ ./ollama-linux-amd64 run paprica-llm
    모델명 조회      : $ ./ollama-linux-amd64 list
4) 자바 라이브러리: LangChain4j 관련 jar 파일들 (Maven/Gradle 레포지토리에 미리 다운로드)



##################################
# 추후 필요 (json을 벡터DB로 변경시) #
##################################
1) 임베딩 모델 (번역기)       : 문서를 숫자(벡터)로 변환해주는 작은 모델입니다. 사양이 낮아 일반 CPU 서버에서도 잘 돌아갑니다. 
    bge-m3 (한국어 RAG 성능이 가장 좋으며 가볍습니다.)
2) 벡터 데이터베이스 (도서관)  : 숫자화된 문서 조각들을 저장하고 검색하는 장소입니다.
    ChromaDB, FAISS, Milvus (모두 오픈소스로 폐쇄망 설치 가능)
```

997\. 주요 체크포인트
--------------
```
메모리(RAM) 부족:
    16GB RAM은 7B(70억 파라미터) 모델을 구동하기에 매우 빠듯합니다. OS와 기본 프로그램이 점유하는 용량을 제외하면 실제 가용한 RAM은 
    10~12GB 내외일 텐데, 이 경우 모델을 4-bit 양자화(Quantization)하여 사용해야만 겨우 돌아갑니다. 반면 64GB인 서버 환경은 좀 더 여유롭게 
    여러 컴포넌트(Vector DB, Embedding 모델 등)를 올릴 수 있습니다.

운영체제 차이:
    RHEL 7.6은 다소 구형 라이브러리(glibc 등)를 사용할 가능성이 큽니다. 개인 노트북에서 개발한 환경을 서버로 옮길 때 라이브러리 충돌이 
    발생할 수 있으므로, 반드시 Docker를 사용하여 환경을 격리시키는 것이 좋습니다.
```

998\. 체크 필요.
--------------
```
1) 개발서버에 docker 반입 필요. (별도의 RPM 패키지 파일들을 반입하여 수동 설치하거나, 사내 Private Repository(Nexus 등)가 있는지 
                                확인해야 합니다.)
2) 
```

999\. 무료 오픈소스 모델(sLLM)을 이용한 폐쇄망에서의 RAG 구현
--------------
```

Ollama: 복잡한 설정 없이 로컬 PC나 서버에서 모델을 바로 실행할 수 있게 해주는 도구입니다.
vLLM / TGI: 실제 서비스 환경에서 빠른 추론 속도를 보장해주는 엔진입니다.
LangChain / LlamaIndex: AI 모델과 내부 데이터(DB, 문서)를 연결하여 답변을 생성하게 돕는 프레임워크입니다.
CPU 전용 추론 엔진 활용 (llama.cpp)

순서
    Llama 3 8B 또는 Solar 모델을 다운로드합니다.
    Ollama를 사용하여 내 컴퓨터에서 모델을 구동해 봅니다.
    RAG(검색 증강 생성) 기술을 접목하여, 사내 기술 문서나 가이드라인 PDF를 학습시키지 않고도 답변하게 만드는 프로토타입을 만듭니다.
    
        
폐쇄망 RAG의 전체 흐름 (Data Flow)  : 폐쇄망 안에서 데이터는 다음과 같이 움직입니다.
    단계 1 (문서 인덱싱): 사내 기술 문서나 '파프리카' 개발 가이드(PDF/Excel)를 json으로 파싱한 뒤 서버에 올립니다. 
    단계 2 (질문 및 검색): 사용자가 "보험 코어 솔루션 MSA 전환 시 주의사항은?"이라고 물으면 → 질문에서 파싱한 단어를 json에서 찾습니다.
    단계 3 (답변 생성): 추출된 문서 조각들과 질문을 로컬 LLM에 전달합니다 → LLM이 "제공된 문서에 따르면..."이라며 답변을 생성합니다.

실질적인 구축 팁
    모델 경량화 (Quantization): 모델의 크기를 1/4 수준으로 압축하여 일반 리눅스 서버의 RAM만으로도 구동 가능하게 세팅합니다. (GGUF 포맷 활용)
    Ollama 활용: 폐쇄망 서버에 Ollama를 설치하면, 복잡한 설정 없이 명령여 한 줄로 로컬 모델을 서빙하고 API 형태로 만들어 
                다른 시스템(Vue.js 등)과 연동하기 매우 쉽습니다.
    Python 기반 프레임워크: LangChain이나 LlamaIndex 라이브러리를 사용하면 위 구성 요소들을 레고 블록 조립하듯 연결할 수 있습니다.
    
8B 정도의 가벼운 모델을 돌리려면 최소 8~16GB 정도의 빈 메모리가 필요합니다. 만약 메모리가 넉넉하다면 지금 바로 시작하실 수 있습니다!
CPU 경합 문제: AI가 답변을 생성할 때 CPU를 많이 사용하므로, Nice 값을 조절하여 기존 WAS 프로세스보다 낮은 우선순위를 갖도록 설정하는 것이 
            안전합니다.
응답 속도 (Latency): GPU가 없으므로 답변 한 줄씩 바로 화면에 뿌려주는 Streaming(Server-Sent Events, SSE) 방식을 Vue.js와 연동하여 
                    사용자 체감 속도를 높여야 합니다.
메모리 관리: 모델이 메모리에 계속 상주하게 할지, 요청이 없을 때는 내려놓을지 설정(keep_alive)이 필요합니다.

JDK 1.8에서 RAG를 구현하는 현실적인 방법     : 최신 라이브러리가 안 된다면, 우리가 직접 HTTP 통신(API 호출)을 통해 AI를 제어하면 됩니다.
LLM 엔진 (Ollama): 서버에 설치된 Ollama는 HTTP REST API를 제공합니다. JDK 1.8에서도 HttpURLConnection이나 Apache HttpClient를 사용해 
                    질문을 던지고 답변을 받을 수 있습니다.
JSON 처리: Jackson이나 Gson 라이브러리를 사용해 AI와 주고받는 데이터를 파싱하면 됩니다.

가공 : 한 번만 해두면 되는 작업.

리눅스 서버의 OS 버전(CentOS 7, RHEL 7 등)이 너무 낮으면 Glibc 버전 불일치로 엔진 자체가 실행되지 않을 수 있습니다.

CPU의 명령어 세트 지원 여부 (AVX/AVX2)
GPU 없이 CPU로만 AI를 돌릴 때는 CPU의 연산 가속 기능(AVX2 등)이 필수적입니다.
    체크 사항: 서버의 CPU 사양을 cat /proc/cpuinfo 명령어로 확인하여 flags 항목에 avx 또는 avx2가 있는지 보세요.
    
RHEL 7 계열은 기본 glibc 버전이 2.17인 경우가 많습니다. 최신 Ollama 바이너리는 더 높은 버전을 요구할 수 있으므로, 실행 시 에러가 난다면 
Docker를 설치하여 컨테이너 환경에서 돌리는 것이 가장 깔끔한 해결책입니다. (금융권 폐쇄망이라도 Docker Image를 tar 파일로 반입하는 것은 
흔한 방식입니다.)

STS 2.2.2(JDK 1.8)의 제약을 REST API 통신으로 돌파

RAG가 사내 문서에서 정답 후보를 찾아오면, sLLM이 그 내용을 읽고 사용자의 질문에 맞춰 매끄러운 답변으로 가공합니다.

    엔드포인트 주소: /api/generate
    Ollama는 기본적으로 REST API 규격을 따르며, 목적에 따라 크게 두 가지 주소를 가장 많이 씁니다.
    /api/generate (단발성 답변):
        한 번 질문하고 한 번 답변을 받는 방식입니다.
        우리가 흔히 아는 "질문-답변" 구조에 적합합니다.
    /api/chat (대화형 답변):
        챗봇을 만들 때 주로 씁니다.
        질문만 보내는 게 아니라, [{"role": "user", "content": "안녕?"}, {"role": "assistant", "content": "반가워요!"}] 처럼 이전 대화 내역을 함께 보낼 수 있는 구조입니다.
        
Glibc 버전 이슈: RHEL 7.6은 기본 Glibc 버전이 낮아 Ollama 최신 버전이 실행되지 않을 수 있습니다.
    해결책: 실행 시 GLIBC_2.27 not found 같은 에러가 난다면, Docker 환경에서 돌리는 것이 가장 속 편합니다. (Docker Image를 .tar로 구워 반입하는 방식)
```