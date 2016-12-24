Tistory Backup Extractor
===

티스토리 블로그 백업 파일을 분해해서 로컬에 보기좋게 저장하거나 Yona나 github으로 이사가는걸 도와주는 도구입니다.

이 도구를 사용하면 다음과 같은 장점이 있습니다.

- Tistory에서 내려받을 수 있는 내용물 미지의 xml 백업파일이 기본 텍스트 에디터로 볼수 있게 바뀝니다.
- 블로그의 파일들이 로컬에 얌전히 분해되어 저장됩니다.
- 불필요한 HTML 태그들을 제외해서 정보만 남겨집니다.
- 개발자 친화적인 markdown 스타일로 분문이 변환됩니다.
- 그 결과 markdown 에디터(맥OS에서는 MOU 같은 app)으로 편하게 볼 수 있게 됩니다. 
   - 첨부 파일이미지도 같이 보입니다.
- markdown 문법을 지원하는 다른 서비스([Yona](https://repo.yona.io) 나 [Github](https://github.com/)으로 이사를 쉽게 갈 수 있습니다. (각각 테스트 해봤는데 잘 됩니다)
   - 이전 예) Yona: https://repo.yona.io/doortts/blog/posts
   - 이전 예) Github: https://github.com/doortts/tistory-blog-export-example/wiki

필요도구
---
- nodejs
  - https://nodejs.org/en/download/
- git client
  - https://git-scm.com/downloads
  
설치
---

```
git clone https://github.com/doortts/tistory-backup-extractor.git

cd tistory-backup-extractor

npm install
```

설정
---

- 위에서 설치한 tistory-backup-extractor 폴더에 있는 config.json 파일을 열어서 필요 항목을 수정합니다.

config.json 항목 설명 (아래 내용을 복사해서 붙여넣지 마시고 파일을 직접 수정하세요)
```
export default {
  EXPORT_FILE_NAME: 'tistory-backup.xml', //티스토리에서 내려 받은 백업파일 이름
  YOUR_TISTORY_URL: 'http://blog.doortts.com', //티스토리 주소
  YOUR_NAME: 'doortts',  //티스토리에서 사용한 이름 (그냥 표시용이라 실명이든 아이디든 편하게 적어도 무방합니다)
  HIDE_PRIVATE_POST: true, //발행(publishing)하지 않은 것은 그냥 숨겨 놓을 건지
  EXPORT_BASE_DIR: './blog', // 분해해 넣을 로컬 기본 폴더. 
  ATTACHMENTS_DIR: './attachments', //EXPORT_BASE_DIR 이하에 첨부파일들을 모아놓을 폴더이름
  YONA: { //이하 항목등은 yona 설치한 사람들은 자신의 yona 서버로도 이전가능하도록 해주는 추가 기능 
    DO_EXPORT: false, //yona 서버로도 보낼건지? 기본값은 false
    SERVER: 'https://repo.yona.io', //자신의 yona 서버 설치. 기본값은 데모차원에서 운영중인 repo.yona.io 서버
    USER_TOKEN: 'FUMwruLNFz0EAldNbXuMawqDl01gLp1XI0M7qPu1pX0=', //Yona v1.1 부터 지원하는 사용자 토큰. 개인 계정 설정페이지에서 확인가능
    OWNER_NAME: 'FOO', //Yona id
    PROJECT_NAME: 'BAR', //블로그 글을 옮겨 넣을 대상 프로젝트 이름. 미리 만들어 놓아야 함
    ROOT_CONTEXT: '' // 만약 운영중인 Yona 서버에 application root를 설정한 경우
  }
};

```

Github wiki로 이동하는 방법은 https://github.com/doortts/tistory-blog-export-example 

실행
---
설정이 끝났으면 아래 명령어를 실행
```
npm start
```
![screen-shot](https://raw.githubusercontent.com/doortts/tistory-backup-extractor/master/test/resource/2016-11-20-22-29-20.png)

추가 수정이나 확장을 원할 경우
---

혹시라도 추가 개발에 의욕이 있으신분이 계시면 이슈에 남겨주세요.
문서를 작성해서 도와드립니다.

수정후에는 테스트를 실행해서 확인해 주세요

```
npm test
```

함수나 클래스의 사용법은 test 폴더의 실행 내용들을 참고해주세요.

추가로 도전해 볼만한 작업
---
- Electron 앱으로 만들기
  http://electron.atom.io/docs/
- Github Wiki가 아니라 이슈페이지로 보내기 
  https://gist.github.com/jonmagic/5282384165e0f86ef105
