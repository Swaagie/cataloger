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

# Interface module:Cli


## Constructor
Command line interface constructor which allows custom arguments.

```js
new module:Cli(name, argv);
```

*Parameters*

parameter | type | description
--------- | ---- | -----------
name | String | 
argv | Array | 

---




