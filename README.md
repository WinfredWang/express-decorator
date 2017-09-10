## Express decorator
a light-weight module that register restful services by decorator for express.


## Install
```
npm install express-decorator
```

## Features
- Use `@Path` to register express route for class.
- Use `@GET/@DELETE/@POST/@PUT` to register sub-route path for a method,
- Inject request parameters from `@PathParam/@QueryParam/@FormParam`
- Inject Request,Response From express request.

## Quick Start

Create firsr restfult service.
```javascript
@Path('/user')
export class UserService {

    @GET('/:id')
    list( @PathParam('id') id: string, @QueryParam('name') name: string) {
        return [id, name]
    }

    @DELETE('/:id')
    delete( @PathParam('id') id) {
        return [id];
    }

    @POST('')
    create( @FormParam('user') user) {
        return user;
    }

    @PUT('')
    update( @FormParam('user') user) {
        return user;
    }
} 
```

Register your service class
```
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

```

## API
- `Path(baseUrl: string)`
- `GET(subUrl: string)`
- `DELETE(subUrl: string)`
- `POST(subUrl: string)`
- `DELETE(subUrl: string)`
- `PathParam(paramName: string)`
- `QueryParam(paramName: string)`
- `FormParam(paramName: string)`
- `Reqeust`
- `Response`
