Nginx Debug 공부 노트
=====================

7\. Nginx 에러 디버깅 방법
--------------------------------------
로그 파일 실시간으로 확인하기
```
1) 제대로 요청이 들어오고 있는 지 확인 (Nginx 서버로 접근한 요청에 대한 정보가 기록으로 남아있다)
    $ sudo tail -f /var/log/nginx/access.log

2) 에러 메시지에 대한 내용이 담겨있다
    $ sudo tail -f /var/log/nginx/error.log
```