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
      Console.print(`[${lotto.join(', ')}]`);
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

    const bonusLottoInput = Number(await Console.readLineAsync('\n보너스 번호를 입력해 주세요.\n'));

    if (isNaN(bonusLottoInput)) {
      throw new Error('[ERROR] 숫자 이외의 문자는 입력할 수 없습니다.');
    }
    if (!Number.isInteger(bonusLottoInput)) {
      throw new Error('[ERROR] 보너스 번호는 정수여야 합니다.');
    }
    if (bonusLottoInput < 1 || bonusLottoInput > 45) {
      throw new Error('[ERROR] 보너스 번호는 1 ~ 45 범위의 숫자만 입력할 수 있습니다');
    }
    if (winningLotto.includes(bonusLottoInput)) {
      throw new Error('[ERROR] 보너스 번호는 로또 번호와 중복될 수 없습니다.');
    }

    const winningCount = [0, 0, 0, 0, 0];
    for (let lotto of lottoList) {
      let count = 0;
      lotto.forEach((number) => {
        if (winningLotto.includes(number)) count++;
      });

      if (count === 6) winningCount[0]++;
      if (count === 5 && lotto.includes(bonusLottoInput)) winningCount[1]++;
      if (count === 5) winningCount[2]++;
      if (count === 4) winningCount[3]++;
      if (count === 3) winningCount[4]++;
    }

    Console.print(`\n당첨 통계`);
    Console.print(`---`);
    Console.print(`3개 일치 (5,000원) - ${winningCount[4]}개`);
    Console.print(`4개 일치 (50,000원) - ${winningCount[3]}개`);
    Console.print(`5개 일치 (1,500,000원) - ${winningCount[2]}개`);
    Console.print(`5개 일치, 보너스 볼 일치 (30,000,000원) - ${winningCount[1]}개`);
    Console.print(`6개 일치 (2,000,000,000원) - ${winningCount[0]}개`);

    const getMoney =
      winningCount[4] * 5_000 +
      winningCount[3] * 50_000 +
      winningCount[2] * 1_500_000 +
      winningCount[1] * 30_000_000 +
      winningCount[0] * 2_000_000_000;
    const getMoneyRate = ((getMoney / purchaseInput) * 100).toFixed(1);

    Console.print(`총 수익률은 ${getMoneyRate}%입니다.`);
  }
}

export default App;
