import React, { useState } from 'react'
import logo from './../assets/logo.svg';
import './Auth.css';
import { set } from 'mongoose';
function Auth(props) {

    const[sign,setSign]= useState(true);
    const[password,setPassword]= useState('');
    const[confirm,setConfirm]= useState('');
    const [ip,setIp]= useState('');

    const toggle = () => {
        setSign(!sign)
    }       
    // setTimeout(() => {
    //     toggle()
    // }, 200)

    function handleChange(e){
        setIp(e.target.value);
    }
    
    function test(){
        if (ip === 'admin'){
            props.allowLogin();
        }
        else if (ip === 'faculty'){
            props.allowLogin();
            props.faculty();
        }
    }
    
    async function signIn(){
        console.log(ip);
        const user = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username: ip, password: password}),
        });
        if(user.status === 200){
            props.allowLogin();
            if(ip === 'chai'){
                props.faculty();
            }
        }
        else{
            alert('Invalid Username/Password');
        }
    }
    function signUp(){
        if(password === confirm){
            fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username: ip, password: password}),
            });
            alert('User Created');
            props.allowLogin(); 
        }
        else{
            alert('Passwords do not match');
    }
    }
    return (
        <div id="container" className={`container ${sign ? 'sign-in' : 'sign-up'}`}>
            {/* FORM SECTION */}
            <div className="row">
                {/* SIGN UP */}
                <div className="col align-items-center flex-col sign-up">
                    <div className="form-wrapper align-items-center">
                        <div className="form sign-up">
                            <div className="input-group">
                                <input type="text" placeholder="User ID" value={ip} onChange={(e)=>setIp(e.target.value)}/>
                            </div>
                            <div className="input-group">
                                <i className='bx bxs-lock-alt'></i>
                                <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                            </div>
                            <div className="input-group">
                                <i className='bx bxs-lock-alt'></i>
                                <input type="password" placeholder="Confirm Password" value={confirm} onChange={(e)=>setConfirm(e.target.value)}/>
                            </div>
                            <button onClick={signUp}>
                                Sign up
                            </button>
                            <p>
                                <span>
                                    Already have an account?{" "}
                                </span>
                                <b onClick={toggle} className="pointer">
                                    Sign in here
                                </b>
                                {message && <p className="error-text">{message}</p>}
                            </p>
                            <p className="error-text">
                                Invalid Username/Password
                            </p>
                        </div>
                    </div>
                
                </div>
                {/* END SIGN UP */}
                {/* SIGN IN */}
                <div className="col align-items-center flex-col sign-in">
                    <div className="form-wrapper align-items-center">
                        <div className="form sign-in">
                            <div className="input-group">
                                <input onChange = {handleChange} type="text" placeholder="User ID"/>
                            </div>
                            <div className="input-group">
                                <i className='bx bxs-lock-alt'></i>
                                <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                            </div>
                            <button onClick={async()=>{signIn()}}>
                                Sign in
                            </button>
                            <p>
                                <span>
                                    Don't have an account?{" "}
                                </span>
                                <b onClick={toggle} className="pointer">
                                    Sign up here
                                </b>
                            </p>
                        </div>
                    </div>
                    <div className="form-wrapper">
            
                    </div>
                </div>
                {/* END SIGN IN */}
            </div>
            {/* END FORM SECTION */}
            {/* CONTENT SECTION */}
            <div className="row content-row">
                {/* SIGN IN CONTENT */}
                <div className="col align-items-center flex-col">
                    <div className="img sign-in">
                        <img src={logo} alt="logo"/>
                    </div>
                    <div className="text sign-in">
                        <h2>
                            Welcome
                        </h2>
                    </div>
                </div>
                {/* END SIGN IN CONTENT */}
                {/* SIGN UP CONTENT */}
                <div className="col align-items-center flex-col">
                    <div className="text sign-up">
                        <h2>
                        Join with us
                        </h2>
                    </div>
                    <div className="img sign-up">
                    <img src={logo} alt="logo"/>
                    </div>
                </div>
                {/* END SIGN UP CONTENT */}
            </div>
            {/* END CONTENT SECTION */}
        </div>
    )
}

export default Auth;

