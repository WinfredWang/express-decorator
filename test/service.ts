import { Path, GET, POST, DELETE, PUT, PathParam, QueryParam, FormParam, Request, Response } from '../src/main'

@Path('/user')
export class TestService {

    @GET('/:id')
    list( @PathParam('id') id: string, @QueryParam('name') name: string) {
        return [id, name]
    }

    @DELETE('/:id')
    delete( @PathParam('id') id) {
        return id;
    }

    @POST('')
    create( @FormParam('user') user, @Request req) {
        return user;
    }

    @PUT('')
    update( @FormParam('user') user) {
        return user;
    }

    @GET('/test/resundefined')
    resUndefined( @Response res) {
        res.send('custom response');
    }
}   
