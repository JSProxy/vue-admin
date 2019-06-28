const config = 
{
    debug: process.env.NODE_ENV === 'production' ? false: true,
    axios_config: {
        baseClientURL: process.env.NODE_ENV === 'production' ? 'https://b-t.bsays.net': '/api',
        timeout: '5000', // 超时时间
        withCredentials: true, //是否携带cookie
    },
};
module.exports = config;
