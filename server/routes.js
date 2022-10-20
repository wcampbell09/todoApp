const api = require('./api');
const routes = [
    {
        method: 'POST',
        path: '/todo',
        options: api.create
    },
    {
        method: 'GET',
        path: '/todo/{todo}',
        options: api.get
    },
    {
        method: 'PUT',
        path: '/todo/{todo}',
        options: api.update
    },
    {
        method: 'DELETE',
        path: '/todo/{todo}',
        options: api.delete
    },
    {
        method: 'GET',
        path: '/',
        options: api.all
    },
];
module.exports = routes
