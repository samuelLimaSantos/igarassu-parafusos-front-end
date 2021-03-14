const maskMoney = (value: string): string => {
  const cleanValue = value.replace(/[^0-9]/g, '');

  if (cleanValue === '') {
    return '';
  }

  let int: number = +cleanValue;

  if (int >= Number.MAX_SAFE_INTEGER + 1) {
    int = +cleanValue.slice(0, cleanValue.length - 1);
  }

  let ret = (int / 100).toString();

  if (ret.search('.') !== -1) {
    ret = ret.replace(/[.]/g, ',');

    const split = ret.split(',');

    if (split.length === 1) {
      split.push('');
    }

    if (split[1].length === 0) {
      split[1] += '0';
    }
    if (split[1].length === 1) {
      split[1] += '0';
    }

    ret = `${split[0]},${split[1]}`;
  }

  return `R$${ret}`;
};

export { maskMoney };
