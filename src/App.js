import { Random } from '@woowacourse/mission-utils';
import Lotto from './Lotto.js';
import InputView from './InputView.js';
import OutputView from './OutputView.js';

class App {
  async run() {
    const purchaseAmount = await InputView.getPurchaseAmount();
    const lottoQuantity = purchaseAmount / 1000;
    OutputView.printPurchaseResult(lottoQuantity);

    const lottoList = [];
    for (let i = 0; i < lottoQuantity; i++) {
      const numbers = Random.pickUniqueNumbersInRange(1, 45, 6);
      const lotto = new Lotto(numbers);
      lottoList.push(lotto);
    }

    OutputView.printLottoList(lottoList);

    const winningLotto = await InputView.getWinningLotto();
    const bonusNumber = await InputView.getBonusNumber(winningLotto);

    const winningCount = [0, 0, 0, 0, 0];
    for (let lotto of lottoList) {
      const matchCount = lotto.countMatchingNumbers(winningLotto.getNumbers());

      if (matchCount === 6) winningCount[0]++;
      if (matchCount === 5 && lotto.contains(bonusNumber)) winningCount[1]++;
      if (matchCount === 5) winningCount[2]++;
      if (matchCount === 4) winningCount[3]++;
      if (matchCount === 3) winningCount[4]++;
    }

    OutputView.printResults(winningCount, purchaseAmount);
  }
}

export default App;
