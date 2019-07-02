import {get ,post} from '@/utils/http';

export function loginByEmail(email, password) {
  const data = {
    email,
    password
  };
  return post( '/login/loginbyemail',data);
}
export function logout() {
  return post('/login/logout');
}

export function getInfo(token) 
{
  return get('/user/info',{ token });
}

export  function api_getAuth () 
{
    return get(`agency/auth?ajax=1`);
}
