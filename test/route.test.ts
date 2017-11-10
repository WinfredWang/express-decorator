import { http } from './http'


test('01.Http get reqeust', () => {
    http.get('/user/xxx?name=tom').then(res => {

        expect(JSON.parse(res)).toEqual(["xxx", "tom", "test1", "test2"])
    })
});

test('02.Http delete reqeust', () => {
    http.delete('/user/xxx').then(res => {
        expect(res).toEqual("xxx")
    }, (err) => {
        console.log(err);
    })
});

test('03.Http post reqeust', () => {
    let user = { name: 'wang', age: 20 };
    http.post('/user', { user: user }).then(res => {
        expect(JSON.parse(res)).toEqual({ name: "wang", age: 20 })
    }, (err) => {
        console.log(err);
    })
});

test('04.Http put reqeust', () => {
    let user = { name: 'wang', age: 20 };
    http.put('/user', { user: user }).then(res => {
        expect(JSON.parse(res)).toEqual({ name: "wang", age: 20 })
    }, (err) => {
        console.log(err);
    })
});

test('05.custom response', () => {
    let user = { name: 'wang', age: 20 };
    http.get('/user/test/resundefined').then(res => {
        expect(res).toEqual('custom response');
    }, (err) => {
        console.log(err);
    })
});