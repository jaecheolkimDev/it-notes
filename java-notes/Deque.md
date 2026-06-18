JAVA Deque 공부 노트
=================
ArrayDeque는 스택(Stack)과 큐(Queue)의 기능을 모두 가진 Double-Ended Queue(Deque)입니다.

1\. 사용 이유
-------------------
```
자바 공식 문서(JavaDoc)를 보면, 기존의 Stack 클래스는 Vector를 상속받아 멀티쓰레드 환경을 고려한 synchronized가 걸려 있어 성능상 약간 무겁습니다. 
알고리즘 문제를 풀거나 단일 쓰레드 환경에서 스택이 필요하다면 ArrayDeque를 사용하는 것이 업계 표준(Best Practice)입니다.

    1. 스택(Stack)으로 사용 시 (LIFO)     : 가장 윗부분(앞부분)을 입구이자 출구로 사용합니다. Stack 클래스를 완벽히 대체합니다.
        push(e) : 맨 앞에 추가 (용량 초과 시 예외)
        pop()   : 맨 앞 요소 제거 및 반환 (비어있으면 예외)
        peek()  : 맨 앞 요소 확인만 함 (비어있으면 null)
    
    2. 큐(Queue)로 사용 시 (FIFO)        : 뒤로 넣고 앞으로 빼는 전형적인 줄 서기 방식입니다.
        offer(e)    : 맨 뒤에 추가 (성공 시 true, 실패 시 false)
        poll()      : 맨 앞 요소 제거 및 반환 (비어있으면 null)
        peek()      : 맨 앞 요소 확인만 함 (비어있으면 null)
    
    3. 양방향 자유자재 사용 (Deque 전용)   : ArrayDeque의 진면목입니다. 앞(First)과 뒤(Last)를 명시적으로 지정합니다.
        구분	        추가 (Add/Offer)	            제거 (Remove/Poll)	        확인 (Get/Peek)
        앞 (First)	addFirst(), offerFirst()	removeFirst(), pollFirst()	getFirst(), peekFirst()
        뒤 (Last)	addLast(), offerLast()	    removeLast(), pollLast()	getLast(), peekLast()
```

2\. 함수
-------------------
```
add, remove, get 계열은 실패 시 예외(Exception)를 던지고, 
offer, poll, peek 계열은 실패 시 특정한 값(null 또는 false)을 반환합니다. 
실무에서는 후자가 예외 처리에 더 안전합니다.

isEmpty(): 비어있는지 확인 (가장 자주 씁니다.)
size(): 현재 담긴 요소의 개수
clear(): 모든 요소 제거
contains(o): 특정 요소가 포함되어 있는지 확인 ($O(n)$)
```
