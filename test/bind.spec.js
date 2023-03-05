import bind from '../bind.js';
import { expect } from 'chai';

const root = typeof window !== 'undefined' ? window : global;

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

    const module2Instance = new Module2();

    expect(moduleInstance.getX()).to.equal(81);
    expect(module2Instance.getX()).to.equal(81);
  });
});
