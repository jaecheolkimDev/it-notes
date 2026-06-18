Spring Annotation 공부 노트
=================


1\.@Annotations
------------------
```
@ConditionalOnProperty
- Spring Boot의 조건부 애노테이션으로, 특정 프로퍼티의 존재/값에 따라 @Configuration 클래스나 @Bean 등록을 활성화/비활성화합니다.

@ConfigurationProperties(prefix = "app")
- application.properties / application.yml 또는 환경 변수 등에서 특정 접두사(prefix)를 가진 설정 값을 자바 빈(POJO)에 바인딩(맵핑)해 주는 어노테이션

@ComponetScan(basePackages = {"com.example.service", "com.example.batch"})
- 컴포넌트 스캔 어노테이션을 통해 basePackages와 그 하위 패키지 전체를 스캔해서 "컴포넌트 후보"로 판단되는 클래스들은
  전부 스프링 빈으로 등록
    ✔ 프레젠테이션 계층 → @Controller, @RestController
     - @Controller: 웹 요청을 처리하는 프레젠테이션 계층 컴포넌트
      - 화면 렌더링, Model 데이터 전달, 템플릿 처리
     - @RestController: REST API 처리를 위한 @Controller + @ResponseBody 결합 컴포넌트
      - JSON기반 통신, 상태코드 제어(ResponseEntity), RESTful 설계
    ✔ 비즈니스 계층 → @Service
    ✔ 데이터 접근 계층 → @Repository
     - @Repository: 데이터 접근 계층을 정의하며 예외 변환 기능을 포함하는 컴포넌트
    ✔ 그 외 일반 스프링 관리 객체 → @Component
 
@EnableJpaRepositories
- JPA 리포지토리 인터페이스를 스캔하고 해당 인터페이스에 대한 구현체를 자동으로 생성하는 역할을 합니다.

@RestControllerAdvice, @ControllerAdvice
 용도 :   전역 예외 처리(Error Handling), 응답 데이터 공통 포맷 설정.
 특징 :   모든 컨트롤러에서 발생하는 에러를 한곳으로 모아 처리합니다.
         사용자가 따로 호출하지 않아도 에러가 나는 순간 스프링이 이 빈을 찾아 실행합니다.
 1. 컨트롤러에서 수행 중 RuntimeException이 발생
 2. 컨트롤러가 결과를 리턴하기 전에 예외를 캐치
 3. 어드바이스에 정의된 상태 코드와 메시지로 클라이언트에게 응답
 ex) 400,500,503 등의 에러를 응답함
 
@Transactional          : 클래스나 메서드에 붙여줄 경우, 해당 범위 내 메서드가 트랜잭션이 되도록 보장해준다.
 [ 아주 유명한 제약사항 ]
 1. 자기 호출(Self-Invocation) 문제   : 동일한 클래스 내의 메서드끼리 호출할 때 발생합니다.
  - 스프링 트랜잭션은 외부에서 프록시 객체의 메서드를 호출할 때만 '가로채기'가 가능합니다.
    클래스 내부의 메서드 A가 메서드 B를 호출하면, 프록시를 거치지 않고 원본 객체(this)의 메서드를 직접 실행하게 됩니다.
    ex) - 외부 호출 시: 클라이언트 → 프록시(트랜잭션 시작) → 실제 객체 메서드 (성공!)
        - 자기 호출 시: 클라이언트 → 프록시(A 호출) → 실제 객체 A → 실제 객체 B 직접 호출 (트랜잭션 미적용!)
  - 최상위 메소드(A)가 하위 메소드(B)를 this로 호출할 때의 결과입니다.
    상황 1: 메소드 A에만 @Transactional이 있는 경우
        결과: 전체가 하나의 트랜잭션으로 정상 작동합니다.
        이유: A가 시작될 때 프록시가 이미 트랜잭션을 열었기 때문에, B에서 수행하는 DB 작업도 A의 트랜잭션 안에서 수행됩니다.
    상황 2: 메소드 A와 B 모두 @Transactional이 있는 경우
        결과: A의 트랜잭션 설정만 적용됩니다.
        이유: B에 붙은 @Transactional 설정(예: REQUIRES_NEW)은 프록시를 통하지 않으므로 아예 읽히지 않습니다. 
             B는 그냥 A 트랜잭션의 일부로 실행됩니다.
    상황 3: 메소드 A에는 없고, B에만 @Transactional이 있는 경우
        결과: 트랜잭션이 적용되지 않습니다.
        이유: 외부에서 A를 호출할 때 프록시는 A에 트랜잭션 설정이 없으므로 아무 일도 하지 않습니다. 이후 내부에서 B를 호출해도 프록시를 거치지 
             않으므로 트랜잭션은 끝까지 시작되지 않습니다. 이 경우 update/delete 시 TransactionRequiredException이 발생할 수 있습니다.

 2. 접근 제어자 제약 (Public 메서드만 가능)
  1) 프록시의 구조적 한계
   - 프록시는 외부에서 들어오는 요청을 대신 받아주는 역할입니다. 그런데 private 메서드는 외부(프록시 객체)에서 접근 자체가 불가능하므로 가로챌 수 없습니다.
  2) 스프링의 의도
   - 스프링은 비즈니스 로직의 '진입점'이 되는 인터페이스나 공개된 메서드에만 트랜잭션을 거는 것을 권장합니다.
 3. final 키워드 사용 제한
  - 스프링은 기본적으로 CGLIB라는 라이브러리를 사용해 타겟 클래스를 상속받은 프록시를 만듭니다.
    - 클래스가 final이면 상속이 불가능합니다.
    - 메서드가 final이면 오버라이딩(재정의)이 불가능합니다.
    
 [ 해결방법 ]
 1. 서비스 분리                      : 트랜잭션이 필요한 로직을 별도의 서비스 클래스로 뽑아내서 주입받아 사용합니다. (가장 깔끔한 방법)
 2. 자기 자신 주입(Self-Injection)    : (권장되지는 않지만) @Autowired를 통해 자기 자신의 프록시를 주입받아 호출합니다.
 3. AspectJ 사용                    : 프록시 방식이 아닌, 컴파일 시점이나 클래스 로딩 시점에 아예 바이트코드를 조작하는 AspectJ Weaving 방식을 사용하면
                                     위 제약들을 모두 무시할 수 있습니다. 하지만 설정이 복잡합니다.

 [속성]
 Propagation.REQUIRED : 트랜잭션이 병합된다.
 Propagation.REQUIRED_NEW : 트랜잭션이 분리된다. / 별도의 트랜잭션을 생성한다.
    예외를 처리해주지 않으면 콜스택을 하나씩 제거하면서 최초 호출한곳까지 예외가 전파된다. 이러면 분리된 트랜잭션에 상관없이 호출한곳들도 전부 롤백이다.

@Aspect , @Component
 [ AOP 등록할때 사용하는 어노테이션 ]
 - 특징 : HTTP 요청뿐만 아니라, 자바 코드 내에서 특정 메서드가 실행되는 모든 순간에 개입할 수 있습니다.
 - 용도 : 실행 시간 측정, 트랜잭션 처리(@Transactional), 특정 메서드 보안 검사 등.
 
@Qualifier : 자동 주입 가능한 빈이 두 개 이상이면 자동 주입할 빈을 지정할 수 있는 방법이 필요하다.

@EnableBatchProcessing
```

2\. @RequestBody
------------------
```
클라이언트에서 서버로 필요한 데이터를 요청하기 위해 JSON 데이터를 요청 본문에 담아서 서버로 보내면, 
서버에서는 @RequestBody어노테이션을 사용하여 HTTP 요청 본문에 담긴 값들을 자바객체로 변환시켜, 객체에 저장한다.
```

3\. @Configuration , @Bean
------------------
```
@Configuration   : 설정파일을 만들기 위한 애노테이션 or Bean을 등록하기 위한 애노테이션이다
- Spring 컨테이너 초기화 시 스캔됩니다.
- @Configuration클래스 내부의 @Bean 메서드는 싱글톤
    - 싱글톤 보장원리 : 라이브러리를 이용해서 @Configuration이 붙은 클래스를 상속한 임의의 클래스를 만들고, 그 임의의 클래스를 빈으로 등록한다.
      빈으로 등록된 클래스 내부의 @Bean 메서드들을 스프링 컨테이너에 존재하는지를 따져서 싱글톤을 보장받는다.

@Bean의 경우 개발자가 컨트롤이 불가능한 외부 라이브러리들을 Bean으로 등록하고 싶은 경우에 사용합니다.

```

4\. @Component
------------------
```
@Configuration, @Controller, @Service, @Repository 등의 애노테이션들은 @Component 애노테이션을 포함하고 있습니다.
```

5\. properties 읽어오기
------------------
```
1) @Value( "${jdbc.url}" )
2) @ConfigurationProperties(prefix = "mail")
3) @ConfigurationPropertiesScan 
4) @ConfigurationPropertiesScan("com.baeldung.configurationproperties")
```

4\.
------------------
```
```

4\.
------------------
```
```

4\.
------------------
```
```

4\.
------------------
```
```