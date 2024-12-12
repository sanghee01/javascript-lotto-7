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
  }
}

export default App;
