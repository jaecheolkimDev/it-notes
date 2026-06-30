AWS
=================

1\. 개요
-----------
```
vercel, netlify, AWS S3
 - 프론트엔드 웹 페이지 배포
리전(Region) : 인프라를 지리적으로 나누어 배포한 각각의 데이터 센터
 - 애플리케이션의 주된 사용자들의 위치와 지리적으로 가까운 리전(Region)을 선택하는 것이 유리하다.
 - 리전(Region)마다 EC2가 따로따로 관리가 되고 있으니 이 점 유의하자. 
```


2\. EC2 메모리 부족 현상 - AWS 프리티어 t2.micro에서 Swap 메모리 설정하기
-----------
출처: https://bsssss.tistory.com/1189 [Small Asteroid Blog:티스토리]
```
Swap이란? Swap은 RAM이 부족할 경우, 디스크(HDD/SSD)의 일부를 마치 RAM처럼 사용하는 공간입니다.
         물리 메모리가 부족할 때 응급처치용으로 유용하지만, 디스크를 사용하는 만큼 속도는 RAM보다 느립니다.하지만 서버가 죽는 것보단 낫다!

Swap 생성하기
    1. 스왑 파일 생성
        2GB 스왑 파일 (128MB x 16)
        (4GB를 원한다면 count=32로 조절)
        sudo dd if=/dev/zero of=/swapfile bs=128M count=16
        sudo dd if=/dev/zero of=/swapfile bs=128M count=32
    2. 권한 변경
        $ sudo chmod 600 /swapfile
    3. 스왑 영역으로 설정
        $ sudo mkswap /swapfile
    4. 스왑 사용 시작
        $ sudo swapon /swapfile
    5. 스왑 상태 확인
        $ sudo swapon -s
    6. 부팅 시 자동으로 스왑 활성화
        /etc/fstab 을 열어 설정을 추가
        $ sudo vi /etc/fstab
        파일 맨 아래에 다음 줄을 추가하고 저장
        /swapfile swap swap defaults 0 0
    7. Swap이 적용되었는지 확인
        swap 공간이 표시된다면 적용 완료
        free -h

Swap 삭제
    sudo swapoff /swapfile
    sudo rm /swapfile
```


998\. 인스턴스
-----------
```
1) t2.micro (RAM 1GB)
```


999\. 대략적으로 AWS 비용 얼마나 나오는 지
-----------
```
1) EC2
- EC2 인스턴스 (t3a.small) : 시간당 0.026 USD (24시간당 약 800원)
- 데이터 전송 비용 : 1 GB당 0.1368 USD (1GB당 약 200원)
- Public IPv4 비용 : 시간당 0.005 USD (24시간당 약 200원)

2) RDS
- RDS 인스턴스 (t4g.micro) : 시간당 0.026 USD (24시간당 약 800원)

  (프리티어일 경우 월 750시간까지 무료)

- 스토리지 비용 : GB-월당 0.131 USD (20GB-24시간당 약 200원)

  (프리티어일 경우 20GB까지 무료)

- Public IPv4 비용 : 시간당 0.005 USD (24시간당 약 200원)

3) ElasitCache
- 캐시 (cache.t3micro) : 시간당 0.025 USD (24시간당 약 800원)

  (프리티어일 경우 월 750시간까지 무료)
```