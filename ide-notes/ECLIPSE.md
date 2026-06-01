Eclipse 공부 note
======================

1\. 단축키
-----------------------
```
```


2\. Heap 메모리 사용량 확인
-----------------------
```
Window > Preferences > General > 'Show heap status'체크 후 Apply/OK
```

3\. git 사용법
-----------------------
```
변경사항 저장소 소스로 돌리는방법.
    우클릭 > Replace With > HEAD Revision >
    Discard all uncommitted changes for the selected resources?(선택한 리소스에 대해 커밋되지 않은 변경 내용을 모두 삭제하시겠습니까?)
    untracked files will be ignored.(추적되지 않은 파일은 무시됩니다.)
    the launch configuration 'hpf-app - application' is currently running and uses a project of this repository.(시작 구성 'hpf-app - application'이 현재 실행 중이며 이 저장소의 프로젝트를 사용합니다.)
    > Discard Changes(변경사항 삭제)
```

4\. 디버깅
-----------------------
```
1) Step Into (F5) - 한단계식 수행
2) Step Over (F6) - 함수단위 수행
3) Step Return (F7) - 호출한 곳으로 되돌아가기

브레이크포인트 베이스로 한단계/함수단위임 , 전체기반으로 한단계/함수단위 아님.!!!
F6으로 함수단위로 건너뛰다가 문제가 발생한만한곳에서는 F5로 한단계씩 들어가야됨.

[디버깅 모드로 Run할때]
- JVM을 디버그 모드로 구동한 후, 런타임이 종료되지 않은 상태에서(WAS를 띄어놓은 것과 같은 상태) 클래스 파일의 변경이 감지되면 JVM 재시작 없이 변경된 클래스파일을 교체하는
  'hot code replace' 기능을 제공한다.('hot deploy' 또는 'hot swap'이라고도 한다.)
  수정한 내역을 바로 반영해서 디버그를 할 수 있게 해주는 기능이다.
  Some code changes cannot be hot swapped into a running virtual machine, such as changing method names or introducing errors into running code.
  The current target virtual machine [~~~~] from launch [main] was unalbed to replace the running code with the code in the workspace.
  It is safe to continue running the application, but you may notice discrepancies when debugging this application.
  Reason: Hot code replace failed - Scheme change not implemented
```

5\. 
-----------------------
```
```

6\. Maven
-----------------------
기존 Maven프로젝트를 다른곳에 import
```
1) 프로젝트를 통째로 다른곳에 import할 때, Build Path에 Maven Dependencies가 없을 때가 있다.
2) 프로젝트 우클릭 > Maven > Update Project...
3) 프로젝트 우클릭 > Run As > Maven install

참고) https://docu94.tistory.com/119
```
로컬 참조 방법
```
프로젝트 우클릭 > Maven > 
    > Enable Workspace Resolution/Enable Maven Nature 이면 로컬 참조후 jar (이게 disable상태이다.)
    > Disable Workspace Resolution/Disable Maven Nature 이면 무조건 jar를 참조 (이게 enable상태이다.)
```