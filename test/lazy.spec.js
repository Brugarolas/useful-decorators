import lazy from '../lazy.js';
import { expect } from 'chai';

describe('@lazy()', () => {
  let timesCalled = 0;

  const initializer = () => {
    timesCalled++;
    return 'test';
  };

  class Foo {
    @lazy()
      bar = initializer();
  }

  beforeEach(() => {
    timesCalled = 0;
  });

  afterEach(() => {
    timesCalled = 0;
  });

  it('Does not initialize property until it the getter is called', () => {
    const foo = new Foo();

    expect(timesCalled).to.equal(0);

    expect(foo.bar).equal('test');
    expect(foo.bar).equal('test');

    expect(timesCalled).to.equal(1);
  });

  it('Allows normal reassignment', () => {
    const foo = new Foo();

    foo.bar = 'test2';

    expect(timesCalled).to.equal(0);

    expect(foo.bar).equal('test2');
  });

  it('Does not initialize property when looked up on the prototype directly', () => {
    const value = Foo.prototype.bar;

    expect(timesCalled).to.equal(0);

    expect(value).to.equal(undefined);
  });
});
