JavaScript 문법 공부 노트
=============

1\. Array
--------
```
// find() 메서드는 주어진 판별 함수를 만족하는 첫 번째 요소의 값을 반환합니다. 그런 요소가 없다면 undefined를 반환합니다.
let find = result.find(e2 => e2.accountingTransactionTypeCode === e1.code );

/ param1 인덱스에 param2개 요소 제거하고 param3 추가 */
this.groupDataList.splice(0, 0, this.selectedTargetGroup)

// some()은 조건에 맞는 요소가 하나라도 있으면 즉시 순회를 멈추고 true를 반환하기 때문에 성능상 가장 유리합니다.
const hasLargeData = trgtResults.some(item => (item.srcOnlyCnt >= 1000 || item.trgtOnlyCnt >= 1000) );

// reduce() 메서드를 사용하면 배열을 순회하며 원하는 속성들의 합계를 아주 깔끔하게 계산할 수 있습니다.
// 초기값 0 설정 후 누적값 acc에 각 요소를 더함
const totalSum = trgtResults.reduce((acc, cur) => {
    return acc + (cur.srcOnlyCnt || 0) + (cur.trgtOnlyCnt || 0); }
, 0);

// forEach()를 이용한 직관적인 방법
trgtResults.forEach(item => {
  totalSum += (item.srcOnlyCnt + item.trgtOnlyCnt);
});

// filter() 총 몇 개인지 혹은 어떤 항목인지 정보가 필요하다면 이 방식이 좋습니다.
const rejectedItems = trgtResults.filter(item => item.checkYn === 'N');

```

2\. 템플릿 리터럴(Template Literal)
-----------
```
// \n 없이 그냥 엔터를 치면 되기 때문에 코드 가독성이 극대화됩니다.
const message = `
  안녕하세요, 고객님!
  요청하신 작업이 성공적으로 완료되었습니다.
  
  [안내 사항]
  - 점검 시간: 새벽 2시 ~ 4시
  - 문의 사항은 고객센터를 이용해 주세요.
`
```



3\. 
--------
```
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