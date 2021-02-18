import { resolve } from 'path';

const {OAuth2Client} = require('google-auth-library');
let googleClientId = "151004553284-r57cgf5ipjipqjnvcn2ijt6aep9kbh3b.apps.googleusercontent.com"

const client = new OAuth2Client(googleClientId);
async function googleLoginVerify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: googleClientId
    });
    const payload = ticket.getPayload();   
    return payload;
}

export default {
    login: {
        expected_arguments: [
            {
                name: 'email',
                type: 'string',
                required: true
            },
            {
                name: 'id_token',
                type: 'string',
                required: true
            }
        ],
        func: (args) => {
            return new Promise((resolve, reject) => {
                googleLoginVerify(args.id_token).then((payload) => {
                    if (payload.email == args.email && payload.email_verified) {
                        resolve({message: 'email matches!'});
                    } else {
                        reject({message: 'email mismatch???'});
                    }
                }).catch((e) => {
                    reject(e);
                });
            });
        }
    }
}