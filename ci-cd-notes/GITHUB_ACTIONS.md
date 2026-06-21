Github Actions
=================

1\. GitHub Actions 워크플로우 YAML 파일의 구조
--------
```
Event -> Workflow -> Jobs -> Steps
깃허브 액션은 특정 이벤트 발생 시 전체 워크플로우 파일이 실행되며, 
이 워크플로우는 여러 개의 독립적인 Job으로 구성되고, 
각 Job은 실제 명령을 수행하는 여러 개의 Step으로 이루어진 계층 구조랍니다.
```


2\. 처음으로 Github Actions 작동시켜보기
--------
```
1) 새로운 프로젝트 폴더 만들기
2) .github/workflows/deploy.yml 만들기
    * Github Actions를 실행시키기 위해서는 반드시 .github/workflows라는 디렉터리에 .yml 또는 .yaml의 확장자로 파일을 작성해야 한다. 
      그리고 .github/workflows는 프로젝트 폴더의 최상단에 만들어야 한다. 
            # Workflow의 이름
            # Workflow : 하나의 yml 파일을 하나의 Workflow라고 부른다. 
            name: Github Actions 실행시켜보기
            
            # Event : 실행되는 시점을 설정
            # main이라는 브랜치에 push 될 때 아래 Workflow를 실행
            on:
              push:
                branches:
                  - main
            
            # 하나의 Workflow는 1개 이상의 Job으로 구성된다. 
            # 여러 Job은 기본적으로 병렬적으로 수행된다.
            jobs: 
              # Job을 식별하기 위한 id
              My-Deploy-Job: 
                  # Github Actions를 실행시킬 서버 종류 선택
                runs-on: ubuntu-latest
                
                # Step : 특정 작업을 수행하는 가장 작은 단위
                # Job은 여러 Step들로 구성되어 있다.
                steps: 
                  - name: Hello World 찍기 # Step에 이름 붙이는 기능
                    run: echo "Hello World" # 실행시킬 명령어 작성
                    
                  - name: 여러 명령어 문장 작성하기
                    run: |
                      echo "Good"
                      echo "Morning"
                  
                  # 참고: https://docs.github.com/en/actions/learn-github-actions/variables
                  - name: Github Actions 자체에 저장되어 있는 변수 사용해보기
                    run: |
                      echo $GITHUB_SHA
                      echo $GITHUB_REPOSITORY
            
                  - name: Github Actions Secret 변수 사용해보기
                    run: |
                        echo ${{ secrets.MY_NAME }}
                        echo ${{ secrets.MY_HOBBY }}
                            
3) Github Repository 만들어서 업로드하기
    $ git init
    $ git add .
    $ git commit -m "first commit"
    $ git branch -M main
    $ git remote add origin {Repository 주소}
    $ git push -u origin main
```








999\. 
--------
```
docker ps -a : 도커 프로세스 확인
docker stop {CONTAINER ID} : 도커 종료

docker cicd

yml파일을 통해서 main에 push가 됬을때 또는 어떤 이벤트가 발생했을때 어떤 작업을 하도록 코드를 통해서 지정할 수 있음
yml파일은 .gitignore를 통해 git에 올라가지 않도록 만듬

github repository와 프로젝트 연동 : ...or create a new repository on the command line 복사 후 인텔리제이 터미널에 붙여넣기.
Username for 'https://github.com' : {Username}
Password for 'https://{Username}@github.com' : {아래의 token}
Settings > Developer settings > Personal access tokens > Tokens(classic) > Generate new token > Generate new token(classic) > Note에 이름 정하고 만료일 30일, 권한은 전부 체크 > Generate token

Settings > Secrets and variables > actions > Repository secrets > New repository secret
APPLICATION	: application.yml 파일
DOCKER_USERNAME	: 도커허브 닉네임
DOCKER_PASSWORD	: 도커허브 비밀번호 or accessKey
DOCKER_PROJECT	: 도커 프로젝트 이름
HOST_PROD	: EC2 퍼블릭 ip
PRIVATE_KEY	: EC2 접속용 pem Key

application.yml
# github repository actions 페이지에 나타날 이름
name: CI/CD using github actions & docker

# event trigger
# main이나 develop 브랜치에 push가 되었을 때 실행
on:
push:
branches: ["main"]

permissions:
contents: read

jobs:
CI-CD:
runs-on: ubuntu-latest
steps:

      # JDK setting - github actions에서 사용할 JDK 설정 (프로젝트나 AWS의 java 버전과 달라도 무방)
      - uses: actions/checkout@v3
      - name: Set up JDK 17
        uses: actions/setup-java@v3
        with:
          java-version: '17'
          distribution: 'temurin'

      # gradle caching - 빌드 시간 향상
      - name: Gradle Caching
        uses: actions/cache@v3
        with:
          path: |
            ~/.gradle/caches
            ~/.gradle/wrapper
          key: ${{ runner.os }}-gradle-${{ hashFiles('/*.gradle*', '/gradle-wrapper.properties') }}
          restore-keys: |
            ${{ runner.os }}-gradle-
            
			# application.yml 파일 생성후 파일 내용 넣는 과정
      - uses: actions/checkout@v3
      - run: touch ./src/main/resources/application.yml
      - run: echo "${{ secrets.APPLICATION }}" > ./src/main/resources/application.yml
      - run: cat ./src/main/resources/application.yml
   
      # gradle build
      - name: Build with Gradle
        run: ./gradlew build -x test

      # docker build & push
      - name: Docker build & push to prod
        if: contains(github.ref, 'main')
        run: |
          echo "${{ secrets.DOCKER_PASSWORD }}" | sudo docker login -u "${{ secrets.DOCKER_USERNAME }}" --password-stdin
          sudo docker build --platform linux/amd64/v3 -t "${{ secrets.DOCKER_USERNAME }}/${{ secrets.DOCKER_PROJECT }}" .
          sudo docker push "${{ secrets.DOCKER_USERNAME }}/${{ secrets.DOCKER_PROJECT }}"

      ## 실제 서버로 배포하는 작업
      - name: Deploy to prod
        uses: appleboy/ssh-action@master
        id: deploy-prod
        if: contains(github.ref, 'main')
        with:
          host: ${{ secrets.HOST_PROD }} # EC2 퍼블릭 IPv4 DNS
          username: ubuntu
          key: ${{ secrets.PRIVATE_KEY }}
          envs: GITHUB_SHA
          script: |
            sudo docker ps -a
            sudo docker stop $(sudo docker ps -q --filter "name=project")
            sudo docker rm $(sudo docker ps -aq --filter "name=project")
            sudo docker pull ${{ secrets.DOCKER_USERNAME }}/${{ secrets.DOCKER_PROJECT }}
            sudo docker run --name project -d -p 8080:8080 ${{ secrets.DOCKER_USERNAME }}/${{ secrets.DOCKER_PROJECT }}
            sudo docker image prune -f
