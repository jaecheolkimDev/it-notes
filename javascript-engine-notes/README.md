Javascript engine 공부 노트
=====================
2023.07 NASHORN ISSUE : 최초 eval시 코스트가 커서 룰을 많이 쓰면 성능이슈가 있을 수 있음
- sheet 2만건(코드 10만 Line) eval에 5초걸림.


alternative plan : javet을 git에서 땡기고 문서 부분 튜토리얼 코드보고 우리의 프로젝트에 맞춰서 테스트 필요함.
- 호환성 테스트 : 기존 나숀에서 제공하던 기능을 자벳에서 다 실행 할 수 있는지?
- 프로토타이핑 수행


1. 자벳이 나숀처럼 자바의 클래스를 그대로 쓸 수 있는지?
   => 불가능 : 나숀은 자바스크립트 코드를 위장한 자바코드이고, 자벳은 V8 네이티브에서 실행되는 엔진이므로 동일하게 사용은 불가능하다.
   대안 : 자바에서 주입을 해야함.
   샘플코드 : TestRule.java(method:Java_and_JavaScript_Interop_1)

2. 동적으로 주입이 가능하면 설정파일이나 DB에 저장해놓으면되니 리플렉션 쓰면 될듯?
   => 테스트 완료.
   샘플코드 : TestRule.java(method:Java_and_JavaScript_Interop_2)

3. import나 require 사용이 가능한지?
   => 테스트 방법을 찾지 못함. 테스트시 오류 발생
   오류 형태 1) ReferenceError: require is not defined
   오류 형태 2) SyntaxError: Unexpected token 'export'
   오류 형태 3) ReferenceError: exports is not defined
   오류 형태 4) SyntaxError: Cannot use import statement outside a module

4. 한 파일에 서브 function이 다 들어가 있어야 하는지?
   => 테스트 완료 : 한 파일에 전부 있어도 되고, 여러 파일에 존재해도 된다.
   샘플코드(단일파일) : TestRule.java(method:testConsoleInterceptorRule7000)
   샘플코드(다수파일) : TestRule.java(method:Polyfill_2)

5. 파일방식? DB방식 어떤걸로 할건지?
   => 파일방식은 4번에서 테스트 했고, DB방식 테스트 위해 JPA 환경설정 완료 후 테스트 준비중.
   => 파일 저장안하는 방식으로 테스트가 필요함. 어떻게? DB에 호출구조가 있어야되지 않을까? (다방면 테스트를 위해)
   => 파일로 할지 DB로 할진 고민중..

6. 자벳이 Thread-safe 한지? 엔진이 서버 시작할때 한번 올라가는건지? 싱글톤방식인지?
   => 싱글톤이다. 서버 시작할때 한번 올려주고, 서버 내릴때 내려준다.
