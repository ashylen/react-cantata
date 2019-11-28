import { maxLength } from './maxLength';

const testingFunction = value => maxLength(15)(value);

test('Check for 16 chars length', () => {
  expect(testingFunction('123456789_123456')).toMatch('Must be 15 characters or less');
});

test('Check for 19 chars length', () => {
  expect(testingFunction('123456789_123456789')).toMatch('Must be 15 characters or less');
});

test('Check for 15 chars length', () => {
  expect(testingFunction('123456789_12345')).toBeUndefined();
});

test('Check for empty string', () => {
  expect(testingFunction('')).toBeUndefined();
});
