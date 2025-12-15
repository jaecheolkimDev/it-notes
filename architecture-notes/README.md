Architecture 공부 노트
=================


1\. 일반적인 자바스크립트 프로젝트 폴더 구조
----------------------------------------
```
/
├── node_modules/   # 프로젝트 의존성 패키지 저장 (gitignore에 포함)
├── src/            # 원본 소스 코드 (개발자가 편집하는 코드)
├── dist/           # 빌드된(배포용) 파일들 (gitignore에 포함 권장)
├── public/ 또는 static/ # 정적 파일 (index.html, 이미지 등)
├── package.json    # 프로젝트 정보 및 의존성 관리
├── package-lock.json # 패키지 잠금 파일
├── tsconfig.json   # TypeScript 설정 파일 (TS 프로젝트인 경우)
├── webpack.config.js # 웹팩 설정 파일 (웹팩 사용 시)
└── ...             # 기타 설정 파일 (README.md, .gitignore 등)
```



2\. 소프트웨어 3개 층
----------------------------------------
```
1. **문제 정의층 (Problem Domain)**
    - 무엇을 해결할 것인가?
    - 어떤 가치를 제공할 것인가?
    - 사용자가 진짜 원하는 것은?
2. **해결책 설계층 (Solution Design)**
    - 어떻게 해결할 것인가?
    - 어떤 기능이 필요한가?
    - 사용자 경험은 어떻게?
3. **기술 구현층 (Technical Implementation)**
    - 어떤 기술로 만들 것인가?
    - 어떻게 코딩할 것인가?
    - 어떻게 배포할 것인가?
```