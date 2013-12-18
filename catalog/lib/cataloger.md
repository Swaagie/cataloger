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

#### syntax
```js
obj.init()
```



*returns*
> Catalog - fluent interface

#### examples


### view 
Fetch and cache template content.

#### syntax
```js
obj.view()
```



*returns*
> String - handlebar template

#### examples


### catalog 
Generate a catalog of the documentation.

#### syntax
```js
obj.catalog(done)
```


*parameters*

parameter | type | description
--------- | ---- | -----------
done | function | callback called after every file is processed.



#### examples


### write 
Write all collections to disk.

#### syntax
```js
obj.write(collections, done)
```


*parameters*

parameter | type | description
--------- | ---- | -----------
collections | Collection | cataloged collections of excerpts
done | Funtion | callback to call after writing is complete



#### examples


### merge 
Merge the wiki by map with the Excerpt.

#### syntax
```js
obj.merge(collections, done)
```


*parameters*

parameter | type | description
--------- | ---- | -----------
collections | Collection | cataloged collections of excerpts
done | Funtion | callback to call after merging wiki content



#### examples


---

