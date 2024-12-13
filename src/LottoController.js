import { Random } from '@woowacourse/mission-utils';
import Lotto from './Lotto.js';
import { LOTTO_NUMBER_RANGE, LOTTO_RANK, LOTTO_RANK_MONEY } from './Constants.js';

class LottoController {
  static calculateLottoQuantity(purchaseAmount) {
    return purchaseAmount / 1000;
  }

  static pickLottoNumberList(lottoQuantity) {
    const lottoList = [];
    for (let i = 0; i < lottoQuantity; i++) {
      const numbers = Random.pickUniqueNumbersInRange(
        LOTTO_NUMBER_RANGE.MIN,
        LOTTO_NUMBER_RANGE.MAX,
        LOTTO_NUMBER_RANGE.QUANTITY,
      );
      const lotto = new Lotto(numbers);
      lottoList.push(lotto);
    }

    return lottoList;
  }

  static calculateWinningCounts(lottoList, winningLotto, bonusNumber) {
    const winningCount = [0, 0, 0, 0, 0];

    for (let lotto of lottoList) {
      const matchCount = lotto.countMatchingNumbers(winningLotto.getNumbers());

      if (matchCount === LOTTO_RANK.FIRST) winningCount[0]++;
      if (matchCount === LOTTO_RANK.SECOND && lotto.contains(bonusNumber)) winningCount[1]++;
      if (matchCount === LOTTO_RANK.THIRD) winningCount[2]++;
      if (matchCount === LOTTO_RANK.FOURTH) winningCount[3]++;
      if (matchCount === LOTTO_RANK.FIFTH) winningCount[4]++;
    }
    return winningCount;
  }

  static calculateTotalMoney(winningCount) {
    return (
      winningCount[4] * LOTTO_RANK_MONEY.FIFTH +
      winningCount[3] * LOTTO_RANK_MONEY.FOURTH +
      winningCount[2] * LOTTO_RANK_MONEY.THIRD +
      winningCount[1] * LOTTO_RANK_MONEY.SECOND +
      winningCount[0] * LOTTO_RANK_MONEY.FIRST
    );
  }

  static calculateTotalMoneyRate(totalMoney, purchaseAmount) {
    return ((totalMoney / purchaseAmount) * 100).toFixed(1);
  }
}

export default LottoController;
