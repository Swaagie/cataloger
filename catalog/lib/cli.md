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
Setup the command line interface for cataloger.

#### syntax
```js
obj.initialize()
```




#### examples


### init 
Prepare a default `cataloger.opts` file.

#### syntax
```js
obj.init(destination)
```


*parameters*

parameter | type | description
--------- | ---- | -----------
destination | String | 



#### examples


### parsers 
List the available parsers.

#### syntax
```js
obj.parsers()
```




#### examples


### list 
Split the supplied argument to create an array.

#### syntax
```js
obj.list(value)
```


*parameters*

parameter | type | description
--------- | ---- | -----------
value | String | the command line flag value


*returns*
> Array - value splitted by comma

#### examples


### logo 
Output the Cataloger ASCII logo.

#### syntax
```js
obj.logo()
```



*returns*
> Cli - fluent interface

#### examples


### help 
Output some Cataloger command line examples.

#### syntax
```js
obj.help()
```




#### examples


---

