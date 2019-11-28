import { required } from './required';

test('Field is filled correctly', ()=>{
    expect(required(true)).toBeUndefined()
});

test('Field is empty', ()=>{
    expect(required(false)).toMatch('This field is required')
});

test('Field is empty', ()=>{
    expect(required("")).toMatch('This field is required')
});

test('Field is empty', ()=>{
    expect(required()).toMatch('This field is required')
});