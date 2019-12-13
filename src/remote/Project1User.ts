export async function project1Login(username: string, password: string) {
    const credentials = {
        username,
        password
    };
    try {
        const response = await fetch('http://localhost:1101/login', {
            //this object is the config for our request
            //we use it, to set headers and method and such
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(credentials),
            headers: {
                'content-type': 'application/json'
            }
        });
        console.log(response);
        return await response.json();
    } catch (e) {
        console.log(e);

    }
}