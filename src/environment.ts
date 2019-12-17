
let devEnvironment = {
    baseUrl:'http://localhost:1101'
}

let prodEnvironment = {
    baseUrl: 'http://http://35.170.81.123:1101'
}

export let environment = {
    baseUrl: ''
}

if(process.env.REACT_APP_ENV === 'dev'){
    environment = devEnvironment
} else if(process.env.REACT_APP_ENV === 'prod') {
    environment = prodEnvironment
}
