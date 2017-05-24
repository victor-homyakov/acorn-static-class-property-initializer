const assert = require('assert');
const acorn = require('../index');

function parse(code) {
  const options = {
    ecmaVersion: 7,
    locations: true,
    plugins: {staticClassPropertyInitializer: true}
  };

  return acorn.parse(code, options);
}

function assertAst(code, expectedAst) {
  const ast = parse(code);
  assert.deepEqual(ast.body, [expectedAst]);
}

// test fixtures are adapted from babylon
describe('acorn-object-rest-spread plugin', function() {
  it('should add support for static class property initializer', function() {
    assertAst('class Foo { static foo = "bar"; baz() {} }', {
      "type": "ClassDeclaration",
      "start": 0,
      "end": 42,
      "loc": {
        "start": {
          "line": 1,
          "column": 0
        },
        "end": {
          "line": 1,
          "column": 42
        }
      },
      "id": {
        "type": "Identifier",
        "start": 6,
        "end": 9,
        "loc": {
          "start": {
            "line": 1,
            "column": 6
          },
          "end": {
            "line": 1,
            "column": 9
          }
        },
        "name": "Foo"
      },
      "superClass": null,
      "body": {
        "type": "ClassBody",
        "start": 10,
        "end": 42,
        "loc": {
          "start": {
            "line": 1,
            "column": 10
          },
          "end": {
            "line": 1,
            "column": 42
          }
        },
        "body": [
          {
            "type": "ClassProperty",
            "kind": "init",
            "start": 12,
            "end": 30,
            "loc": {
              "start": {
                "line": 1,
                "column": 12
              },
              "end": {
                "line": 1,
                "column": 30
              }
            },
            "static": true,
            "computed": false,
            "key": {
              "type": "Identifier",
              "start": 19,
              "end": 22,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 19
                },
                "end": {
                  "line": 1,
                  "column": 22
                }
              },
              "name": "foo"
            },
            "value": {
              "type": "Literal",
              "start": 25,
              "end": 30,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 25
                },
                "end": {
                  "line": 1,
                  "column": 30
                }
              },
              "raw": "\"bar\"",
              "value": "bar"
            }
          },
          {
            "type": "MethodDefinition",
            "start": 32,
            "end": 40,
            "loc": {
              "start": {
                "line": 1,
                "column": 32
              },
              "end": {
                "line": 1,
                "column": 40
              }
            },
            "kind": "method",
            "static": false,
            "computed": false,
            "key": {
              "type": "Identifier",
              "start": 32,
              "end": 35,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 32
                },
                "end": {
                  "line": 1,
                  "column": 35
                }
              },
              "name": "baz"
            },
            "value": {
              "type": "FunctionExpression",
              "start": 35,
              "end": 40,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 35
                },
                "end": {
                  "line": 1,
                  "column": 40
                }
            },
              "expression": false,
              "generator": false,
              "id": null,
              "params": [],
              "body": {
                "type": "BlockStatement",
                "start": 38,
                "end": 40,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 38
                  },
                  "end": {
                    "line": 1,
                    "column": 40
                  }
                },
                "body": []
              }
            }
          }
        ]
      }
    });
  });
});
