DB TYPE
=============

1\. TYPE
--------
```
오라클에서
    SYSDATE         : DATE 타입으로 초(second)까지 저장하지만,
    SYSTIMESTAMP    : TIMESTAMP 타입으로 나노초(nanosecond) 단위까지 저장
    NUMBER          : JAVA에서는 BigDecimal로 자동 매핑하기 때문에 다른 타입으로 받으면 ClassCastException 발생.
```

2\. DATE
-----------
```
1) 날짜 조회시 TO_CHAR 사용    : TO_CHAR(DATE타입 컬럼, 'YYYYMMDD') = '20260630'
```

3\. TIMESTAMP 
--------
```
1) 범위 조회시 TO_DATE 사용    : TIMESTAMP타입 컬럼 < TO_DATE('20260401', 'YYYYMMDD')
```

4\. 
--------
```
```

5\. 
--------
```
```

6\. 
--------
```
```