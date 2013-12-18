
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
Add single or multiple excerpts to the the collection.

#### syntax
```js
obj.add(excerpts)
```


*parameters*

parameter | type | description
--------- | ---- | -----------
excerpts | Array | list of documentation excerpts



#### examples


### get 
Get a specific Excerpt from the collection.

#### syntax
```js
obj.get(id)
```


*parameters*

parameter | type | description
--------- | ---- | -----------
id | String | unique ID of the Excerpt


*returns*
> Excerpt - 

#### examples


### has 
Check the collection for the presence of a specific Excerpt.

#### syntax
```js
obj.has(id)
```


*parameters*

parameter | type | description
--------- | ---- | -----------
id | String | unique ID of the Excerpt


*returns*
> Boolean - 

#### examples


### register 
Register a default transformation function with the collection.

#### syntax
```js
obj.register(transform)
```


*parameters*

parameter | type | description
--------- | ---- | -----------
transform | function | function to transform Excerpt data.


*returns*
> Collection - fluent interface

#### examples


### write 
Render the catalog by processing each excerpt.

#### syntax
```js
obj.write(done)
```


*parameters*

parameter | type | description
--------- | ---- | -----------
done | function | 



#### examples


---

