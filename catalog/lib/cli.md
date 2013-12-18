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


### initialize 
Setup the command line interface for cataloger. `obj.initialize()`




#### example

---

### init 
Prepare a default `cataloger.opts` file. `obj.init(destination)`


*parameters*

parameter | type | description
--------- | ---- | -----------
destination | String | 



#### example

---

### parsers 
List the available parsers. `obj.parsers()`




#### example

---

### list 
Split the supplied argument to create an array. `obj.list(value)`


*parameters*

parameter | type | description
--------- | ---- | -----------
value | String | the command line flag value


*returns*
> Array - value splitted by comma

#### example

---

### logo 
Output the Cataloger ASCII logo. `obj.logo()`



*returns*
> Cli - fluent interface

#### example

---

### help 
Output some Cataloger command line examples. `obj.help()`




#### example

---


