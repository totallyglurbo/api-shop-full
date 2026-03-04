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
                throw new Error(result.message || 'Проверьте введённые данные на правильность');
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
                throw new Error('Ошибка выхода: неожиданный ответ сервера');
            }
            return result.data.message;
        });
}

