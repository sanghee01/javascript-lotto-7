import Lotto from '../src/Lotto';

describe('로또 클래스 테스트', () => {
  test('로또 번호의 개수가 6개가 넘어가면 예외가 발생한다.', () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 6, 7]);
    }).toThrow('[ERROR]');
  });

  test('로또 번호에 중복된 숫자가 있으면 예외가 발생한다.', () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 5]);
    }).toThrow('[ERROR]');
  });

  test('로또 번호가 1부터 45 사이의 숫자가 아니면 예외가 발생한다.', () => {
    expect(() => {
      new Lotto([0, 1, 2, 3, 4, 5]);
    }).toThrow('[ERROR]');
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 46]);
    }).toThrow('[ERROR]');
  });

  test('로또 번호가 정수가 아니면 예외가 발생한다.', () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 5.5]);
    }).toThrow('[ERROR]');
  });

  test('로또 번호는 오름차순으로 정렬된다.', () => {
    const lotto = new Lotto([6, 3, 5, 1, 2, 4]);
    expect(lotto.getNumbers()).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test('당첨 번호와 일치하는 번호의 개수를 반환한다.', () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
    expect(lotto.countMatchingNumbers([1, 2, 3, 7, 8, 9])).toBe(3);
  });

  test('특정 번호가 포함되어 있는지 확인한다.', () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
    expect(lotto.contains(1)).toBe(true);
    expect(lotto.contains(7)).toBe(false);
  });

  test('로또 번호가 올바르게 문자열로 변환된다.', () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
    expect(lotto.toString()).toBe('[1, 2, 3, 4, 5, 6]');
  });
});
