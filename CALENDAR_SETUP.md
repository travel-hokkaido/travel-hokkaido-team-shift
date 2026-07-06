# Google Calendar 자동 연동 설정 (Apps Script)

담당자 각자의 구글 캘린더에 일정을 **자동으로 생성/수정/삭제**하고 초대까지 보내는 기능입니다.
동작 원리: 대시보드에서 일정이 바뀔 때마다 전체 목록을 Apps Script 웹앱으로 보내고,
Apps Script가 담당자를 게스트로 초대한 이벤트를 만들어 줍니다.

> 먼저 README.md 의 Supabase + 배포까지 끝낸 상태여야 합니다.

소요 시간: 약 10분.

---

## STEP 1. Apps Script 프로젝트 만들기

1. https://script.google.com 접속 (일정 캘린더를 소유할 **구글 계정**으로 로그인 — 보통 회사 대표 계정)
2. **New project** 클릭
3. 기본 `Code.gs` 내용을 모두 지우고, 이 폴더의 **`Code.gs` 내용을 전부 붙여넣기**

## STEP 2. 비밀키(SYNC_SECRET) 정하기

1. `Code.gs` 맨 위 `SYNC_SECRET` 값을 **길고 임의의 문자열**로 바꿉니다.
   예: `th-9f3k2p8x-secret-2026`
2. 나중에 `config.js` 의 `GCAL_SYNC_SECRET` 에 **똑같이** 넣어야 합니다. (지금 메모)
3. (선택) 특정 캘린더에 넣고 싶으면 `CALENDAR_ID` 를 그 캘린더 ID로. 기본 `"default"` 는 이 계정의 기본 캘린더입니다.

## STEP 3. 웹앱으로 배포

1. 오른쪽 위 **Deploy → New deployment**
2. 톱니바퀴(Select type) → **Web app**
3. 설정:
   - Description: 아무거나
   - Execute as: **Me** (본인)
   - Who has access: **Anyone**  ← 중요 (대시보드가 호출할 수 있어야 함)
4. **Deploy** → 권한 요청이 뜨면 **Authorize** → 본인 계정 선택 → (경고 화면이 나오면) Advanced → "프로젝트로 이동" → Allow
   - 이때 캘린더 접근 권한을 허용합니다.
5. 배포 완료 후 나오는 **Web app URL** 복사 (형식: `https://script.google.com/macros/s/AKfy.../exec`)

## STEP 4. 대시보드에 연결

1. `config.js` 열기
2. 두 값 입력 후 저장:
   ```js
   window.GCAL_SYNC_URL    = "STEP 3에서 복사한 웹앱 URL";
   window.GCAL_SYNC_SECRET = "STEP 2에서 정한 비밀키와 동일하게";
   ```
3. 배포 사이트를 다시 올리기(Netlify면 폴더 다시 드롭 / GitHub면 config.js 커밋)

## STEP 5. 담당자 이메일 등록

1. 대시보드에서 **👥 Staff** 열기
2. 각 담당자 줄의 이메일 칸에 **구글 이메일** 입력 (예: youmin@yourtravelhokkaido.com)
3. 저장하면 끝. 이제 그 담당자의 일정이 생기거나 바뀔 때마다 캘린더에 자동 반영됩니다.

---

## 동작/확인

- 일정을 추가/수정/삭제 → 몇 초 뒤 해당 담당자 캘린더에 이벤트가 생기고 **초대 메일**이 갑니다.
- 이벤트 제목: `고객명 (담당자)`, 설명에 투어정보/차량/기사/Job/메모가 들어갑니다.
- 시간은 기본 09:00–18:00 (Code.gs 의 `DEFAULT_START_HOUR`, `DEFAULT_HOURS` 로 조정).
- 담당자 이메일이 없는 일정은 캘린더 등록을 건너뜁니다.

## 주의 / 한계

- **캘린더 위치**: 이벤트는 "Apps Script를 만든 계정"의 캘린더에 생성되고, 담당자는 **게스트로 초대**됩니다. 담당자가 초대를 수락하면 각자 캘린더에 표시돼요. (담당자 캘린더에 직접 쓰려면 Google Workspace의 도메인 위임이 필요 — 훨씬 복잡)
- **수정/삭제 반영**: 스크립트가 `jobId ↔ 캘린더 이벤트 ID` 를 기억해서 같은 일정을 업데이트/삭제합니다. Apps Script 프로젝트를 지우면 이 연결이 사라집니다.
- **코드 수정 후 재배포**: `Code.gs`를 바꾸면 Deploy → **Manage deployments → 편집(연필) → New version → Deploy** 로 갱신하세요. (URL은 유지됩니다.)
- **보안**: 웹앱이 "Anyone" 이지만 `SYNC_SECRET` 이 맞아야만 동작합니다. 비밀키를 외부에 노출하지 마세요.
- 캘린더 연동을 끄려면 `config.js` 의 `GCAL_SYNC_URL` 을 빈 문자열로 두면 됩니다.
