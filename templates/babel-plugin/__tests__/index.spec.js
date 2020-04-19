const babel = require('@babel/core');
const plugin = require('..');

function transformFixture(fixture, options = {}) {
  const { code } = babel.transform(fixture, {
    plugins: [[plugin, options]],
  });

  return code;
}

it('works!', () => {
  const code = `
    console.log(foo);
  `;

  const result = transformFixture(code, { option: 'value' });
  expect(result).toMatchSnapshot();
});
