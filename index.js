var fs = require("fs");
var path = require("path");
var net = require('net');
var p = require("node-protobuf");
var mod = module.exports;

var pb = new p(fs.readFileSync(path.dirname(module.filename)+"/proto.desc"));

function writeInt(stream, int){
   var bytes = new Array(4)
   bytes[0] = int >> 24
   bytes[1] = int >> 16
   bytes[2] = int >> 8
   bytes[3] = int
   stream.write(new Buffer(bytes))
}

function sendCommand(cmd, callback) {
    var obj = {
        "query": []
    }
    obj.query[0] = cmd;
    try {
        var buf = pb.serialize(obj, "QueryRequest");

        // let's send buf via socket...
        var client = net.connect({port: 1205},
        function() {
            writeInt(client, buf.length);
            client.write(buf);
        });

        client.on('data', function(data) {
            var sz = new Number(data.readUInt32BE(0));
            var buf2 = data.slice(4);
            var newObj = pb.parse(buf2, "QueryResponse");
	    var result = new Array();
            for (x in newObj.data) {
                result.push(newObj.data[x].subject+"-"+newObj.data[x].predicate+"-"+newObj.data[x].object);
            }
            client.end();
	    callback(result);
        });

        client.on('end', function() {
  	    //    console.log('disconnected from server');
        });

    } catch (e) {
        console.log("Error 1");
    }
}

mod.create = function(s, p, o, cb) {
    sendCommand('CREATE "'+s+'" "'+p+'" "'+o+'"', function(data) {
	cb(data);
    });
}

mod.get = function(s, p, o, cb) {
    sendCommand('GET "'+s+'" "'+p+'" "'+o+'"', function(data) {
        cb(data);
    });
}
