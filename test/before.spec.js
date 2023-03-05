import before from '../before.js';
import { expect } from 'chai';

describe('@after(fn)', () => {
  it('After works OK', () => {
    const array = [];

    const beforeFn = () => {
      array.push('B');
    };

    class Module {
      x = 81;

      @before(beforeFn)
      moduleFunction () {
        array.push('A');
      }
    }

    const module = new Module();

    module.moduleFunction();

    expect(array.length).to.equal(2);
    expect(array[0]).to.equal('B');
    expect(array[1]).to.equal('A');
  });
});
