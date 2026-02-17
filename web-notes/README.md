# WEB 공부 notes

1\. HTTP 요청과 응답
--------------
```
HTTP 응답(Response)은 클라이언트(브라우저, 앱 등)가 서버에 요청(Request)을 보냈을 때 서버가 답변하는 데이터 구조입니다.

1. HTTP 응답의 구조 파악 (3대 요소)
 1) 상태 줄 (Status Line)         : HTTP 버전, 상태 코드(Status Code), 상태 텍스트(Reason-phrase)를 포함합니다.
                                   (예: HTTP/1.1 200 OK)
 2) 응답 헤더 (Response Headers)  : 서버 이름, 콘텐츠 타입, 날짜 등 메타데이터를 담고 있습니다.
 3) 메시지 본문 (Body)             : 실제 전송되는 데이터(HTML, JSON 등)입니다. 


2. HTTP 상태 코드(Status Codes)
  2xx (Success)       : 200 OK (성공), 201 Created (생성됨)
  3xx (Redirection)   : 301 Moved Permanently, 304 Not Modified
  4xx (Client Error)  : 400 Bad Request (잘못된 요청), 401 Unauthorized (인증 필요), 403 Forbidden (권한 없음)
                      , 404 Not Found (찾을 수 없음)
  5xx (Server Error)  : 500 Internal Server Error (서버 내부 에러), 503 Service Unavailable
```