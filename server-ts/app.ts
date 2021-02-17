const express = require('express');
const {OAuth2Client} = require('google-auth-library');
let googleClientId = "151004553284-r57cgf5ipjipqjnvcn2ijt6aep9kbh3b.apps.googleusercontent.com"

const client = new OAuth2Client(googleClientId);
async function verify(token: any) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: googleClientId
    });
    const payload = ticket.getPayload();
    console.log(payload);
}


const app = express();

app.use(express.json());

app.post('/api/:action', (request: any, response: any) => {
    console.log(request.params);
    response.send(JSON.stringify({response: 'ok'}));
});

app.listen(3000, () => console.log('listening on 3000'));


