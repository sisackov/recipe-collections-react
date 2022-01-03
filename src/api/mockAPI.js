import axios from 'axios';

const mockAPI = axios.create({
    baseURL: 'https://61d2c38eb4c10c001712b58c.mockapi.io/', //gmail account
});

const getUsers = async () => {
    const response = await mockAPI.get('users');
    return response.data;
};

const getUser = async (id) => {
    const response = await mockAPI.get(`users/${id}`);
    return response.data;
};

const postUser = async (user) => {
    const response = await mockAPI.post('users', user);
    return response.data;
};

const putUser = async (user) => {
    const response = await mockAPI.put(`users/${user.id}`, user);
    return response.data;
};

export { getUsers, getUser, postUser, putUser };
