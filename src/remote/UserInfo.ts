export async function getUser(): Promise<string> {
    const response = await fetch('http://localhost:1101/user');
    const body = await response.json();
    return body.value.user.username;
}