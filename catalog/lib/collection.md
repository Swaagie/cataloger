
# Interface Collection


## Constructor
Constructor for collection of Excerpts.

### Syntax
```js
new Collection(excerpts, transform);
```

*Parameters*

parameter | type | description
--------- | ---- | -----------
excerpts | Array | list of documentation excerpts
transform | function | function to transform Excerpt data.

---



## Methods


### add 
Add single or multiple excerpts to the the collection. `obj.add(excerpts)`


*parameters*

parameter | type | description
--------- | ---- | -----------
excerpts | Array | list of documentation excerpts



#### example

---

### get 
Get a specific Excerpt from the collection. `obj.get(id)`


*parameters*

parameter | type | description
--------- | ---- | -----------
id | String | unique ID of the Excerpt


*returns*
> Excerpt - 

#### example

---

### has 
Check the collection for the presence of a specific Excerpt. `obj.has(id)`


*parameters*

parameter | type | description
--------- | ---- | -----------
id | String | unique ID of the Excerpt


*returns*
> Boolean - 

#### example

---

### register 
Register a default transformation function with the collection. `obj.register(transform)`


*parameters*

parameter | type | description
--------- | ---- | -----------
transform | function | function to transform Excerpt data.


*returns*
> Collection - fluent interface

#### example

---

### write 
Render the catalog by processing each excerpt. `obj.write(done)`


*parameters*

parameter | type | description
--------- | ---- | -----------
done | function | 



#### example

---


