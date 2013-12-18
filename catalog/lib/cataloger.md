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
Initialize the module. `obj.init()`



*returns*
> Catalog - fluent interface

#### example

---

### view 
Fetch and cache template content. `obj.view()`



*returns*
> String - handlebar template

#### example

---

### catalog 
Generate a catalog of the documentation. `obj.catalog(done)`


*parameters*

parameter | type | description
--------- | ---- | -----------
done | function | callback called after every file is processed.



#### example

---

### write 
Write all collections to disk. `obj.write(collections, done)`


*parameters*

parameter | type | description
--------- | ---- | -----------
collections | Collection | cataloged collections of excerpts
done | Funtion | callback to call after writing is complete



#### example

---

### merge 
Merge the wiki by map with the Excerpt. `obj.merge(collections, done)`


*parameters*

parameter | type | description
--------- | ---- | -----------
collections | Collection | cataloged collections of excerpts
done | Funtion | callback to call after merging wiki content



#### example

---


