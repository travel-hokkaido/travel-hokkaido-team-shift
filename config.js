// ============================================================
//  설정 파일 — 아래 값들을 본인 것으로 바꾸세요.
// ============================================================

// --- Firebase (공동 편집 / 실시간 동기화) ---
//  Firebase 콘솔 → 프로젝트 설정 → "내 앱"(웹 </>) 에서 복사한 값.
//  비워두면 "로컬 전용" 모드로 동작.
window.firebaseConfig = {
  apiKey: "AIzaSyDh-uc_bBBRi05P0pdRM6OSnsIPhwLrhAw",
  authDomain: "travel-hokkaido-178cb.firebaseapp.com",
  projectId: "travel-hokkaido-178cb",
  storageBucket: "travel-hokkaido-178cb.firebasestorage.app",
  messagingSenderId: "474315996374",
  appId: "1:474315996374:web:f9e22a139f6d938c83dd77"
};

// --- Google Calendar 자동 연동 (Apps Script 웹앱) ---
//  CALENDAR_SETUP.md 를 따라 Apps Script 를 배포한 뒤,
//  거기서 나온 웹앱 URL 을 아래에 붙여넣으세요.
//  SYNC_SECRET 은 Code.gs 의 값과 반드시 동일해야 합니다.
//  두 값을 비워두면 캘린더 연동은 꺼진 상태로 동작합니다.
window.GCAL_SYNC_URL    = "";  // 예: https://script.google.com/macros/s/AKfy.../exec
window.GCAL_SYNC_SECRET = "CHANGE-ME-to-a-long-random-string";
