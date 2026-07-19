Apache HTTP Server
=================

1\. Apache HTTP Server
-----------
오픈소스
```
설정 방식: 기본 구조가 Apache와 똑같기 때문에 httpd.conf 파일이나 conf.d/ 디렉토리 밑에서 가상 호스트(VirtualHost), 프록시(ProxyPass) 
          설정을 합니다.
톰캣/JBoss 연동: 웹 브라우저가 보낸 요청을 뒷단의 Java 애플리케이션으로 보내기 위해 mod_proxy_http나 mod_cluster 같은 모듈이 
                활성화되어 작동합니다.
```

2\. JBCS(JBoss Core Services)
-----------
레드햇(Red Hat)사에서 제공하는 기업용 Apache 웹 서버(Web Server)라고 생각하시면 됩니다.
```
오픈소스 Apache HTTP Server에, 기업 환경에 필요한 필수 기능(보안 패치, 부하 분산, 모니터링 등)을 더해서 레드햇이 패키징하고 기술 지원을 제공하는 
웹 서버 제품군입니다.
```