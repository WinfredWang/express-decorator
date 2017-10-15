import { Path, GET, POST, DELETE, PUT, PathParam, QueryParam, FormParam, CookieParam, HeaderParam, Request, Response } from '../src/main'

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

    @GET('/test/cookie')
    testCookie( @CookieParam('name') cookieName, @CookieParam('xx') p2) {

        return Promise.resolve([cookieName, p2]);
    }

    @GET('/test/header')
    testHeader( @HeaderParam('Cookie') cookieName, @HeaderParam('User-Agent') p2) {

        return Promise.resolve([cookieName, p2]);
    }
}   
