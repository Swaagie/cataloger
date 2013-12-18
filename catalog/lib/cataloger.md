# Cataloger API

## How to use?

```
some code
```

# Interface Cataloger


## Constructor
API constructor.

### Syntax
```js
new Cataloger();
```

*Parameters*

parameter | type | description
--------- | ---- | -----------

---



## Methods


### init 
Initialize the module.

#### Syntax
```js
obj.init()
```

*Parameters*
parameter | type | description
--------- | ---- | -----------


*Returns*
> Catalog - fluent interface

### Examples


### view 
Fetch and cache template content.

#### Syntax
```js
obj.view()
```

*Parameters*
parameter | type | description
--------- | ---- | -----------


*Returns*
> String - handlebar template

### Examples


### catalog 
Generate a catalog of the documentation.

#### Syntax
```js
obj.catalog(done)
```

*Parameters*
parameter | type | description
--------- | ---- | -----------
done | function | callback called after every file is processed.



### Examples


### write 
Write all collections to disk.

#### Syntax
```js
obj.write(collections, done)
```

*Parameters*
parameter | type | description
--------- | ---- | -----------
collections | Collection | cataloged collections of excerpts
done | Funtion | callback to call after writing is complete



### Examples


### merge 
Merge the wiki by map with the Excerpt.

#### Syntax
```js
obj.merge(collections, done)
```

*Parameters*
parameter | type | description
--------- | ---- | -----------
collections | Collection | cataloged collections of excerpts
done | Funtion | callback to call after merging wiki content



### Examples


---

