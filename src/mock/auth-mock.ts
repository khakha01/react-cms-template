import { usersMock } from "./user-mock";

type LoginPayload = {
    email: string;
    password: string;
}

export const loginMock = async ({email, password}: LoginPayload) => {
    return new Promise((resolve, reject)=> {
        setTimeout(()=>{
            const user = usersMock.find((u)=> u.email === email && u.password === password);

            if(!user){
                reject(new Error("Email hoặc mật khẩu không đúng"));
                return;
            }

            const authData = {
                token: "mock-jwt-token",
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            }

            localStorage.setItem("authToken", JSON.stringify(authData));
            
            resolve(authData);
        },500);
    })
}

export const logoutMock = async () => {
    return new Promise<void>((resolve)=> {
        setTimeout(()=>{
            localStorage.removeItem("authToken");
            resolve();
        },500)
    })
}