FreeMarker
=================

1\. 정의
-----------
```
Java 객체 데이터를 HTML, 이메일, XML 등의 텍스트 템플릿과 결합하여 최종 output을 만들어내는 자바 기반의 오픈소스 템플릿 엔진(Template Engine)입니다.
```

2\. 사용 사례
-----------
```
웹 애플리케이션의 MVC Pattern에서 View 영역을 담당하거나, 이메일 발송용 HTML 생성, 코드 자동 생성기 등 다양한 분야에서 사용됩니다.
```

3\. 기본 작동 원리
-----------
FreeMarker는 [템플릿] + [Data-Model] = [최종 출력물] 구조로 작동합니다.
```
1) Template (.ftl): 정적인 텍스트(HTML 등)에 FreeMarker 전용 태그가 포함된 파일
2) Data-Model (Java 객체): 템플릿에 주입할 자바 객체(Map, List, DTO 등)
3) Output: 두 개가 결합되어 생성된 최종 결과물 (HTML 문서, String, 파일 등)
```

4\. 핵심 자바 클래스 및 인터페이스
-----------
```
1) freemarker.template.Configuration
 - 역할: FreeMarker 설정 전체를 관리하는 핵심 Singleton 객체
 - 주요 기능: 템플릿 파일이 위치한 경로 지정, 인코딩 설정, 에러 처리 정책 설정, 템플릿 캐싱 관리
2) freemarker.template.Template
 - 역할: 로드된 개별 .ftl 템플릿 파일 하나를 나타내는 객체
 - 주요 기능: Configuration을 통해 읽어오며, 데이터 모델과 결합하여 결과를 렌더링
3) freemarker.template.TemplateModel
 - 역할: Java 객체(String, Map, List, DTO 등)를 FreeMarker 내부에서 인식할 수 있는 데이터 타입으로 변환/래핑하는 인터페이스
 - 보통 FreeMarker가 내부 ObjectWrapper를 통해 자동으로 변환해 주므로 직접 구현할 일은 적지만, 커스텀 변환이 필요할 때 활용됩니다.
4) freemarker.template.TemplateException
 - 역할: 템플릿 렌더링 도중 변수를 찾을 수 없거나 문법 오류가 발생했을 때 던져지는 예외 클래스
```

5\. FreeMarker 템플릿 주요 문법 (.ftl)
-----------
FreeMarker 템플릿 내부에서 사용하는 대표적인 태그 및 표기법입니다.
```
구분                  문법 예시                                           설명
Interpolation (출력)  ${user}                                          Java에서 넘어온 user 변수 값 출력
Conditional (조건문)   <#if user??>${user}<#else>손님</#if>             user 존재 여부 확인 후 출력 (??는 null 체크)
Loop (반복문)          <#list skills as skill> - ${skill} </#list>     List/Collection 순회
Assign (변수 선언)      "<#assign title = ""반갑습니다"">"               템플릿 내부 전용 변수 선언
Include (템플릿 포함)    "<#include ""header.ftl"">"                    다른 ftl 파일 조립
Default Value (기본값) "${user!""GUEST""}"                             "user가 null일 경우 ""GUEST"" 출력"
```

6\. 주요 특징 및 장단점
-----------
```
1) 장점
 - Java 종속성 분리: JSP와 달리 Java 코드를 직접 쓸 수 없어, UI와 비즈니스 로직의 분리가 매우 명확합니다.
 - 범용성: Web 환경뿐만 아니라, 일반 자바 데스크톱 앱, 배치 프로그램(이메일 발송 등)에서도 파일/문자열 생성용으로 자유롭게 쓰입니다.
 - 속도 및 캐싱: 템플릿을 사전 컴파일 및 캐싱하여 처리 속도가 빠릅니다.
2) 단점 / 유의점
 - Null 처리에 엄격하여, 변수가 null이거나 없을 때 기본값(!) 처리나 null 체크(??)를 안 해주면 TemplateException이 발생합니다.
 - Thymeleaf에 비해 HTML 원본 그대로 프리뷰하기가 까다롭습니다 (Thymeleaf는 Natural Template 지원).
```

7\.
-----------
```
```

7\.
-----------
```
```

7\.
-----------
```
```