<h1>BLOG</h1>


<p align="center">
  <img src="https://user-images.githubusercontent.com/36911316/117271041-c8ab6280-ae94-11eb-8a79-2e09bc67ebd2.png" width="300px" height="300px">
</p>
<p align="center">
  <span><img src="https://img.shields.io/badge/-ReactJs-61DAFB?logo=react&logoColor=white"></span>
  <span><img src="https://img.shields.io/badge/-Redux--Saga-brightgreen?logo=redux-saga"></span>
  <span><img src="https://img.shields.io/badge/-Mysql-blue?logo=mysql&logoColor=black"></span>
  <span><img src="https://img.shields.io/badge/-Express-gray?logo=javascript&logoColor=white"></span>
  <span><img src="https://img.shields.io/badge/-React--SSR-orange?logo=react&logoColor=white"></span>
</p>

https://bdportfolio.xyz/#moveproject<br> <del>해당 사이트에서 데모사이트로 이동할수 있습니다.</del><br>
<p>서버 문제상 데모사이트 운영을 중지 하였습니다.</p>

  <h2>:memo: B-log 서비스 소개</h2>
  <h3>이웃신청을 포함한 블로그 제작 사이트 입니다.</h3>
  <h3>:family: 이웃 기능</h3>
  <blockquote>
    <ul>
      <li>이웃 추가</li>
      <li>이웃 수락 및 거절 여부</li>
    </ul>
  </blockquote>
  <h3>:zap: 최신 포스트 제공</h3>
  <blockquote>
    <ul>
      <li>생성시간 기준 메인페이지 포스트 제공</li>
      <li>인피니티 스크롤 적용</li>
    </ul>
  </blockquote>
  <h3>:trophy: 인기목록 제공</h3>
  <blockquote>
    <ul>
      <li>내 블로그 에서 조회수 기준 TOP3 제공</li>
    </ul>
  </blockquote>
  <h2>⚙️ 설치방법</h2>
    <blockquote>
    <ul>
      <li><h4>1. 기본설정</h4></li>
        <li>1-1. 설치하고자 하는 컴퓨터에 git, node, mysql이 설치되어 있어야 합니다.</li>
        <li>1-2. 터미널에서 설치하고자 하는 폴더에  git clone https://github.com/dongbae129/B-LOG.git 입력.</li>
        <li>1-3. back, fornt 폴더에서 각각 터미널에 npm i 명령어로 모듈 설치(front는 설치시간이 꽤 걸립니다).</li>
      <li><h4>2. back폴더 설정</h4></li>
        <ul>
          <li>2-1. .env파일 생성후 아래의 내용 작성</li>
          <p>COOKIE_SECRET=쿠키이름(아무거나 입력하면 됩니다. 단,보안을 위하여 유추할수 있는 단어는 사용하지 않습니다.)</p>
          <p>DB_PASSWORD=mysql 비밀번호를 작성한다.</p>
          
````
ex)
COOKIE_SECRET=blog
DB_PASSWORD=123456
````
          
<li>2-2. cmd에서 mysql -u root -p 를 입력하여 mysql 접속</li>
          <li>2-3. create database b_log_test; 를 입력하여 해당이름의 DB생성</li>
          <li>2-4. uploads폴더 생성(사진보관 폴더)</li>
          <li>2-5. 터미널에 npm run dev 를 입력하여 서버구동 확인. (자세한 script는 package.json 참고)</li>
        </ul>
      <li><h4>3. front폴더 설정</h4></li>
        <ul>
          <li>3-1. 서버와 통신하는 주소는 기본인 localhost:8020으로 설정되어있습니다</li>
          <li>3-2. SSR을 적용하고 싶을시 1.npm run build. 2.npm run build:server. 3.npm run start:server(package.json 참조) </li>
        </ul>
    </ul>
  </blockquote>
  <h2>:pushpin: 주요기능</h2>
  <table>
    <thead>
      <tr>
        <th>로그인</th>
        <th>회원가입</th>
        <th>메인페이지-로그인X</th>
        <th>메인페이지-로그인O</th>
      </tr>
    </thead>
    <tbody>
      <tr>
<td>
  
![K-001](https://user-images.githubusercontent.com/36911316/117269856-9cdbad00-ae93-11eb-9502-fc8c8d5bcbbe.png)
</td>

<td>
  
  ![K-002](https://user-images.githubusercontent.com/36911316/117269956-b1b84080-ae93-11eb-8ff1-98be51e9be3d.png)
</td>
<td>
  
  ![K-011](https://user-images.githubusercontent.com/36911316/113403907-53a2c400-93e2-11eb-9ab0-d8848c379585.png)
</td>
<td>
  
  ![K-013](https://user-images.githubusercontent.com/36911316/113405541-f8260580-93e4-11eb-8d9a-60e83b9daa41.png)
</td>
      </tr>
    </tbody>
  </table>
  <table>
    <thead>
      <tr>
        <th>내 블로그</th>
        <th>글쓰기</th>
        <th>포스트 디테일</th>
        <th>이웃 수락여부</th>
      </tr>
    </thead>
    <tbody>
      <tr>
<td>
          
![K-015](https://user-images.githubusercontent.com/36911316/113405843-7387b700-93e5-11eb-920a-b804f6a4e96b.png)
</td>
        <td>
  
  ![K-003](https://user-images.githubusercontent.com/36911316/117270206-efb56480-ae93-11eb-96fa-b0476d80ecff.png)
        </td>
        <td>
  
  ![K-012](https://user-images.githubusercontent.com/36911316/113404334-f65b4280-93e2-11eb-92d9-01341b76ef2a.png)
        </td>
        <td>
  
  ![K-016](https://user-images.githubusercontent.com/36911316/113405689-2f94b200-93e5-11eb-9a0b-f82608509880.png)
</td>
      </tr>
    </tbody>
</table>

<h2>:pushpin: 프로세스 흐름</h2>

![K-005](https://user-images.githubusercontent.com/36911316/117305625-e8a14d00-aeb9-11eb-9192-dbcd0a3eb891.png)

