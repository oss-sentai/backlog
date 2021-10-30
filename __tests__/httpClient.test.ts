import Generator from '../src/httpc/generator';

describe('httpClient', (): void => {
  test('should be converted to formdata.', (): void => {
    const data = {
      str: 'hello',
      number: 0,
      list: [1, 2],
    };
    const generator = new Generator();
    const urlParams = generator.generateURLSearchParams(data);

    expect(urlParams.get('str')).toBe(data.str);
    expect(urlParams.get('number')).toBe(data.number.toString());
    expect(urlParams.getAll('list[]')).toEqual(
      data.list.map((item) => item.toString())
    );
  });
});
