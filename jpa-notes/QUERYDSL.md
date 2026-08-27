Querydsl
======================

JPA를 사용할때 동적쿼리나 복잡한 쿼리들을 자바로 만들어 낼 수 있도록 도와주는 라이브러리.
JPQL의 단점을 보완해서 문자가 아닌 코드로 작성함.

1\. 타입 안정성(Type Safety) - QClass(QEntityName.java)
--------------
```
Querydsl의 핵심은 "타입 안정성(Type Safety)"인데, 이를 가능하게 해주는 것이 바로 자동 생성된 QClass(QEntityName.java)입니다.
- QClass 생성 확인: 설정을 마친 후, IDE에서 Maven -> Lifecycle -> compile을 실행해 보세요.
  보통 target/generated-sources/annotations 경로에 QEntityName.java 파일들이 생성됩니다.
- pom.xml 에서 generate해야 하는 파일들이 있다면 수행해줘야 함. (ex. Q클래스)
  - Maven > Generate Sources and Update Folders For All Projects
  
  
1. 왜 QClass가 꼭 필요한가요?
일반적인 JPQL은 문자열로 쿼리를 작성합니다.

"select m from Member m where m.username = :name" (오타가 있어도 실행 전까지 모름)

반면, Querydsl은 자바 코드로 쿼리를 짭니다.

queryFactory.selectFrom(member).where(member.username.eq(name)).fetch();

여기서 member.username처럼 엔티티의 필드에 접근할 수 있게 해주는 객체가 바로 QClass입니다. 컴파일 시점에 내 엔티티를 분석해서 "쿼리 전용 클래스"를 미리 만들어두는 것이죠.

2. 빌드 과정에서 일어나는 일
Maven compile을 실행하면 다음과 같은 순서로 진행됩니다.

APT(Annotation Processing Tool)가 작동합니다.

프로젝트 내의 @Entity 어노테이션을 찾습니다.

target/generated-sources/java (또는 annotations) 폴더에 엔티티와 1:1 대응되는 QEntityName.java 파일을 생성합니다.

이제 개발자는 이 QClass를 가져와서(import) 자바 코드만으로 쿼리를 작성할 수 있게 됩니다.

3. 실무 팁: IDE 설정
compile 명령어를 매번 치기 귀찮다면, 사용하는 IDE(IntelliJ 등)에서 해당 생성 폴더를 Source Root로 인식시켜야 합니다.

IntelliJ 기준: File > Project Structure > Modules에서 target/generated-sources/annotations 폴더를 선택하고 Tests나 Sources 탭을 눌러 색상을 (보통 파란색) 변경해 주면 IDE가 코드를 자동 완성해 줍니다.

4. 제대로 생성됐는지 확인하는 법
컴파일 후 아래 경로를 확인해 보세요.

target/generated-sources/annotations/{엔티티 패키지 경로}/QMember.java

만약 이 파일이 없다면 pom.xml 설정(특히 classifier: jakarta)이나 maven-compiler-plugin 설정이 꼬인 것입니다.
```