JAVA Stream
=============

0\. 함수형 언어
--------
```
- 스칼라나 히스켈과 같은 소위 함수형 언어들은 전혀 다른 방법으로 null 문제를 해결한다.
  자바가 '존재하지 않는 값'을 표현하기 위해서 null을 사용했다면, 이 함수형 언어들은 '존재할지 안 할지 모르는값'을 표현할 수 있는 별개의 타입을 
  가지고 있다.
  그리고 이 타입은 존재할지 안 할지도 모르는 값을 제어할 수 있는 여러가지 API를 제공하기 때문에 개발자들은 해당 API를 통해서 간접적으로 
  그 값에 접근한다.
  JAVA8은 이러한 함수형 언어의 접근 방식에서 영감을 받아 java.util.Optional<T>라는 새로운 클래스를 도입했다.
- Optional은 '존재할 수도 있지만 안 할수도 있는 객체', 즉 'null이 될 수도 있는 객체'를 감싸고 있는 일종의 래퍼 클래스이다.
  원소가 없거나 최대 하나 밖에 없는 Collection이나 Stream으로 생각해도 좋다.
  직접 다루기에 위험하고 까다로운 null을 담을 수 있는 특수한 그릇으로 생각하면 이해가 쉽다.
- 자바의 Stream API는 컬렉션(List, Set, Map 등)이 비어 있는 상태(Size가 0인 상태)일 때 연산을 수행해도 절대 NullPointerException(NPE)을 
  발생시키지 않도록 설계되어 있습니다.
```

1\. 변환
--------
```
1) List<Long>을 List<String>으로 변환하는 가장 효율적이고 현대적인 방법
    List<String> stringList = longList.stream()
                                  .map(String::valueOf) // String.valueOf(long) 호출
                                  .collect(Collectors.toList());
                                  
2) Iterable -> List 변환  (java.lang.Iterable<Object> -> java.util.List<Object>)
    java.util.List<Object> list = com.google.common.collect.ImmutableList.copyOf(iterable);
    
3) List를 객체배열 로 변경.
    sortOrderList.stream().toArray(Order[]::new)

4) List를 Map으로 변환
   Map<String, List<BusinessInfo>> businessInfoListMap = businessInfoList.stream().collect(//
   Collectors.groupingBy(p -> p.getBizCode()));

   	Map<Long, List<Long>> distinctWorkflowIdMap = params.stream().collect(//
   			Collectors.groupingBy(VerificationDTO::getWorkflowId, Collectors.mapping(VerificationDTO::getActivityId, Collectors.toList())));
   			
   	Map<Long, List<WorkflowDeployDtlDto>> undefinedWorkflowDeployItem = cndtSrchAttrs.stream().collect(//
   			Collectors.groupingBy(CndtSrchAttrDto::getObjectId, Collectors.mapping(e -> {
   				WorkflowDeployDtlDto w = new WorkflowDeployDtlDto();
   				return w;
   			}, Collectors.toList())));
   			
    List<Object[]> resultList = dao.findDuplicateSqlTemplateCodes();
    Set<String> resultSet = resultList.stream()
        .map(objArray -> (String) objArray[0]) // Object를 String으로 캐스팅
        .collect(Collectors.toSet());          // Set으로 변환 (자동 중복 제거)
            
    // resultList는 List<Object[]> 타입
    List<String> uniqueValues = resultList.stream()
        .map(row -> row[23])                           // 24번째 값 추출
        .map(String::valueOf)                          // String으로 변환
        .collect(Collectors.toList());                 // 다시 List로 변환
        
    // LIST를 MAP으로 변환
    Map<String, String> templateMap = rdsTemplateList.stream()
        .collect(Collectors.toMap(
            RdsTemplateEntity::getRdsTemplateCode,   // Key Mapper
            RdsTemplateEntity::getRdsTemplateScript  // Value Mapper
        ));
```


2\. 정렬
-----------
```
1) List 의 한 항목에 대한 내림차순
    polnDatList = polnDatList.stream()
                    .sorted((b, a) -> Integer.parseInt(a.getPolyNo()) - Integer.parseInt(b.getPolyNo()))
                    .collect(Collectors.toList());

2_ List 의 한 항목에 대한 오름차순
    polnDatList = polnDatList.stream()
                    .sorted((a, b) -> Integer.parseInt(a.getPolyNo()) - Integer.parseInt(b.getPolyNo()))
                    .collect(Collectors.toList());

3) 다수의 조건 정렬.[정렬기준 : 1. 대출잔액이 많은것(내림차순) > 2.증권번호 빠른것(오름차순)]
    polnDatList = CollectorsUtils.sorted(polnDatList, Comparator.comparing(PolnDatDTO::getLoanBlmt).reversed()
                    .thenComparing((a, b) -> Integer.parseInt(a.getPolyNo()) - Integer.parseInt(b.getPolyNo())));

4) 다수의 조건 정렬.[정렬기준 : 1. 종료일자(오름차순) 2.원천세종류코드(오름차순)]
    whtxPrcsLisListInqyRslt = CollectorsUtils.sorted(whtxPrcsLisListInqyRslt,
                                Comparator.comparing(WhtxPrcsLisListInqyRsltDTO::getTaxCaltEndDate)
                                .thenComparing(WhtxPrcsLisListInqyRsltDTO::getWhtxKindCode));

5) null이 없을 경우 1건에 대한 정렬.
    Collections.sort(result, (a, b) -> a.getChngType().compareTo(b.getChngType()));
```


3\. DTO에서 한 항목 추출
--------
```
  List<Long> cndtSrchIdList = list.stream().map(e -> e[5]).collect(Collectors.toList());
  List<Long> acttIdList = list.stream().map(e -> e.getActivityId()).collect(Collectors.toList());
```


4\. findFirst , findAny
--------
findAny() : Stream에서 가장 먼저 탐색되는 요소 리턴
findFirst() : 조건에 일치하는 요소들 중에 Stream에서 순서가 가장 앞에 있는 요소 리턴
```
- filter와 findFirst 사용해서 단건 검색.
  HmsCodeEntity hpfTarget = hpfSource.stream().filter(e -> e.getCode().equals(afteCode)).findFirst().orElse(null);
  HmsCodeEntity hpfTarget = hpfSource.stream().filter(e -> e.getCode().equals(afteCode)).findAny().orElse(null);

- filter를 사용해서 List 검색.
  List<HmsCodeEntity> hpfTarget = hpfSource.stream().filter(e -> e.getCode().equals(afteCode)).collect(Collectors.toList());
```


5\. 옵션
--------
```
    .filter(java.util.Objects::nonNull)                  // null 값 제거
    .filter(row -> row != null && row.length > 23) // 24번째 값(index 23)이 존재하는지 확인
    .distinct()                                // 중복 제거
```