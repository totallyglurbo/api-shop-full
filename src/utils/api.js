const API = process.env.VUE_APP_API;

export const loginRequest = (user) => {
    return fetch(`${API}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(user),
    })
        .then(async response => {
            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message || 'Проверьте данные на корректность!');
            }
            if (!result.data || !result.data.user_token) {
                throw new Error('Неверный ответ сервера: отсутствует user_token');
            }
            return result.data.user_token;
        });
};

export function registerRequest(user) {
    return fetch(`${API}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(user)
    })
        .then(async (response) => {
            if (response.ok) {
                return response.json();
            } else {
                const errorText = await response.text();
                throw new Error(`Ошибка регистрации: ${response.status} - ${errorText}`);
            }
        });
}

export function logoutRequest() {
    return fetch(`${API}/logout`, { method: 'GET' })
        .then(async (response) => {
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Ошибка выхода: ${response.status} - ${errorText}`);
            }
            const result = await response.json();
            if (result?.data?.message !== 'logout') {
                throw new Error('Ошибка выхода из аккаунта: неожиданный ответ сервера.');
            }
            return result.data.message;
        });
}

export function productsRequest() {
    return fetch(`${API}/products`)
        .then(async (response) => {
            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message || 'Ошибка при загрузке каталога продуктов.');
            }
            if (!result.data || !Array.isArray(result.data)) {
                throw new Error('Неверный формат ответа от сервера.');
            }
            return result.data;
        });
}

export function cartRequest() {
    return fetch(`${API}/cart`)
        .then(async (response) => {
            const result = await response.json();
        if (!response.ok) {
            throw new Error(result.message);
        }
        if (!result.data || !Array.isArray(result.data)) {
            throw new Error('Неверный формат ответа от сервера.')
        }
        return result.data;
        })
}

export const addToCartRequest = (productId) => {
    return fetch(`${API}/cart/${productId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({ quantity: 1 })
    }).then(async (response) => {
        const result = await response.json();
        console.log('Ответ с сервера:', result);
        if (response.status !== 201) {
            throw new Error(result.data?.message || 'Ошибка при добавлении товара в корзину!');
        }
        return result;
    });
};

export const deleteFromCartRequest = (productId) => {
    return fetch(`${API}/cart/${productId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({ quantity: 1 })
    }).then(async (response) => {
        const result = await response.json();

        if (response.status === 200) {
            return result.data;
        } else if (response.status === 403) {
            throw new Error(result.error?.message || 'Доступ запрещен!');
        } else {
            throw new Error(result.error?.message || 'Ошибка при удалении товара.');
        }
    });
};