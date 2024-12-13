import { Random } from '@woowacourse/mission-utils';
import Lotto from './Lotto.js';

class LottoController {
  static calculateLottoQuantity(purchaseAmount) {
    return purchaseAmount / 1000;
  }

  static pickLottoNumberList(lottoQuantity) {
    const lottoList = [];
    for (let i = 0; i < lottoQuantity; i++) {
      const numbers = Random.pickUniqueNumbersInRange(1, 45, 6);
      const lotto = new Lotto(numbers);
      lottoList.push(lotto);
    }

    return lottoList;
  }

  static calculateWinningCounts(lottoList, winningLotto, bonusNumber) {
    const winningCount = [0, 0, 0, 0, 0];

    for (let lotto of lottoList) {
      const matchCount = lotto.countMatchingNumbers(winningLotto.getNumbers());

      if (matchCount === 6) winningCount[0]++;
      if (matchCount === 5 && lotto.contains(bonusNumber)) winningCount[1]++;
      if (matchCount === 5) winningCount[2]++;
      if (matchCount === 4) winningCount[3]++;
      if (matchCount === 3) winningCount[4]++;
    }
    return winningCount;
  }
}

export default LottoController;
