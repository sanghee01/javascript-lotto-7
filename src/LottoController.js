import { Random } from '@woowacourse/mission-utils';
import Lotto from './Lotto.js';

class LottoControllter {
  static caculateLottoQuantity(purchaseInput) {
    return purchaseInput / 1000;
  }

  static pickRandomLottoNumbers(lottoQuantity) {
    const lottoList = [];

    for (let i = 0; i < lottoQuantity; i++) {
      const numbers = Random.pickUniqueNumbersInRange(1, 45, 6);
      const lotto = new Lotto(numbers);
      lottoList.push(lotto.getNumbers());
    }

    return lottoList;
  }

  static calculateWinningCount(winningLotto, lottoList, bonusLottoInput) {
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

    return winningCount;
  }

  static calculateGetMoney(winningCount) {
    return (
      winningCount[4] * 5_000 +
      winningCount[3] * 50_000 +
      winningCount[2] * 1_500_000 +
      winningCount[1] * 30_000_000 +
      winningCount[0] * 2_000_000_000
    );
  }

  static calculateGetMoneyRate(getMoney, purchaseInput) {
    return ((getMoney / purchaseInput) * 100).toFixed(1);
  }
}

export default LottoControllter;
