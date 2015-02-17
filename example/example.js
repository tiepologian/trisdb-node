var trisdb = require('trisdb-node');


trisdb.initialize("localhost", 1205);

// Add a record to the database
trisdb.create("Gianluca", "loves", "Pizza", function(err) {
    // done :-)
});

// Execute a GET query
trisdb.get("*", "*", "*", function(err, data) {
    if(err) {
	console.log("ERROR");
    } else {
	console.log("Query result: " + data);
    }
});
