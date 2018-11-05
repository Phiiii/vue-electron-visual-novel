import { Speed } from './speeds';

export const specialCharacters = [
  ...Object.values(Speed), '_'
];

export const filterSpecialCharacters = (str: string): string => {
  return str.split('').filter(val => !specialCharacters.includes(val)).join('');
};
