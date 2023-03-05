import autobind from '../autobind.js';
import { expect } from 'chai';

describe('@autobind()', () => {
  class Foo {
    @autobind()
    getFoo () {
      return this;
    }

    getFooAgain () {
      return this;
    }

    @autobind()
    onlyOnFoo () {
      return this;
    }
  }

  it('Returns a bound instance for a method', () => {
    const foo = new Foo();
    const { getFoo } = foo;

    expect(getFoo()).to.equal(foo);
  });

  it('Sets the correct prototype descriptor options', () => {
    const desc = Object.getOwnPropertyDescriptor(Foo.prototype, 'getFoo');

    expect(desc.configurable).to.equal(true);
    expect(desc.enumerable).to.equal(false);
  });

  it('Works with multiple instances of the same class', () => {
    const foo1 = new Foo();
    const foo2 = new Foo();

    const getFoo1 = foo1.getFoo;
    const getFoo2 = foo2.getFoo;

    expect(getFoo1()).to.equal(foo1);
    expect(getFoo2()).to.equal(foo2);
  });
});
