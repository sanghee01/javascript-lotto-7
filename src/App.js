import Lotto from './Lotto.js';
import InputView from './InputView.js';
import OutputView from './OutputView.js';
import LottoControllter from './LottoController.js';

class App {
  async run() {
    const purchaseInput = await InputView.getPurchaseAmount();
    const lottoQuantity = LottoControllter.caculateLottoQuantity(purchaseInput);
    OutputView.printPurchaseResult(lottoQuantity);

    const lottoList = LottoControllter.pickRandomLottoNumbers(lottoQuantity);

    for (let lotto of lottoList) {
      OutputView.printLottoList(lotto);
    }

    const winningLottoInput = await InputView.getLottoNumber();
    const winningLotto = new Lotto(winningLottoInput.split(',').map(Number)).getNumbers();
    const bonusLottoInput = await InputView.getBonusNumber(winningLotto);
    const winningCount = LottoControllter.calculateWinningCount(winningLotto, lottoList, bonusLottoInput);

    OutputView.printCalculateResult(winningCount);

    const getMoney = LottoControllter.calculateGetMoney(winningCount);
    const getMoneyRate = LottoControllter.calculateGetMoneyRate(getMoney, purchaseInput);

    OutputView.printCalculateRateResult(getMoneyRate);
  }
}

export default App;
