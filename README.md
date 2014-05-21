mongoose-find-one-or-create
===========================

Mongoose plugin to add static method findOneOrCreate to a schema


```
% npm install mongoose-find-one-or-create
```

```
var findOneOrCreate = require('mongoose-find-one-or-create');
var PersonSchema = mongoose.Schema({
    name: String,
    age: Number
});
PersonSchema.plugin(findOneOrCreate);
var Person = mongoose.model('Person', PersonSchema);
Person.findOneOrCreate({name: 'Mohammad'}, {name: 'Mohammad', age: 20}, function(err, person) {
    // {name: 'Mohammad', age: 20}
    console.log(person);
});
Person.findOneOrCreate({name: 'Mohammad'}, {name: 'Mohammad', age: 21}, function(err, person) {
    // {name: 'Mohammad', age: 21} won't be created since {name: 'Mohammad'} already exist
    console.log(person);
});
```
