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

// Add another record
trisdb.create("Marco", "loves", "Pizza", function(err) {
    if(err) console.log("Error creating record");
});

// DELETE a record
trisdb.delete("Gianluca", "*", "*", function(err) {
    if(err) console.log("Error deleting record");
});

// CLEAR database
trisdb.clear(function(err) {
    // db should be empty now
});
