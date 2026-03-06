CI/CD 공부 노트
=================
CI/CD란 Continuous Integration, Continuous Deployment라는 의미를 가지고 있다. 
말이 너무 어렵다. 
쉽게 표현하자면 CI/CD는 테스트(Test), 통합(Merge), 배포(Deploy)의 과정을 자동화하는 걸 의미한다.
```
CI/CD : 편안한 유지보수를 위해
```


1\. 과정
--------
```
                 (테스트 통과시 배포)
                         ↑
개발 ▶ 커밋 ▶ 빌드 ▶ 테스트 ▶ 배포
 ↑                       ↓
 ↑                (테스트 실패시 다시 개발)
 ↑                       ↓
 ↑_______________________↓                          
```


2\. FrontEnd(프론트엔드)와 BackEnd(백엔드)는 CI/CD의 핵심 과정이 크게 다릅니다.
--------
"최종 결과물의 형태"와 "실행되는 환경"이 다르기 때문입니다.
```
프론트는 브라우저에 전달될 '정적 파일'을 만드는 것이 목적이고, 
백엔드는 서버에서 계속 돌아가는 '실행 프로그램'을 만드는 것이 목적입니다.

1) 프론트엔드 vs 백엔드 CI/CD 비교
구분          FrontEnd (React, Vue 등)         BackEnd (Spring Boot, Node.js 등)
빌드 결과물    HTML, CSS, JS (Static Files)     JAR, WAR, Docker Image (Executable)
배포 대상      Web Server (Nginx, S3, CDN)     App Server (EC2, L4, Kubernetes)
배포 방식      단순 파일 덮어쓰기 (Copy)          프로세스 재시작 (Restart)
CI 핵심       Lint 체크, 컴파일 속도             단위/통합 테스트, 취약점 스캔

2) 상세 과정 (무엇이 다른가?)
🚀 FrontEnd: "가볍고 빠르게 사용자에게 전달"
프론트엔드는 사용자의 웹 브라우저가 다운로드할 수 있게 최적화하는 것이 핵심입니다.
Build: 소스 코드를 압축하고 난독화하여 용량을 줄입니다 (Minify/Uglify).
Deployment: 빌드된 파일들을 S3(저장소)나 Nginx(웹서버)에 단순히 복사합니다.
Invalidation: CDN(CloudFront 등)을 사용한다면 기존 캐시를 비워줘서 사용자가 새 파일을 보게 합니다.
    특징: 서버 부하보다는 브라우저 로딩 속도가 중요합니다.

⚙️ BackEnd: "안정적인 서버 구동과 무중단"
백엔드는 서버 내부에서 프로그램이 죽지 않고 안전하게 교체되는 것이 핵심입니다.
Build: Java의 경우 .jar 파일을 생성하거나 Docker 이미지를 만듭니다.
Test: DB 연결, API 통신 등 비즈니스 로직이 깨지지 않았는지 꼼꼼히 검증합니다.
Deployment: 구동 중인 이전 버전 프로세스를 종료하고 새 버전을 띄웁니다.
Zero-Downtime: 배포 중 서비스가 끊기지 않게 블루-그린(Blue-Green)이나 롤링(Rolling) 배포 방식을 사용합니다.
    특징: DB 스키마 변경, 환경 변수 주입 등 고려할 사항이 많습니다.

4) 요즘 트렌드 (통합)
최근에는 프론트와 백엔드 모두 Docker를 사용하여 배포 방식을 통일하기도 합니다.
- 프론트: Nginx와 정적 파일을 합쳐서 Docker 이미지로 생성
- 백엔드: 어플리케이션과 실행 환경을 합쳐서 Docker 이미지로 생성
이렇게 하면 어떤 프로젝트든 docker run 명령어 하나로 배포를 표준화할 수 있습니다.
```


999\. 툴
--------
```
젠킨스 : 맞춤형 자동화 파이프라인을 구축하는 데 사용됩니다. 
 - 단점 : 별도의 서버에 구축해야 함
Github Actions : 로직을 실행시킬 수 있는 일종의 컴퓨터
                 CI/CD 과정에서 Github Actions는 “빌드, 테스트, 배포”에 대한 로직을 실행시키는 역할을 하게 된다.
                 서버에서 배포된 최신 코드로 서버를 재실행하면 적용된다.
 - 장점 : 별도의 서버가 필요 없다.
         Github의 Push를 감지해서 Github Actions에 작성한 로직이 실행된다.
 - 이 방법은 언제 주로 쓰는 지 : 주로 개인 프로젝트에서 CI/CD를 심플하고 빠르게 적용시키고 싶을 때 적용한다.  
넥서스 : npm모듈을 받아오는 서버.
    install은 인터넷 연결되어 있어야하고
    run dev 는 인터넷 연결 안되어있어도됨.
    
Github Actions, Jenkins, Circle CI, Travis CI 등등
```