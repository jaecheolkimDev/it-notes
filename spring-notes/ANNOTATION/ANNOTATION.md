Spring Annotation
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
 
@RestControllerAdvice, @ControllerAdvice
 용도 :   전역 예외 처리(Error Handling), 응답 데이터 공통 포맷 설정.
 특징 :   모든 컨트롤러에서 발생하는 에러를 한곳으로 모아 처리합니다.
         사용자가 따로 호출하지 않아도 에러가 나는 순간 스프링이 이 빈을 찾아 실행합니다.
 1. 컨트롤러에서 수행 중 RuntimeException이 발생
 2. 컨트롤러가 결과를 리턴하기 전에 예외를 캐치
 3. 어드바이스에 정의된 상태 코드와 메시지로 클라이언트에게 응답
 ex) HTTP 상태 코드를 응답함
 
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

6\. @PersistenceContext(unitName = "user")
------------------
자바 JPA(Java Persistence API)에서 특정 데이터베이스 설정(영속성 유닛)과 연결된 EntityManager를 주입받기 위해 사용한다.
주로 여러 개의 데이터베이스를 사용하거나, 별도의 설정 파일로 분리된 JPA 환경이 있을 때 명시적으로 대상을 지정하기 위해 사용합니다.
```
1) unitName = "user"
    일반적으로 프로젝트에 데이터베이스가 하나라면 @PersistenceContext만 적어도 되지만, 하나의 애플리케이션에서 여러 DB를 동시에 
    다룬다면 unitName으로 구분을 한다.

2) @Autowired 와 비교
구분      @PersistenceContext         @Autowired
정체      JPA 표준 어노테이션            스프링 프레임워크 어노테이션
유연성     다른 프레임워크로 이식 가능     스프링에 종속적
동작 방식  트랜잭션 범위 내 프록시 주입    빈을 찾아 직접 주입
추천      JPA를 명확히 표현하므로 권장    스프링 환경에서 간편해서 사용
```

7\. @EnableJpaRepositories
------------------
Spring에게 JPA Repository 빈(Bean)들을 활성화하고 탐색하라고 지시하는 어노테이션입니다.
```
단일 DB를 쓸 때는 Spring Boot가 자동으로 다 잡아주기 때문에 생략해도 되지만, DB가 2개 이상일 때는 어떤 Repository가 
어떤 DB를 바라보아야 하는지 명확히 구분해야 하므로 이 어노테이션이 필수적으로 사용됩니다.
```

4\.
------------------
```
```

4\.
------------------
```
```