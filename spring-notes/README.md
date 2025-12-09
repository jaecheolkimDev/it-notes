Spring 공부 노트
=================


OOP 패러다임을 가져간다는 의미는 객체들에게 적절한 책임과 역할을 부여하고, 이 객체들이 서로 협력관계를 맺어 주면서 객체망을 형성해 나간다는 것입니다.
객체들은 서로 message를 주고 받으면서 협력을 해 나갈 수 있습니다. 즉, 객체가 가지고 있는 책임을 수행해 주는 method를 호출 함으로써 message를 전달하는 것 입니다.
객체가 가지고 있는 책임들을 public하게 다른 객체에게 알려줄 수 있는 방법이 java에서 interface인 것입니다.
즉, 거대한 클래스, 거대한 메소드, 중첩된 if, else 문들로 뒤엉켜있는 스파게티 코드를 작성해 나가는 것이 아니라, 적절한 객체를 식별해 내고 그 객체에서 적절한 행위를 할 수 있게 하라는 것입니다.
설계를 할 때 다양한 패턴을 사용하는 것 보다, 복잡한 상속 구조를 만들어 나가는 것보다, 적절한 객체에게 절적한 책임과 역할을 부여해 나가는 것이 더 중요한 것 같습니다.
이렇게 설계된 객체망을 가지게 된다면 몇 가지 장점이 있습니다.
첫 번째는 테스트하기 쉬워집니다. 객체가 처리할 수 있는 message에 대해서, 즉 interface에 대해서만 테스트를 하면 되기 때문입니다.
객체와 협력관계를 맺고 있는 객체에 대해서는 mocking 처리를 하면 영향을 받지 않고 쉽게 단위 테스트를 작성 할 수 있습니다.


1.개념
---------------

> 컨테이너(Container) : 객체(Bean)를 생성·관리·소멸시키는 주체로, 프로그램 실행 중 객체의 생명주기를 대신 관리하는 공간.

> IoC (Inversion of Control, 제어의 역전) : 객체의 생성과 의존성 관리의 제어권을 개발자가 아닌 스프링 컨테이너에게 위임하는 개념
- → 즉, 객체를 new로 직접 만들지 않고 스프링이 대신 생성하고 주입

> DI (Dependency Injection, 의존성 주입) : 객체 간의 의존 관계를 코드 내부에서 직접 연결하지 않고, 외부(컨테이너)가 주입해주는 방식
- → IoC를 구현하는 구체적인 방법이며, IoC의 하위 개념
  - ex) @Autowired

> Bean : 스프링 컨테이너에 의해 관리되는 객체(인스턴스)
- → @Component, @Service, @Repository, @Controller 등의 어노테이션이나 @Bean 메서드로 등록됨

> BeanFactory : 가장 기본적인 IoC 컨테이너로, Bean의 생성·조회·관리만 담당하는 단순한 객체 공장.

> Spring Container : Bean을 생성, 관리, 소멸시키는 역할을 하는 IoC 엔진
- → 대표 구현체는 BeanFactory 와 ApplicationContext

> 스프링 컨텍스트(Spring Context) : 스프링의 전체 실행 환경을 지칭하는 포괄적인 개념

> Application Context : BeanFactory의 확장판으로, Bean 관리 + 환경 설정, 메시지 처리, 이벤트 발행, AOP 지원 등을 함께 제공하는 스프링의 핵심 컨테이너

> AOP (Aspect Oriented Programming, 관점 지향 프로그래밍) : 핵심 로직(Core Concern) 과 공통 로직(Cross-cutting Concern) 을 분리하여, 공통 기능을 횡단 관심사(Aspect) 로 관리하는 방식
- → 예: 로깅, 트랜잭션, 보안 처리 등

> POJO (Plain Old Java Object) : 스프링이 관리하는 Bean의 기본 형태로, 특정 프레임워크에 종속되지 않은 순수 자바 객체
- → 스프링은 POJO에 IoC, DI, AOP를 적용해 유연한 구조를 제공함




2.@Annotations
------------------

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
