import decorate from '../decorate.js';
import { expect } from 'chai';
import memoizeFn from 'lodash.memoize';

describe('@decorate(fn)', () => {
  it('Decorate works OK', () => {
    let count = 0;

    class Module {
      @decorate(memoizeFn)
      doSomethingExpensive () {
        count++;
        return 1;
      }
    }

    const module = new Module();
    const data = [1, 2, 3];

    module.doSomethingExpensive(data);
    module.doSomethingExpensive(data);

    expect(count).to.equal(1);
  });
});
