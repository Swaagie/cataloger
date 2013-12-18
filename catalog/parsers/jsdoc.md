
# Interface JSDoc


## Constructor
JSDoc wrapper constructor.

### Syntax
```js
new JSDoc();
```

*Parameters*

parameter | type | description
--------- | ---- | -----------

---



## Methods


### Execute 
Execute the JSDoc comment parses with the haruki template to generate JSON

#### Syntax
```js
obj.execute()
```

*Parameters*

parameter | type | description
--------- | ---- | -----------


*Returns*
> Object - parsed JSON reprensentation of public comments.

### Examples


### Transform 
Modify parsed data to more unverisal data source.

#### Syntax
```js
obj.transform(data)
```

*Parameters*

parameter | type | description
--------- | ---- | -----------
data | Object | original parsed data


*Returns*
> Object - transformed data

### Examples


### Merge 
Merge returned documentation with stats of each file, assume the arrays keep
their order as there is no other viable way.

#### Syntax
```js
obj.merge(docs, files)
```

*Parameters*

parameter | type | description
--------- | ---- | -----------
docs | Array | list of documentation excerpts
files | Array | list of source files



### Examples


### Prepare 
Prepare the execute method for async parallel processing.

#### Syntax
```js
obj.prepare(files)
```

*Parameters*

parameter | type | description
--------- | ---- | -----------
files | Array | 


*Returns*
> function - processor for

### Examples


---

