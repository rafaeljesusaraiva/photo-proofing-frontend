import { HandleResponse } from '@utils';
import { Authentication } from "@services";

export const AdminApi = {
    getAllClients,
    getOneClient,
    getWidgetInfo,
    updateUserPrivilege
}

function getAllClients() {
    const requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'x-access-token': Authentication.currentUserValue.token
        }
    };

    return fetch(`${process.env.REACT_APP_DATABASE_URL}/account/all`, requestOptions)
        .then(HandleResponse)
        .then(response => {
            return response.message;
        });
}

function getOneClient(id) {
    const requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'x-access-token': Authentication.currentUserValue.token
        }
    };

    return fetch(`${process.env.REACT_APP_DATABASE_URL}/account/${id}`, requestOptions)
        .then(HandleResponse)
        .then(response => {
            return response.message;
        });
}

function getWidgetInfo() {
    const requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'x-access-token': Authentication.currentUserValue.token
        }
    };

    return fetch(`${process.env.REACT_APP_DATABASE_URL}/order/stats`, requestOptions)
        .then(HandleResponse)
        .then(response => {
            return response.message;
        });
}

function updateUserPrivilege(id, privilege) {
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'x-access-token': Authentication.currentUserValue.token
        },
        body: JSON.stringify({ role: privilege })
    };

    return fetch(`${process.env.REACT_APP_DATABASE_URL}/account/${id}`, requestOptions)
        .then(HandleResponse)
        .then(response => {
            return response.message;
        });
}