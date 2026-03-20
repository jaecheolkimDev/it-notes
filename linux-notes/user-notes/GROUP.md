리눅스 그룹 공부 note
======================

1\. 그룹
-----------------------
```
1) 리눅스에서 그룹(group)이란 사용자 계정을 묶어서 관리하기 위한 단위이다.
   여러 사용자에게 공통된 권한을 한 번에 부여하고 관리할 때 유용하게 사용된다.

2) 특징
- 한 사용자(user)는 무조건 하나의 그룹(group)에 속해야 한다.
- 한 사용자(user)는 여러 그룹(group)에 속할 수 있다.

3) 명령어
    # groups [사용자명]
    $ groups ubuntu
    ubuntu : ubuntu adm cdrom sudo dip lxd
    - `ubuntu` 사용자는 `ubuntu`, `adm`, `cdrom`, `sudo`, `dip`, `lxd`라는 그룹에 속해있다. 
    
    $ groups root
    root : root
    - `root` 사용자는 `root`라는 그룹에만 속해있다.
    
    $ id [사용자] : 특정 사용자의 기본 그룹(primary group) 확인 방법
    $ id ubuntu
    uid=1000(ubuntu) gid=1000(ubuntu) groups=1000(ubuntu),4(adm),24(cdrom),27(sudo),30(dip),105(lxd)
    - ubuntu 사용자는 여러 그룹에 속해있다. 그 중에서 gid=1000(ubuntu)의 괄호 안에 설정되어 있는 값이 기본 그룹(primary group)이다. 
    
4) 소유 그룹
- 파일을 생성한 사용자의 기본 그룹(primary group)으로 자동 설정된다. (소유 그룹을 변경할 수도 있다.) 
```