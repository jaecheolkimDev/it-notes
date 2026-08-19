SQL 쿼리 처리 과정 (Query Processing Steps)
=============

1\. 과정
--------
SQL 문장이 Database에 전달되면 내부적으로 다음 5단계 과정을 거쳐 실행됩니다.
```
[SQL 입력] ──> 1. 파싱(Parsing) ──> 2. 최적화(Optimization) ──> 3. 컴파일/생성 ──> 4. 캐싱(Caching) ──> 5. 실행(Execution)
```

6\.
--------
```
1) 문법 검사 및 파싱 (Parsing)
 - 문법 검사 (Syntax Check): SQL 문법에 오류가 없는지 확인합니다.
 - 의미 검사 (Semantic Check): 요청한 테이블이나 컬럼이 실제로 존재하는지, 접근 권한이 있는지 확인합니다.
 - 파싱 트리 (Parse Tree) 생성: 쿼리 문장을 DB가 이해할 수 있는 트리 형태로 변환합니다.

2) 최적화 (Optimization) — 옵티마이저(Optimizer) 역할
 - 옵티마이저가 작동하는 구간입니다.
 - 데이터를 가장 효율적이고 빠르게 가져오는 최적의 경로(실행계획, Execution Plan)를 수립합니다.
 - 인덱스 사용 여부, 테이블 스캔 방식(Full Table Scan vs Index Scan), 조인 순서 등을 통계 정보를 바탕으로 판단합니다.

3) 컴파일 및 실행계획 생성 (Compilation)
 - 옵티마이저가 만든 실행계획을 DB 엔진이 실행할 수 있는 기계어/실행 코드(Executable Code) 형태로 변환합니다.

4) 실행계획 캐싱 (Plan Caching / Library Cache)
 - 방금 생성한 파싱 정보와 실행계획을 메모리(캐시)에 저장합니다.
 - 동일한 쿼리가 들어오면 1~3단계를 생략하고 캐시된 실행계획을 재사용하여 속도를 높입니다 (이를 Soft Parsing이라고 합니다).

5) 실행 및 스캔 (Execution & Fetch)
 - 실행 엔진(Execution Engine)이 실행계획에 따라 디스크/메모리 블록을 스캔(Scan)하여 데이터를 읽어옵니다.
 - 최종 처리된 결과 집합(Result Set)을 사용자에게 반환합니다.
```

6\.
--------
```
```

6\.
--------
```
```

6\.
--------
```
```