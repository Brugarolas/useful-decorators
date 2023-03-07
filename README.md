# useful-decorators
 Some useful JavaScript stage-0 decorators

## Installation
First, we need to install `@babel/plugin-proposal-decorators` with `legacy` option:

```bash
npm install --save-dev @babel/plugin-proposal-decorators
```

Then we configure the plugin in our *Babel* config file:

```json
"plugins": [
  [ "@babel/plugin-proposal-decorators", { "version": "legacy" } ]
]
```

Now we can properly install and use `useful-decorators`:
```bash
npm install --save useful-decorators
```

## Decorators list
- `@after(fn)`
- `@autobind()`
- `@before(fn)`
- `@bind(context)`
- `@debounce(ms, options)`
- `@defer()`
- `@delay(ms)`
- `@immutable()`
- `@inject()`
- `@interval()`
- `@memoize()`
- `@observe(cb, options)`
- `@once()`
- `@provide()`
- `@singleton()`
- `@throttle(ms, options)`
- `@watch(obj, propKey, options)`

## Documentation

Now let's see how to use each decorator:

### `@after(fn)`

Executes a function immediatly after the function with the decorator has executed.

```js
import { after } from 'useful-decorators';

const array = [];

const afterFn = () => {
  array.push('B');
};

class Module {
  x = 81;

  @after(afterFn)
  moduleFunction () {
    array.push('A');
  }
}

const module = new Module();

module.moduleFunction();
// Array result ['A', 'B']
```

### `@autobind()`

Binds automatically `this` context.

```js
import { autobind } from 'useful-decorators';

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

// getFoo() and onlyOnFoo() will work as expected and getFooAgain() won't.
```

### `@before(fm)`

Executes a function immediatly before the function with the decorator executes.

```js
import { before } from 'useful-decorators';

const array = [];

const beforeFn = () => {
  array.push('B');
};

class Module {
  x = 81;

  @before(beforeFn)
  moduleFunction () {
    array.push('A');
  }
}

const module = new Module();

module.moduleFunction();
// Array result ['B', 'A']
```

### `@bind(context)`

Similar to `@autobind()`. It binds automatically a context to the function with the decorator, instead of `this` context.

```js
import { bind } from 'useful-decorators';

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

// moduleInstance and moduleInstance2 share the same context, to .getX() of both is in both cases 81.
```
### `@debounce()`

Similar to `@throttle()`. Debounces a function so it's optimized for multile sequential calls. [Differences between Debounce and Throttle](https://github.com/wycats/javascript-decorators). [Check Lodash documentation for Debounce options](https://lodash.com/docs/4.17.15#debounce).

```js
import { debounce } from 'useful-decorators';

class Module {
  @debounce(500, options)
  userStopsTyping () {
    search(userTyping.value);
  }
}

// Now userStopsTyping will only called when the user stops typing for more than 500 ms.
```

### `@defer()`

Defers invoking the func until the current call stack has cleared.

```js
import { defer } from 'useful-decorators';

class Module {
  @defer()
  createVirtualDOM () {
    ...
  }
}
```

### `@delay(ms)`

Invokes function after waiting specified milliseconds on each call.

```js
import { delay } from 'useful-decorators';

class Module {
  @delay(1000)
  sendDataToMarketing () {
    ...
  }
}
```

### `@immutable()`

Freezes the object and does not allow for re-declarating it or changing it's child properties.

```js
import { immutable } from 'useful-decorators';

class Module {
  @immutable()
  data = { a: 5 };
}

// If you try to re-declare data or change it's children properties, it will throw a TypeError.
```

### `@provide()`, `@singleton` & `@inject()`

`@inject()` will inject the dependencies that has been instanciated with `@provide()` or `@singleton()`

`@singleton()` is a class decorator what will instance a single singleton of the specified class, and will store it for using it later.

```js
import { singleton, inject } from 'useful-decorators';

@singleton()
class Module {
  x = 5;
}

class Instance {
  @inject()
  module;
}

// An instance of Module class will be injected in module properties of instances of Instance class.
// Note that both the property and the class should be have the same name (@singleton() converts first letter to lower case.)
```

`@provide()` is similar, but it saves for later injection, not classes, but objects, class instances or functions.

```js
import { provide, inject } from 'useful-decorators';

class Module {
  @provide()
  module = { data: 5 };
}

class Instance {
  @inject()
  module;
}

// Property module will be injected in module properties of instances of Instance class.
// Note that both the provided property and injected property should have the same names.
```

But that thing of the names isn't entirelly true, we can pass our own names for `@singleton()`, `@provide()`, `@inject()`.

Let's see an example:

```js
import { singleton, inject } from 'useful-decorators';

@singleton('moduleInstance')
class Module {
  x = 5;
}

class Instance {
  @inject('moduleInstance')
  module;
}
```

### `@interval(ms)`

Executes a function infinite times in an interval.

```js
import { interval } from 'useful-decorators';

class Module {
  @interval(500)
  checkIfDocumentHasDownloadedAndReady() {
    ...
  }
}

// It will execute that function once every 500 milliseconds.
```

### `@memoize(ms)`

Optimizes a function by memoizing its results.

```js
import { memoize } from 'useful-decorators';

class Module {
  @memoize()
  expensiveComputations(x, y) {
    ...
  }
}

// It will memoize the function result and will not execute the function again for the same parameters.
```

### `@observe(callback, options)`

Observe a property and for each change, shallow or deep, it will execute the passing callback. [Check on-change documentation for more options](https://github.com/sindresorhus/on-change).

```js
import { observe } from 'useful-decorators';

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

// As there has been two changes, `changes` property is 2.
```

### `@once()`

Creates a function that is restricted to invoking once. Repeat calls to the function return the value of the first invocation. The function is invoked with the this binding.

```js
import { once } from 'useful-decorators';

class Module {
  @once()
  expensiveInit() {
    ...
  }
}

// `expensiveInit()` will only be executed once, no matter what. The other invocations will return the first invocation result.
```
