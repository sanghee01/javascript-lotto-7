import { Console } from '@woowacourse/mission-utils';
import Lotto from './Lotto.js';
import Validation from './Validation.js';

class InputView {
  static async getPurchaseAmount() {
    while (true) {
      try {
        const purchaseInput = Number(await Console.readLineAsync('구입금액을 입력해 주세요.\n'));
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
        const winningLottoInput = await Console.readLineAsync('\n당첨 번호를 입력해 주세요.\n');
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
        const bonusNumber = Number(await Console.readLineAsync('\n보너스 번호를 입력해 주세요.\n'));
        Validation.validateBonusNumber(bonusNumber, winningLotto);

        return bonusNumber;
      } catch (error) {
        Console.print(error.message);
      }
    }
  }
}

export default InputView;
