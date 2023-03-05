import after from '../after.js';
import { expect } from 'chai';

describe('@after(fn)', () => {
  it('After works OK', () => {
    const array = [];

    const afterFn = () => {
      array.push('B');
    };

    class Module {
      x = 81;

      @after(afterFn)
      moduleFunction () {
        array.push('A');
      }
    }

    const module = new Module();

    module.moduleFunction();

    expect(array.length).to.equal(2);
    expect(array[0]).to.equal('A');
    expect(array[1]).to.equal('B');
  });
});
