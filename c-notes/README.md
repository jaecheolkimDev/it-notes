C언어
======================

1\. 기본
--------------
```
- 컴파일 언어 : 컴파일 돼야 실행 가능
- 컴파일 과정 :  1) 전처리기
                  => 매크로로 정의한 숫자를 치환하고 필요한 파일을 불러옵니다. (확장자는 .i로 바뀐다.)
               2) 컴파일러가 컴파일을 한다.
                  => 고수준인 C언어를 저수준인 어셈블리어로 바꾼다. (확장자는 .s로 바뀐다.)
               3) 어셈블러가 어셈블리어를 기계어로 바꾼다.
                  => 0과 1로 이루어진 기계어로 구성된다. (확장자는 .o로 바뀐다.)
               4) 링커가 링킹을 한다.
                  => 여러가지 라이브러리나 다른 소스 코드를 연결한다. (확장자는 .exe로 바뀐다.)
- 전처리기(preprocessor) : 프로세스 실행전에 먼저 처리하는것.
- 어셈블리어 : 명령어가 기계어랑 1대1 매칭이 되기 때문에 기계어랑 가장 가까운 언어입니다.

- extern : 다른 소스 파일(외부)에 선언된 전역 변수 사용 키워드
  - 외부 변수를 사용할 프로그램에서 재선언 해야함.
    - ex1) extern 자료형 전역변수
    - ex2) extern 반환값자료형 함수이름(매개변수 자료형)


- & : 주소값
  - ex) int num = 3;
  - int result = add(num);
  - printf("num = %d, result = %d", num, result);
    - (경우1) add함수가 변수의 값을 받아 사용하는 경우의 결과 : num = 3, result = 4
    - (경우2) add함수가 변수를 직접 사용하는 경우의 결과 : num = 4, result = 4
      - 프로그램을 작성하는 사람 입장에서는 당연히 (경우1)을 생각한다.
      - 따라서 함수에 값을 줄 때, 그 변수의 값만을 사용하게 한다.
      - 하지만 경우에 따라 num의 값을 실제로 바꾸어야 할 수 있는데, 이 경우 변수의 주소를 값으로 넘겨주어 처리한다.


|종류|변환|설명|
|------|---|---|
|atoi   |char to int		|문자열을 정수 타입으로		|
|atof	|char to double		|문자열을 실수 타입으로		|
|atol	|char to long int	|문자열을 long 정수 타입으로	|

|종류|if|return|
|------|---|---|
|1(true)   |if(!0) , if(1) , if(2) , ... , if(235)    |return 0; // 정상종료|
|			|										|return 1이상	// 정상종료 되었으나 다른 무엇을 나타냄.|
|0(false)  |if(0) , if(!1)							  |return -1이하	// 에러발생|
```

2\. 심화
--------------
```
```

3\. 응용
--------------
```
```

4\. 미정리
--------------
```
- oracle pro*c(.pc) : C 언어를 사용하여 오라클 데이터베이스에 접근하는 프로그램을 개발하기 위한 오라클의 전용 프리컴파일러
  - oracle pro*c preprocessor 로 실행하면 c파일이 생성되고 gcc등으로 컴파일하면됨.
  - 일반적인 c언어 : 		   .c => .o => 실행파일
  - PRO*C : 		.pc => .c => .o => 실행파일

- memcpy(복사되는 공간의 첫번째 시작주소, 복사할 메모리의 첫번째 시작주소, 복사할 크기)
  - ex) char Love[10] = {"I Love You"};
  - char Hate[10] = {"I Hate You"};
  - memcpy(Love+1, Hate+1, 4);
  - Love -> I Hate You

- memcmp(메모리 블록을 가리키는 포인터1, 메모리 블록을 가리키는 포인터2, 비교할 바이트 수)
  - -> 같으면 0 리턴, 다르면 0 아닌값 리턴
    - ex) memcmp(custGradCode,"VIP",3)

- memset(포인터, 설정할값, 크기)
  - -> '포인터'에 '크기'만큼 '값'이 설정됨.
    - ex) char rslt[1+1];
    - memset(rslt, 0x00, sizeof(rslt));	// rslt에 rslt의 크기만큼 NULL값이 세팅됨.(초기화인거같음)

- strcpy(복사를 받을 대상의 시작 주소, 복사를 할 원본의 시작 주소)
  - -> 원본문자열을 대상문자열의 위치로 복사.
  - -> 중복하면 엎어쳐짐.(이어붙지 않음.)
  - -> 대상 문자열 전체를 복사한다.
    - ex) char s1[10] = "Hello";
    - char s2[10];
    - strcpy(s2, s1);
    - printf("%s", s2);	// Hello

- strncpy(복사를 받을 대상의 시작 주소, 복사를 할 원본의 시작 주소, 복사를 할 문자의 개수)
  - -> 대상 문자열을 일정 길이만큼 복사한다.

- strcmp(s1, s2);
  - -1 : ASCII 코드 기준으로 s1<s2,
  - 0 : ASCII 코드 기준으로 같을때,
  - 1 : ASCII 코드 기준으로 s1>s2,

- strncmp(s1, s2, n);
  - s1:비교할 문자열1
  - s2:비교할 문자열2
  - n:비교할 문자열 길이
    - 문자열 길이의 최대길이를 넘는 n의 값은 문자열 전체길이로 간주한다.

- strcat(s1, s2) : 문자열을 연결한다.
  - s1:최종문자열
  - s2:붙일문자열
    - ex) char s1[10] = "World";
    - char s2[20] = "Hello";
    - strcpy(s2, s1);
    - printf("%s", s2);	// HelloWorld

- strtok(str, delimiters) : char*을 tokenize하여 분할할 때 사용하는 함수.
  - str : 분할하려고 하는 C string
  - delimiters : 분할하기 위한 기준 character
  - 만약 분할이 되어 토큰이 존재한다면 token의 시작 pointer를 반화하고 아닐 시 null pointer를 반환한다.
  - null pointer를 반환했다는 것은 C string의 끝위치라고 생각하면 된다.
    - ex) char s1[30] = "The Littel Prince";
    - char *token = strtok(temp, "^");                   // 보종코드 세목 7자리를 자른다
    - while (token != NULL) {
    -       printf("%s\n", token);
    -       token = strtok(NULL, " ");
    - }
      - 결과
      - The
      - Littel
      - Prince

- sprintf : 서식(format)을 지정하여 문자열을 만든다.
  - sprintf(배열, 서식, 값);
  - sprintf(배열, 서식, 값1, 값2, ...);
  - int sprintf(char* const_Buffer, char const* const_Format, ...);
    - ex) sprintf(s1, "%c %d %f %e", 'a', 10, 3.2f, 1.123456e-21f);	// 문자, 정수, 실수를 문자열로 만듦
    - printf("%s\n", s1);	// a 10 3.200000 1.123456e-21: 문자열 s1 출력
    

extern : 다른 소스 파일(외부)에 선언된 전역 변수 사용 키워드
외부 변수를 사용할 프로그램에서 재선언 해야함.
- extern 자료형 전역변수
- extern 반환값자료형 함수이름(매개변수 자료형)

1 : true
0 : false
true : if(!0) , if(1) , if(2) , ... , if(235)
false : if(0) , if(!1)

return 0; // 정상종료
1; // 1이상 : 정상종료 되었으나 다른 무엇을 나타냄.
-1; // 에러발생
-2; // 1이상,-2이하 : 구체적인 에러메시지를 보여줌.
-> return 1이상은 종료하지않고 다음로직을 실행한다.
```