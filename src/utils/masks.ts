export const phone = (value: string) => {
  const newPhone = value?.replace(/\D/g, '').replace(/^0/, '');
  if (newPhone.length > 11) {
    return newPhone.replace(/^(\d\d)(\d{5})(\d{4}).*/, '($1) $2-$3');
  }
  if (newPhone.length > 7) {
    return newPhone.replace(/^(\d\d)(\d{5})(\d{0,4}).*/, '($1) $2-$3');
  }
  if (newPhone.length > 2) {
    return newPhone.replace(/^(\d\d)(\d{0,5})/, '($1) $2');
  }
  if (newPhone.trim() !== '') {
    return newPhone.replace(/^(\d*)/, '($1');
  }

  return newPhone;
};

export const cep = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2-$3')
    .replace(/(-\d{3})\d+?$/, '$1');
};

export const currency = (value: string) => {
  const newCurrency = Number(value.replace(/\D/g, ''));
  return (newCurrency / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  });
};

export const getOnlyNumbers = (str: string) => str.replace(/\D/g, '');

export const cnpj = (cnpj: string) => {
  cnpj
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');

  return cnpj;
};
