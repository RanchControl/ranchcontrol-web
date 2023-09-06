interface IDateTime {
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
}

interface IDateTimeLocal {
  start_at: string;
  ends_at: string;
}

export const getRequestErrorMessages = (errors: any) => {
  if (typeof errors !== 'object') {
    return [errors];
  }

  const nestedMessages = Object.values(errors).map((error: any) => {
    if (typeof error === 'object') {
      return getRequestErrorMessages(error);
    }

    return error;
  });

  const messages: Array<string> = [];

  nestedMessages.forEach((item) => {
    if (Array.isArray(item)) {
      item.forEach((nestedItem) => {
        messages.push(nestedItem);
      });
    } else {
      messages.push(item);
    }
  });

  return messages;
};

export const hexColorWithOpacity = (color: string, opacity: number) => {
  return color + (255 * opacity).toString(16);
};

export const ufOptions = [
  { value: '', label: 'Selecione o estado' },
  { value: 'AC', label: 'AC' },
  { value: 'AL', label: 'AL' },
  { value: 'AP', label: 'AP' },
  { value: 'AM', label: 'AM' },
  { value: 'BA', label: 'BA' },
  { value: 'CE', label: 'CE' },
  { value: 'DF', label: 'DF' },
  { value: 'ES', label: 'ES' },
  { value: 'GO', label: 'GO' },
  { value: 'MA', label: 'MA' },
  { value: 'MT', label: 'MT' },
  { value: 'MS', label: 'MS' },
  { value: 'MG', label: 'MG' },
  { value: 'PA', label: 'PA' },
  { value: 'PB', label: 'PB' },
  { value: 'PR', label: 'PR' },
  { value: 'PE', label: 'PE' },
  { value: 'PI', label: 'PI' },
  { value: 'RJ', label: 'RJ' },
  { value: 'RN', label: 'RN' },
  { value: 'RS', label: 'RS' },
  { value: 'RO', label: 'RO' },
  { value: 'RR', label: 'RR' },
  { value: 'SC', label: 'SC' },
  { value: 'SP', label: 'SP' },
  { value: 'SE', label: 'SE' },
  { value: 'TO', label: 'TO' },
];

export const validateStartTime = (value: string, parent: IDateTime) => {
  const isStartDateTimeLessThanCurrentTime =
    new Date(`${parent.startDate}T${value}`) < new Date();

  return !!value && !isStartDateTimeLessThanCurrentTime;
};

export const validateEndTime = (value: string, parent: IDateTime) => {
  const endDateTime = new Date(`${parent.endDate}T${value}`);
  const startDateTime = new Date(`${parent.startDate}T${parent.startTime}`);
  const isSameDay = parent.startDate === parent.endDate;
  const endTimeLessThanStartTime = endDateTime < startDateTime;

  return !!value && !(isSameDay && endTimeLessThanStartTime);
};

export const validateEndDate = (value: string, parent: IDateTime) => {
  const endDate = new Date(`${value}T${parent.endTime}`);
  const startDate = new Date(`${parent.startDate}T${parent.startTime}`);

  return !(endDate < startDate);
};

export const validateStartDateTime = (value: string, currentDate: string) => {
  return currentDate <= value;
};

export const validateEndDateTime = (
  ends_at: string,
  parent: IDateTimeLocal,
  currentDate: string,
  isUpdate?: boolean
) => {
  if (isUpdate) {
    return parent.start_at < ends_at;
  }
  return parent.start_at < ends_at && currentDate < ends_at;
};

export const removeScopeOfString = (email: string) => {
  return email.split(':')[1];
};

export const extractScopeOfEmail = (value: string) => {
  return value.split(':')[0];
};

export const calculateWeek = (date: Date) => {
  const week: Array<Date> = [];
  let sunday;
  if (date.getDay() === 0) {
    sunday = date;
  } else {
    sunday = new Date(new Date(date).setDate(date.getDate() - date.getDay()));
  }
  for (let i = 1; i < 8; i++) {
    week.push(
      new Date(new Date(sunday).setDate(new Date(sunday).getDate() + i))
    );
  }
  return week;
};

export const addDays = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const removeDays = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() - days);
  return result;
};

const diffYears = (firstDate: Date, secondDate: Date) => {
  const ageDiff = secondDate.getFullYear() - firstDate.getFullYear();
  const monthDiff = secondDate.getMonth() - firstDate.getMonth();

  if (ageDiff <= 0) {
    return 0;
  }

  if (
    monthDiff < 0 ||
    (monthDiff == 0 && secondDate.getDate() < firstDate.getDate())
  ) {
    return ageDiff - 1;
  }

  return ageDiff;
};

export const isOver18YearsOld = (birthDateString: string) => {
  const today = new Date();
  const birthDate = new Date(birthDateString + 'T00:00');

  return diffYears(birthDate, today) >= 18;
};

export const updatePositionOnArray = <T>(
  array: Array<T>,
  currentIndex: number,
  newIndex: number
) => {
  const newArray = [...array];
  const item = newArray[currentIndex];
  newArray.splice(currentIndex, 1);
  newArray.splice(newIndex, 0, item);

  return newArray;
};

export const calculateIndex = (
  oldArray: Array<{
    index: number;
  }>,
  newArray: Array<{
    index: number;
  }>,
  newArrayIndex: number
) => {
  if (newArrayIndex === 0) {
    return oldArray[newArrayIndex].index - 500;
  }

  if (newArrayIndex === oldArray.length - 1) {
    return oldArray[newArrayIndex].index + 500;
  }

  return (
    (newArray[newArrayIndex - 1].index + newArray[newArrayIndex + 1].index) / 2
  );
};

export const getIdFromYoutubeURL = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  return match && match[2].length === 11 ? match[2] : null;
};

export const cnpjLength = 18;

export const cpfLength = 14;

export const formatBankCode = (code: string) => {
  return ('000' + code).slice(-3);
};

export const generateGoogleMapsLink = (latitude: number, longitude: number) => {
  return `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
};
