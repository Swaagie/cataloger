
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


### ADD 
Add single or multiple excerpts to the the collection.

#### Syntax
```js
obj.add(excerpts)
```

*Parameters*

parameter | type | description
--------- | ---- | -----------
excerpts | Array | list of documentation excerpts



### Examples


### GET 
Get a specific Excerpt from the collection.

#### Syntax
```js
obj.get(id)
```

*Parameters*

parameter | type | description
--------- | ---- | -----------
id | String | unique ID of the Excerpt


*Returns*
> Excerpt - 

### Examples


### HAS 
Check the collection for the presence of a specific Excerpt.

#### Syntax
```js
obj.has(id)
```

*Parameters*

parameter | type | description
--------- | ---- | -----------
id | String | unique ID of the Excerpt


*Returns*
> Boolean - 

### Examples


### REGISTER 
Register a default transformation function with the collection.

#### Syntax
```js
obj.register(transform)
```

*Parameters*

parameter | type | description
--------- | ---- | -----------
transform | function | function to transform Excerpt data.


*Returns*
> Collection - fluent interface

### Examples


### WRITE 
Render the catalog by processing each excerpt.

#### Syntax
```js
obj.write(done)
```

*Parameters*

parameter | type | description
--------- | ---- | -----------
done | function | 



### Examples


---

