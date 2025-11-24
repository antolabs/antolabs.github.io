# 웹사이트 수정 가이드

이 문서는 초보자도 쉽게 웹사이트를 수정할 수 있도록 핵심 파일들만 정리한 가이드입니다.

## 🚀 서버 시작/중지

```powershell
# 서버 시작
cd C:\Users\gh299\PycharmProjects\antolabs.github.io
docker-compose up -d

# 서버 재시작 (설정 변경 후)
docker-compose restart

# 서버 중지
docker-compose down
```

웹사이트 확인: `http://localhost:8080`

---

## 📝 주요 수정 파일

### 1. About 페이지 (`_pages/about.md`)
**위치**: `C:\Users\gh299\PycharmProjects\antolabs.github.io\_pages\about.md`

**수정 가능 항목**:
- 프로필 사진: `image: prof_pic.jpg` (사진은 `assets/img/prof_pic.jpg`에 저장)
- 소개 내용: `---` 아래의 모든 텍스트

```markdown
---
layout: about
title: About
permalink: /
subtitle: Scientist at <a href='https://frib.msu.edu/'>FRIB, Michigan State University</a>

profile:
  align: right
  image: prof_pic.jpg
  image_circular: false

nav: false
nav_order: 1
social: true
---

여기에 자기소개 내용을 작성하세요.
```

---

### 2. CV 페이지 (`_data/cv.yml`)
**위치**: `C:\Users\gh299\PycharmProjects\antolabs.github.io\_data\cv.yml`

**수정 예시**:
```yaml
- title: Experience
  type: time_table
  contents:
    - title: 직책명
      institution: 기관명
      year: 기간
      description:
        - 업무 설명 1
        - 업무 설명 2
```

**주의**: 들여쓰기(스페이스 2개)를 정확히 맞춰야 합니다!

---

### 3. Publications (`_bibliography/papers.bib`)
**위치**: `C:\Users\gh299\PycharmProjects\antolabs.github.io\_bibliography\papers.bib`

**논문 추가/수정**:
```bibtex
@article{고유ID,
  title={논문 제목},
  author={Lee, Geunhyeong* and 공저자},
  journal={저널명},
  volume={권},
  pages={페이지},
  year={연도},
  doi={DOI},
  note={IF: 숫자, JCR Top X% in 분야}
}
```

**기호 설명**:
- `*` = 교신저자(Corresponding Author)

---

### 4. Projects (`_projects/`)
**위치**: `C:\Users\gh299\PycharmProjects\antolabs.github.io\_projects\`

현재 3개 프로젝트:
- `1_project.md` - AI-Driven Thermofluid Design
- `2_project.md` - MHD Pump Development
- `3_project.md` - Metal 3D Printing Enhancement

**수정 예시** (`1_project.md`):
```markdown
---
layout: page
title: 프로젝트 제목
description: 짧은 설명
img: assets/img/3.jpg
importance: 1
category: work
---

## Overview
프로젝트 개요...

## Key Achievements
주요 성과...
```

---

### 5. 소셜 링크 (`_data/socials.yml`)
**위치**: `C:\Users\gh299\PycharmProjects\antolabs.github.io\_data\socials.yml`

현재 설정된 링크:
```yaml
linkedin_username: geunhyeong-lee-31a9842a4
scholar_userid: YPq9l98AAAAJ
research_gate_profile: Geunhyeong-Lee-3
```

링크를 추가하려면 주석(`#`)을 제거하고 값을 입력하세요.

---

## 🔧 자주 수정하는 항목

### 이메일 변경
`_config.yml` (13번째 줄 근처):
```yaml
contact_note: >
  Feel free to contact me via email (새이메일@example.com)
```

### 프로필 사진 변경
1. 새 사진을 `assets/img/prof_pic.jpg`로 저장
2. 서버 재시작

### 논문 순서 변경
`papers.bib`에서 논문 위치를 위아래로 이동하세요. (최신순으로 자동 정렬됨)

---

## ⚠️ 주의사항

1. **YAML 파일 수정 시** (`cv.yml`, `socials.yml`):
   - 들여쓰기를 정확히 맞추세요 (스페이스 2개)
   - 탭 사용 금지!

2. **설정 변경 후**:
   - `_config.yml` 수정 시 → `docker-compose restart` 필수
   - 다른 파일 수정 시 → 자동 반영 (새로고침만)

3. **파일 이름**:
   - 띄어쓰기 없이 `_`(언더스코어) 사용
   - 예: `my_project.md` (O), `my project.md` (X)

---

## 🆘 문제 해결

### 웹사이트가 안 보여요
```powershell
docker-compose down
docker-compose up -d
docker-compose logs --tail=50
```

로그에 에러가 있으면 최근 수정한 파일을 확인하세요.

### 변경사항이 반영 안 돼요
1. 브라우저 강력 새로고침: `Ctrl + Shift + R`
2. 서버 재시작: `docker-compose restart`

---

## 📂 파일 구조 (중요한 것만)

```
antolabs.github.io/
├── _pages/              # 페이지 파일
│   ├── about.md        # About 페이지
│   ├── cv.md           # CV 페이지
│   ├── publications.md # Publications 페이지
│   └── projects.md     # Projects 페이지
├── _data/              # 데이터 파일
│   ├── cv.yml          # CV 내용
│   └── socials.yml     # 소셜 링크
├── _bibliography/      # 논문 목록
│   └── papers.bib      # 논문 정보
├── _projects/          # 프로젝트 파일
│   ├── 1_project.md
│   ├── 2_project.md
│   └── 3_project.md
├── assets/img/         # 이미지 파일
│   └── prof_pic.jpg    # 프로필 사진
└── _config.yml         # 전체 설정 파일
```

---

## 💡 수정 팁

1. **작은 변경부터 시작**: 한 번에 하나씩만 수정
2. **백업**: 수정 전 파일을 복사해두세요
3. **테스트**: 로컬에서 확인 후 배포
4. **에러 확인**: `docker-compose logs` 명령어로 문제 파악
