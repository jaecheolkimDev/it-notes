Spring Lombok
=================
Java 기반에서 기계적으로 작성하는 VO, DTO, Entity 관련 작업을 보다 쉽게 하게 해주는 도구.

1\.개념
---------------
```
Getter, Setter, ToString, hashCode 관련 메소드 작업 관련 Class 코드를 깔끔하게 작성할 수 있다.
Spring(STS) 프로젝트에서 사용할 경우 JPA 환경과 함께 일관화 되고 가독성이 좋은 애플리케이션을 작성할 수 있다.
- 단점 : 협업 모든 인원이 lombok을 설치해야 한다.
  추가 어노테이션 사용할 경우 소스코드 분석이 난해해진다.
- @Data , @Getter , @Setter , @ToString , @EqualsAndHashCode , @Builder , @NonNull
- @Getter , @Setter
  - 필드 선언
  - 클래스에 선언하면 모든 필드에 접근자와 설정자가 자동으로 생성된다.
- @ToString (exclude 속성은 특정 필드를 toString 결과에서 제외시킨다.)
  - 클래스에 선언
- @Data (모든 필드를 대상으로 어노테이션을 한꺼번에 설정해줌.)
  - 클래스에 선언
```
