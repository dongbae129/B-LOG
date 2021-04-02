About B-log

https://bdhportfolio.ga/#moveproject 해당 사이트에서 데모사이트로 이동할수 있습니다.

-설치방법-

//먼저 git,node,mysql이 설치되어 있어야 한다.

1.설치하고자 하는 폴더위치에 git clone https://github.com/dongbae129/B-LOG.git

2.git clone 후 back,front 폴더에서 각각 터미널에서 npm i 명령어를 입력한다.(모듈 설치하는데 시간이 꽤 걸립니다)

3.back폴더로 이동하여 .env파일을 생성하여 아래의 내용을 작성한다.


COOKIE_SECRET=쿠키이름(아무거나 입력하면 됩니다)

DB_PASSWORD=mysql 비밀번호를 작성한다. ex)DB_PASSWORD=123456

터미널에서 mysql에 접속 후 create database b_log_test;를 입력하여 해당이름의 데이터베이스를 생성한다.

back폴더에서는 npm run dev, front폴더에서는 npm stat로 웹사이트를 실행할수 있다.
-SSR 사용하고 싶다면 1. npm run build  2. npm build:server  3. npm start:server
(자세한 script는 package.json참고)

※p.s front 폴더에서 서버통신하는 코드에서 주소를 localhost로 변경하길 바랍니다.

-프로젝트 소개-

제목 : 블로그.

소개 : 개인제작 블로그

기능 : 등록, 조회

사용기술 : React, Redux, Mysql, Node, React-SSR


