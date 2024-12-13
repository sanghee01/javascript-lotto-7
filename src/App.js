import InputView from './InputView.js';
import OutputView from './OutputView.js';
import LottoController from './LottoController.js';

class App {
  async run() {
    const purchaseAmount = await InputView.getPurchaseAmount();
    const lottoQuantity = LottoController.calculateLottoQuantity(purchaseAmount);
    OutputView.printPurchaseResult(lottoQuantity);

    const lottoList = LottoController.pickLottoNumberList(lottoQuantity);

    OutputView.printLottoList(lottoList);

    const winningLotto = await InputView.getWinningLotto();
    const bonusNumber = await InputView.getBonusNumber(winningLotto);

    const winningCount = LottoController.calculateWinningCounts(lottoList, winningLotto, bonusNumber);

    OutputView.printResults(winningCount, purchaseAmount);
  }
}

export default App;
