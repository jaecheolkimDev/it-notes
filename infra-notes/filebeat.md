filebeat
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
4. filebeat.yml 파일 수정
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
1) 설정 파일 문법 검사                      : ./filebeat test config -c filebeat.yml
2) 출력(Output) 대상과의 연결 상태 검사       : ./filebeat test output -c filebeat.yml
```

4\. filebeat.yml
--------------
```
# 1. 입력 설정 (기존 설정 유지 + 필터링 추가)
filebeat.inputs:
- type: log
  enabled: true
  paths:
    - /hli_app/log/was/DEV_PICA_HPF/nohup/*.log
    - /hli_app/log/was/DEV_PICA_HGW/nohup/*.log
    - /hli_app/log/pica/hbt/hpf/*.log
    - /hli_app/log/pica/hbt/hms/*.log

  multiline.type: pattern
  multiline.pattern: '^\[?[0-9]{4}-[0-9]{2}-[0-9]{2}'
  multiline.negate: true
  multiline.match: after

  # [핵심] 'Exception'이나 'Exception' 종류가 포함된 로그만 통과시킵니다.
  processors:
    - keep_fields: # 필요한 필드만 남기거나 복사할 때 사용 (선택사항)
        fields: ["message", "log.file.path", "@timestamp"]
    - drop_event:
        when:
          not:
            regexp:
              message: "(?i)exception" # (?i)는 대소문자 구분 없음 (Exception, exception 모두 매칭)

# 2. API 호출을 위한 Output 설정
output.http:
  hosts: ["http://localhost:8080/api/logs"] # 데이터를 받을 수집 API 주소
  method: "POST"
  headers:
    "Content-Type": "application/json"
    "Authorization": "Bearer YOUR_TOKEN" # API 인증이 필요한 경우
  retry.max: 3
  compression_level: 3
```

5\. 오류
--------------
```
[jcdoom@localhost filebeat-7.17.29-linux-x86_64]$ ./filebeat test config -c filebeat.yml
Exiting: error initializing publisher: output type http undefined
[jcdoom@localhost filebeat-7.17.29-linux-x86_64]$ ./filebeat test output -c filebeat.yml
Error initializing output: output type http undefined
    => Filebeat는 공식적으로 output.http라는 출력을 지원하지 않습니다.
    => Elastic Stack(Elasticsearch, Logstash)에 최적화
    => Filebeat는 "가공은 Logstash에 맡겨라" 스타일
```