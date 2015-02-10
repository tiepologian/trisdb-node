# trisdb-node
The Node interface to TrisDb

### Installation
```
sudo npm install trisdb-node
```

### Usage
```js
var trisdb = require('trisdb-node');
// Add a record to the database
trisdb.create("Gianluca", "loves", "Pizza", function(data) {
// done
});
// Execute a GET query
trisdb.get("*", "*", "*", function(data) {
console.log("Query result: " + data);
});
```
