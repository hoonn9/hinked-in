# hinked-in-server

NestJS, PostgreSQL, TypeORM, Jest

# Todo
- 스키마 설계
- 기능 구현 목록 작성
- Restful API 설계


# Database

## Naming Convention
- 데이터베이스 네이밍 컨벤션은 다음을 참고하여 적용하였다.  
https://launchbylunch.com/posts/2014/Feb/16/sql-naming-conventions
- snake case이 기본이다.

### Table
- 복수형이 아닌 단수형을 사용한다.

### Column
- prefix, postfix을 사용하지 않는다.
- primary key:  single column일 경우`id`
- foreign key: `[reference table name]_id` 

### Constraints
- primary key: `[table name]_pkey`
- foreign key: `[table name]_[reference table name]_fkey`

### Index
- index: `[table name]_ix_[indexing columns]`