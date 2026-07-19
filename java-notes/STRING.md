JAVA String
=================

1\. 
-----------
```
A.compareTo(B)
*  : A가 더 클때 -> 1
*  : B가 더 클때 -> -1
*  : 동일 -> 0
```

2\. StringJoiner    : 매번 조건문을 체크하거나 나중에 수동으로 자를 필요 없이 구분자(delimiter)를 자동으로 넣어주는 기능이다.
-----------
```
    StringJoiner joiner = new StringJoiner("\n");
    while(조건) {
        joiner.add(그 다음 라인);
    }
    return joiner.toString();
```

