import { HandleResponse } from '@utils';
import { Authentication } from "@services";

export const Api = {
    changePassword,
    checkPromotion,
    getAlbums,
    getPhotoSizes,
    resetPassword,
    submitCart
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

function checkPromotion(promocode) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

    return fetch(`${process.env.REACT_APP_DATABASE_URL}/promotion/${promocode}`, requestOptions)
        .then(HandleResponse)
        .then(response => {
            return response.message;
        });
}

function getAlbums() {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

    return fetch(`${process.env.REACT_APP_DATABASE_URL}/album`, requestOptions)
        .then(HandleResponse)
        .then(response => {
            return response.message;
        });
}

function getPhotoSizes() {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

    return fetch(`${process.env.REACT_APP_DATABASE_URL}/photo_size/all`, requestOptions)
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

function submitCart(orderInfo) {
    // console.log(orderInfo)
    const requestOptions = {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json',
            'x-access-token': Authentication.currentUserValue.token
        },
        body: JSON.stringify(orderInfo)
    };

    return fetch(`${process.env.REACT_APP_DATABASE_URL}/order`, requestOptions)
        .then(HandleResponse)
        .then(response => {
            return response.message;
        });
}