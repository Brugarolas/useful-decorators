import mixin from '../mixin.js';
import { expect } from 'chai';

describe('@mixin([baseClass1, baseClass2])', () => {
  class FirstComponent {
    render () {
      return 42;
    }

    init () {
      return 1;
    }

    destroy () {
      return 1;
    }
  }

  class SecondComponent {
    render () {
      return 43;
    }

    mount () {
      return 2;
    }

    destroy () {
      return 2;
    }
  }

  @mixin([FirstComponent, SecondComponent])
  class FinalComponent {
    destroy () {
      return 3;
    }
  }

  const component = new FinalComponent();

  it('Should inherit all the methods from the base classes except existing ones', () => {
    expect(component.render()).to.equal(43);
    expect(component.init()).to.equal(1);
    expect(component.mount()).to.equal(2);
    expect(component.destroy()).to.equal(3);
  });
});
