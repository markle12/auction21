const express = require('express');
const {OAuth2Client} = require('google-auth-library');
let googleClientId = "151004553284-r57cgf5ipjipqjnvcn2ijt6aep9kbh3b.apps.googleusercontent.com"

const client = new OAuth2Client(googleClientId);
async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: googleClientId
    });
    const payload = ticket.getPayload();
    console.log('payload!');
    console.log(payload);
}


const app = express();

app.use(express.json());

app.post('/api/:action', (request, response) => {
    console.log(request.params.accessToken);
    console.log(request.body);

    if (request.params.accessToken) {
        verify(request.params.accessToken).catch(console.log);
    }
    response.send(JSON.stringify({response: 'ok'}));
});

app.listen(3000, () => console.log('listening on 3000'));


