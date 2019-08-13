import Cooies from 'js-cookie'
const format = (obj) => {
    let newobj=Object.entries(obj).map(item => `${item[0]}=${item[1]}`).join('&')
    return newobj
}

const request = (url, method, data) => {
    let baseOptions = {
        method,
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'authorization':Cooies.get('sessionId')
        }
    }
    if(data instanceof FormData){
        delete baseOptions.headers['content-type']
    }
    if (method === 'GET') {
        url = `${url}${format(data) ? '?'+format(data) : ''}`
    } else {
        baseOptions.body = data instanceof FormData ? data : format(data);
    }
    return fetch(url, baseOptions).then(response => {
        if (response.ok) {
            return response.json()
        } else {
            return Promise.reject(response.statusText)
        }
    })
}

export default {
    get(url,data={}) {
        return request(url, "GET", data)
    },
    post(url, data) {
        return request(url,'POST',data)
    }
}