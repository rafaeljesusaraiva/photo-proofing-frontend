import { HandleResponse } from '@utils';
import { Authentication } from "@services";

export const AdminApi = {
    getWidgetInfo
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