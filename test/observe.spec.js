import observe from '../observe.js';
import { expect } from 'chai';

describe('@observe(fn)', () => {
  it('Observe object OK', () => {
    let changes = 0;

    const onChange = function () {
      changes++;
    };

    class Module {
      @observe(onChange)
        data = {
          a: 1,
          b: 2
        };
    }

    const module = new Module();

    module.data.a = 2;
    module.data.b = 3;

    expect(changes).to.equal(2);
  });
});
