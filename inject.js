'use strict';

module.exports = function(acorn) {
  var tt = acorn.tokTypes;

  acorn.plugins.staticClassPropertyInitializer = function staticClassPropertyInitializerPlugin(parser) {
    parser.extend("parseClassMethod", function (nextMethod) {
      return function (classBody, method, isGenerator, isAsync) {
        if (method.static && this.eat(tt.eq)) {
          method.kind = "init";
          method.value = this.parseMaybeAssign(true);
          classBody.body.push(this.finishNode(method, "ClassProperty"));
          this.semicolon();
          return;
        }
        return nextMethod.call(this, classBody, method, isGenerator, isAsync);
      };
    });
  };

  return acorn;
};
