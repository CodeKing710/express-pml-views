const lex = require('../lexer');

//Test comments for the lexical analyzer
test('See if lexer ignores comments', () => {
  expect(lex("#Comment code\n")).toEqual([]);
});

//Test lexer to see if directives are tracked
test('See if lexer handles templates properly (@ template name => [{...},{...}])', () => {
  //Template directive test
  expect(lex('@ template null\n')).toEqual([
    {type:'directive',value: 'template'},
    {type: 'value', value: 'null'}
  ]);
});

test('See if lexer handles includes properly (@ include name => [{...},{...}])', () => {
  //Include directive test
  expect(lex('@ include null\n')).toEqual([
    {type:'directive',value: 'include'},
    {type: 'value', value: 'null'}
  ]);
});

test('See if lexer handles variables properly ($name => [{...}])', () => {
  //Variable test
  expect(lex('$title\n')).toEqual([
    {type: 'variable', value: 'title'}
  ]);
});

test('See if lexer handles tags properly (:name => [{...}])', () => {
  //Tag test
  expect(lex(':head\n')).toEqual([
    {type: 'tag', value: 'head'}
  ]);
});

test('See if lexer handles attributes properly (<name=value,[...]> => [{...},{...},[...]])', () => {
  //Attribute test
  expect(lex('<class=hello>\n')).toEqual([
    {type: 'attrName', value: 'class'},
    {type: 'attrValue', value: 'hello'}
  ]);
  expect(lex('<class=hello,id=foo>\n')).toEqual([
    {type: 'attrName', value: 'class'},
    {type: 'attrValue', value: 'hello'},
    {type: 'attrName', value: 'id'},
    {type: 'attrValue', value: 'foo'}
  ]);
});

test('See if lexer handles text', () => {
  expect(lex('"This is a sentence\n')).toEqual([
    {type: 'text', value: 'This is a sentence'}
  ]);
  // expect(lex('"This is a sentence that has $variable in it\n')).toEqual([
  //   {type: 'text', value: 'This is a sentence'}
  // ]);
});