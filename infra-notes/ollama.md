ollama 공부 노트
======================

1\. 진행 순서
--------------
```
1) AI 엔진 바이너리 파일 반입 (ollama)    : VirtualBox 게스트 확장을 통한 공유 폴더로 반입
2) sLLM모델 바이너리 파일 반입 (Meta-Llama-3-8B-Instruct.Q4_K_M.gguf) : VirtualBox 게스트 확장을 통한 공유 폴더로 반입
```

3\. 로컬 개발 환경 설정
--------------
```
폐쇄망 개발서버 환경
	OS 종류		: LINUX
	OS 버전		: OS Red Hat Enterprise Linux Server release 7.6 (Maipo)
	RAM			: 64GB
    flags       : avx, avx2, avx512 존재
	glibc(GNU libc)     : 2.17

POC 개인 노트북 환경
	노트북 종류	: LG 그램
	노트북 모델명 : 15z90s-g.ap76ml
	프로세서		: Inter(R) Core(TM) Ultra 7 155 H 1.40GHz
	RAM			: 16GB
    flags       : avx, avx2 존재
	glibc(GNU libc)     : 2.17
    openjdk1.8.0_201
        Link    : github.com/ojdkbuild/ojdkbuild/releases/tag/1.8.0.201-1
        설치형   : java-1.8.0-openjdk-1.8.0.201-1.b09.ojdkbuild.windows.x86_64.msi
    STS 2.7.18
        pom.xml 수정

1) RHEL 7.6과 1:1로 대응되는 무료 버전인 CentOS7를 사용해서 POC 수행.
    - 커널이나 패키지 의존성까지 폐쇄망 환경과 99% 맞춰볼 수 있음.
```

996\. 준비물(리눅스용 바이너리)
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
2) 경량화된 LLM 모델 : 
                Llama 3 (Meta): 현재 가장 인기 있는 모델로, 성능이 매우 뛰어나며 다양한 크기(8B, 70B 등)를 제공합니다.
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


##################################
# 추후 필요 (json을 벡터DB로 변경시) #
##################################
1) 임베딩 모델 (번역기)       : 문서를 숫자(벡터)로 변환해주는 작은 모델입니다. 사양이 낮아 일반 CPU 서버에서도 잘 돌아갑니다. 
    bge-m3 (한국어 RAG 성능이 가장 좋으며 가볍습니다.)
2) 벡터 데이터베이스 (도서관)  : 숫자화된 문서 조각들을 저장하고 검색하는 장소입니다.
    ChromaDB, FAISS, Milvus (모두 오픈소스로 폐쇄망 설치 가능)
3) 문서 포맷별 추천 라이브러리 및 최적 버전 (JDK 1.8 호환)
    Apache POI  : MS Office 파일(.xlsx, .xls, .docx, .doc)의 텍스트와 테이블을 추출할 때 표준으로 사용되는 
                  라이브러리입니다.
        주요 의존성 (Maven 기준):
            poi: 구형 Excel(.xls)용
            poi-ooxml: 신형 Excel(.xlsx) 및 Word(.docx)용
            poi-scratchpad: 구형 Word(.doc)용
    Apache PDFBox   : PDF 문서에서 텍스트를 추출하고, RAG에서 중요한 '페이지 번호' 정보 등을 함께 매핑할 때 가장 안정적입니다.
4-1) 이미지 추출,저장,불러오기(json에 별도의 태그에 경로도 저장)
4-2) OCR(광학 문자 인식) 라이브러리 도입 (Tesseract OCR 같은 오픈소스 라이브러리)
```

997\. 주요 체크포인트
--------------
```
1) 도커 x           : 자체 세팅.
2-1) 메모리 부족?      : ollama는 개발만 사용 메모리 5GB정도 사용.
                     8B 정도의 가벼운 모델을 돌리려면 최소 5GB 정도의 빈 메모리가 필요합니다.
2-2) 메모리 관리       : 모델이 메모리에 계속 상주하게 할지, 요청이 없을 때는 내려놓을지 설정(keep_alive)이 필요합니다.
3) CPU 경합 문제     : AI가 답변을 생성할 때 CPU를 많이 사용하므로, Nice 값을 조절하여 기존 WAS 프로세스보다 낮은 우선순위를 
                     갖도록 설정하는 것이 안전합니다.
4) 응답 속도 (Latency): GPU가 없으므로 답변 한 줄씩 바로 화면에 뿌려주는 Streaming(Server-Sent Events, SSE) 방식을 
                       Vue.js와 연동하여 사용자 체감 속도를 높여야 합니다.
      
############
# 체크 완료 #
############
1) 가상머신 CPU 설정 체크 (CPU의 연산 가속 기능 확인)   : $ cat /proc/cpuinfo
2) glibc(GNU libc) 체크     : $ldd --version
3) 서버 자원 사용량            : 4core, 5/8GB
```

998\. 개발 내용
--------------
```
ollama 엔드포인트 주소     : Ollama는 기본적으로 REST API 규격을 따르며, 목적에 따라 크게 두 가지 주소를 가장 많이 씁니다.
    /api/generate (단발성 답변):
        한 번 질문하고 한 번 답변을 받는 방식입니다.
        우리가 흔히 아는 "질문-답변" 구조에 적합합니다.
    /api/chat (대화형 답변):
        챗봇을 만들 때 주로 씁니다.
        질문만 보내는 게 아니라, [{"role": "user", "content": "안녕?"}, {"role": "assistant", "content": "반가워요!"}] 
        처럼 이전 대화 내역을 함께 보낼 수 있는 구조입니다.

RAG가 사내 문서(knowledge_base.json)에서 정답 후보를 찾아오면, sLLM이 그 내용을 읽고 사용자의 질문에 맞춰 매끄러운 답변으로 
가공합니다.
```

999\. 무료 오픈소스 모델(sLLM)을 이용한 폐쇄망에서의 RAG 구현
--------------
```
실질적인 구축 팁
    모델 경량화 (Quantization): 모델의 크기를 1/4 수준으로 압축하여 일반 리눅스 서버의 RAM만으로도 구동 가능하게 세팅합니다. (GGUF 포맷 활용)
    Python 기반 프레임워크: LangChain이나 LlamaIndex 라이브러리를 사용하면 위 구성 요소들을 레고 블록 조립하듯 연결할 수 있습니다.
    
JSON 처리: Jackson이나 Gson 라이브러리를 사용해 AI와 주고받는 데이터를 파싱하면 됩니다.
```