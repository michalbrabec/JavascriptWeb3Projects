# JavascriptWeb3Projects

## JavaScript Notes

- The language automatically adds `;` in places where it can lead to a valid code
  - end of line
  - before `}`
- `addEventListener` - cammel case, starts with lower case following words start with upper case
  - used for variables and functions
- `CreateEvent` - pascal case, all words start with upper case
  - used for classes and functions that create objects
- `CONST_VAL` - upper case
  - used for global constants and functions that return constants
- Data Types
  - `undefined` - undefined value
  - `null` - empty object
  - `typeof x` - returns type of `x` as a `string`
  - expression type is determined in a way that results in a valid expression
    - string is prefered over number
    - `5+'x'*8` => `NaN` multiplication is not supported for a string so all get converted to a number and `'x'` converts to `NaN`
    - `5+'5'*8` => `45` same as before but `'5'` converts to `5`
    - `5+'x'*8` => `5x8` additi is supported for string so everything is converted to a string and concatenated 
  - `string` - string
    - `$.length` - get string length 
    - `String(x)` - convert to string
    - values are converted to string in case there is any string in an expression (like `5+'x'*8` => string)
  - `number` - number, including integral and floating point numbers
    - `NaN` - not a number
    - `Infinity`, `-Infinity` - positive and negative infinity
    - `Number(x)` - convert to number
    - `x.toFixed(n)` - set the number to `n` fixed decimal places, pad with 0s if missing or truncate if more are present
  - array - list of values (types can be mixed)
    - `[]` - empty array
    - `arr.push(x)` - add `x` to the end of `arr`
    - `arr.pop() => x` - remove the last element of `arr` and return it
    - `arr.splice(s, n)` - delete `n` elements starting at index `s`, `n` is `Infinity` by default
    - `arr.slice(s, e)` - copy part of an array [s..n], negative values can be used as offset from the beginning and end of the array
    - `arr.forEach(func)` - call `func` for each element
    - `arr.filter(func)` - eval `func` for each element and include the element in the resulting array if `func` is true
    - `arr.map(func)` - eval `func` for each element and create a new array containing the results
  - object - dictionary of key-value pairs
    - `{}` - empty object
    - ```JS
      {
        keyNumber: 5,
        keyString: 'test',
        keyMethod: function () {
            console.log(this.keyString);
        },
        keyArrow: (x) => {
            console.log(x);
        }
      }
      ```
      - propeties are key-value pairs
      - methods are defined by `function() ...` which defines `this` as the enclosing object
      - arrow `() => ...` functions cannot be used to reference object properties since they do not modify `this` and keep it as it was
        - arrow functions do not change `this` to work as labdas inside methods, they maintain `this` of the calling method
    - shorthand properties can skip the name if it matches a variable or parameter
      ```JS
      const x = 5
      const object = {
          x
      }
      ```
      - is the same as `x: variable`
    - destructuring
      `const {x} = { x: 10 }` - extracts `x` from object
- Expressions
  - `==` - comparison with type conversion
  - `===` - comparison without type conversion
- Variables
  - `let x = undefined` - variable that can change value
  - `const x = undefined;` - constant variable
    - value cannot be changed, but the contents of the value can, for example array can be modified by push
- Functions
  - functions are values, they can be stored in variables and returned from other functions
  - closure means that the function has access to all values that were available when it was created
    - for example the returned lambda retains `x` even after `func` completes and `x` goes out of scope `function func(x) { return a => a*x }`
  - `const fun = function(a, b = 1) { return a*b; }`
    - anonymous function
    - 2 params, 2nd has a default value
    - returns a result of the expression
    - sets `this` to the enclosing object or `undefined` when used in a pure function
  - `const fun = function func1(a, b = 1) { return 5; }`
    - named function
  - `const fun = (a, b = 1) => { return 5; }` 
    - arrow function
    - does not change `this`, can be used in methods
  - `const fun = a => 5*a;` - shorthand definition
    - parameter parenthases can be skipped if there is only 1 param
    - curly brackets and `return` can be skipped if there is only 1 line returning a value
  - `function func1(a, b = 1) { return 5; }`
    - C-like function definition
    - benefits from hoisting - it can be used before it is defined, while the variable functions can be used only after they are defined
- Control Flow
  - `if (cond1) { ... } else if(cond2) { ... } else { ... }` - if, else if and else conditional eval, same as C / C++ / C#
  - `while (cond) { ... }` - loops while `cond` is true
  - `for (let i = 0; i < arr.length; i++) { ... }` - for loop, same as C / C++ / C#
  - `for (const x of arr) { ... }` - foreach loop
  - `break` - exits the loop and code continues with the next statement after
  - `continue` - skips the rest of the current iteration
- Built-In Objects
  - `window` - browser tab
  - `window.document` - HTML document opened in the browser tab
  - `window.console` - browser tab console
  - `window.location.href` - browser tab URL
  - `window.alert()` - shows a modal pop-up
- Built-In Classes
  - `URL` - URL parser
- DOM - document object model
  - Querying elements
    - `document.getElementById("ID")` - get the first HTML element with the `id="ID"` attribute
    - `document.getElementsByClassName("CLASS")` - get all HTML elements with the `class="CLASS"` attribute (class is without `.`)
    - `document.querySelector("div.CLASS")` - queries the HTML in the same way as CSS, returns the first matching element
    - `document.querySelectorAll("div.CLASS")` - queries the HTML in the same way as CSS, returns all matching elements
  - Modifying elements
    - `element.textContent` - complete inner text, including whitespaces, tags are not returned and are set as string
    - `element.innerText` - inner visible text of the element, tags are not returned and are set as string, trailing or duplicate whitespaces are trimmed
    - `element.innerHTML` - inner HTML, including tags and whitespaces, can be set
- Events
  - `element.addEventListener('click', event => func(event))` - set callback function for the `click` event for an HTML element
    - same as `<button onClick="func(event)"></button>`
  - DOM events
    - `click` - mouse click
    - `dblclick` - mouse double click
    - `keydown` - keyboard key down, `event.key` contains the key pressed
    - `mouseover` - mouse cursor is over element
  - ```JS
    const ev = new Event('EVENT')
    document.addEventListener('EVENT', event => { ... })
    document.dispatchEvent(ev)
    ```
    - create a custom event, add listener and dispatch the event
    - `CustomEvent` can be used to add custom data
- AJAX
  - ```JS
    const req = new XMLHttpRequest()
    req.onreadystatechange = function (event) { 
        if (this.response) {
            console.log(this.response)
        }
    }
    req.open('GET', "https://api.restful-api.dev/objects")
    req.send()
    ```
    - `XMLHttpRequest` - HTTP request class
    - `function (event) { ... }` notation used to capture `this` of the request
    - `event => console.log(req.response)` can be used, `this` is undefined
  - `fetch()` - performs HTTP request and returns a promise with the response
    ```JS
    fetch('https://example.com/api', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            key1: 'value1',
            key2: 'value2'
        })
    })
    ```
    - can be used with async
- Callbacks, Promises and Async
  - callbacks are used mainly for events and can cause significant nesting and complexity
  - cromises are similar to C# tasks, return value that can be processed by `.then(...)` and errors are proessed by `.catch(...)`
  - async is similar to C# async, builds an execution graph on the background and helps the code stay similar to sync code
  - callback 
    - `element.addEventListener('click', event => func(event))`
      - callback is invoked by the caller once operation is completed
      - it is asynchronous
  - promise
    - ```JS
      new Promise((resolve,reject) => {
        const req = new XMLHttpRequest()
        req.onreadystatechange = event => {
            if (req.response) {
                resolve(req.response)
            }
            else {
                reject('ERROR')
            }
        }
        req.open('GET', "https://api.restful-api.dev/objects")
        req.send()
      })
      .then(res => new Promise(resolve => resolve(res)))
      .then(res => console.log(res))
      .catch(er => console.log(er))
      ```
      - AJAX request wrapped in a promise
      - `resolve` signals completion of the promise
      - `reject` signals error, exceptions cannot be used since they bypass the `.catch()` function at the end
      - `.then()` processes the successful result of the AJAX request
        - can return another propmise that can be processed by another `.then`
      - `.catch()` handles errors reported by any promise in the then-chain
  - async
    - can be used only in async functions (`async function func() { ... }`)
      - script global scope is also async
    - `await` - pause execution until a promise is resolved
    - works with promises returned by functions and manually created
    - manual promise
        ```JS
        async function func1() {
            const response = await new Promise((resolve,reject) => {
                const req = new XMLHttpRequest()
                req.onreadystatechange = event => {
                    if (req.response) {
                        resolve(req.response)
                    }
                }
                req.open('GET', "https://api.restful-api.dev/objects")
                req.send()
            })
            console.log(JSON.parse(response))
        }
        ```
    - promise returned by a function
        ```JS
        async function getObjects() {
            const resp = await fetch("https://api.restful-api.dev/objects")
            const json = await resp.json()
            console.log(json)
        }
        ```
- Errors
  - `throw 'ERROR'` - throw exception
  - exceptions are handled by try-catch blocks
    ```JS
    try {
        throw 'ERROR'
    }
    catch (error) {
        console.log(error)
    }
    ```
  - `throw` terminates the block, execution jumps to the `catch` block and the parameter contains the value given to `throw`
  - does not roll back any previous changes like `revert()` in Solidity
  - try-catch works in synchronous and async code
    - does not work with callbacks and promisses because the error is thrown in the future, outside of the try-catch block (it is not possible to define a try-catch block for a callback since it is invoked by the runtime)
- Classes and Object Factory Functions 
  - function can create objects with parameters
    ```JS
    function func(id) {
        return {
            identifier: id,
            method: function() {
                console.log(this.identifier)
            }
        }
    }
    ```
  - class provides content and behavior for objects and creates them via constructor
    ```JS
    class Class {
        id
        #key

        constructor(id) {
            this.id = id
            this.#key = id
        }

        #log() {
            console.log(this.#key)
        }

        log() { this.#log() }
    } 
    const obj = new Class('ID')
    ```
    - `constructor()` defines object initialization
    - methods are defined by `name (params)`
    - `this` represents the object inside methods
    - new instances are created by `new ClassName(params)`
    - properties and methods starting with # are private and cannot be used outside of the class (including child classes)
      - protected is not supported
    - classes can inherit other classes and extend their behavior
      ```JS
      class Child extends Class {
          #num
          
          constructor(id, num) {
              super(id)
              this.#num = num
          }

          log() { 
              super.log()
              console.log(this.#num)
          }
      }
      ```
      - Parent defined by the `extends` keyword, only one is allowed
      - Child has access to all public parent properties and methods
      - new properties and methods can be defined
      - constructor can call parent constructor by `super(parameters)`
        - cals parent constructor if none is defined in the child
      - methods of the child class override parent methods of the same name
        - only the name is considered, parameters are ignored
        - parent method can be called by using `super.` prefix
- Script Loading
  - JS scripts can be included using tag `<script> CODE </script>`
    - code can be loaded from a file using `<script src="FILE_PATH>`
    - code can be also loaded from the web using `<script src="SCRIPT_URL>`
      - external libraries can be loaded this way (for example [dayjs](https://unpkg.com/dayjs@1.11.10/dayjs.min.js))
  - Code can be included directly in the properties like `<button onclick=" CODE ">`
  - inlining code is not good for larger projects and even element events are better defined in JS code
    - for example click can be set using `element.addEventListener('click', event => func(event))`
  - code is gathered on the site level and all the sources are combined in the order they are included
    - variables and functions are defined in the order they are included
    - conflicts are possible
- Modules
  - replace loading scripts directly
  - only the main script is loaded by `<script type="module" src="FILE_PATH / FILE_URL"></script>`
  - the main script imports what it needs from JS modules using
    - `import {variable, function, Class} from 'MODULE_PATH'`
      - all imported symbols must be defined with `export` prefix
    - `import str from './main.js'`
      - imports the default export
      - default export is defined by `export default SYMBOL`
      - default export can be only one and is defined after the symbol is defined (usually at the end)
  - variables, functions and classes can be exported
  - modules do not work with HTML files opened directly in the browser, they need Live Server or other server setup (cross site scripting errors show up)
  - external libraries must be inmported only with the ESM (Ecma Script Module) format (for example [dayjs ESM](https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js))

## Node Notes

## NPM Notes

- Setup
  - `npm --init` sets up boilerplate `package.json`
- Package
  - defined by `package.json`
    - contains info about the package
    - can contain built, test, start and other scripts defined in the object `scripts`
    - commands are started by `npm run COMMAND_NAME param1 param2 ...`
      - parameters are passed in the `process.argv[]` starting at index 2
      - start can be used by `npm start`

## TypeScript Notes

- Setup
  - `npm i typescript -g` installs the compiler globally
    - local (dev) version can be used with `npx` to avoid global setup
  - `tsc --init` sets up boilerplate `tsconfig.json`
- Config
  - the compiler compiles all `*.ts` files in the subdirectories
  - `tsconfig.json` controls the behavior
  - `sourceMap`is necessary for debugging
  - `outDir` specifies the JS output
  - `tsc --listFiles --noEmit` lists all files that will be compiled

## Solidity Notes