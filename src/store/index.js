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
        allProducts: (state) => state.products,
    },

    mutations: {
        AUTH_SUCCESS: (state, token) => {
            state.token = token;
        },
        AUTH_ERROR: (state) => {
            state.token = '';
        },
        SET_PRODUCTS: (state, products) => {
            state.products = products;
        },
        LOGOUT(state) {
            state.token = '';
        },
        addToCart(state, product) {
            const item = state.cart.find(i => i.id === product.id);
            if (item) {
                item.quantity = (item.quantity || 1) + 1;
            } else {
                state.cart.unshift({...product, quantity: 1});
            }
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        incrementItem(state, itemId) {
            const item = state.cart.find(i => i.id === itemId);
            if (item) {
                item.quantity++;
            }
        },
        decrementItem(state, itemId) {
            const item = state.cart.find(i => i.id === itemId);
            if (item && item.quantity > 1) {
                item.quantity--;
            }
        },
        removeFromCart(state, itemId) {
            state.cart = state.cart.filter(i => i.id !== itemId);
        },
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
                        reject(error || new Error('Ошибка авторизации.'));
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
                        reject(new Error('Ошибка регистрации.'));
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
                        reject(error || new Error('Ошибка выхода.'));
                    });
            });
        },

        PRODUCTS: ({commit}) => {
            return productsRequest()
                .then(products => {
                    commit('SET_PRODUCTS', products);
                })
                .catch(err => {
                    console.error('Ошибка загрузки каталога товаров:', err.message);
                });
        },

        CART: ({commit}) => {
            return cartRequest()
                .then(cart => {
                    commit('SET_PRODUCTS', cart);
                })
                .catch(err => {
                    console.error('Ошибка:', err.message);
                })
        },

        ADD_TO_CART({commit}, productId) {
            return addToCartRequest(productId)
                .then(result => {
                    if (result.data && result.data.message === "Product add to cart") {
                        const product = {id: productId};
                        commit('addToCart', product);
                    } else {
                        throw new Error('Не удалось добавить в корзину.');
                    }
                })
                .catch(error => {
                    console.error('Ошибка при добавлении в корзину:', error);
                    throw error;
                });
        },

        DELETE_FROM_CART({ commit }, productId) {
            return deleteFromCartRequest(productId)
                .then(result => {
                    if (result && result.message === "Item removed from cart") {
                        const product = { id: productId };
                        commit('removeItem', product);
                    } else {
                        throw new Error('Не удалось удалить из корзины.');
                    }
                })
                .catch(error => {
                    console.error('Ошибка при удалении из корзины:', error);
                    throw error;
                });
        }
    },

    modules: {
    }
})