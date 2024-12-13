class Validation {
  static validatePurchaseAmount(purchaseInput) {
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
  }

  static validateWinningLottoInput(winningLottoInput) {
    if (winningLottoInput[0] === ',' || winningLottoInput.at(-1) === ',') {
      throw new Error('[ERROR] 쉼표(,)가 잘못된 위치에 있습니다.');
    }
  }

  static validateBonusNumber(bonusNumber, winningLotto) {
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
  }

  static validateLottoNumber(numbers) {
    if (numbers.length !== 6) {
      throw new Error('[ERROR] 로또 번호는 6개여야 합니다.');
    }

    if (new Set(numbers).size !== 6) {
      throw new Error('[ERROR] 로또 번호는 중복되면 안됩니다.');
    }

    numbers.forEach((number) => {
      if (!Number.isInteger(number) || number < 1 || number > 45) {
        throw new Error('[ERROR] 로또 번호는 1 ~ 45 범위의 숫자만 입력할 수 있습니다');
      }
    });
  }
}

export default Validation;
