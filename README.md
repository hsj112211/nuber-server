# nuber-server

Server for the (N)Uber Clone Course on Nomad Academy, GraphQL , Typescript , NodeJS

## 1. Features

### Public Resolvers:

- [x] Sign In / Sign Up with Facebook
- [x] Sign In with Email
- [ ] Start Phone Number Verification
- [ ] Complete Phone Number Verification
- [ ] Sign Up with Email

---

### Private Resolvers:

- [ ] Generate JWT
- [ ] Verify JWT
- [ ] Verify Email
- [ ] Get my Profile
- [ ] Update my Profile
- [ ] Toggle Driving Mode
- [ ] Report location / Orientation
- [ ] Add Place
- [ ] Edit Place
- [ ] Delete Place
- [ ] See Nearby Drivers
- [ ] Subcribe to Nearby Drivers
- [ ] Request a Ride
- [ ] Get Nearby Ride Request
- [ ] Subscribe to Nearby Ride Request
- [ ] Subscribe to Ride Status
- [ ] Get Chat Room Messages
- [ ] Subscribe to Chat Room Messages
- [ ] Send a Chat Message

## Code Challenge

- [ ] Get Ride History
- [ ] See Ride Detail

## 2. Issue

## 프로젝트 셋업시 발생한 이슈사항

- schema.ts 작성 시 graphql-tools / merge-graphql-schemas의 버전이 맞지 않아서 에러발생
- graphql-tools@3.0.4
- graphql-yoga@1.14.10
- merge-graphql-schemas@1.5.2
- 재 설치 후 allResolvers의 타입을 IResolversp[] 로 변경하여 해결

## postgresql 설치 시 발생 에러

- 11버전 , 10버전 다운로드 후 인스톨 시점에 there has been an error, Unable to write inside TEMP enviroment variable path 에러 발생
  해결방안 찾는중 .
- docker 프로그램 설치하여 postgres 다운 및 설정으로 해결

---

## 3. Reference

- package.json

  1.  "scripts": {
      "dev": "cd src && nodemon --exec ts-node index.ts -e ts,graphql",
      "pretypes": "gql-merge --out-file ./src/schema.graphql ./src/api/\*_/_.graphql",
      "types": "graphql-to-typescript ./src/schema.graphql ./src/types/graph.d.ts"
      }
      -- pretypes : types보다 먼저 실행되어 src/api 하위의 모든 graphql 파일을 하나로 합쳐서 src의 schema.graphql 파일을 생성한다.
      -- types : schema.graphql 파일을 typescript로 변경시켜 주고 graph.d.ts 파일을 생성한다. d.ts는 definition typescript를 의미한다.

- ORM ( Object Realational Mapper )

  코드를 작성하면 ORM이 작성한 코드를 SQL로 변환한다.

  1. TypeORM : 데이터베이스와 모델을 입력하여 작성한다.
  2. typescript로 만들어졌기 때문에 typescipt를 완전히 지원한다.
  3. 필요한 메소드를 임포트 하고 컬럼의 타입을 정의하여 사용한다.
  4. Git : https://github.com/typeorm/typeorm
