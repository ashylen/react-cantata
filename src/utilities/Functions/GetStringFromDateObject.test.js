import { GetStringFromDateObject } from './GetStringFromDateObject';

test('Check if string is returned from string', () => {
  expect(GetStringFromDateObject('15.10.2010')).toMatch('15.10.2010');
});

test('Check if string is returned from empty string', () => {
  expect(GetStringFromDateObject('')).toMatch('');
});

test('Check if string is returned from object', () => {
  expect(GetStringFromDateObject(new Date('December 17, 1995'))).toMatch('17.12.1995');
});

test('Check if string is returned from object (11 is December)', () => {
  expect(GetStringFromDateObject(new Date(1995,11,17))).toMatch('17.12.1995');
});

