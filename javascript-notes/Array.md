Array 문법
=============

1\. 
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
//          조건에 맞는 데이터가 없다면 빈 배열을 반환하게 됩니다.
const rejectedItems = trgtResults.filter(item => item.checkYn === 'N');

// map()    : 배열의 각 요소를 돌며 내가 원하는 형태로 변형(매핑)한 새로운 배열을 반환합니다.
const filteredList = originalList.map(item => {
  return {
    rdsLogicalName: item.rdsLogicalName,
    rdsPhysicalName: item.rdsPhysicalName
  };
});

// concat() : 둘 이상의 배열을 하나로 합쳐서 새로운 배열을 반환하는 메서드입니다.
//            원본 유지: 기존 배열을 변경하지 않고, 합쳐진 새로운 배열을 만들어 반환합니다.
//            다양한 인자: 배열뿐만 아니라 일반 값(숫자, 문자열 등)을 직접 전달하여 추가할 수도 있습니다.
array1.concat(array2);
num1.concat(num2, [5, 6], 7, 8);
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