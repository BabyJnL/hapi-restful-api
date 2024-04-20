const Hapi = require('@hapi/hapi');

const init = async () => {
    const server = Hapi.server({
        port: '8000',
        host: 'localhost'
    });

    await server.start();
    console.log(`[LOG] Server running on ${server.info.uri}`)
}

init();