리눅스 vi 설정 note
======================


1\. .vimrc : vi에디터 설정 파일
--------------
경로 : ~/.vimrc
```
set number          " 왼쪽 줄 번호 표시
set ai              " 자동 들여쓰기 (Auto Indent)
set si              " 스마트 들여쓰기 (Smart Indent)
set cindent         " C언어 스타일 들여쓰기
set shiftwidth=4    " 자동 들여쓰기 너비 (4칸)
set tabstop=4       " 탭 간격 (4칸)
set expandtab       " 탭을 공백으로 변환
set hlsearch        " 검색 결과 강조 (Highlight)
set nocompatible    " 방향키 오류 방지 (가끔 방향키가 ABCD로 입력될 때 해결)
set mouse=a         " 마우스 사용 가능
syntax on           " 문법 강조 (Syntax Highlighting) 활성화
```