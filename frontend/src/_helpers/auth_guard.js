import router from '@/router'

export function authGuard(to) {
    
    let token = localStorage.getItem('token');
    console.log ('Token:', token)
    if (token) {
        console.log('Yes Token:', token);
        return true
    }
    console.log('No Token !');
    router.push('/')
}