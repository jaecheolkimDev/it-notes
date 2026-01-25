Querydsl 공부 노트
===========================================


1\. 타입 안정성(Type Safety) - QClass(QEntityName.java)
-----------------------
```
Querydsl의 핵심은 "타입 안정성(Type Safety)"인데, 이를 가능하게 해주는 것이 바로 자동 생성된 QClass(QEntityName.java)입니다.
- QClass 생성 확인: 설정을 마친 후, IDE에서 Maven -> Lifecycle -> compile을 실행해 보세요.
  보통 target/generated-sources/annotations 경로에 QEntityName.java 파일들이 생성됩니다.
- pom.xml 에서 generate해야 하는 파일들이 있다면 수행해줘야 함. (ex. Q클래스)
  - Maven > Generate Sources and Update Folders For All Projects
```