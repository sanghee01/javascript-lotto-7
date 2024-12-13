import { Console } from '@woowacourse/mission-utils';
import Lotto from './Lotto.js';
import Validation from './Validation.js';
import { INPUT_MESSAGE } from './Constants.js';

class InputView {
  static async getPurchaseAmount() {
    while (true) {
      try {
        const purchaseInput = Number(await Console.readLineAsync(INPUT_MESSAGE.PURCHASE_AMOUNT));
        Validation.validatePurchaseAmount(purchaseInput);

        return purchaseInput;
      } catch (error) {
        Console.print(error.message);
      }
    }
  }

  static async getWinningLotto() {
    while (true) {
      try {
        const winningLottoInput = await Console.readLineAsync(INPUT_MESSAGE.WINNING_LOTTO);
        Validation.validateWinningLottoInput(winningLottoInput);
        const winningNumbers = winningLottoInput.split(',').map(Number);

        return new Lotto(winningNumbers);
      } catch (error) {
        Console.print(error.message);
      }
    }
  }

  static async getBonusNumber(winningLotto) {
    while (true) {
      try {
        const bonusNumber = Number(await Console.readLineAsync(INPUT_MESSAGE.BONUS_NUMBER));
        Validation.validateBonusNumber(bonusNumber, winningLotto);

        return bonusNumber;
      } catch (error) {
        Console.print(error.message);
      }
    }
  }
}

export default InputView;
