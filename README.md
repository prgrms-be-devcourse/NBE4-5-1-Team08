# NBE4-5-1-Team08
프로그래머스 백엔드 4기 5회차 8팀 1차 프로젝트
# 🥜 콩자바ㄴ(오타아님) - 8팀

## 📌 프로젝트 주제

- 커피 주문 관리 시스템

## 🛠 S/W 아키텍처 구성

### 📌 **기술 스택**

| 기술 | 버전 |
| --- | --- |
| Java | OpenJDK 23.0.2 |
| Spring Boot | 3.4.2 |
| Spring Boot Libraries | Data JPA, Web, Validation, Security, Mail |
| Lombok | 1.18.20 |
| MySQL | MySQL Community 8.0.39 |
| MySQL Connector | 8.0.29 |

## 🎯 주요 기능

| 기능        | 세부 내용 |
|------------|----------|
| **상품 관리** | ✅ 상품 등록, 수정, 삭제 <br> ✅ 상품 목록 조회 및 상세 조회 |
| **주문 관리** | ✅ 사용자가 장바구니에 상품 추가 <br> ✅ 장바구니의 상품을 주문 <br> ✅ 오후 2시까지 접수된 주문을 일괄 배송 <br> ✅ 주문 내역을 이메일로 발송 |
| **관리자 페이지** | ✅ 상품 및 주문 관리 기능 제공 |

## 👥 역할 분담

| 팀원       | 역할 |
|-----------|------------------------------------------|
| **이준호** | BE - 주문 CR 구현 <br> 주문 추가, 목록 조회 <br> 구매 시 이메일 전송 |
| **서세훈** | BE - 상품 CRUD 구현 <br> 상품 이미지 업로드 구현 |
| **옥정현** | BE - 상품 CRUD 구현 <br> FE - 관리자 페이지 구현 |
| **강을찬** | PM <br> BE​ - 매출 통계 구현​ <br> FE - 사용자 페이지 구현 <br> API 설계 |
| **전기범** | BE - 주문 UD 구현 <br> 주문 수정, 삭제 <br> 14시 일괄 배송 |

## 🏗 협업 규칙

### 🗒️Git 브랜치 규칙

- **GitHub Flow 방식**
    1. **Branch 생성**
        - 새로운 기능이나 버그 수정을 위해 새로운 브랜치를 생성
    2. **Commit 작성**
        - 브랜치에서 변경 사항을 커밋으로 저장
        
        > 📌 Commit 메시지 컨벤션
        > 
        > 1. `feat`: 새로운 기능 추가
        > 2. `fix`: 버그 수정
        > 3. `docs`: 문서 수정
        > 4. `refactor`: 코드 리팩토링
        > 5. `style`: 코드 스타일 변경 (기능 변경 없음)
        > 6. `chore`: 기타 변경 사항 
    3. **Pull Request(PR) 생성**
        - 변경 사항을 develop 브랜치로 병합하기 위해 PR을 생성
        > 📌 PR 규칙
        > 
        > 1. Merge 전 2명 이상 승인 필요
        > 2. PR 설명에 구현한 기능 간단히 작성
        > 3. PR 전 rebase 확인 필수
    4. 리뷰 및 피드백
    5. develop 병합 (Merge)
        - PR이 승인되면 변경 사항을 develop 브랜치로 병합.

### 🗒️ 자바 컨벤션

- 줄임말 사용 X
- 네이밍 규칙
    - 클래스명: **PascalCase**
    - 변수 및 메서드명: **camelCase**
    - 상수: **UPPER_SNAKE_CASE**
- 코드 스타일
    - 한 줄에 100자 제한
    - 중괄호 `{}`는 항상 사용
    - 의미 없는 주석은 지양
- [Java 네이밍 규칙 참고](https://velog.io/@pshsh910/Java-%EB%B3%80%EC%88%98-%EB%A9%94%EC%84%9C%EB%93%9C-%EB%84%A4%EC%9D%B4%EB%B0%8D-%EA%B7%9C%EC%B9%99)

