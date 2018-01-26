import * as types from './actionTypes';


export function login(navProps, res) {
    console.log('asdf');
    return {
        type: types.LOGIN,
        nav: navProps,
        data: res
    };
}