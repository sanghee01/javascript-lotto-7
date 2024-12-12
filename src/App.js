import { Console, Random } from '@woowacourse/mission-utils';

class App {
  async run() {
    const purchaseInput = Number(await Console.readLineAsync('구입금액을 입력해 주세요.\n'));

    if (isNaN(purchaseInput)) {
      throw new Error('[ERROR] 구입 금액은 숫자만 입력할 수 있습니다.');
    }
    if (!Number.isInteger(purchaseInput)) {
      throw new Error('[ERROR] 구입 금액은 정수만 입력할 수 있습니다.');
    }
    if (purchaseInput < 1000) {
      throw new Error('[ERROR] 구입 금액은 1,000원 이상이어야 합니다.');
    }
    if (purchaseInput > Number.MAX_SAFE_INTEGER) {
      throw new Error('[ERROR] 너무 큰 금액을 입력하셨습니다. 9,007,199,254,740,000 이하의 숫자를 입력하세요. ');
    }
    if (purchaseInput % 1000 !== 0) {
      throw new Error('[ERROR] 구입 금액은 천원 단위여야 합니다.');
    }

    const lottoQuantity = purchaseInput / 1000;
    Console.print(`\n${lottoQuantity}개를 구매했습니다.`);

    const lottoList = [];
    for (let i = 0; i < lottoQuantity; i++) {
      const lotto = Random.pickUniqueNumbersInRange(1, 45, 6);
      lotto.sort((a, b) => a - b);
      lottoList.push(lotto);
    }
    for (let lotto of lottoList) {
      Console.print(lotto);
    }

    const winningLottoInput = await Console.readLineAsync('\n당첨 번호를 입력해 주세요.\n');

    if (winningLottoInput[0] === ',' || winningLottoInput.at(-1) === ',') {
      throw new Error('[ERROR] 쉼표(,)가 잘못된 위치에 있습니다.');
    }

    const winningLotto = winningLottoInput.split(',').map(Number);

    winningLotto.forEach((char) => {
      if (isNaN(char)) {
        throw new Error('[ERROR] 쉼표(,)와 숫자 이외의 문자는 입력할 수 없습니다.');
      }
      if (!Number.isInteger(char)) {
        throw new Error('[ERROR] 로또 번호는 정수여야 합니다.');
      }
      if (char < 1 || char > 45) {
        throw new Error('[ERROR] 로또 번호는 1 ~ 45 범위의 숫자만 입력할 수 있습니다');
      }
    });

    if (winningLotto.length !== 6) {
      throw new Error('[ERROR] 로또 번호는 6개여야 합니다.');
    }
    if (new Set(winningLotto).size !== 6) {
      throw new Error('[ERROR] 로또 번호는 중복되면 안됩니다.');
    }

    const BonusLottoInput = Number(await Console.readLineAsync('\n보너스 번호를 입력해 주세요.\n'));

    if (isNaN(BonusLottoInput)) {
      throw new Error('[ERROR] 숫자 이외의 문자는 입력할 수 없습니다.');
    }
    if (!Number.isInteger(BonusLottoInput)) {
      throw new Error('[ERROR] 보너스 번호는 정수여야 합니다.');
    }
    if (BonusLottoInput < 1 || BonusLottoInput > 45) {
      throw new Error('[ERROR] 보너스 번호는 1 ~ 45 범위의 숫자만 입력할 수 있습니다');
    }
    if (winningLotto.includes(BonusLottoInput)) {
      throw new Error('[ERROR] 보너스 번호는 로또 번호와 중복될 수 없습니다.');
    }
  }
}

export default App;
