JAVA List
=================

1\. 
-----------
```
1) List에서 조건에 만족하는 항목들 삭제.
    polnDatList.removeIf(e -> StringUtils.isEmpty(e.getStlmMeanSuid()));
   
2) 초기화와 동시에 넣는 방법
    List<Long> longList = Arrays.asList(1L, 2L, 3L);
```