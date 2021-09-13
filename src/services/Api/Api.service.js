import { HandleResponse } from '@utils';
import { Authentication } from "@services";

export const Api = {
    getAlbums,
    changePassword,
    resetPassword
}

function getAlbums() {
    const requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json'
        }
    };

    return fetch(`${process.env.REACT_APP_DATABASE_URL}/album`, requestOptions)
        .then(HandleResponse)
        .then(albums => {
            return albums.message;
        });
}

function changePassword(token, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password })
    };

    return fetch(`${process.env.REACT_APP_DATABASE_URL}/account/changePassword`, requestOptions)
        .then(HandleResponse)
        .then(response => {
            return response.message;
        });
}

function resetPassword(email) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
    };

    return fetch(`${process.env.REACT_APP_DATABASE_URL}/account/resetPassword`, requestOptions)
        .then(HandleResponse)
        .then(response => {
            return response.message;
        });
}