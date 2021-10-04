import instance from './AxiosInstance';

export async function getBookmarkList() {
        try {
            const response = await instance.get('bookmark/');
            return response.data;
        } catch (error) {
            return error.response;
        }
    }

export async function getBookmark(id) {
        try {
            const response = await instance.get(`bookmark/${id}/`);
            return response.data;
        } catch (error) {
            return error.response;
        }
    }

    export    async function deleteBookmark(id) {
        try {
            const response = await instance.delete(`bookmark/${id}/`);
            return response;
        } catch (error) {
            return error.response;
        }
    }

    export   async function createBookmark(data) {
        try {
            const response = await instance.post('bookmark/', data);
            return response;
        } catch (error) {
            return error.response;
        }
    }

    export async function updateBookmark(id, data) {
       try {
            const response = await instance.put(`bookmark/${id}/`, data);
            return response;
        } catch (error) {
            return error.response;
        }
    }

    export async function getCategories() {
        try {
            const response = await instance.get('category/');
            return response.data;
        } catch (error) {
            return error.response;
        }
    }

    export async function getTags() {
        try {
            const response = await instance.get('tag/');
            return response.data;
        } catch (error) {
            return error.response;
        }
    }

    export async function userRegistration(data) {
        try {
            const response = await instance.post('register/', data);
            return response.data;
        } catch (error) {
            return error.response;
        }
    }

    export async function handleLogin(data) {
        try {
            const response = await instance.post('login/', data);
            instance.defaults.headers["Authorization"] = "JWT " + response.data.access;
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            localStorage.setItem('user', response.data.user);
            localStorage.setItem('isAuthenticated', true);
            return response
        } catch (error) {
            return error.response;
        }
    }

    export async function handleLogout() {
        try {
            await instance.post('logout/', {
                refresh_token: localStorage.getItem('refresh_token'),
            });
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('isAuthenticated');
            localStorage.removeItem('user');
            instance.defaults.headers['Authorization'] = null;
            window.location.reload();
        }
        catch (error) {
            return error.response;
        }
    };

    export default getBookmarkList
