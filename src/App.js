import { Console, Random } from '@woowacourse/mission-utils';
import Lotto from './Lotto.js';
import InputView from './InputView.js';
class App {
  async run() {
    const purchaseInput = await InputView.getPurchaseAmount();
    const lottoQuantity = purchaseInput / 1000;
    Console.print(`\n${lottoQuantity}개를 구매했습니다.`);

    const lottoList = [];
    for (let i = 0; i < lottoQuantity; i++) {
      const numbers = Random.pickUniqueNumbersInRange(1, 45, 6);
      const lotto = new Lotto(numbers);
      lottoList.push(lotto.getNumbers());
    }

    for (let lotto of lottoList) {
      Console.print(`[${lotto.join(', ')}]`);
    }

    const winningLottoInput = await InputView.getLottoNumber();
    const winningLotto = new Lotto(winningLottoInput.split(',').map(Number)).getNumbers();
    const bonusLottoInput = await InputView.getBonusNumber(winningLotto);

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
