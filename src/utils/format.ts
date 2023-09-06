export const formatDate = (str: string | Date) => {
  if (!str) {
    return '';
  }

  const newDate = str instanceof Date ? str.toISOString() : str;

  const year = newDate.slice(0, 4);
  const month = newDate.slice(5, 7);
  const day = newDate.slice(8, 10);

  return `${day}/${month}/${year}`;
};

export const toDateInput = (date: Date) => {
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const toTimeInput = (date: string) => {
  return new Date(date).toLocaleTimeString('pt-br', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const toDateTimeInput = (date: Date) => {
  const formattedDate = toDateInput(date);
  const formattedTime = date.toLocaleTimeString('pt-br', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return `${formattedDate}T${formattedTime}`;
};

/**
 *
 * @param date
 * @param time HH:mm
 * @returns YYYY-MM-DDTHH:mm:ss.sssZ
 */
export const toCustomISO = (date: Date, time: string) => {
  return `${date.toISOString().slice(0, -14)}T${time}:00.000Z`;
};

export const formatBrCurrency = (value: number) => {
  return (value / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  });
};

export const formatCouponDiscount = (percentage: number) => {
  return `${Number((1 - percentage).toFixed(2)) * 100}% OFF`;
};
