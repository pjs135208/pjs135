# 박준서 — 게임 개발자 포트폴리오

정적 HTML5, CSS3, vanilla JavaScript로 만든 단일 페이지 포트폴리오입니다. 별도의 프레임워크, 서버, API 또는 외부 이미지에 의존하지 않습니다. Vite는 로컬 미리보기와 정적 빌드에만 사용합니다.

## 파일 구성

```text
index.html       페이지 구조와 한국어 콘텐츠
css/style.css    색상, 레이아웃, 반응형 스타일, 모션
js/main.js       모바일 내비게이션, 프로젝트 상세 dialog, 스크롤 효과
```

## 콘텐츠 수정 위치

- 이름, 소개, 내비게이션, 프로젝트/활동/연락처 문구: `index.html`
- 기술 분류와 태그: `index.html`의 `#skills` 섹션
- 메뉴추천 AI 설명과 상세 dialog: `index.html`의 `#projects` 섹션 및 하단 dialog
- 이메일/GitHub 주소: `index.html`의 `#contact` 섹션
- 색상과 스타일: `css/style.css` 상단 `:root` 변수
- 메뉴/dialog/스크롤 상호작용: `js/main.js`

## 로컬 미리보기 및 빌드

워크스페이스 루트에서 실행합니다.

```bash
pnpm --filter @workspace/junseo-game-portfolio run dev
pnpm --filter @workspace/junseo-game-portfolio run build
```

정적 빌드 결과는 `dist/public/`에 생성됩니다.

## GitHub Pages 배포

이 포트폴리오는 워크스페이스 안의 `artifacts/junseo-game-portfolio/`에 있습니다. GitHub Pages에서 이 하위 폴더를 브랜치 배포 경로로 직접 선택할 수는 없으므로 다음 중 하나를 사용합니다.

### 이 포트폴리오만 별도 저장소로 배포

1. `artifacts/junseo-game-portfolio/` 안의 파일을 새 GitHub 저장소의 최상위로 복사합니다.
2. GitHub 저장소에서 **Settings → Pages**로 이동합니다.
3. **Deploy from a branch**를 선택하고, 배포 브랜치와 `/(root)` 폴더를 지정합니다.
4. 저장하면 최상위 `index.html`이 사이트 시작 페이지가 됩니다.

### 현재 워크스페이스 저장소에서 배포

1. 저장소의 **Settings → Pages**에서 빌드 및 배포 소스를 **GitHub Actions**로 설정합니다.
2. Actions 워크플로에서 저장소 루트 기준으로 `pnpm install --frozen-lockfile`을 실행합니다.
3. `pnpm --filter @workspace/junseo-game-portfolio run build`를 실행합니다.
4. `artifacts/junseo-game-portfolio/dist/public/`을 Pages 빌드 산출물로 업로드하고 배포합니다.

빌드 경로는 `./` 기준 상대 경로라서 GitHub Pages 저장소 하위 경로에서도 CSS와 JavaScript를 찾을 수 있습니다. 외부 API, 백엔드, 데이터베이스, 원격 이미지에 의존하지 않습니다.
