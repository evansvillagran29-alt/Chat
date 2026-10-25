const WebSocket = require('ws');
const http = require('http');

// Crear servidor HTTP y de WebSockets
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Servidor de chat online activo\n');
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('¡Nuevo cliente conectado!');

    ws.on('message', (message) => {
        let msgString = message.toString();
        console.log(`Mensaje recibido: ${msgString}`);

        // Reenviar el mensaje a todos los clientes conectados (broadcast)
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(msgString);
            }
        });
    });

    ws.on('close', () => {
        console.log('Cliente desconectado.');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
