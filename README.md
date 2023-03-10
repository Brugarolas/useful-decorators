# useful-decorators
 Some useful JavaScript stage-0 decorators

## Installation
First, we need to install `@babel/plugin-proposal-decorators`:

```bash
npm install --save-dev @babel/plugin-proposal-decorators
```

Then we configure the plugin in our *Babel* config file with `legacy` option:

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
- `@decorate(fn)`
- `@defer()`
- `@delay(ms)`
- `@immutable()`
- `@inject()`
- `@interval()`
- `@lazy()`
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

Executes a function immediatly after the function with the decorator has been executed.

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
```

Array result ['A', 'B']

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
```

getFoo() and onlyOnFoo() will work as expected and getFooAgain() won't.

### `@before(fm)`

Executes a function immediatly before the function with the decorator.

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
```

Array result ['B', 'A']

### `@bind(context)`

Similar to `@autobind()`. It binds automatically the specified context to the function with the decorator, but not `this` this time.

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
```

moduleInstance and moduleInstance2 share the same context, so .getX() is in both cases 81.

### `@debounce()`

Similar to `@throttle()`. Debounces a function so it's optimized for multiple consecutive calls. [Differences between Debounce and Throttle](https://github.com/wycats/javascript-decorators). [Check Lodash documentation for Debounce options](https://lodash.com/docs/4.17.15#debounce).

```js
import { debounce } from 'useful-decorators';

class Module {
  @debounce(500, options)
  userStopsTyping () {
    search(userTyping.value);
  }
}
```

Now userStopsTyping will only called when the user stops typing for more than 500 ms.

### `@decorate(fn)`

Immediately applies the provided function to the method, allowing you to wrap methods with arbitrary functions.

```js
import { decorate } from 'useful-decorators';
import memoizeFn from 'lodash.memoize';

class Module {
  @decorate(memoizeFn)
  doSomethingExpensive () {
    count++;
    return 1;
  }
}
```

### `@defer()`

Defers invoking the function until the current call stack has cleared.

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

Freezes the object and does not allow for re-declarating it or changing its child properties.

```js
import { immutable } from 'useful-decorators';

class Module {
  @immutable()
  data = { a: 5 };
}
```

If you try to re-declare data or change its children properties, it will throw a TypeError.

### `@provide()`, `@singleton` & `@inject()`

`@inject()` will inject the dependencies that has been instanciated with `@provide()` or `@singleton()`.

`@singleton()` is a class decorator that will instance a single instancy of the specified class, and will store it for injecting it later with `@inject()`.

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
```

An instance of Module class will be injected in module property of instances of Instance class. Note that both the property and the class should be have the same name (`@singleton()` converts first letter to lower case.)

`@provide()` is similar, but it saves for later injection, instead of classes, objects or functions.

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
```

Property `module` will be injected in instances of Instance class' `module` property. Note that both the provided property and injected property should have the same names.

You can also pass your own names with `@singleton(name)`, `@provide(name)`, `@inject(name)`.

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

### `@interval(ms, continueFunc)`

Executes a function indefinite times in an interval. If `continueFunc` is not present, it will executes the function infinite times. If it is, it will stop when `continueFunc` returns falsy.

```js
import { interval } from 'useful-decorators';

class Module {
  @interval(500)
  checkIfDocumentHasDownloaded() {
    ...
  }
}
```

It will execute that function once every 500 milliseconds.

### `@lazy()`

Prevents a property initializer from running until the decorated property is actually looked up. Useful in certain conditions to prevent excess allocations that might otherwise not be used.

```js
import { lazy } from 'useful-decorators';

class Foo {
  @lazy()
    bar = deepcloneHugeObject();
}
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
```

It will memoize the function result and will not execute the function again for repeated parameters.

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
```

As there has been two changes, `changes` property is 2.

### `@once()`

Creates a function that is restricted to invoking once. Sequential calls to the function return the value of the first invocation. The function is invoked with the `this` binding.

```js
import { once } from 'useful-decorators';

class Module {
  @once()
  expensiveInit() {
    ...
  }
}
```

`expensiveInit()` will only be executed once, no matter what. The other invocations will return the first invocation result.

### `@throttle()`

Similar to `@debounce()`. Throttles a function so it's optimized for multile sequential calls. [Differences between Debounce and Throttle](https://github.com/wycats/javascript-decorators). [Check Lodash documentation for Throttle options](https://lodash.com/docs/4.17.15#debounce).

```js
import { throttle } from 'useful-decorators';

class Module {
  @throttle(500, options)
  resizing () {
    search(userTyping.value);
  }
}
```

Now resizing will only be executed once in every 500 ms.

### `@watch(parent, childKey, options)`

Similar to `@observe(callback)`, but inverted. `@observe(callback)` is applied to an object and requires a function as parameter, while `@watch(parent, childKey)` is applied to a function and requires an object as parameter.

Watchs a property and for each change, shallow or deep (configurable), it will execute the function the decorator is applied to. [Check on-change documentation for more options](https://github.com/sindresorhus/on-change).

```js
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

const module = new Module();

data.reactive.a = 2;
data.reactive.b = 3;
```

As there has been two changes, `changes` property is 2.

It can also be used in conjuction with `@singleton()` or `@provide()` for dependency injection with `@watch('injectName', 'childKey', options)`.

```js
let changes = 0;

@singleton()
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

const module = new Module();
const data = mapInjects.get('data');

data.reactive.a = 2;
data.reactive.b = 3;
```

As there has been two changes, `changes` property is 2.
