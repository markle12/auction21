import api from './api';
const express = require('express');
const app = express();

app.use(express.json());

const sendStatus = {
    OK: 0,
    Failed: 1
}

app.post('/api/:action', (request, response) => {
    
    if (request.params.action) {
        if (api[request.params.action] !== undefined) {
            let action = api[request.params.action];
            let args = {};
            for (let arg in action.expected_arguments) {
                if (request.body[arg] !== undefined) {
                    args[arg] = request.body[arg];
                } else {
                    if (action.expection_arguments[arg].required === true) {
                        response.send(JSON.stringify({
                            status: sendStatus.Failed,
                            errorMessage: "Required argument "+arg+" not present"
                        }));
                        return;
                    }
                }
            }
            api[request.params.action](args).then((response) => {
                response.send(JSON.stringify({
                    status: sendStatus.OK,
                    data: response
                }));
            }).catch((e) => {
                response.send(JSON.stringify({
                    status: sendStatus.Failed,
                    errorMessage: e.message
                }));
            })

        } else {
            response.send(JSON.stringify({
                status: sendStatus.Failed,
                errorMessage: "Invalid action"
            }));
        }

    } else {
        response.send(JSON.stringify({
            status: sendStatus.Failed,
            errorMessage: "No action provided"
        }));
        return;
    }

});

app.listen(3000, () => console.log('listening on 3000'));


