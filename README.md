<div align="center">

# 🌸 벚꽃 인사

벚꽃이 흩날리고 인사말이 비처럼 떨어지는 작은 GitHub Pages 사이트.

**[heebin2.github.io/site-test](https://heebin2.github.io/site-test/)**

</div>

---

## ✨ 무엇을 하나요

- 🌸 **벚꽃 꽃잎** 이 화면 가득 흩날립니다 (Canvas 애니메이션)
- 💬 **"안녕 · 반가워 · 보고싶었어"** 인사말이 비처럼 떨어집니다
- 👋 주소창에 **`/이름`** 을 붙이면 — 예: `/철수` — **`철수 야 안녕?`** 도 함께 떨어집니다

## 🛠 기술 스택

`React 18` · `TypeScript` · `Vite` · `GitHub Actions` · `GitHub Pages`

## 🚀 로컬에서 실행

```bash
npm install      # 의존성 설치
npm run dev      # 개발 서버 → http://localhost:5173/site-test/
npm run build    # 프로덕션 빌드 → dist/
npm run preview  # 빌드 결과 미리보기
```

## 📦 배포

`master`(또는 `main`)에 push하면 GitHub Actions가 자동으로 빌드 후 GitHub Pages에 배포합니다.

> 최초 1회: 저장소 **Settings → Pages → Source** 를 **`GitHub Actions`** 로 설정해야 합니다.

## 🧭 작동 방식 한눈에

```
src/ (React + TS)
  └─ npm run build (Vite)
        └─ dist/  ← index.html · assets · 404.html(SPA fallback)
              └─ GitHub Actions → GitHub Pages
```

`/이름` 같은 경로는 GitHub Pages가 기본 지원하지 않으므로, `404.html` → `index.html`
리다이렉트 트릭으로 새로고침·직접접속에서도 동작하게 했습니다.

---

<div align="center"><sub>made with 🌸</sub></div>
