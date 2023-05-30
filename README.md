# hinked-in-server

링크드인 서비스 클론 프로젝트
NestJS, PostgreSQL, TypeORM, Jest

## 목표

- OOP
- Restful API
- Layered Architecture
- 가독성 좋은 코드
- 탄탄한 테스트를 통해 신뢰할 수 있는 코드
- 에외 처리

## 기능

- 기업
  - 기업 정보
  - 기업 팔로우
  - 채용공고
  - 게시글 올리기
- 유저
  - 이력서 작성
  - 팔로우한 기업 업데이트 내려받기
  - 일촌 신청
  - 게시글 올리기
- 게시글
  - 추천, 댓글, 퍼가기, 메시지 보내기
  - 사진, 동영상
  - 기념
  - 채용
- 통합 검색
  - 채용
  - 글 업데이트
  - 회사
  - 사람
- 푸쉬 알림
- 채팅

# Database

## Naming Convention

- 데이터베이스 네이밍 컨벤션은 다음을 참고하여 적용하였다.  
  https://launchbylunch.com/posts/2014/Feb/16/sql-naming-conventions
- snake case이 기본이다.

### Table

- 복수형이 아닌 단수형을 사용한다.

### Column

- prefix, postfix을 사용하지 않는다.
- primary key: single column일 경우`id`
- foreign key: `[reference table name]_id`

### Constraints

- primary key: `[table name]_pkey`
- foreign key: `[table name]_[reference table name]_fkey`

### Index

- index: `[table name]_ix_[indexing columns]`
