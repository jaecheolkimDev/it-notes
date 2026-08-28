Spring Expression Language (SpEL)
=================

2\. 정의
---------------
```
Spring 프레임워크 전반에서 사용되는 강력한 표현식 언어(Expression Language)입니다. 
실행 시점(Runtime)에 객체 그래프를 조회하고 조작하거나, 조건식 평가 및 메소드 호출 등을 수행할 수 있도록 지원합니다.
```

3\. 핵심 특징
---------------
```
1) Spring 생태계 통합: @Value 어노테이션, Spring Security의 권한 검사, Spring Cache의 키 생성 등 다양한 위치에서 기본적으로 
   지원됩니다.
2) 유연한 객체 참조: Spring Bean, 객체의 필드/메소드, 시스템 속성, 환경 변수 등에 쉽게 접근할 수 있습니다.
3) 독립적인 엔진: Spring Container 없이도 단독 자바 코드에서 ExpressionParser를 통해 사용할 수 있습니다.
```

4\. 주요 활용 사례
---------------
```
1) @Value 어노테이션을 통한 설정값 주입
    // 시스템 속성이나 다른 빈의 값 주입
    @Value("#{systemProperties['user.home']}")
    private String userHome;
    
    // 간단한 연산 결과를 주입
    @Value("#{10 * 2}")
    private int calculatedValue;

2) Spring Security 접근 제어
    // 특정 권한이 있는 사용자만 접근 허용
    @PreAuthorize("hasRole('ADMIN') or #id == authentication.principal.id")
    public User getUserById(Long id) { ... }

3) Spring Cache 키 설정
    // 메소드 인자의 속성을 기반으로 캐시 키 생성
    @Cacheable(value = "users", key = "#user.id")
    public User findUser(User user) { ... }
```

5\. 주요 문법 및 구문
---------------
```
기능              문법 예시                       설명
문자열/숫자 리터럴  "'Hello World', 100, 3.14"  기본 데이터 타입 표현
속성 참조           user.name                   user 객체의 getName() 호출
메소드 호출          'hello'.toUpperCase()       대상 객체의 메소드 직접 실행
Spring Bean 참조  @myService.doSomething()    @ 문자로 Spring Container의 Bean 참조
Elvis 연산자       user.name ?: 'Default'      user.name이 null이면 'Default' 사용
안전 참조 연산자   user?.address?.city         NullPointerException 방지 (null인 경우 null 반환)
컬렉션 필터링     members.?[age >= 20]            조건에 맞는 요소만 추출
컬렉션 투영      members.![name]                 각 요소의 특정 속성만 추출하여 새로운 리스트 생성
```

5\. 우선 순위
---------------
```
1) JVM 옵션 (가장 확실한 방법): 서버 기동 스크립트에서 -Dscheduler.time=3000 과 같이 설정하면 코드 수정 없이 서버별로 다른 값을 
   줄 수 있습니다.
2) OS 환경 변수: 시스템 환경 변수에 등록되어 있다면 가져옵니다.
3) application.properties (또는 yml): 파일 내에 scheduler.time=5000이라고 적혀 있으면 주입됩니다.
```

5\.
---------------
```
```

5\.
---------------
```
```

5\.
---------------
```
```

5\.
---------------
```
```

5\.
---------------
```
```