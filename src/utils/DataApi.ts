export function checkLogin():boolean{
    const userToken = localStorage.getItem('Token')
    console.log("调用成功了，Token is ",userToken)
    if(!userToken)
        return false
    loginWithToken(userToken)
    return true
}
export function loginWithPassword(userName:string,password:string){
    console.log("调用Password登录接口")
}
export function loginWithToken(Token:string){
    console.log("调用Token登录接口")
}

