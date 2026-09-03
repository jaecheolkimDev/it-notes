JPQL ( Java Persistence Query Language )
======================

1\. JPQL ( Java Persistence Query Language )
--------------
여러 조건을 통해 검색을 하는 방법이 필요했고, 그래서 JPQL이 개발되었습니다.
```
1) 테이블이 아닌 엔티티 객체를 대상으로 검색하는 객체지향 쿼리, 쿼리를 String 형태로 작성하고 있다는 문제점이 있음.
2) SQL을 추상화 했기 때문에 특정 벤더에 종속적이지 않음
3) DTO를 사용하려면 new를 통해 패키지명을 입력하고 생성자를 생성해줘야한다.
4) Entity 별칭은 필수적으로 명시해야 합니다.
```