SAX(Simple API for XML) 파서
=================

1\. 개념
-------------------
```
XML 문서를 한 줄씩 순차적으로 읽으며 이벤트(요소의 시작, 끝, 텍스트 발견 등)가 발생할 때마다 데이터를 처리하는 이벤트 기반 파서입니다.
```

2\. 핸들러 클래스
-------------------
```
SAX 파서를 구현하려면 XML의 이벤트를 감지할 DefaultHandler를 상속받는 핸들러 클래스가 필요합니다.
```

3\. 대용량 처리
-------------------
```
DOM 파서처럼 문서 전체를 메모리에 올리지 않기 때문에 대용량 XML 파일을 처리할 때 매우 효율적입니다.
```

4\. 구현
-------------------
```
    // 1. SAX 파서 팩토리 객체 생성 (싱글톤 패턴 기반)
    SAXParserFactory factory = SAXParserFactory.newInstance();
    
    // 2. 팩토리를 통해 실제 SAX 파서 객체 생성
    SAXParser saxParser = factory.newSAXParser();
    
    // 3. XML 이벤트를 처리할 커스텀 핸들러 객체 생성
    UserHandler handler = new UserHandler();
    
    // 4. 파서에게 XML 파일과 핸들러를 전달하여 파싱 시작 (내부적으로 순차적 읽기 진행)
    saxParser.parse(new File("users.xml"), handler);
```

5\.
-------------------
```
```

6\.
-------------------
```
```