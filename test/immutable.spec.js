import immutable from '../immutable.js';
import { expect } from 'chai';

describe('@Immutable()', () => {
  it('Can not mute property', () => {
    class Module {
      @immutable()
        data = 2;
    }

    const moduleInstance = new Module();

    expect(() => {
      moduleInstance.data = 5;
    }).to.throw();
    expect(moduleInstance.data).to.equal(2);
  });

  it('Can not mute child properties', () => {
    class Module {
      @immutable()
        data = { a: 5 };
    }

    const moduleInstance = new Module();

    expect(() => {
      moduleInstance.data.a = 2;
    }).to.throw();
    expect(moduleInstance.data.a).to.equal(5);
  });
});
