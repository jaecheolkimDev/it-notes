Elasticsearch 공부 노트
======================

1\. 애널라이저(Analyzer)
--------------
문자열(text)을 토큰으로 변환시켜주는 장치.
```
애널라이저(Analyzer)는 내부적으로 캐릭터 필터(character filter), 토크나이저(tokenizer), 토큰 필터(token filter)라는 걸 활용해 
문자열을 토큰으로 변환시킨다.

1) 캐릭터 필터(character filter)     : 문자열을 토큰으로 자르기 전에 문자열을 다듬는 역할을 한다. (ex. HTML 태그를 제거)
    1-1) "html_strip"       : HTML 태그 제거하기
2) 토크나이저(tokenizer)             : 문자열을 토큰으로 자르는 역할을 한다. (ex. 문장 부호를 기준으로 자름)
3) 토큰 필터(token filter)          : 잘린 토큰을 최종적으로 다듬는 역할을 한다. (ex. 특별한 의미를 가지지 않는 단어 제거)
    3-1) "lowercase"        : 대소문자 구분없이 검색하는 방법
    3-2) "stop"             : 검색할 때 필요없는 불용어(a, an, the, or, but) 제거하기
    3-3) "stemmer"          : 단어의 형태(-ed, -ing, -s 등)에 상관없이 검색하는 방법
    3-4) "synonym"          : 동의어로 검색하는 방법 (Custom Analyzer)

* standard analyzer는 charcater filter는 설정되어 있지 않고, tokenizer는 standard로 설정되어 있고, token filter는 lowercase인 
  애널라이저를 뜻한다. 
```

2\. Nori(노리) Analyzer
--------------
한글은 한글 전용 Analyzer인 Nori(노리) Analyzer를 써야 한다. (한글은 조사(-는, -를), 어미(-다, -해요)를 붙여서 쓰는 말이 많다.
그리고 띄어쓰기가 비교적 자유롭다. 그러다보니 standard tokenizer로 단어를 나눠보면 제대로 잘 나누지 못하는 문제가 생긴다.)
```
1) 캐릭터 필터(character filter)
2) 토크나이저(tokenizer)
3) 토큰 필터(token filter)
    3-1) "nori_part_of_speech"      : 의미 없는 조사(을, 의 등), 접속사 등을 제거
    3-2) "nori_readingform"         : 한자를 한글로 바꿔서 토큰으로 저장
    
* 영어에서 쓰는 필터 다 사용 가능.
```

11\.
--------------
```
```

11\.
--------------
```
```

11\.
--------------
```
```