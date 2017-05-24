# acorn-static-class-property-initializer
Partial support for static class properties from [ES Class Fields & Static Properties Proposal](https://github.com/tc39/proposal-class-public-fields) in [Acorn](https://github.com/ternjs/acorn) - a tiny, fast JavaScript parser, written completely in JavaScript.

## Purpose

Made to support static property initializers in [React components written as ES6+ classes](https://babeljs.io/blog/2015/06/07/react-on-es6-plus):

```javascript
class EntityState extends Component {
    static propTypes = {
        entityState: PropTypes.string.isRequired
    };

    render() {
        return <div>{this.props.entityState}</div>;
    }
}
```

## Usage

You can use module directly in order to get Acorn instance with plugin installed:

```javascript
var acorn = require('acorn-static-class-property-initializer');
```

Or you can use `inject.js` to inject multiple plugins into Acorn:

```javascript
var acorn = require('acorn');
var injectAcornJsx = require('acorn-jsx/inject');
var injectAcornStaticClassPropertyInitializer = require('acorn-static-class-property-initializer/inject');
injectAcornJsx(acorn);
injectAcornStaticClassPropertyInitializer(acorn);
```

Then, use the `plugins` option whenever you need to support static class properties while parsing:

```javascript
var ast = acorn.parse(code, {
  plugins: {
      jsx: true, // true to enable JSX plugin
      staticClassPropertyInitializer: true // true to enable staticClassPropertyInitializer plugin
  }
});
```
