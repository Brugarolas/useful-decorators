import singleton from '../singleton.js';
import { mapInjects } from '../utils/injects.js';
import watch from '../watch.js';
import { expect } from 'chai';

describe('@watch(obj)', () => {
  it('Watch object OK', () => {
    let changes = 0;

    const data = {
      reactive: {
        a: 1,
        b: 2
      }
    };

    class Module {
      @watch(data, 'reactive')
      onChange () {
        changes++;
      }
    }

    // eslint-disable-next-line no-unused-vars
    const module = new Module();

    data.reactive.a = 2;
    data.reactive.b = 3;

    expect(changes).to.equal(2);
  });

  it('Works OK with injected singleton', () => {
    let changes = 0;

    @singleton()
    // eslint-disable-next-line no-unused-vars
    class Data {
      reactive = {
        a: 1,
        b: 2
      };
    }

    class Module {
      @watch('data', 'reactive')
      onChange () {
        changes++;
      }
    }

    // eslint-disable-next-line no-unused-vars
    const module = new Module();
    const data = mapInjects.get('data');

    data.reactive.a = 2;
    data.reactive.b = 3;

    expect(changes).to.equal(2);
  });
});
