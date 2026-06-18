Spring Batch 공부 노트
=================

```
JOB -> STEP -> TASKLET
```

1\.개념
---------------
```
Chunk(청크)   : 대용량 데이터를 한 번에 처리하지 않고, 특정 개수(Chunk Size)만큼 묶어서 처리하는 트랜잭션/커밋 단위를 의미합니다.
```

2\. 정합성이 어긋나는 경우
------------------
```
공유 자원: 스레드 안전(Thread-safe)하지 않은 공유 객체(ItemReader, ItemWriter, ItemProcessor 내 변수 등)를 사용할 경우 데이터가 꼬이게 됩니다.
 => lock을 걸거나.
 => 분리해서 처리할 수 있는것끼리 분리.
 
*** 정합성 : 데이트들의 값이 서로 모순 없이 일치하는 상태 ***
```

3\. Reader
------------------
```
JdbcPagingItemReader : 각 페이지마다 새로운 쿼리를 실행하므로 페이징시 결과를 정렬하는 것이 중요합니다. 
                       데이터 결과의 순서가 보장될 수 있도록 order by 가 권장됩니다.
```

4\. 배치 메타 테이블
------------------
```
1) 메타 데이터가 적재되는 시점
데이터는 배치 작업의 생명주기에 따라 실시간으로 적재 및 업데이트됩니다.
테이블명                            적재/업데이트 시점                                      주요 내용
BATCH_JOB_INSTANCE              Job이 처음 실행될 때 생성                                Job 이름과 파라미터의 조합으로 고유 인스턴스 기록
BATCH_JOB_EXECUTION             Job 실행 시작 시 생성, 종료 시 업데이트                    실행 상태(STARTED, COMPLETED, FAILED), 시작/종료 시간
BATCH_JOB_EXECUTION_PARAMS      Job 실행 시 함께 저장                                   Job 호출 시 전달된 파라미터 값들
BATCH_STEP_EXECUTION            각 Step 시작 시 생성, Chunk 커밋 시 및 종료 시 업데이트     읽기/쓰기 횟수, 커밋/롤백 횟수, Step 상태
BATCH_JOB_EXECUTION_CONTEXT     Job 실행 도중 또는 종료 시                               데이터 공유를 위한 Context 정보 (직렬화된 객체)
BATCH_STEP_EXECUTION_CONTEXT    Step 실행 도중 또는 종료 시                              각 Step의 개별 상태 정보

2) DDL 쿼리 위치
스프링 배치 의존성 내부에 각 DB별 기본 생성 스크립트가 포함되어 있습니다. 이를 참고해서 컬럼 사이즈만 살짝 수정해 사용하시면 편리합니다.
    - 위치: org/springframework/batch/core/schema-*.sql (라이브러리 jar 파일 내부)
    
3) 스프링 배치 4.2.1
BatchConfigurer.java를 구현한 설정 파일의 getJobRepository메소드에서 DB관련 설정(스키마, isolation level, prefix 등)을 세팅.
```

5\. Chunk
------------------
```
스프링 배치(Spring Batch)의 청크(Chunk) 지향 프로세스에서 Reader와 Writer는 필수입니다. 반면 Processor는 없어도 괜찮습니다.

Reader: 데이터를 한 건씩 읽어옵니다.
Processor: 읽어온 데이터를 가공/변형합니다. (선택 사항)
Writer: Chunk 단위로 쌓인 데이터를 일괄 저장하거나 출력합니다.
```

6\. Tasklet
------------------
```
만약 데이터를 읽고 쓰고 가공하는 정형화된 비즈니스 로직이 아니라, 단순히 단순 DB Update 쿼리 하나만 실행하거나, 특정 API 하나만 호출하고 끝나는 
작업이라면 Chunk 구조 대신 Tasklet을 사용하는 것이 맞습니다.
```