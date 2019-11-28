import { number } from './number';

test('Value is string', ()=>{
    expect(number("test")).toMatch("Must be a number");
});

test('Value is empty string', ()=>{
    expect(number("")).toBeUndefined();
});

test('Value is number 3', ()=>{
    expect(number(3)).toBeUndefined();
});

test('Value is number 10', ()=>{
    expect(number(10)).toBeUndefined();
});


