import { createStore } from 'vuex'
import { loginRequest, registerRequest, logoutRequest, productsRequest, cartRequest, addToCartRequest, deleteFromCartRequest } from '@/utils/api.js'

export default createStore({
    state: {
        token: localStorage.getItem('myAppToken') || '',
        products: [],
        cart: JSON.parse(localStorage.getItem('cart')) || [],
    },

    getters: {
        isAuthenticated: (state) => !!state.token,

    },

    mutations: {
        AUTH_SUCCESS: (state, token) => {
            state.token = token;
        },
        AUTH_ERROR: (state) => {
            state.token = '';
        },

        LOGOUT(state) {
            state.token = '';
        },


    actions: {
        AUTH_REQUEST: ({commit}, user) => {
            return new Promise((resolve, reject) => {
                loginRequest(user)
                    .then(token => {
                        commit('AUTH_SUCCESS', token);
                        localStorage.setItem('myAppToken', token);
                        resolve();
                    })
                    .catch(error => {
                        commit('AUTH_ERROR');
                        localStorage.removeItem('myAppToken');
                        reject(error || new Error('Ошибка аутентификации'));
                    });
            });
        },

        AUTH_REGISTER: ({commit}, user) => {
            return new Promise((resolve, reject) => {
                registerRequest(user)
                    .then(() => {
                        resolve();
                    })
                    .catch(() => {
                        reject(new Error('Ошибка регистрации'));
                    });
            });
        },

        LOGOUT({commit}) {
            return new Promise((resolve, reject) => {
                logoutRequest()
                    .then(() => {
                        commit('LOGOUT');
                        localStorage.removeItem('myAppToken');
                        resolve();
                    })
                    .catch((error) => {
                        commit('LOGOUT');
                        localStorage.removeItem('myAppToken');
                        reject(error || new Error('Ошибка выхода'));
                    });
            });
        },



    modules: {
    }
})