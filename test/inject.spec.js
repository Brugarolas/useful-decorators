import inject from '../inject.js';
import provide from '../provide.js';
import singleton from '../singleton.js';
import { expect } from 'chai';

describe('@inject()', () => {
  it('Singleton & inject work OK', () => {
    @singleton()
    class Module {
      x = 5;
    }

    class Instance {
      @inject()
        module;
    }

    expect(new Instance().module instanceof Module).to.equal(true);
  });

  it('Provide & inject work OK when provided is an object', () => {
    class Module {
      @provide()
        module = 5;
    }

    class Instance {
      @inject()
        module;
    }

    expect(new Module().module === new Instance().module).to.equal(true);
    expect(new Module().module).to.equal(5);
  });

  it('Provide & inject work OK when provided is a function', () => {
    class Module {
      @provide()
      instantiate () {
        return 5;
      }
    }

    class Instance {
      @inject()
        instantiate;
    }

    expect(new Module().instantiate === new Instance().instantiate).to.equal(true);
    expect(new Module().instantiate()).to.equal(5);
  });
});

