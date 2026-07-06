# Travel Hokkaido Team Shifts — 공동 편집 배포 가이드 (Firebase)

링크를 가진 모두가 같은 일정표를 **실시간으로 함께 편집**할 수 있습니다. 로그인 없이 링크만 공유하면 됩니다.

포함 파일
- `index.html` — 대시보드 (Firebase 연동)
- `data.js` — 초기 시드 데이터
- `config.js` — **여기에 Firebase 값 + 캘린더 값 입력**
- `firestore_rules.txt` — Firestore 보안 규칙
- `Code.gs` — 구글 캘린더 연동용 Apps Script (선택)
- `CALENDAR_SETUP.md` — 캘린더 연동 가이드 (선택)
- `README.md` — 이 문서

소요 시간: 약 10분. 신용카드 불필요.

---

## STEP 1. Firebase 프로젝트 만들기

1. https://console.firebase.google.com 접속 (구글 계정 로그인)
2. **프로젝트 추가(Add project)** → 이름 입력 (예: `travel-hokkaido`) → 생성
   - Google Analytics 는 꺼도 됩니다(Disable) — 더 간단.

## STEP 2. Firestore 데이터베이스 만들기

1. 왼쪽 메뉴 **빌드(Build) → Firestore Database** → **데이터베이스 만들기**
2. 위치(location): `asia-northeast1 (Tokyo)` 등 가까운 곳 선택
3. 시작 모드: 아무거나 선택해도 됩니다 (다음 STEP에서 규칙을 덮어씁니다)

## STEP 3. 보안 규칙 붙여넣기

1. Firestore Database → **규칙(Rules)** 탭
2. `firestore_rules.txt` 내용을 전부 복사 → 붙여넣기 → **게시(Publish)**

## STEP 4. 웹앱 등록 + 설정값 복사

1. 프로젝트 개요 옆 **⚙ 프로젝트 설정(Project settings)**
2. 아래로 스크롤 → **내 앱(Your apps)** → **웹(</>)** 아이콘 클릭
3. 앱 닉네임 아무거나 입력 → **앱 등록** (Hosting 체크는 안 해도 됨)
4. 화면에 나오는 `firebaseConfig = { ... }` 값을 복사
5. `config.js` 를 열어 `window.firebaseConfig = { ... }` 안을 그 값으로 교체 → 저장

## STEP 5. 인터넷에 올리기 (Netlify Drop이 가장 쉬움)

1. https://app.netlify.com/drop 접속
2. 이 **폴더 전체**(index.html, data.js, config.js 포함)를 브라우저 창에 **드래그&드롭**
3. 몇 초 뒤 `https://랜덤이름.netlify.app` 링크 생성 → 팀에 공유
   - (Firebase Hosting을 써도 되지만 Netlify Drop이 제일 간단합니다.)

---

## 확인 방법

- 링크를 열면 우측 상단에 **● Synced**(초록)이면 정상.
- **● Offline (local only)**(빨강)이면 `config.js` 의 firebaseConfig 값 또는 규칙(STEP 3) 확인.
- 두 기기에서 같은 링크를 열고 한쪽에서 일정을 추가하면 다른 쪽에 **자동 반영**됩니다.

## 구글 캘린더 자동 연동 (선택)

담당자 캘린더에 일정을 자동 등록하려면 **CALENDAR_SETUP.md** 를 따라 하세요. (Firebase와 별개, Apps Script 사용)

## 자주 묻는 것

- **기존 Firebase 프로젝트에 영향 없나요?** 이 앱은 `dashboards/main` 문서 하나만 사용합니다. 다른 데이터와 안 섞여요.
- **백업**: 대시보드의 `⬇ Backup` 버튼으로 JSON 다운로드.
- **오프라인**: 자동으로 로컬 모드가 되고, 재연결 시 동기화됩니다. (동시 오프라인 편집이 겹치면 마지막 저장 우선.)
- **무료 한도**: 이 정도 사용량은 Firebase 무료(Spark) 한도로 충분합니다.
