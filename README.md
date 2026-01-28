<br>
<br>

<p align="right">
  <img src="https://readme-typing-svg.demolab.com/?lines=Welcome%20to%20FlowDash&width=700&height=80&pause=400&duration=4000&color=9AB3C5&size=36&center=false&font=Montserrat&weight=700" />
</p>


## 이스트 2차 팀 프로젝트 설명

### 작업 제시안

- 칸반형 태스크 관리 대시보드
  - 할 일, 진행 중, 완료 상태를 칸반 보드 형태로 관리하며 작업의 흐름과 달성률을 시각적으로 확인할 수 있는 태스크 관리 대시보드를 만듭니다.

### 작업 기간

- 2026.01.23 ~ 2026.01.30

<br>
<br>

<!-- 여기부터 팀  -->

## _🍽️ 팀 소개_

- **팀 이름 : 401호 (01즈)**

- **각 역할**
  
| 이름 | 공식 역할 | 세부 역할 | GitHub |
| :---: | :---: | :--- | :--- |
| 🍔&nbsp; **최은우** | **팀장** | <img src="https://img.shields.io/badge/Design%20Lead-E0E0E0?style=flat-square"> <img src="https://img.shields.io/badge/Speaker-F5F5F5?style=flat-square"> <img src="https://img.shields.io/badge/Git-F3E5AB?style=flat-square"> <br> <img src="https://img.shields.io/badge/기획-FFE7E7?style=flat-square"> <img src="https://img.shields.io/badge/UI%20개발-D6E4FF?style=flat-square"> <br> <img src="https://img.shields.io/badge/Project%20Manager-E4F2E1?style=flat-square"> | [![eunwooring9](https://img.shields.io/badge/eunwooring9-181717?style=flat-square&logo=github)](https://github.com/eunwooring9) |
| 🍺&nbsp; **박상우** | **팀원** | <img src="https://img.shields.io/badge/디자인-EBDCB2?style=flat-square"> <img src="https://img.shields.io/badge/ListView-D9C1A3?style=flat-square"> <br> <img src="https://img.shields.io/badge/SettingView-E8D9CD?style=flat-square"> <img src="https://img.shields.io/badge/데이터구조%20설계-EAD7D7?style=flat-square"> <br> <img src="https://img.shields.io/badge/기획-FFE7E7?style=flat-square"> <img src="https://img.shields.io/badge/UI%20개발-D6E4FF?style=flat-square"> | [![sangwoo-id](https://img.shields.io/badge/sangwoo--id-181717?style=flat-square&logo=github)](https://github.com/박상우아이디) |
| 🍟&nbsp; **이해랑** | **팀원** | <img src="https://img.shields.io/badge/디자인-EBDCB2?style=flat-square"> <img src="https://img.shields.io/badge/Readme-D1D1FF?style=flat-square"> <img src="https://img.shields.io/badge/기획-FFE7E7?style=flat-square"> <br> <img src="https://img.shields.io/badge/UI%20개발-D6E4FF?style=flat-square"> <img src="https://img.shields.io/badge/Speaker-F5F5F5?style=flat-square"> | [![haerang-id](https://img.shields.io/badge/haerang--id-181717?style=flat-square&logo=github)](https://github.com/이해랑아이디) |

<br>
<br>

## _기획한 웹 페이지 소개_

- **캘린더처럼 한눈에 상태를 확인할 수 있도록 구성하고, 어렵지 않은 구조와 간단한 수정 방식으로 쉽게 사용할 수 있는 태스크 관리 화면을 기획하였습니다.**

<br>
<br>

## _✨프로젝트 구조_


```txt
flowdash/
├── README.md                # 프로젝트 설명
├── index.html               # 화면 구조를 담당하는 메인 HTML
│
├── assets/
│   └── img/                 # 아이콘·배경·프로필 이미지
│
├── css/
│   ├── reset.css            # 브라우저 기본 스타일 초기화
│   ├── base.css             # 전체 레이아웃·공통 스타일
│   ├── dark.css             # 다크 모드 테마
│   ├── media.css            # 반응형 스타일
│   │
│   ├── modal.css            # 할 일 추가·수정 모달 UI
│   ├── delete.css           # task-card 삭제 버튼·애니메이션
│   └── nickname.css         # 프로필 영역 닉네임 전용 스타일
│
├── js/
│   ├── modal.js             # 할 일 생성·삭제·렌더링
│   ├── editModal.js         # 할 일 수정 모달 처리
│   │
│   ├── filter.js            # 정렬·필터 UI 이벤트
│   ├── filterState.js       # 필터 상태 관리
│   ├── search.js            # 할 일 검색 기능
│   │
│   ├── reset.js             # 전체 데이터 초기화
│   ├── theme.js             # 다크/라이트 테마 전환
│   │
│   └── profile/
│       ├── nickname.js      # 프로필 닉네임 수정·저장
│       └── profile.js       # 프로필 이미지 변경
│
├── .prettierrc.js           # 코드 포맷 스타일 설정
```

<br>
<br>

## _Technology Stack (기술 스택)_

| Category                   | Stack                                                                                                                                                                               |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Frontend**               | <img src="./assets/img/html.png" width="30"> &nbsp;&nbsp;&nbsp;<img src="./assets/img/css.png" width="31"> &nbsp;&nbsp;&nbsp;&nbsp;<img src="./assets/img/js.png" width="30">       |
| **Design & Communication** | <img src="./assets/img/discord.svg" width="40" hight="19">&nbsp;&nbsp;&nbsp;<img src="./assets/img/figma.png" width="40">&nbsp;&nbsp;<img src="./assets/img/notion.png" width="40"> |
| **Development Tools**      | <img src="./assets/img/github.png" width="43">                                                                                                                                      |

<br>
<br>

## _주요 기능 구현_

### 사용자 정보 및 프로필 구현

```txt
✓ 접속 시간에 따라 인사 문구가 다르게 보이도록 구현
✓ 닉네임 클릭 시 바로 수정할 수 있도록 인라인 방식으로 구현
✓ Enter 또는 포커스 해제 시 저장, Esc 입력 시 수정 취소 되도록 구현
✓ 프로필 영역 하단 카메라 아이콘을 통해 로컬 이미지 선택 후 프로필 사진 변경 구현
✓ 사용자 관련 설정은 LocalStorage에 저장되어 새로고침 이후에도 유지
```

<br>

### 라이트 / 다크 모드 구현

```txt
✓ 버튼 클릭으로 라이트 / 다크 모드 전환 기능 구현
✓ 선택한 테마는 저장되어 이후 접속 시에도 유지되도록 구현
```

<br>

### 할 일 카드 생성 구현

```txt
✓ 할 일 제목, 내용, 우선순위 입력 후 카드 생성 구현
✓ 저장 시 즉시 화면에 반영, 취소 시 입력 내용 초기화
✓ 생성된 카드 정보는 LocalStorage에 저장
```

<br>

### 카드 상태 관리 구현

```txt
✓ 할 일 - 진행 중 - 완료 상태별 카드 영역 분리 구현
✓ 작업 진행 상황에 맞게 카드 상태 이동 구현
✓ 카드 이동 시 화면 상태와 데이터 상태 동기화 처리
```

<br>

### 카드 수정 모달 구현

```txt
✓ 할 일 및 진행 중 카드 수정 모달 분리 구현
✓ 제목, 내용, 우선순위 수정 기능 구현
```

<br>

### 수정 후 카드 상태 변경 구현

```txt
✓ 수정 결과에 따라 카드 상태 자동 변경 구현
✓ 변경된 상태가 화면과 저장 데이터에 동일하게 반영되도록 처리
```

<br>

### 카드 삭제 기능 구현

```txt
✓ 카드 우측 상단 삭제 버튼 구현
✓ 삭제 버튼 클릭 시 확인 / 취소 선택 가능한 안내 창 구현
✓ 확인 선택 시 카드가 화면과 저장 데이터에서 함께 삭제되도록 처리
```

<br>

### 필터 및 검색 구현

```txt
✓ 기간 기준 필터 (전체 - 오늘 - 7일) 구현
✓ 우선순위 기준 필터 (높음 - 중간 - 낮음) 구현
✓ 오름차순 / 내림차순 정렬 기능 구현
✓ 제목 키워드 기준 카드 검색 기능 구현
```

<br>

### 통계 및 달성률 표시 구현

```txt
✓ 전체 Todo 및 상태별 카드 개수 집계 구현
✓ 완료된 작업 비율 달성률 바로 시각화 구현
```

<br>

### CSS 인터랙션 및 반응형 구현

```txt
✓ 카드 삭제 시 왼쪽에서 오른쪽 방향으로 사라지는 애니메이션 구현
✓ 카드 재정렬 시 시간 차를 두어 자연스럽게 이어지도록 구현
✓ 카드 및 프로필 영역에 스타일 적용
✓ 다양한 화면 크기에 맞게 반응형 레이아웃 구현
```

<br>
<br>

## _📝기술적 문제와 해결 과정_

### 기존 구현 구조에서 기능 추가 시 발생한 문제

- 필터 UI를 직접 구성하는 과정에서 기존 CSS와 JavaScript가 동일한 class에 강하게 연결되어 있어, <br>
  기능 확장 시 기존 구조에 영향을 주는 문제가 발생하였습니다.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;⇒ &nbsp;&nbsp;&nbsp;하나의 객체로 관리하고
전체 목록에서 조건을 **순차적으로 적용하는 구조로 개선**하였습니다.

### 후에 디자인 및 기획 측면에서의 보완점

- 칸반 보드의 특성을 고려했을 때  
  카드를 직접 이동하는 드래그 앤 드롭 방식이 더 적합하다고 판단되었으나,  
  기획 단계에서 반영하지 못해 **클릭기반 상태변경 방식**으로 구현하였습니다.

- 프로필 사진 변경 기능 구현 시  
  이미지 용량 초과에 대한 기본적인 제한 처리는 구현하였으나,  
  고화질 이미지가 일반적인 환경을 충분히 고려하지 못한 점이 아쉬움으로 남았습니다.
