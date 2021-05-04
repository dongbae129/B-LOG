About B-log

https://baeportfolio.xyz/#moveproject 해당 사이트에서 데모사이트로 이동할수 있습니다.

-설치방법-

//먼저 git,node,mysql이 설치되어 있어야 한다.

1.설치하고자 하는 폴더위치에 git clone https://github.com/dongbae129/B-LOG.git

2.git clone 후 back,front 폴더에서 각각 터미널에서 npm i 명령어를 입력한다.(모듈 설치하는데 시간이 꽤 걸립니다)

3.back폴더로 이동하여 .env파일을 생성하여 아래의 내용을 작성한다.


COOKIE_SECRET=쿠키이름(아무거나 입력하면 됩니다. 단,보안을 위하여 유추할수 있는 단어는 사용하지 않습니다.)

DB_PASSWORD=mysql 비밀번호를 작성한다.

ex)COOKIE_SECRET=blog

DB_PASSWORD=123456

터미널에서 mysql에 접속 후 create database b_log_test;를 입력하여 해당이름의 데이터베이스를 생성한다.

back폴더에서는 npm run dev, front폴더에서는 npm stat로 웹사이트를 실행할수 있다.
-SSR 사용하고 싶다면 1. npm run build  2. npm build:server  3. npm start:server
(자세한 script는 package.json참고)

※p.s front 폴더에서 서버통신하는 코드에서 주소를 localhost로 변경하길 바랍니다.

-프로젝트 소개-

제목 : 블로그.

소개 : 개인제작 블로그. next.js가 아닌 react로 SSR을 적용시켰다.

기능 : 등록, 조회

사용기술 : React, Redux, Mysql, Node, React-SSR




![K-011](https://user-images.githubusercontent.com/36911316/113403907-53a2c400-93e2-11eb-9ab0-d8848c379585.png)
-main 페이지이다. 좌측에는 모든 포스터를 7개 기준으로 인피니티 스크롤링을 적용하여 보여준다.
우측은 로그인,회원가입 이며 main페이지 또는 상단 로그인,회원가입을 클릭하여 해당 페이지에서도 진행할수 있다.


![K-013](https://user-images.githubusercontent.com/36911316/113405541-f8260580-93e4-11eb-8d9a-60e83b9daa41.png)
-로그인시 4가지의 기능을 사용할수 있으며, 내 블로그로 이동, 글쓰기, 내 이웃확인, 이웃요청 확인을 할수 있다-


![K-015](https://user-images.githubusercontent.com/36911316/113405843-7387b700-93e5-11eb-920a-b804f6a4e96b.png)
-내 블로그 페이지. 나의 프로필 정보와 내 포스트중 조휘수 상위 3개를 표시할수 있으며, 모든 포스트를 3개 기준으로 슬라이드를 적용하였다-

![K-012](https://user-images.githubusercontent.com/36911316/113404334-f65b4280-93e2-11eb-92d9-01341b76ef2a.png)
-포스트 상세페이지. 포스트 등록자 프로필, 제목, 타임라인, 조회수, 해쉬태그, 내용을 확인할수 있다-


![K-016](https://user-images.githubusercontent.com/36911316/113405689-2f94b200-93e5-11eb-9a0b-f82608509880.png)
-이웃요청 확인페이지. 이웃요청한 사람의 아이디와 수락 및 거절을 할수 있다-





