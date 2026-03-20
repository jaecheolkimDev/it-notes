리눅스 CentOS 9 dnf 공부 note
======================

1\. 설정 파일
-----------------------
/etc/dnf/dnf.conf
```
다운로드 속도 더 올리기
    CentOS 9에서 dnf 속도를 극대화하고 싶다면 설정 파일(/etc/dnf/dnf.conf)에 아래 내용을 추가해 보세요.
        max_parallel_downloads=10: 동시에 10개씩 다운로드합니다.
        fastestmirror=True: 가장 빠른 서버를 자동으로 찾습니다.
```
