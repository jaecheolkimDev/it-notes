Spring Annotation 공부 노트
=================

1\.@Annotations
------------------
```
### @Configuration , @Bean
@Configuration : Spring 컨테이너 초기화 시 스캔됩니다.
- @Configuration클래스 내부의 @Bean 메서드는 싱글톤
  - 싱글톤 보장원리 : 라이브러리를 이용해서 @Configuration이 붙은 클래스를 상속한 임의의 클래스를 만들고, 그 임의의 클래스를 빈으로 등록한다.
    빈으로 등록된 클래스 내부의 @Bean 메서드들을 스프링 컨테이너에 존재하는지를 따져서 싱글톤을 보장받는다.

@ConditionalOnProperty
- Spring Boot의 조건부 애노테이션으로, 특정 프로퍼티의 존재/값에 따라 @Configuration 클래스나 @Bean 등록을 활성화/비활성화합니다.

@ConfigurationProperties(prefix = "app")
- application.properties / application.yml 또는 환경 변수 등에서 특정 접두사(prefix)를 가진 설정 값을 자바 빈(POJO)에 바인딩(맵핑)해 주는 어노테이션

@ComponetScan(basePackages = {"com.example.service", "com.example.batch"})
- basePackages와 그 하위 패키지 전체를 스캔해서 "컴포넌트 후보"로 판단되는 클래스들은 전부 스프링 빈으로 등록

@EnableJpaRepositories
- JPA 리포지토리 인터페이스를 스캔하고 해당 인터페이스에 대한 구현체를 자동으로 생성하는 역할을 합니다.

@RestControllerAdvice
 1. 컨트롤러에서 수행 중 RuntimeException이 발생
 2. 컨트롤러가 결과를 리턴하기 전에 예외를 캐치
 3. 어드바이스에 정의된 상태 코드와 메시지로 클라이언트에게 응답
 ex) 400,500,503 등의 에러를 응답함
```
