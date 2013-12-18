# Command line interface

## Configuration

Execute `cataloger init` to scaffold a default configuration file. This command
will create a `cataloger.json` in the current directory. The configuration has
defaults for each of the available CLI options. See below for a default
configuration file.

```
{
  "path": "$HOME/projects/cataloger",
  "output": "/catalog",
  "exclude": [
    "test",
    "bin",
    "catalog"
  ],
  "parsers": [
    "jsdoc"
  ],
  "wiki": {
    "include": false,
    "user": "Moveo",
    "project": "cataloger",
    "map": { }
  }
}
```

# Interface Cli


## Constructor
Command line interface constructor which allows custom arguments.

### Syntax
```js
new Cli(name, argv);
```

*Parameters*

parameter | type | description
--------- | ---- | -----------
name | String | 
argv | Array | 

---



## Methods


### INITIALIZE 
Setup the command line interface for cataloger.

#### Syntax
```js
obj.initialize()
```

*Parameters*

parameter | type | description
--------- | ---- | -----------



### Examples


### INIT 
Prepare a default `cataloger.opts` file.

#### Syntax
```js
obj.init(destination)
```

*Parameters*

parameter | type | description
--------- | ---- | -----------
destination | String | 



### Examples


### PARSERS 
List the available parsers.

#### Syntax
```js
obj.parsers()
```

*Parameters*

parameter | type | description
--------- | ---- | -----------



### Examples


### LIST 
Split the supplied argument to create an array.

#### Syntax
```js
obj.list(value)
```

*Parameters*

parameter | type | description
--------- | ---- | -----------
value | String | the command line flag value


*Returns*
> Array - value splitted by comma

### Examples


### LOGO 
Output the Cataloger ASCII logo.

#### Syntax
```js
obj.logo()
```

*Parameters*

parameter | type | description
--------- | ---- | -----------


*Returns*
> Cli - fluent interface

### Examples


### HELP 
Output some Cataloger command line examples.

#### Syntax
```js
obj.help()
```

*Parameters*

parameter | type | description
--------- | ---- | -----------



### Examples


---

