import { BehaviorSubject } from 'rxjs';
import { HandleResponse } from '@utils';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const Authentication = {
    isAdmin,
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};

function isAdmin() {
    const requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'x-access-token': currentUserSubject._value.token
        }
    };

    return fetch(`${process.env.REACT_APP_DATABASE_URL}/account/self`, requestOptions)
        .then(HandleResponse)
        .then(user => {
            if (user.message.role === 'admin') {
                return true;
            } else {
                return false;
            }
        });
}

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    return fetch(`${process.env.REACT_APP_DATABASE_URL}/account/login`, requestOptions)
        .then(HandleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user.message));
            currentUserSubject.next(user.message);

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}