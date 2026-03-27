Spring Boot, MySQL, Redis 컨테이너 동시에 띄워보기
================


1\. 사전작업
-----------------------------
```
1) build.gradle
        dependencies {
            ...
            implementation 'org.springframework.boot:spring-boot-starter-data-redis'
        }
2) application.yml
        spring:
          datasource:
            url: jdbc:mysql://my-db:3306/mydb
            username: root
            password: pwd1234
            driver-class-name: com.mysql.cj.jdbc.Driver
          data:
            redis:
              host: my-cache-server     # Redis가 실행되고 있는 컨테이너의 주소는 service 이름
              port: 6379
              
* 각 컨테이너는 각자의 네트워크를 가지고 있기 때문에, localhost가 아니라 Redis가 실행되고 있는 컨테이너로 통신을 해야 한다. 
  Redis가 실행되고 있는 컨테이너의 주소는 service 이름으로 표현한다고 했다. 
  compose.yml에서 Redis가 실행되고 있는 컨테이너의 service 이름을 my-cache-server라고 이름 붙였다.
3) RedisConfig
        @Configuration
        public class RedisConfig {
        
          @Bean
          public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory connectionFactory) {
            RedisTemplate<String, Object> template = new RedisTemplate<>();
            template.setConnectionFactory(connectionFactory);
            template.setKeySerializer(new StringRedisSerializer());
            template.setValueSerializer(new GenericJackson2JsonRedisSerializer());
            return template;
          }
        }
4) AppController
        @RestController
        public class AppController {
        
          @Autowired
          private RedisTemplate<String, Object> redisTemplate;
        
          @GetMapping("/")
          public String home() {
            redisTemplate.opsForValue().set("abc", "def");
            return "Hello, World!";
          }
        }
5) `$ ./gradlew clean build`    : Spring Boot 프로젝트 빌드하기
        
```


2\. compose.yml
-----------------------------
``` 
services:
  my-server:
    build: .
    ports:
      - 8080:8080
    depends_on:
      my-db:
        condition: service_healthy
      my-cache-server:
        condition: service_healthy  
  my-db:
    image: mysql
    environment:
      MYSQL_ROOT_PASSWORD: pwd1234
      MYSQL_DATABASE: mydb
    volumes:
      - ./mysql_data:/var/lib/mysql
    ports:
      - 3306:3306
    healthcheck:
      test: [ "CMD", "mysqladmin", "ping" ]
      interval: 5s
      retries: 10
  my-cache-server:
    image: redis
    ports:
      - 6379:6379
    healthcheck:
      test: [ "CMD", "redis-cli", "ping" ]
      interval: 5s
      retries: 10
```


3\. Docker Compose로 컨테이너를 실행시킬 때
-----------------------------
``` 
$ docker compose down               : compose로 실행된 컨테이너 삭제
$ docker compose up -d - build      : compose 파일 실행시키기
$ docker compose ps                 : compose 실행 현황 보기
$ docker ps                         : 일반 실행 현황에도 같이 나옴
$ docker logs [Container ID]
```