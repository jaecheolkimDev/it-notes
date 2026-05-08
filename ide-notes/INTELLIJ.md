IntelliJ 공부 note
======================

1\. 인코딩(Encoding) 설정
-----------------------
```
전체 설정 확인 (Global Settings)
    1) Settings/Preferences (Ctrl + Alt + S) → Editor → File Encodings
        - Global Encoding: UTF-8
        - Project Encoding: UTF-8
        - Default encoding for properties files: UTF-8로 설정하고 
          옆의 Transparent native-to-ascii conversion 체크박스를 체크하는 것이 좋습니다.
```

2\. 자주 사용하는 단축키
-----------------------
```
1. ctrl + alt + ←,→  : 포커스 뒤로/앞으로 가기(이전 커서가 있던 화면으로 돌아갈 때 유용 , 클래스 이동도 가능)
2. shift + shift     : 전체 찾기
   ctrl + n          : 클래스 찾기
   ctrl + shift + n  : 파일명 찾기
3. ctrl + shift + f  : 프로젝트 전체에서 특정 문자열 검색
4. ctrl + alt + shift + j  : 같은 단어 한번에 선택하기
   alt + j                 :같은 단어 자동으로 선택
5. ctrl + ctrl       : Run Anything
6. ctrl + f          : 문자 찾기(파일)
   ctrl + shift + f  : 문자 찾기(전체)
7. ctrl + r          : 문자 바꾸기(파일)
   ctrl + shift + r  : 문자 바꾸기(전체)
8. ctrl + alt + shift + l    : 정렬
9. alt + f7           : 메소드 호출 위치 찾는 주요 단축키
   ctrl + alt + h
   ctrl + shift + h
   ctrl + b(ctrl + click)
10. ctrl + g          : 라인 이동


구현체로 이동 : ctrl + alt + b 2번
커서 이동 : ctrl + alt + 방향키
부대지정 : ctrl + shift + 1~9
- 부대지정(알파벳도 가능) : ctrl + f11
- 부대지정(바로가기) : ctrl + shift + f11
  JavaDoc
- 전체(생성/삭제) : ctrl + alt + shift + ; / ctrl + alt + shift + z
- 선택(생성/삭제) : alt + shift + ; / alt + shift + z
  호출 메소드 추적 : ctrl + alt + h
```

3\. 1회성 단축키
-----------------------
```
1) Alt + 7      : Strure 탭 열기 (해당 클래스의 변수, 메소드 한 눈에 보임)
```

4\. Stash(스태시)
-----------------------
작업 중인 변경 사항을 커밋하지 않고 잠시 따로 보관해두는 기능
```
1. 사용법
Stash 만들기 (보관하기)
 1) 상단 메뉴에서 Git -> Uncommitted Changes -> Stash Changes...를 선택합니다.
 2) Message 칸에 나중에 알아보기 쉬운 이름을 적습니다 (예: "로그인 기능 작업 중").
 3) Create Stash 버튼을 누르면 끝! (목록에서 파일들이 사라지며 워킹 디렉토리가 깨끗해집니다.)
Unstash 하기 (불러오기)
 1) 상단 메뉴에서 Git -> Uncommitted Changes -> Unstash Changes...를 선택합니다.
 2) 보관했던 목록 중 복구할 항목을 선택합니다.
 3) Pop Stash를 누르면 불러오면서 목록에서 삭제되고, Apply Stash를 누르면 불러온 뒤에도 보관함에 남겨둡니다.
 
 
2. 트러블슈팅
 1) .gitignore에 설정 파일들을 추가해놓지 않고 변경내용을 stash했을때 프로젝트 구조 인식 못하는 현상 발생
  - IDE종료 후 bash창으로 프로젝트 경로로 이동 후 아래 명령어 수행
  - bash : $ git reset --hard HEAD
  - 변경내용 stash취소 수행
  - `오류 발생 : 추적 중지된 파일으로 인해 스태시 취소할 수 없음` stash에 동일한 파일이 있다는거니 오류 발생한 파일을 삭제
  - 다시 변경내용 stash취소 수행

```

5\. .gitignore에 설정 파일 추가 
-----------------------
```
추가 후 `bash : $ git rm -r -f --cached .idea/` 명령어 입력을 통해 git 추적중이던 캐시를 삭제
```