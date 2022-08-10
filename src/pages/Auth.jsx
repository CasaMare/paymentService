import React, { useState } from "react";
import Loader from "../components/UI/Loader";
import { Button, Grid, TextField, Box, Paper } from "@mui/material";
import { styled } from '@mui/material/styles';
import { CircularProgress } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    
    textAlign: 'center',
    color: theme.palette.text.secondary,
    maxWidth:"1280px",
    margin:"auto",
    padding:"50px"
  }));

const Auth = ({API, setIsAuth}) => {

    const [isLoader, setIsLoader] = useState(false);

    const [formData, setInFormData] = useState({
        login:'',
        password:'',
        valid:true,
        errorMsg:''
    });

    const handleFillData = (e) => {
        let inputName = e.target.name;
        if(inputName === 'email'){
            setInFormData({...formData,
                login: e.target.value
            })
        }else if(inputName === 'password'){
            setInFormData({...formData,
                password: e.target.value
            })
        }
    }

   
    const [loginIsValid, setLoginIsValid] = useState(true);
    const [passwordIsValid, setPasswordIsValid] = useState(true);
    

    const login = async (event) => {
        event.preventDefault();
        let formIsValid = true;
        let passwordErrorMsg = '';
        let loginErrorMsg = '';

        setInFormData({
            ...formData,
            valid:true
        });
        setIsLoader(true);
        let regexp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        if(!regexp.test(String(formData.login).toLowerCase())){
            formIsValid = false;
            loginErrorMsg = 'Не валидный email!';
        }

        if(formData.password.length < 8){
            formIsValid = false;
            passwordErrorMsg = 'Минимальная длиная пароля 9 символов!';
        }
     
        if(!formIsValid){
            setInFormData({
                ...formData,
                valid:false,
                passwordErrorMsg: passwordErrorMsg,
                loginErrorMsg: loginErrorMsg
            });
            setIsLoader(false);
            return false;
        }
       
        if(formData.valid){
            let response = await API.Client.apiCall('Auth/Authorization',formData);
            if(100 === response.code){
                localStorage.setItem('Account',response.Account);
                localStorage.setItem('Email',response.Email);
                setIsAuth(true);
                window.location.href = "/";
            }else{
                alert('error');
                setInFormData({
                    ...formData,
                    valid: false,
                    errorMsg: response.text
                });
            }
        }else{
            alert('что-то не так');
        }
        setIsLoader(false);
    }

    const handleLogin  = (e) => {
        let email = e.target.value;
        let regexp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        if(regexp.test(String(email).toLowerCase())){
            setLoginIsValid(true);
            setInFormData({
                ...formData,
                login: email
            });
        }else{
            setLoginIsValid(false);
        }  
    }

    const hanldePassword = (e) => {
        let password = e.target.value;
        if(password.length > 8){
            setInFormData({
                ...formData,
                password: password
            });
            setPasswordIsValid(true);
        }else{
            setPasswordIsValid(false);
        }
    } 


    return(
      <>
        {
            isLoader 
            ? <CircularProgress style={{margin:"auto"}} size={60} />
            : <Grid  container
                        spacing={0}
                        columns={8}>
                        <Grid   item xs={8} padding={5}>
                            <Item>
                                    {!formData.valid && formData.errorMsg ? <h1 style={{color:'red'}}>{formData.errorMsg}</h1> : ''}
                                    <form onSubmit={login}>
                                        <div className="form-div">
            
                                            <TextField 
                                            error={!loginIsValid ? true : false}
                                            helperText={!loginIsValid ? formData.loginErrorMsg : ''}
                                            id="email" 
                                            label="Email" 
                                            variant="standard"
                                            onChange={handleLogin}
                                             />
                                        </div>
                                        <div className="form-div">
                                            <TextField 
                                            error={!passwordIsValid ? true : false}
                                            helperText={!passwordIsValid ? formData.passwordErrorMsg : ''}
                                            id="password" 
                                            label="Password" 
                                            variant="standard"
                                            onChange={hanldePassword}
                                             />
                                        </div>
                                        <div className="form-div button-div">
                                            <Button onClick={login} variant="contained">Войти</Button>
                                        </div>
                                    </form>
                            </Item>
                        </Grid>
                </Grid>
    
        }
            
        </>

    );
}

export default Auth;

