export { default as autobind } from './autobind.js'
import autobind from './autobind.js'
/*
class Foo {
  @autobind()
  getFoo() {
    return this;
  }

  getFooAgain() {
    return this;
  }
}

console.log(Foo)

const foo = new Foo();
const { getFoo } = foo;

console.log(getFoo(), foo, 'equals:', getFoo() === foo)
*/
