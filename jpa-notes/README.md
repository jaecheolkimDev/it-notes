JPA 공부 노트
===========================================


1\. 데이터베이스 초기화 전략 - DDL AUTO 옵션
-----------------------
```
spring.jpa.hibernate.ddl-auto 옵션을 통해 애플리케이션 구동 시 JPA의 데이터베이스 초기화 전략을 설정할 수 있습니다.
- none          : 사용하지 않음
- create        : 기존 테이블 삭제 후 테이블 생성
- create-drop   : 기존 테이블 삭제 후 테이블 생성. 종료 시점에 테이블 삭제
- update        : 변경된 스키마 적용
- validate      : 엔티티와 테이블 정상 매핑 확인
```

2\. 기본키 생성 전략 - @GeneratedValue
-----------------------
```
- GenerationType.AUTO(default)  : JPA 구현체가 자동으로 생성 전략 결정 
- GenerationType.IDENTYITY      : 기본키 생성을 데이터베이스에 위임
- GenerationType.SEQUENCE       : 데이터베이스 시퀀스 오브젝트를 이용한 기본키 생성
- GenerationType.TABLE          : 키 생성용 테이블 사용
```