export const isYesterday = (date) => {  
    if (!(date instanceof Date)) {
      throw new Error('Invalid argument: you must provide a "date" instance');
    };
  
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
  
      return date.getDate() === yesterday.getDate() &&
           date.getMonth() === yesterday.getMonth() &&
           date.getFullYear() === yesterday.getFullYear();
}

export const isToday = (date) => {
    if (!(date instanceof Date)) {
        throw new Error('Invalid argument: you must provide a "date" instance');
    };

    const today = new Date();

    return date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();
}

export const isTomorrow = (date) => {  
  if (!(date instanceof Date)) {
    throw new Error('Invalid argument: you must provide a "date" instance');
  };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

    return date.getDate() === tomorrow.getDate() &&
         date.getMonth() === tomorrow.getMonth() &&
         date.getFullYear() === tomorrow.getFullYear();
}

export const toFixedNoRound = (number, precision = 1) => {
  const factor = Math.pow(10, precision);
  return Math.floor(number * factor) / factor;
}