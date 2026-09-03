JVM 옵션(JVM 파라미터)
=================

1\. 종류
-----------
이 접두사들은 자바 가상 머신(JVM)에게 "이 설정이 얼마나 표준적인지, 그리고 어떤 영역을 제어하는지"를 알려주는 규칙입니다.
```
종류  이름                      표준 여부               주요 용도                       특징
-D  프로퍼티 옵션 (Property)      표준 (Standard)       애플리케이션에 값(변수) 전달        "키-값(Key=Value) 형태로 사용하며, 소스 코드나 프레임워크가 이 값을 읽어 씀."
-X  비표준 옵션 (Non-Standard)   비표준 (Non-Standard)  "메모리(Heap, Stack) 크기 조절"    "모든 JVM에서 지원하지 않을 수 있으나, 대부분의 메이저 JVM(OpenJDK 등)은 호환됨."
-XX 고급/확장 옵션 (Advanced)     비표준 (Non-Standard)  "GC 알고리즘, 성능 튜닝, 디버깅"   JVM의 내부 동작을 세밀하게 제어함. 버전 업그레이드 시 예고 없이 사라지거나 바뀔 수 있음.
```

2\. -D 옵션 (System Property)
-----------
자바 프로그램 내부에서 사용할 '전역 변수'를 실행 시점에 등록하는 옵션입니다. 자바 코드(System.getProperty())나 스프링 환경설정
파일이 이 값을 인식합니다. 반드시 -D키=값 형태로 붙여서 써야 합니다.
```
-Dfile.encoding=UTF-8: 자바 애플리케이션의 기본 문자 인코딩을 UTF-8로 지정 (한글 깨짐 방지).
-Duser.timezone=Asia/Seoul: JVM의 기본 시간대를 한국 시간으로 고정.
-Dspring.profiles.active=prod: 스프링 부트에게 '운영(prod) 환경' 프로필을 사용하라고 지시.
```

3\. -X 옵션 (Non-Standard Options)
-----------
주로 JVM의 메모리 구조(Heap, Stack 등)의 크기를 정의할 때 사용합니다. 단위로 m(메가바이트)이나 g(기가바이트)를 뒤에 붙여서 사용합니다.
```
-Xms<크기> (Memory Start): 자바 힙(Heap) 메모리의 최초 시작 크기를 지정합니다. (Default. 1/64)
    예: -Xms1g (시작할 때 1GB 할당)
-Xmx<크기> (Memory Maximum): 자바 힙(Heap) 메모리의 최대 제한 크기를 지정합니다. 이 크기를 넘어가면 OutOfMemoryError(OOM)가 
                            발생합니다. (Default. 1/4)
    예: -Xmx2g (최대 2GB까지 증가 가능)
-Xss<크기> (Stack Size): 자바의 각 쓰레드(Thread)가 가지는 스택(Stack) 메모리 크기를 지정합니다. 너무 깊은 재귀 함수를 돌려 
                        StackOverflowError가 날 때 이 값을 늘리기도 합니다.
    예: -Xss1024k (쓰레드당 스택 크기를 1024KB로 설정)
-Xlog:gc* (Java 9 이상)
    : GC가 언제, 얼마나 일어났는지 상세히 기록합니다. 아까 보여주신 CPU 0% 구간이 정말 GC 때문인지 이 로그로 100% 확신할 수 있습니다.
```

4\. -XX 옵션 (Advanced Options)
-----------
JVM의 성능을 극한으로 쥐어짜거나, 메모리 청소부 역할을 하는 가비지 컬렉터(GC)를 교체/제어하는 등의 고급 설정에 사용됩니다.
작성하는 방식이 조금 독특합니다.
켜고 끌 때 (Boolean): -XX:+옵션명 (켜기), -XX:-옵션명 (끄기)처럼 +와 - 기호를 씁니다.
값을 지정할 때 (Value): -XX:옵션명=값 형태로 씁니다.
```
-XX:+HeapDumpOnOutOfMemoryError: 애플리케이션이 메모리 부족(OOM)으로 죽을 때, 원인 분석을 할 수 있도록 당시의 메모리 상태를 파일(.hprof)로 자동 저장(덤프)해 줍니다. (운영 환경 필수 옵션 중 하나)
-XX:HeapDumpPath=/log/dumps/: 위에서 말한 메모리 덤프 파일이 저장될 경로를 지정합니다.
-XX:+UseG1GC	G1 Garbage Collector 사용
    : 대용량 메모리에서 '끊김 현상'을 줄이는 최신 알고리즘입니다.
-XX:MaxGCPauseMillis	최대 GC 중단 목표 시간	기본 200ms. 
    : 이 값을 늘리면(예: 500) 배치의 전체 처리량이 좋아집니다.
-XX:InitiatingHeapOccupancyPercent	GC 시작 타이밍(IHOP)	
    : 힙이 몇 % 찼을 때 청소를 시작할지 결정합니다. (기본 45%)
-XX:G1HeapRegionSize=16M            : RegionSize를 16M로 설정
```

5\. System.getProperty() vs Environment.getProperty()
-----------
```
비교 항목   System.getProperty()            Environment.getProperty()
제공 주체   자바 표준 (JVM)                 스프링 프레임워크 (Spring)
탐색 범위   오직 -D 옵션 및 자바 기본 정보     -D 옵션 + OS 환경변수 + yml 파일 + 원격 Config
유연성     지정된 키가 없으면 무조건 null     대소문자 표기법이 조금 달라도(-나 _) 유연하게 찾아냄
추천 사용처  순수 자바 프로그램을 짤 때         스프링/스프링 부트 기반 프로젝트를 할 때 (적극 권장)
```

6\. 적용 시점
-----------
```
1) WAS 기동시
2) JAVA 프로그램 수행시
```

1\.
-----------
```
```

1\.
-----------
```
```

1\.
-----------
```
```

1\.
-----------
```
```