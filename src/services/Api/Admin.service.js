import { HandleResponse } from '@utils';
import { Authentication } from "@services";

export const AdminApi = {
    createEvent,
    createSize,
    deleteSize,
    getAllClients,
    getAllEvents,
    getAllOrders,
    getAllPhotoSizes,
    getOneClient,
    getOneEvent,
    getOneOrder,
    getOneSize,
    getWidgetInfo,
    putImage,
    updateEvent,
    updateOrderStatus,
    updateUserPrivilege
}

function createEvent(formData) {
    const requestOptions = {
        method: 'PUT',
        headers: { 
            // 'Content-Type': 'application/json',
            'x-access-token': Authentication.currentUserValue.token
        },
        body: formData
    };

    return fetch(`${process.env.REACT_APP_DATABASE_URL}/album`, requestOptions)
        .then(HandleResponse)
        .then(response => {
            return response.message;
        });
}

function createSize(input) {
    const requestOptions = {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json',
            'x-access-token': Authentication.currentUserValue.token
        },
        body: JSON.stringify(input)
    };

    return fetch(`${process.env.REACT_APP_DATABASE_URL}/photo_size`, requestOptions)
        .then(HandleResponse)
        .then(response => {
            return response.message;
        });
}

function deleteSize(sizeID) {
    const requestOptions = {
        method: 'DELETE',
        headers: { 
            'Content-Type': 'application/json',
            'x-access-token': Authentication.currentUserValue.token
        }
    };

    return fetch(`${process.env.REACT_APP_DATABASE_URL}/photo_size/`+sizeID, requestOptions)
        .then(HandleResponse)
        .then(response => {
            return response.message;
        });
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

function getAllEvents() {
    const requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'x-access-token': Authentication.currentUserValue.token
        }
    };

    return fetch(`${process.env.REACT_APP_DATABASE_URL}/album/all`, requestOptions)
        .then(HandleResponse)
        .then(response => {
            return response.message;
        });
}

function getAllOrders() {
    const requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'x-access-token': Authentication.currentUserValue.token
        }
    };

    return fetch(`${process.env.REACT_APP_DATABASE_URL}/order/all_admin`, requestOptions)
        .then(HandleResponse)
        .then(response => {
            return response.message;
        });
}

function getAllPhotoSizes() {
    const requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'x-access-token': Authentication.currentUserValue.token
        }
    };

    return fetch(`${process.env.REACT_APP_DATABASE_URL}/photo_size/all_admin`, requestOptions)
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

function getOneEvent(id) {
    const requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'x-access-token': Authentication.currentUserValue.token
        }
    };

    return fetch(`${process.env.REACT_APP_DATABASE_URL}/album/${id}`, requestOptions)
        .then(HandleResponse)
        .then(response => {
            return response.message;
        });
}

function getOneOrder(id) {
    const requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'x-access-token': Authentication.currentUserValue.token
        }
    };

    return fetch(`${process.env.REACT_APP_DATABASE_URL}/order/${id}`, requestOptions)
        .then(HandleResponse)
        .then(response => {
            return response.message;
        });
}

function getOneSize(id) {
    const requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'x-access-token': Authentication.currentUserValue.token
        }
    };

    return fetch(`${process.env.REACT_APP_DATABASE_URL}/photo_size/${id}`, requestOptions)
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

function putImage(formData) {
    const requestOptions = {
        method: 'PUT',
        headers: { 
            // 'Content-Type': 'application/json',
            'x-access-token': Authentication.currentUserValue.token
        },
        body: formData
    };

    return fetch(`${process.env.REACT_APP_DATABASE_URL}/photo`, requestOptions)
        .then(HandleResponse)
        .then(response => {
            return response.message;
        });
}

function updateEvent(albumId, data) {
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'x-access-token': Authentication.currentUserValue.token
        },
        body: JSON.stringify(data)
    };

    return fetch(`${process.env.REACT_APP_DATABASE_URL}/album/${albumId}`, requestOptions)
        .then(HandleResponse)
        .then(response => {
            return response.message;
        });
}

function updateOrderStatus(id, status) {
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'x-access-token': Authentication.currentUserValue.token
        },
        body: JSON.stringify({ orderStatus: status })
    };

    return fetch(`${process.env.REACT_APP_DATABASE_URL}/order/${id}`, requestOptions)
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