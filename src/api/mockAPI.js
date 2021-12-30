import axios from 'axios';

const mockAPI = axios.create({
    baseURL: 'https://61c5b1c3c003e70017b79865.mockapi.io/', //gmail account
});

export const getUserList = async () => {
    try {
        const response = await mockAPI.get('users');
        return response.data.map((user) => ({
            id: user.id,
            name: user.name,
            email: user.email,
        }));
    } catch (error) {
        console.log(error);
    }
    return [];
};
