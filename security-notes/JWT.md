JWT(Json Web Token)
=====================

1\. 인증 방법
---------------
```
HTTP 요청 헤더 중에 Authorization 키값에 Bearer + JWT토큰값을 넣어 보내야 합니다.
```


2\. 구조
---------------
```
헤더(header).내용(payload).서명(signature)

헤더  : 토큰의 타입과 해싱 알고리즘을 지정하는 정보를 담습니다.
    ex) { "typ" : "JWT", "alg" : "HS256 }   : JWT토큰, HS256 해싱 알고리즘 사용
    
내용  : 토큰과 관련된 정보를 담습니다. 내용의 한 덩어리를 클레임(claim)이라고 부르며, 클레임은 키값의 한 쌍으로 이루어져 있습니다.
       클레임은 등록된 클레임, 공개 클레임, 비공개 클레임으로 나눌 수 있습니다.
 - 등록된 클레임(registered claim)  : 토큰에 대한 정보를 담는 데 사용합니다.
    - iss   : 토큰 발급자(issuer)
    - sub   : 토큰 제목(subject)
    - aud   : 토큰 대상자(audience)
    - exp   : 토큰의 만료 시간(expiration), 시간은 NumericDate 형식으로 하며(예: 1480849147370), 항상 현재 시간 이후로 설정합니다.
    - nbf   : 토큰의 활성 날짜와 비슷한 개념으로 nbf는 Not Before를 의미합니다. NumericDate 형식으로 날짜를 지정하며, 이 날짜가 지나기 전까지는
              토큰이 처리되지 않습니다.
    - iat   : 토큰이 발급된 시간으로 iat은 issued at을 의미합니다.
    - jti   : JWT의 고유 식별자로서 주로 일회용 토큰에 사용합니다.

 - 공개 클레임(public claim)     : 공개되어도 상관없는 클레임을 의미합니다. 충돌을 방지할 수 있는 이름을 가져야 하며, 보통 클레임 이름을
                                 URI로 짓습니다.
 - 비공개 클레임(private claim)   : 공개되면 안되는 클레임을 의미합니다. 클라이언트와 서버 간의 통신에 사용됩니다.
 ex) JWT
    {
        "iss" : "ajufresh@gamil.com",   // 등록된 클레임
        "iat" : 1622370878,             // 등록된 클레임
        "exp" : 1622370878,             // 등록된 클레임
        "https://shinsunyoung.com/jwt_claims/is_admin" : true,  // 공개 클레임
        "email" : "ajufresh@gamil.com", // 비공개 클레임
        "hello" : "안녕하세요!"           // 비공개 클레임
    }
```