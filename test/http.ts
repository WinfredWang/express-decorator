import fetch from 'node-fetch';

let baseUrl = 'http://localhost:3000';
let request = (subUrl, httpMethod, resType?: string, body?: any) => {
    let option = {
        method: httpMethod,
        body: null,
        headers: null
    };
    if (httpMethod == 'put' || httpMethod == 'post') {
        option.body = JSON.stringify(body);
        option.headers = { 'Content-Type': 'application/json' };
    }

    return fetch(baseUrl + subUrl, option).then(res => res.text());
}

export let http = {
    get: (subUrl) => request(subUrl, 'get'),
    delete: (subUrl) => request(subUrl, 'delete'),
    post: (subUrl, data?) => request(subUrl, 'post', data),
    put: (subUrl, data?) => request(subUrl, 'put', data)
}