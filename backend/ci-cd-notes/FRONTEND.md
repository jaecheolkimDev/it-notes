CI/CD FrontEnd
=================

1\. Next.js 프로젝트에 CI/CD 적용하기 (Vercel)
--------
```
Github ▶ Vercel
  ↓_________↑
    Git push
    
Vercel에 배포하는 방법은 크게 어렵지 않다. 뿐만 아니라 Vercel 자체적으로 기본적인 CI/CD가 이미 구성되어 있어서 별도의 CI/CD를 구축할 필요가 없다. 
```


2\. 일반 웹 프로젝트 구조에 CI/CD 적용하기 (S3, Cloudfront)
--------
```
Github ▶ Github Actions ▶ AWS S3 -----------
     ↓___↑     ↓      ↓____↑                ↓
 1.Git push    ↓      2.빌드 파일을 전달       ↓
               ↓                            ↓ 4. 캐시 무효화
        3. 캐시 무효화 명령                    ↓
               ↓                            ↓
              EC2 ←-------------------------
```