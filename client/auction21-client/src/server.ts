import config from './config';
enum sendStatus {
    OK = 0,
    Failed = 1
}
interface returnData {
    status: sendStatus,
    data: any,
    errorMessage?: string
}

const send = (action: string, data: any) => {
    return new Promise((resolve, reject) => {
        let req = new XMLHttpRequest();

        req.addEventListener("load", (event) => {
            let response = JSON.parse(req.responseText) as returnData;
            if (response.status != sendStatus.OK) {
                reject(response.errorMessage);
            } else {
                resolve(response.data);
            }
        });

        req.addEventListener("error", (event) => {
            reject('Network error');
        });

        req.addEventListener("abort", (event) => {
            reject('Network error');
        })

        req.open('POST', config.listener+'/'+action);
        req.setRequestHeader('Content-Type', 'application/json');
        req.send(JSON.stringify(data));        
    })
}
export default {
    login: (email: string, id_token: string) => {
        return send('login', {email, id_token});
    }
}