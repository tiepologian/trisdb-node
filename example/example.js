var trisdb = require('trisdb-node');


trisdb.get("*", "*", "*", function(data) {
    console.log("GET result: " + data);
});

trisdb.create("bubu", "loves", "cucci", function(data) {
    console.log("CREATE result: " + data);
});

trisdb.get("*", "*", "*", function(data) {
    console.log("2nd GET result: " + data);
});

