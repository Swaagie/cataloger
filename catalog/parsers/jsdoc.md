
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


### execute 
Execute the JSDoc comment parses with the haruki template to generate JSON `obj.execute()`



*returns*
> Object - parsed JSON reprensentation of public comments.

#### example

---

### transform 
Modify parsed data to more unverisal data source. `obj.transform(data)`


*parameters*

parameter | type | description
--------- | ---- | -----------
data | Object | original parsed data


*returns*
> Object - transformed data

#### example

---

### merge 
Merge returned documentation with stats of each file, assume the arrays keep
their order as there is no other viable way. `obj.merge(docs, files)`


*parameters*

parameter | type | description
--------- | ---- | -----------
docs | Array | list of documentation excerpts
files | Array | list of source files



#### example

---

### prepare 
Prepare the execute method for async parallel processing. `obj.prepare(files)`


*parameters*

parameter | type | description
--------- | ---- | -----------
files | Array | 


*returns*
> function - processor for

#### example

---


