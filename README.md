# **학습 목표**

- 관련 함수를 묶어 클래스를 만들고, 객체들이 협력하여 하나의 큰 기능을 수행하도록 한다.
- 클래스와 함수에 대한 단위 테스트를 통해 의도한 대로 정확하게 작동하는 영역을 확보한다.

<br/>

# **로또**

간단한 로또 발매기를 구현한다.

## **기능 요구 사항**

### 1. 로또 구입 금액 입력

- [x] 로또 구입 금액을 입력 받는다.
- [x] 구입 금액은 1,000원 단위로 입력 받으며 1,000원으로 나누어 떨어지지 않는 경우 예외 처리한다.
  ```
  14000
  ```

### 2. 로또 발행 및 출력

- [x] 구입 금액에 해당하는 만큼 로또를 발행한다.
- [x] 1개의 로또를 발행할 때 중복되지 않는 6개의 숫자를 뽑는다.
- [x] 발행한 로또 수량 및 번호를 출력한다. 로또 번호는 오름차순으로 정렬하여 보여준다.

  ```prolog
  8개를 구매했습니다.
  [8, 21, 23, 41, 42, 43]
  [3, 5, 11, 16, 32, 38]
  [7, 11, 16, 35, 36, 44]
  [1, 8, 11, 31, 41, 42]
  [13, 14, 16, 38, 42, 45]
  [7, 11, 30, 40, 42, 43]
  [2, 13, 22, 32, 38, 45]
  [1, 3, 5, 14, 22, 45]
  ```

### 3. 당첨 번호, 보너스 번호 입력

- 당첨 번호 6개와 보너스 번호 1개는 중복되지 않는 숫자이며, 숫자 범위는 1~45까지이다. 번호는 쉼표(,)를 기준으로 구분한다.
- [x] 당첨 번호를 입력 받는다.

  ```
    1,2,3,4,5,6
  ```

- [x] 보너스 번호 1개를 입력 받는다.
  ```
  7
  ```

### 4. 당첨 내역 출력

- 사용자가 구매한 로또 번호와 당첨 번호를 비교하여 당첨 내역 및 수익률을 출력하고 로또 게임을 종료한다.
- 당첨은 1등부터 5등까지 있다. 당첨 기준과 금액은 아래와 같다.

  > - 1등: 6개 번호 일치 / 2,000,000,000원
  > - 2등: 5개 번호 + 보너스 번호 일치 / 30,000,000원
  > - 3등: 5개 번호 일치 / 1,500,000원
  > - 4등: 4개 번호 일치 / 50,000원
  > - 5등: 3개 번호 일치 / 5,000원

- [x] 당첨 내역을 출력한다.

  ```
  3개 일치 (5,000원) - 1개
  4개 일치 (50,000원) - 0개
  5개 일치 (1,500,000원) - 0개
  5개 일치, 보너스 볼 일치 (30,000,000원) - 0개
  6개 일치 (2,000,000,000원) - 0개
  ```

- [x] 수익률은 소수점 둘째 자리에서 반올림한다. (ex. 100.0%, 51.5%, 1,000,000.0%)

  ```erlang
  총 수익률은 62.5%입니다.
  ```

  <br/>

## 에러 목록

- [x] 사용자가 잘못된 값을 입력할 경우 "[ERROR]"로 시작하는 메시지와 함께 `Error`를 발생시키고 해당 메시지를 출력한 다음 해당 지점부터 다시 입력을 받는다.

- 예외 상황 시 에러 문구를 출력해야 한다. 단, 에러 문구는 "[ERROR]"로 시작해야 한다.

  ```prolog
  [ERROR] 로또 번호는 1부터 45 사이의 숫자여야 합니다.
  ```

**로또 금액 입력 시**

- [x] 숫자 이외의 문자를 입력한 경우
- [x] 1,000원 미만의 수를 입력한 경우
- [x] 최대 안전 정수 값 이상의 수를 입력한 경우
- [x] 1,000원 단위로 입력하지 않은 경우

**당첨 번호 입력 시**

- [x] 번호가 1~45 사이의 숫자가 아닌 경우
- [x] 숫자, 쉼표 이외의 문자를 입력한 경우
- [x] 쉼표를 맨 앞 혹은 맨 뒤에 입력한 경우
- [x] 중복되는 숫자가 있는 경우

**보너스 번호 입력 시**

- [x] 번호가 1~45 사이의 숫자가 아닌 경우
- [x] 정수가 아닌 수를 입력한 경우
- [x] 당첨 번호와 중복되는 경우

<br/>

## **실행 결과 예시**

```prolog
구입금액을 입력해 주세요.
8000

8개를 구매했습니다.
[8, 21, 23, 41, 42, 43]
[3, 5, 11, 16, 32, 38]
[7, 11, 16, 35, 36, 44]
[1, 8, 11, 31, 41, 42]
[13, 14, 16, 38, 42, 45]
[7, 11, 30, 40, 42, 43]
[2, 13, 22, 32, 38, 45]
[1, 3, 5, 14, 22, 45]

당첨 번호를 입력해 주세요.
1,2,3,4,5,6

보너스 번호를 입력해 주세요.
7

당첨 통계
---
3개 일치 (5,000원) - 1개
4개 일치 (50,000원) - 0개
5개 일치 (1,500,000원) - 0개
5개 일치, 보너스 볼 일치 (30,000,000원) - 0개
6개 일치 (2,000,000,000원) - 0개
총 수익률은 62.5%입니다.

```

<br/>

## **프로그래밍 요구 사항**

- [ ] indent(인덴트, 들여쓰기) depth를 3이 넘지 않도록 구현한다. 2까지만 허용한다.
  - 예를 들어 while문 안에 if문이 있으면 들여쓰기는 2이다.
  - 힌트: indent(인덴트, 들여쓰기) depth를 줄이는 좋은 방법은 함수(또는 메서드)를 분리하면 된다.
- [ ] 3항 연산자를 쓰지 않는다.
- [ ] 함수(또는 메서드)가 한 가지 일만 하도록 최대한 작게 만들어라.
- [ ] Jest를 이용하여 정리한 기능 목록이 정상적으로 작동하는지 테스트 코드로 확인한다.
- [ ] 함수(또는 메서드)의 길이가 15라인을 넘어가지 않도록 구현한다.
  - 함수(또는 메서드)가 한 가지 일만 잘 하도록 구현한다.
- [ ] else를 지양한다.
  - 때로는 if/else, when문을 사용하는 것이 더 깔끔해 보일 수 있다. 어느 경우에 쓰는 것이 적절할지 스스로 고민해 본다.
  - 힌트: if 조건절에서 값을 return하는 방식으로 구현하면 else를 사용하지 않아도 된다.
- [ ] 구현한 기능에 대한 단위 테스트를 작성한다. 단, UI(System.out, System.in, Scanner) 로직은 제외한다.
  - 단위 테스트 작성이 익숙하지 않다면 `LottoTest`를 참고하여 학습한 후 테스트를 작성한다.
- [ ] 값을 하드 코딩하지 않는다
- [ ] 클래스는 필드, 생성자, 메서드 순으로 작성한다
- [ ] 이름을 통해 의도를 드러낸다, 축약하지 않는다

### **Lotto 클래스**

- 제공된 `Lotto` 클래스를 사용하여 구현해야 한다.
- `Lotto`에 `numbers` 이외의 필드(인스턴스 변수)를 추가할 수 없다.
- `numbers`의 접근 제어자인 `#`은 변경할 수 없다.
- `Lotto`의 패키지를 변경할 수 있다.
