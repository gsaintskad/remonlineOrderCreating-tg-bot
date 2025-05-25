const transliterateCyrillicToLatinChar = (char) => {
  const map = {
    А: 'A',
    В: 'B',
    Е: 'E',
    І: 'I',
    К: 'K',
    М: 'M',
    Н: 'H',
    О: 'O',
    Р: 'P',
    С: 'C',
    Т: 'T',
    Х: 'X',
  };
  return map[char] || char;
};

export const transliterateCyrillicToLatinString = (plateNumber) => {
  return plateNumber.split('').map(transliterateCyrillicToLatinChar).join('');
};
