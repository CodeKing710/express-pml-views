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