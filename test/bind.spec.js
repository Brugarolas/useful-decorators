import bind from '../bind.js';
import { expect } from 'chai';

describe('@bind()', () => {
  it('Binds context OK', function () {
    this.x = 9;

    class Module {
      x = 81;

      getX () {
        return this.x;
      }
    }

    const moduleInstance = new Module();

    class Module2 {
      x = 14;

      @bind(moduleInstance)
      getX () {
        return this.x;
      }
    }

    const moduleInstance2 = new Module2();

    expect(moduleInstance2.getX()).to.equal(81);
    expect(moduleInstance2.getX()).to.equal(81);
  });
});
