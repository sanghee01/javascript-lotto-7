import { Console } from '@woowacourse/mission-utils';
import Lotto from './Lotto.js';

class InputView {
  static async getPurchaseAmount() {
    while (true) {
      try {
        const purchaseInput = Number(await Console.readLineAsync('구입금액을 입력해 주세요.\n'));

        if (isNaN(purchaseInput)) {
          throw new Error('[ERROR] 구입 금액은 숫자만 입력할 수 있습니다.');
        }
        if (!Number.isInteger(purchaseInput)) {
          throw new Error('[ERROR] 구입 금액은 정수만 입력할 수 있습니다.');
        }
        if (purchaseInput < 1000) {
          throw new Error('[ERROR] 구입 금액은 1,000원 이상이어야 합니다.');
        }
        if (purchaseInput > Number.MAX_SAFE_INTEGER) {
          throw new Error('[ERROR] 너무 큰 금액을 입력하셨습니다. 9,007,199,254,740,000 이하의 숫자를 입력하세요. ');
        }
        if (purchaseInput % 1000 !== 0) {
          throw new Error('[ERROR] 구입 금액은 천원 단위여야 합니다.');
        }

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

        if (winningLottoInput[0] === ',' || winningLottoInput.at(-1) === ',') {
          throw new Error('[ERROR] 쉼표(,)가 잘못된 위치에 있습니다.');
        }

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

        if (isNaN(bonusNumber)) {
          throw new Error('[ERROR] 숫자 이외의 문자는 입력할 수 없습니다.');
        }
        if (!Number.isInteger(bonusNumber)) {
          throw new Error('[ERROR] 보너스 번호는 정수여야 합니다.');
        }
        if (bonusNumber < 1 || bonusNumber > 45) {
          throw new Error('[ERROR] 보너스 번호는 1 ~ 45 범위의 숫자만 입력할 수 있습니다');
        }
        if (winningLotto.contains(bonusNumber)) {
          throw new Error('[ERROR] 보너스 번호는 로또 번호와 중복될 수 없습니다.');
        }

        return bonusNumber;
      } catch (error) {
        Console.print(error.message);
      }
    }
  }
}

export default InputView;
