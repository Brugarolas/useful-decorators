# useful-decorators
 Some useful JavaScript stage-0 decorators

## Instalation
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
