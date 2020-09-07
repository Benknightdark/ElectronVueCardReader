export const isLogin=()=>{
    return localStorage.getItem('jwt')!==null;
}
export const logout=()=>{
    localStorage.removeItem('jwt')
}