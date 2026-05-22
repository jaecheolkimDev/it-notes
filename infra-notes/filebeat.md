filebeat 공부 노트
======================

1\. 진행 순서
--------------
```
1. 바이너리 파일 다운로드 (Link : https://www.elastic.co/downloads/past-releases/filebeat-oss-7-17-29)
2. 파일 이동
3. 압축 해제 (tar -zxvf filebeat-oss-7.17.29-linux-x86_64.tar.gz)
    특징: 별도의 설치 과정 없이 압축만 풀면 바로 실행되는 바이너리 독립형 패키지입니다.
    장점: 리눅스 시스템 루트(root) 권한 없이 계정 권한만으로 운영이 가능하고, 다른 시스템 파일들을 건드리지 않기 때문에 폐쇄망 
         반입 시 보안 팀의 결재를 받기가 가장 수월합니다.
```

2\. 준비물(리눅스용 바이너리)
--------------
Filebeat OSS (Apache 2.0)
```
1. filebeat 7.17.29 바이너리 파일 (폐쇄망 환경인 RHEL 7.6에 맞춘 버전)
    Elastic 공식 호환성 매트릭스에 따르면, 7.17 버전까지가 RHEL 7 계열을 공식적으로 완벽 지원하는 마지노선입니다. 
    (최신 8.x 이상 버전은 RHEL 7에서 요구하는 시스템 라이브러리(glibc)나 커널 버전이 맞지 않아 실행 시 에러가 날 확률이 
    높습니다.)
2. SHA 파일
3. filebeat.yml 파일
```

3\. 명령어
--------------
```
1) 문법 검사    : filebeat test config -c filebeat.yml
```

4\. filebeat.yml
--------------
```
filebeat.inputs:
- type: log
  enabled: true
  paths:
    - /app/logs/online/*.log  # 자바 온라인 프로그램 로그 경로
    - /app/logs/batch/*.log   # 자바 배치 프로그램 로그 경로

  # [핵심] 자바 스택 트레이스 통합 설정
  multiline.type: pattern
  multiline.pattern: '^\[?[0-9]{4}-[0-9]{2}-[0-9]{2}' # 예: 2026-05-22 또는 [2026-05-22 로 시작하는 패턴
  multiline.negate: true                            # 이 패턴으로 시작하지 않는 줄(들여쓰기 된 at... 등)은
  multiline.match: after                            # 모두 앞 줄의 로그에 포함시킨다.
```