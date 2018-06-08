import { LOGIN_REQUESTED } from './AuthType';

export const LoginUser = ({ email, password }) => ({
    type: LOGIN_REQUESTED,
    payload: { email, password }
});
