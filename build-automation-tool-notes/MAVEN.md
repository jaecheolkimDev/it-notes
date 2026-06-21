MAVEN
===========================================


1\. MAVEN 사용시
----------------
```
- 빌드, 테스트, 배포를 자동화 해주는 도구입니다.
- 라이브러리 관리(설치 , 삭제 , 다운로드)
- 메이븐은 빌드과정을 쉽게 구현할 수 있도록 도와준다.
- 원래 라이브러리 추가하려면 다운받고 폴더에 넣어주고 Build Path에 넣어주고 해야 하는데 이를 간단하게 해줌.
  해당 프로젝트를 다른 컴퓨터에서 사용하려고하면 Build Path에 저장된 경로를 바꿔줘야지 오류를 해결 할 수 있는 번거로움이 있었다.
  하지만, 메이븐을 통해서 쉽게 라이브러리를 추가하고 저장할 수 있게 되었다.

이클립스는 기본적으로 자바 소스 코드의 변경이 발생하면 해당 프로젝트를 자동으로 빌드하게 된다.
이클립스는 빌드시 컴파일 과정에서 프로젝트의 모든 소스코드를 컴파일 하지 않고 수정된 java파일과 그에 관련된 내역들만 컴파일 함으로써 빌드시간을 줄인다.

deploy는 install과 비슷하다.(OS에서 작동하는 소프트웨어는 대개 install이라함.)
WAS같은 컨테이너에서 작동하는 어플리케이션이나 재사용 리파지토리에 저장되는 서비스모듈에 대해서는 deploy라고 한다.

- Force Update of Snapshots/Releases : 의존성 업데이트를 강제로 함.
- 힙이 춤추면 이클립스 껐다 키는게 제일 빠름.(빌드하는 지름길)
- 프로젝트를 열고 있을경우에는 jar파일 라이브러리로 인식하지 않고 프로젝트를 라이브러리로 인식한다.
- 메이븐에서는 아티팩트를 저장소에 올리는걸 deploy.라고 부른다.
  그래서 메이븐 처음 접하면서 오해하게 되는게 메이븐이 웹어플리케이션을 WAS에 배포하는 것까지 간단하게 해준다고 생각한다.
  절대 아니다.
  
버전 확인 : 파일 > 설정 > 빌드, 실행, 배포 > 빌드 도구 > Maven
```


2\. compile
----------------
```
인텔리제이에서 Maven의 compile 라이프사이클을 실행하는 것은 단순히 "코드를 기계어로 바꾸는 것" 이상의 복합적인 작업을 포함합니다.

Maven은 단계별로 정해진 일(Phase)을 수행하는데, compile 단계에 도달하기 위해 이전 단계들을 차례대로 거칩니다.

주요 과정은 다음과 같습니다.

1. 자바 소스 코드 컴파일 (compile)가장 핵심적인 기능입니다. 
   src/main/java에 있는 .java 파일들을 읽어서 target/classes 폴더에 .class 파일(바이트코드)로 변환하여 저장합니다.
2. 리소스 파일 복사 (process-resources)컴파일 직전에 수행됩니다.
   src/main/resources에 있는 설정 파일들(application.properties, yml, xml 등)을 target/classes 폴더로 복사합니다. 
   그래야 실행 시점에 클래스패스에서 설정 파일을 읽을 수 있기 때문입니다.
3. 어노테이션 프로세싱 (Annotation Processing) <- Querydsl 핵심질문하신 Querydsl과 밀접한 관련이 있는 단계입니다.
   컴파일러가 소스 코드를 훑으면서 @Entity, @Getter, @QueryEntity 같은 어노테이션을 감지합니다.
   이때 Lombok은 기존 클래스에 메서드를 주입하고, Querydsl은 새로운 소스 파일(QClass)을 생성합니다.
   생성된 파일들은 보통 target/generated-sources/annotations 경로에 위치하게 됩니다.
4. 의존성 확인 및 라이브러리 로드pom.xml에 명시된 라이브러리들이 로컬 저장소(~/.m2/repository)에 있는지 확인하고, 
   컴파일 시 필요한 클래스들을 참조할 수 있도록 연결합니다.

🛠️ Maven 라이프사이클 흐름도
compile 버튼을 누르면 사실 아래의 단계가 순차적으로 실행됩니다.
단계 (Phase)           하는 일
validate            : 프로젝트 상태가 정상인지, 빌드에 필요한 정보가 다 있는지 확인
initialize          : 빌드 속성 설정 등 초기화 작업
generate-sources    : 컴파일에 필요한 소스 생성 (Querydsl의 QClass 생성 시작 지점)
process-sources     : 소스 코드 수정이나 필터링 작업
generate-resources  : 리소스 생성
process-resources   : 설정 파일들을 target 폴더로 복사
compile             : 실제 자바 소스 코드를 컴파일하여 바이트코드로 변환
```


3\. 명령어
----------------
```
mvn clean install
mvn clean compile
install : 프로젝트를 컴파일, 테스트, 패키징(jar/war)한 후 로컬 저장소(~/.m2/repository)에 결과물을 설치하여
          다른 프로젝트에서 종속성으로 사용할 수 있게 함.
          `src/test/java` 폴더 안에 테스트 코드들을 테스트함.
clean   : 이전 빌드 기록을 지우고
package : 소스코드를 컴파일해서 실행 파일로 묶어줍니다.
          `src/test/java` 폴더 안에 테스트 코드들을 테스트함.
```


4\. 태그
----------------
```
1. 프로젝트 기본 정보 (Project Basics)
    모든 pom.xml의 최상단에 위치하며, 프로젝트의 정체성을 정의합니다.
    <groupId>   : 프로젝트를 생성한 조직이나 그룹의 고유 아이디입니다. 보통 도메인 이름을 역순으로 씁니다 (예: com.google).
                  프로젝트를 식별할수 있는 고유한 이름.
    <artifactId>: 프로젝트의 결과물(Jar, War 등)의 이름입니다.
                  버전이 없는 jar 파일의 이름으로 ArtifactId는 프로젝트의 이름으로 사용됨
    <version>: 프로젝트의 현재 버전입니다. 보통 1.0.0-SNAPSHOT처럼 상태를 명시하기도 합니다.
    <packaging>: 프로젝트가 빌드된 후 어떤 형태로 묶일지 결정합니다. (jar, war, pom 등)

2. 의존성 관리 (Dependencies)
    외부 라이브러리를 가져올 때 가장 많이 수정하게 되는 부분입니다.
    <dependencies>  : 프로젝트에서 사용할 모든 라이브러리를 감싸는 태그입니다.
    <dependency>    : 개별 라이브러리 정보를 담습니다.
                      해당 클래스를 컴파일하기 위해 필요한 클래스들(혹은 jar)을 확인
    <scope>         : 해당 라이브러리가 언제 사용될지 결정합니다.
        compile : 기본값. 빌드, 테스트, 실행 시 모두 사용.
        test    : 테스트 코드 실행 시에만 필요 (예: JUnit).
        provided: 컴파일 시에는 필요하지만, 실제 실행 시에는 컨테이너(Tomcat 등)가 제공하는 경우.
                  "이 라이브러리는 실행 환경(Tomcat이나 서버)에 이미 있으니 빌드 결과물에는 넣지 마라"는 뜻입니다.

3. 속성 및 관리 (Properties & Parent)
    중복을 줄이고 설정을 효율적으로 관리하게 해줍니다.
    <properties>: pom.xml 안에서 공통으로 사용할 변수를 정의합니다.
    예: <java.version>17</java.version>으로 선언하고 다른 곳에서 ${java.version}으로 호출합니다.
    <parent>: 상위 프로젝트의 설정을 상속받을 때 사용합니다. Spring Boot 프로젝트를 만들 때 가장 먼저 접하게 되는 태그입니다.

4. 빌드 설정 (Build)
    프로젝트를 어떻게 컴파일하고 패키징할지 상세히 제어합니다.
    <build>: 빌드와 관련된 설정을 모아둡니다.
    <finalName>: 빌드 결과 파일의 이름을 지정합니다.
    <plugins>: 빌드 과정에서 실행될 플러그인들을 정의합니다.
    예: maven-compiler-plugin (자바 컴파일 버전 지정), spring-boot-maven-plugin (실행 가능한 Jar 생성).

5. 알아두면 유용한 고급 태그
    <repositories>: 라이브러리를 받아올 서버 주소를 명시적으로 지정합니다.
    <dependencyManagement>: 멀티 모듈 프로젝트에서 의존성 버전을 한곳에서 관리할 때 사용합니다. 실제 의존성을 추가하는 것이 아니라 "버전 정보만" 미리 정의해 두는 역할입니다.
```


5\. 인텔리제이
-----------------------
```
1) File > Settings > Build, Execution, Deployment > Build Tools > Maven
        User settings file : 설정 파일
        Local repository : 로컬 저장소
    
2-1) 서버 실행파일 만들기    : mvn clean package -s settings.xml -DskipTests
    -s          : 설정 파일 강제 지정
    프로젝트 최상단에 settings.xml을 둠.
    -DskipTests : 테스트 단계 건너뛰고 빌드하기
2-2) 결과물 확인   : 프로젝트 폴더 내의 target/ 디렉토리에 가면 프로젝트명-0.0.1-SNAPSHOT.jar 같은 파일이 생겨 있을 겁니다.
2-3) 서버에서 실행 : 이 파일을 서버로 전송한 뒤, 터미널에서 아래 명령어로 실행합니다.
        java -jar 파일이름.jar
        java -jar your-app.jar --spring.profiles.active=prod
        java -jar target/spring-boot-project-0.0.1-SNAPSHOT.jar --spring.profiles.active=h2
```