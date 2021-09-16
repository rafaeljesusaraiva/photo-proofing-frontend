import { HandleResponse } from '@utils';
import { Authentication } from "@services";

export const Api = {
    changePassword,
    checkPromotion,
    getAlbums,
    getFinalImage,
    getOrders,
    getOrderZip,
    getPhotoSizes,
    getSelfInformation,
    resetPassword,
    submitCart,
    updatePassword
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

function getOrderZip(orderID) {
    const requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'x-access-token': Authentication.currentUserValue.token
        }
    };

    return fetch(`${process.env.REACT_APP_DATABASE_URL}/delivery-zipped/${orderID}`, requestOptions)
        .then(response => {
            return response.blob();
        });
}

function getFinalImage(url, orderID) {
    const requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'x-access-token': Authentication.currentUserValue.token,
            'order-id': orderID
        }
    };

    return fetch(url, requestOptions)
        .then(response => {
            return response.blob();
        });
}

function getOrders() {
    const requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'x-access-token': Authentication.currentUserValue.token
        }
    };

    return fetch(`${process.env.REACT_APP_DATABASE_URL}/order`, requestOptions)
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

function getSelfInformation() {
    const requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'x-access-token': Authentication.currentUserValue.token
        }
    };

    return fetch(`${process.env.REACT_APP_DATABASE_URL}/account/self`, requestOptions)
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

function updatePassword(accountID, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'x-access-token': Authentication.currentUserValue.token
        },
        body: JSON.stringify({ password: password })
    };

    return fetch(`${process.env.REACT_APP_DATABASE_URL}/account/${accountID}`, requestOptions)
        .then(HandleResponse)
        .then(response => {
            return response;
        });
}