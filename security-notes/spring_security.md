Spring Security
=====================

1\. SecurityContextHolder & SecurityContext
---------------
```
가장 상위에서 "현재 로그인한 사람의 정보"를 저장하는 저장소입니다.

SecurityContextHolder   : SecurityContext를 담고 있는 보관함입니다. 
                          기본적으로 ThreadLocal 방식을 사용하여, 한 스레드(하나의 요청) 내에서 어디서든 유저 정보에 접근할 수 있게 해줍니다.

SecurityContext         : 실제 Authentication 객체를 보관하는 인터페이스입니다.

Authentication          : 현재 유저의 정보(Principal), 권한(Authorities), 인증 여부 등을 담고 있는 객체입니다. 
                          로그인 전에는 말씀하신 AnonymousAuthenticationToken이 이곳에 담깁니다.
```

2\. Authentication (인증 객체)의 구성
---------------
SecurityContext 안에 들어가는 Authentication 객체는 다음 요소로 이루어집니다.
```
1) Principal        : 사용자를 식별하는 아이디나 객체 (익명일 땐 "anonymousUser", 일반적으론 UserDetails)
2) Credentials      : 비밀번호 (인증 후에는 보안을 위해 주로 삭제됨)
3) Authorities      : 사용자가 가진 권한 목록 (예: ROLE_USER, ROLE_ADMIN)
```

3\. 인증의 핵심 컴포넌트
---------------
```
컴포넌트                        역할
AuthenticationManager       인증에 대한 총괄 팀장. (실제 인증은 Provider에게 위임)
AuthenticationProvider      실제 인증 로직(ID/PW 검증, OAuth 검증 등)을 수행하는 담당자.
UserDetailsService          DB 등에서 사용자 정보를 조회해오는 서비스.
PasswordEncoder             비밀번호를 안전하게 해싱하고 비교하는 도구.
```

4\. 전체 인증 흐름 (Request Lifecycle)
---------------
```
1) Http Request             : 사용자가 자원에 접근을 요청합니다.
2) Filter Chain             : 여러 보안 필터를 거칩니다. (여기서 AnonymousAuthenticationFilter가 익명 토큰을 먼저 채워주기도 합니다.)
3) AuthenticationFilter     : 로그인 요청 시, 사용자가 보낸 정보를 취합해 Authentication 객체를 만듭니다.
4) Manager & Provider       : 위에서 만든 객체를 검증(DB 대조 등)합니다.
5) SecurityContextHolder    : 인증이 성공하면 최종적으로 SecurityContext에 인증된 정보를 저장합니다.
6) Authorization            : 이후 FilterSecurityInterceptor가 사용자의 권한을 체크하여 접근 허용 여부를 결정합니다.
```

5\.
---------------
```
```
