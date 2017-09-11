import * as express from 'express';
import { RegisterService } from '../src/main'
import { TestService } from './service'


var app = express();

app.get('/', function (req, res) {
    res.send('Hello World!');
});

RegisterService(app, [TestService]);

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
})