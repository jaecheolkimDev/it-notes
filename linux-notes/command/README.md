리눅스 명령어 공부 note
======================

1\. 리눅스 명령어 정리
--------------
0) 주요 명령어
```
  clear : 터미널 화면을 깔끔하게 지우고 싶을 때
  pwd(print working directory) : 현재 디렉터리 경로를 출력
  
  ctrl + 방향키(→, ←)
  alt + 방향키(→, ←)
  ctrl + c : 작업 중단, 작업 취소 
  ctrl + insert : 복사하기
   - wsl은 powershell에서 실행하기 때문에 ctrl+c
  shift + insert : 붙여넣기
   - wsl은 powershell에서 실행하기 때문에 ctrl+v
  tab : 자동완성
  tab + tab : 자동완성 후보
  ↑,↓ : 이전에 썼던 명령어 불러오기
  
  head -n -1 원본파일.txt | tail -n 10000 > 새파일.txt
    -> 리눅스 파일을 마지막 라인위에 1만줄만 잘라서 복사하기
    
  df -h     : 파일 시스템의 전체 용량, 사용량, 남은 용량을 MB/GB 단위로 표시
  
  jobs      : 백그라운드로 실행 중인 작업 목록 조회.
  fg        : 다시 포그라운드로 가져오기
  crontab -l    : 스케줄러 설정 확인
```
1) cd(change directory) : 디렉터리 이동
```
- 정의: `cd`는 경로 입력, 상대경로, 절대경로를 기반으로 현재 작업 디렉터리를 이동시키는 명령어.
- 사용 예시:
    - `$ cd /`: 리눅스 최상위(루트) 디렉토리로 이동하는 명령어
    - `$ cd ~`: 홈 디렉토리로 이동
    - `$ cd ..`: 현재 디렉터리 경로에서 상위 디렉터리(..)로 이동
    - `$ cd /var/log/apt`: /var/log/apt라는 곳으로 경로 이동
```

8) grep
```
#### grep — 텍스트에서 특정 패턴을 검색하는 명령어(패턴·대상·옵션이 구성요소)
- 정의: `grep`은 검색 패턴, 대상 파일, 옵션(-i, -r 등)을 활용해 텍스트를 필터링하는 명령어.

- 주요 옵션:
    - `-r`  : 하위 디렉토리 전체 검색
    - `--exclude-dir={lib,log,tmp}` : 제외할 디렉토리 
    
- 사용 예시:
    - `$ ls -al | grep media`                       : ls -al의 출력값 중에서 media가 들어간 문장만 출력
    - `$ ls -al | grep bin`                         : ls -al의 출력값 중에서 bin이 들어간 문장만 출력
    - `$ cat README | grep Alternatively`           : cat의 출력값 중에서 Alternatively가 들어간 문장만 출력
    - `$ cat README | grep you`                     : cat의 출력값 중에서 you가 들어간 문장만 출력
    - `$ sudo apt list --installed | grep python`   : |(파이프라인) 앞 쪽 명령어의 출력값 중에서 python이 들어간 문장만 출력
    - `$ ps aux | grep amazon`                      : 실행 중인 모든 프로세스 조회 후 amazon만 검색
    - `$ grep -r --exclude-dir={lib,log,tmp} "transactionManager" .`    : 하위 디렉토리를 검색하면서 제외할 디렉토리들 추가
    - `$ ps -ef | grep nginx`                       : 특정 이름의 프로세스 찾기 (예: 'nginx' 프로세스)
    - `$ grep "MIN(" hgw.log`                       : 파일에서 특정값 찾기
    
# 'nginx' 프로세스의 PID만 깔끔하게 확인하기
pgrep nginx
```

10) ls(list) : 현재 디렉터리 내부에 있는 파일 조회
```
#### ls — 디렉터리의 내용(파일 및 하위 디렉터리)을 나열하는 명령어(옵션·경로가 구성요소)
- 정의: `ls`는 옵션과 경로를 사용하여 디렉터리 내 파일 및 디렉터리 목록을 출력하는 명령어.
    - 기본적으로 현재 디렉터리의 내용을 나열.

- 주요 옵션:
    - `-a`: 숨김 파일(점(.)으로 시작하는 파일 포함)을 표시.
    - `-l`: 파일의 상세 정보(권한, 소유자, 크기, 수정 시간 등)를 표시.
    - `-h`: 파일 크기를 사람이 읽기 쉬운 형식(예: KB, MB)으로 표시(단독 사용 불가, `-l`과 함께 사용).
    - `-R`: 하위 디렉터리의 내용까지 재귀적으로 나열.
    - `-t`: 수정 시간 기준으로 파일을 정렬.
    - `-S`: 크기가 큰 순서대로 정렬.

- 사용 예시:
    - `$ ls`: 현재 디렉터리의 파일 및 디렉터리 목록 출력.
    - `$ ls -a`: 숨김 파일 포함 목록 출력.
        리눅스에서는 점(.)으로 시작하는 파일명을 가진 파일은 저절로 숨김 파일로 인식해 처리된다. (ex. .env, .gitignore 등)
    - `$ ls -l`: 파일의 상세 정보 출력.
     - 첫 10글자가 파일 유형과 권한을 의미함.
     - 이 후 파일의 소유자와 파일의 소유그룹 등을 확인 할 수 있다.
     - $ ls -l first.sh # first.sh에 대한 파일 세부 정보 확인하기
    - `$ ls -lh`: 사람이 읽기 쉬운 형식으로 파일 크기 표시.
    - `$ ls -R`: 하위 디렉터리까지 모든 내용 출력.
    - `$ ls -lt`: 수정 시간 기준으로 정렬된 파일 목록 출력.
    - `$ ls -ltr`: 가장 오래된 파일이 맨 위에 표시.
    - `$ ls -lhS`: 파일 크기 순으로 보기.
```

12) TMOUT
```
#### TMOUT — 셸 세션의 자동 로그아웃 시간을 설정하는 환경 변수
- 정의: `TMOUT`은 자동 로그아웃 시간(초)을 설정하는 환경 변수로, 사용자가 지정된 시간 동안 아무 작업도 하지 않을 경우 셸 세션을 자동으로 종료합니다.
    - `TMOUT=0`: 자동 로그아웃을 비활성화.
    - `TMOUT=[숫자]`: 숫자(초)로 설정된 시간 동안 입력이 없으면 자동 로그아웃.

- 사용 방법:
    - `$ export TMOUT=300`: 5분(300초) 동안 입력이 없으면 자동 로그아웃.
    - `$ export TMOUT=0`: 자동 로그아웃 비활성화.

- 주의사항:
    - `TMOUT`은 현재 셸 세션에만 적용되며, 영구적으로 적용하려면 설정 파일(`~/.bashrc` 또는 `~/.bash_profile`)에 추가해야 합니다.
    - 예: `echo "export TMOUT=300" >> ~/.bashrc`

- 사용 예시:
    - `$ export TMOUT=600`: 10분 동안 입력이 없으면 자동 로그아웃.
    - `$ export TMOUT=0`: 자동 로그아웃 기능 비활성화.
```

16) kill
```
kill 명령어는 이름 그대로 프로세스를 '죽이는(종료시키는)' 명령어입니다. 좀 더 정확하게는 실행 중인 프로세스에게 특정 '신호(Signal)'를 보내는 역할을 합니다.
기본적으로 아무런 옵션 없이 kill을 사용하면 프로세스에게 종료 신호를 보내고, 이 신호를 받은 프로세스는 정상적으로 종료 절차를 수행합니다.

- 주요 시그널:
    시그널 번호	시그널 이름	설명
    15	        SIGTERM	    정상 종료를 요청합니다. 프로세스가 스스로 종료를 준비할 시간을 줍니다 (기본값).
    9	        SIGKILL	    강제 종료를 명령합니다. 프로세스가 무시할 수 없는 강력한 종료 명령입니다.
    💡 팁: 옵션을 지정하지 않으면 자동으로 SIGTERM (15번)이 사용됩니다.

- 사용 예시:
    - `$ kill [시그널 옵션] [PID]`
    - `$ kill -9 $(lsof -t -i:80)`    : 80번 포트를 사용하는 PID를 찾아 한꺼번에 종료
```


18) nohup(no hang up, 끊지마!)   : 터미널을 닫아도 프로세스가 계속 유지함
```
nohup이라는 명령어로 프로그램을 실행시키면 nohup.out이라는 파일에 로그가 쌓이게끔 작동한다.
$ nohup java -jar linux-springboot-0.0.1-SNAPSHOT.jar >> result.log 2>&1 &
 - nohup.out 파일이 아닌 다른 파일에 로그가 남도록 만들기
```


19) curl : 특정 주소로 API 요청을 보낼 때 사용하는 명령어
```
# GET 형식
$ curl http://example.com/api/data

# POST 형식
$ curl -X POST http://localhost:8080/api/users \
     -H "Content-Type: application/json" \
     -d '{"name": "홍길동", "email": "gildong@example.com"}'

# PUT 형식
$ curl -X PUT http://localhost:8080/api/users/1 \
     -H "Content-Type: application/json" \
     -d '{"name": "홍길동", "email": "gildong@example.com"}'
     
# 등등

그런데 위 예시를 보면 GET 요청을 제외하고는 명령어가 다소 복잡하기 때문에, 간단하게 GET 요청으로만 API를 테스트하면 될 때에만 curl을 사용한다.
- 서버가 잘 작동하는 지 API 요청 보내보기 

$ curl localhost:8080                               : Spring Boot 서버가 내부에서 잘 실행되고 있는 지 체크
$ curl https://jsonplaceholder.typicode.com/posts   : 샘플 API 주소
```



21) tee : 표준입력(stdin)으로 들어온 데이터를 파일에 저장하면서 동시에 표준출력(stdout)으로도 출력하는 명령어
```
$ 명령어 | tee 파일명 : 파이프(|)를 통해 전달된 데이터를 받아 파일에 기록하고, 동시에 터미널 화면에도 출력한다

- 사용 예시:
    - `$ echo "hello" | tee test.txt`   : 문자열을 test.txt에 저장하면서 화면에도 출력한다.
    - `$ echo "<h1>Hello Nginx 1</h1>" | tee index.html`   : 문자열을 index.html에 저장하면서 화면에도 출력한다.
```


22) snap : 다양한 리눅스 배포판에서 동일한 소프트웨어를 최신 버전으로, 쉽고 안전하게 설치 및 관리하기 위해서입니다.
```
- Snap은 우분투(Ubuntu)를 개발한 캐노니컬(Canonical)에서 만들었지만, CentOS, RHEL, Fedora 등 다른 RPM 기반 리눅스 배포판에서도 
  EPEL(Extra Packages for Enterprise Linux) 저장소를 통해 설치하여 사용할 수 있습니다.
- CentOS 9에서 snap 명령어를 사용하려면 snapd라는 데몬을 설치하고 활성화해야 합니다.

1) EPEL 저장소 설치 및 업데이트
    $ sudo yum install epel-release -y
    $ sudo yum upgrade -y

2) snapd 설치
    $ sudo dnf install snapd -y

3) snapd 소켓 활성화 : 설치 후, 시스템 소켓을 활성화해야 snap이 정상 작동합니다.
    $ sudo systemctl enable --now snapd.socket

4) 심볼릭 링크 생성 (필요시)  : 전통적인 snap 지원을 위해 /var/lib/snapd/snap과 /snap을 연결합니다.
    $ sudo ln -s /var/lib/snapd/snap /snap

5) 재부팅 또는 로그아웃/로그인  : snap의 경로를 시스템이 인식하도록 하기 위해 1회 재부팅을 권장합니다.
```


23) sed (Stream Editor) : sed는 파일을 열지 않고도 텍스트를 검색, 치환, 삭제할 수 있는 도구입니다. 주로 문자열 치환에 가장 많이 쓰입니다.
```
주요 특징
    비대화형: 편집기를 직접 열지 않고 명령행에서 바로 처리합니다.
    파이프라인(|): 다른 명령어의 출력 결과를 받아 즉석에서 수정할 때 강력합니다.

사용 예시
    문자열 치환: test.txt 파일에서 "apple"을 "banana"로 바꿀 때
        $ sed 's/apple/banana/g' test.txt
    특정 줄 삭제: 3번째 줄만 지우고 싶을 때
        $ sed '3d' test.txt
```


24) awk (Aho, Weinberger, Kernighan) : awk는 제작자 세 명의 이름 앞 글자를 딴 도구입니다.
    텍스트를 하나의 데이터베이스처럼 취급하여, 각 줄을 필드(열)로 나누어 처리합니다.
```
주요 특징
    필드 단위 처리: 공백이나 탭으로 구분된 열을 $1, $2 같은 변수로 자유롭게 다룹니다.
    프로그래밍 기능: 조건문(if), 반복문(for), 산술 연산이 가능합니다.

사용 예시
    특정 열만 출력: /etc/passwd 파일에서 사용자 이름(1번째 열)만 보고 싶을 때 (구분자 : 기준)
        $ awk -F: '{ print $1 }' /etc/passwd
    조건부 필터링: 3번째 열의 값이 500 이상인 줄만 출력할 때
        $ awk '$3 >= 500 { print $0 }' data.txt
```


25) find
```
- 주요 옵션:
    - `-name`       : 파일/폴더 이름 검색
    - `/`           : 검색을 시작할 최상위 경로입니다.
    - `-prune`      : 특정 디렉토리를 검색 대상에서 제외
    - `-o`          : OR연산자
    - `-print`      : 결과를 화면에 출력합니다.
    - `2>/dev/null` : 에러 메시지를 숨깁니다.
사용 예시
    $ sudo find / \( -path "/mnt" -o -path "/proc" -o -path "/sys" \) -prune -o -name "*SNAPSHOT*" -print 2>/dev/null
        : /mnt 뿐만 아니라, 시스템 검색 시 리소스 낭비가 심한 /proc이나 /sys도 함께 넣는 것이 일반적입니다.
    $ find . -type f -exec du -h {} + 2>/dev/null | sort -rh | sed -n '1,20p'
        : `. -type f`           : 현재 위치부터 파일인 것만 모두 찾습니다.
        : `-exec du -h {} +`    : 찾은 파일들을 묶어서(+) du -h(용량을 사람이 읽기 편한 KB, MB, GB 단위로 출력) 명령어를 실행합니다.
        : {}는 find가 찾은 파일들의 목록이 들어가는 자리입니다.
        : | (파이프): 앞의 명령어(find/du)에서 나온 출력 결과를 뒤의 명령어(sort)로 넘겨줍니다.
        : `sed -n '1,20p'`      : sed첫 번째 줄부터 20번째 줄까지만 출력
```


26) sort
```
- 주요 옵션:
    -`r`    : (reverse) 용량이 큰 순서대로 내림차순 정렬합니다.
    -`h`    : (human-readable) 숫자의 단위(K, M, G)를 인식하여 올바른 크기 순으로 정렬합니다.

- 사용 예시:
    - `$ echo Hello, World!`: "Hello, World!" 출력.
```