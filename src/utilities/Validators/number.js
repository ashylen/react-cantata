export const number = value => (value && Number.isNaN(Number(value)) ? 'Must be a number' : undefined);
