
# Interface Excerpt


## Constructor
Construct a new Excerpt which is synonym for one file/page of the
documentation. An Excerpt can be rendered against a template.

### Syntax
```js
new Excerpt(data, transform);
```

*Parameters*

parameter | type | description
--------- | ---- | -----------
data | Object | parsed content to provide to this excerpt
transform | function | process and transform data before storing

---

## Properties

> **id** String - An ID is defined by referencing the file path.

---


## Methods


### render 
Render the excerpt by template.

#### Syntax
```js
obj.render(cataloger)
```

*Parameters*
parameter | type | description
--------- | ---- | -----------
cataloger | Cataloger | instance


*Returns*
> String - compiled content

### Examples


---

