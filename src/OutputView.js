import { Console } from '@woowacourse/mission-utils';
import { LOTTO_RANK_MONEY } from './Constants.js';
class OutputView {
  static printPurchaseResult(lottoQuantity) {
    Console.print(`\n${lottoQuantity}개를 구매했습니다.`);
  }

  static printLottoList(lotto) {
    Console.print(lotto.toString());
  }

  static printResults(winningCount, purchaseAmount) {
    Console.print(`\n당첨 통계`);
    Console.print(`---`);
    Console.print(`3개 일치 (5,000원) - ${winningCount[4]}개`);
    Console.print(`4개 일치 (50,000원) - ${winningCount[3]}개`);
    Console.print(`5개 일치 (1,500,000원) - ${winningCount[2]}개`);
    Console.print(`5개 일치, 보너스 볼 일치 (30,000,000원) - ${winningCount[1]}개`);
    Console.print(`6개 일치 (2,000,000,000원) - ${winningCount[0]}개`);

    const getMoney =
      winningCount[4] * LOTTO_RANK_MONEY.FIFTH +
      winningCount[3] * LOTTO_RANK_MONEY.FOURTH +
      winningCount[2] * LOTTO_RANK_MONEY.THIRD +
      winningCount[1] * LOTTO_RANK_MONEY.SECOND +
      winningCount[0] * LOTTO_RANK_MONEY.FIRST;
    const getMoneyRate = ((getMoney / purchaseAmount) * 100).toFixed(1);

    Console.print(`총 수익률은 ${getMoneyRate}%입니다.`);
  }
}

export default OutputView;
