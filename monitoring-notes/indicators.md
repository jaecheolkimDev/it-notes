모니터링 지표 공부 note
======================

1\. CPU
-----------------------
```
CPU 사용률 (%)
CPU Load Average (1분, 5분, 15분)
```

2\. Memory
-----------------------
```
메모리 사용률
Heap/Non-heap 메모리 (JVM 계열이라면)
GC 빈도 및 소요 시간
```

3\. Disk
-----------------------
```
Disk I/O (read/write IOPS)
Disk 사용률 (%)
```

4\. Network
-----------------------
```
Network throughput (in/out)
```

5\. Query Performance
-----------------------
```
Slow query count
Query execution time
Query per second
```

6\. Connection Pool
-----------------------
```
Active connections
Idle connections
Connection wait time
```

7\. Cache Hit Ratio
-----------------------
```
캐시 히트율
캐시 미스율
캐시 메모리 사용량
```

8\. Error Logs
-----------------------
```
Error/Warning 로그 발생 빈도
에러 타입별 분류
```

9\. Application Level
-----------------------
```
Response Time (Latency)
Error Rate - 4xx, 5xx 에러율
Throughput (RPS) - 초당 요청 수
```

10\. External API
-----------------------
```
외부 API 응답 시간
외부 API 에러율
Circuit breaker 상태
```

11\. User Metrics
-----------------------
```
Active users (DAU, MAU)
 - DAU (Daily Active Users): 일간 활성 사용자 수 (하루 동안 방문한 순수 사용자)
 - WAU (Weekly Active Users): 주간 활성 사용자 수 (한 주 동안 방문한 순수 사용자)
 - MAU (Monthly Active Users): 월간 활성 사용자 수 (한 달 동안 방문한 순수 사용자)
User session duration
Conversion rate
```