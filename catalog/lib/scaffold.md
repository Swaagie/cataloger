
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
Execute the JSDoc comment parses with the haruki template to generate JSON

#### syntax
```js
obj.execute()
```



*returns*
> Object - parsed JSON reprensentation of public comments.

#### examples


### transform 
Modify parsed data to more unverisal data source.

#### syntax
```js
obj.transform(data)
```


*parameters*

parameter | type | description
--------- | ---- | -----------
data | Object | original parsed data


*returns*
> Object - transformed data

#### examples


### merge 
Merge returned documentation with stats of each file, assume the arrays keep
their order as there is no other viable way.

#### syntax
```js
obj.merge(docs, files)
```


*parameters*

parameter | type | description
--------- | ---- | -----------
docs | Array | list of documentation excerpts
files | Array | list of source files



#### examples


### prepare 
Prepare the execute method for async parallel processing.

#### syntax
```js
obj.prepare(files)
```


*parameters*

parameter | type | description
--------- | ---- | -----------
files | Array | 


*returns*
> function - processor for

#### examples


---

