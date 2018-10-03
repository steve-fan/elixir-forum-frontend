import "whatwg-fetch";
import { forEachObjIndexed } from "ramda";

const urlPrefix = '/api';

const defaultHeaders = {
    credentials: 'include',
    Accept: 'application/json',
    'Content-Type': 'application/json'
};

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}

function parseJSON(response) {
    return response.json();
}

export function httpGet(url) {
    return fetch(`${urlPrefix}${url}`, { headers: defaultHeaders })
        .then(parseJSON);
}

export function httpPostJson(url, data) {
    const body = JSON.stringify(data);

    return fetch(`${urlPrefix}${url}`, {
        method: 'post',
        headers: defaultHeaders,
        body: body,
        credentials: "include"
    }).then(parseJSON);
}

export function httpPostForm(url, data) {
    var body = new FormData();

    const putPairToFormData = (value, key) => {
        body.append(key, value);
    };

    forEachObjIndexed(putPairToFormData, data);

    return fetch(`${urlPrefix}${url}`, {
        method: 'post',
        header: defaultHeaders,
        body: body,
        credentials: "include"
    }).then(parseJSON);
}
