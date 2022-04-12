const render = require('../renderer');
global.cache = {};
global.cache.templates = [];

test('See if render returns <!DOCTYPE html>', () => {
  expect(render()).toBe('<!DOCTYPE html>\n<html></html>');
  expect(render([])).toBe('<!DOCTYPE html>\n<html></html>');
});

test('See if render logs template directives', () => {
  //Directives don't do much when the function returns
  expect(render([
    {type:'directive',value: 'template'},
    {type: 'value', value: 'null'}
  ])).toBe('<!DOCTYPE html>');
  console.log(global.cache.templates);
});