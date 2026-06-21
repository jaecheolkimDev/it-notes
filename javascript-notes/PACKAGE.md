Javascript Package
=====================

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
