import axios from "axios";


export class APILibrary{

    constructor(setIsAuth){
        this.requsetBody = {
            'project' : 'wwwbpaymd',
            'token' : '',
            'authtype': 'user'
        }
        this.resp = '';
        this.authProject(setIsAuth);
    }

    
    async authProject(setIsAuth){
        if(localStorage.getItem('token')){
            this.requsetBody.token = localStorage.getItem('token');
        }
        let data = await this.request('Auth/AuthProject',this.requsetBody);
        if(100 == data.code){
            this.requsetBody.token = data.token;
            localStorage.setItem('token',data.token);
            if(data.type === 'user'){
                setIsAuth(true)
            }else{
                setIsAuth(false);
            }
        }else{
            alert('problem with authorization in API');
        }
    }

    async apiCall(method,data){
        let body = {...this.requsetBody,...data}
        let res = this.request(method,body);
        return res;
    }

    async request(method,reqdata){
        console.log('method',method)
        let response = await axios({
            url: `http://172.28.1.9/${method}`,
            method: "POST",
            data: JSON.stringify(reqdata),
        });
        return response.data;
    }
}