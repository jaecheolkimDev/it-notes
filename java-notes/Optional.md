JAVA Optional 공부 노트
==========================================================================================================================================================================

1\. 
-------------------

```
1) NULL이면 ""으로 세팅.
    String result = Optional.ofNullable(str).orElse("");
2) List(null이면 빈List 세팅.)
  List<String> resultList = Optional.ofNullable(aList).orElseGet(() -> Collections.emptyList());
3) List(null이면 null 세팅.)
  List<String> resultList = Optional.ofNullable(aList).orElse(null);
```