import { Component } from 'react'
import './LoginUser.css'
import axios  from 'axios'

export let getUserData = {Name:'error', Email:'error', pass:'error', company:'error', Phone:'error'}
export let getToken = ''
export class LoginP extends Component {
    
    state = {email:'', pass:'', serverMessage:''}

    inputEmail = (event)=>{
        this.setState(prev => ({email:event.target.value, pass:prev.pass, serverMessage:prev.serverMessage}))
    } 

    inputPass = (event)=>{
        this.setState(prev => ({email:prev.email, pass:event.target.value, serverMessage:prev.serverMessage}))
    } 


    render(){
        const {changePage} = this.props
        const {email, pass} = this.state

        const goToUser = async(event) =>{
            event.preventDefault();
            let checkLoginValue = false
            let checkLogin = async()=>{
                try {
                    if(email ==='' || pass ===""){
                        this.setState({serverMessage:'Please fill in all required fields'})
                    }else {
                        const data = {email:email, pass:pass}
                        getToken = await axios.post("https://educase-india-uhsz.onrender.com/login", data) 
                        getToken = getToken.data
                        if (typeof(getToken) === typeof({hello:1})){
                            const getData = {
                                headers:{'authorization':`Bearer ${getToken.token}`}
                            }
                            let getrows = await axios.get("https://educase-india-uhsz.onrender.com/user", getData)
                            getrows = getrows.data
                            if(typeof(getrows) === typeof({hello:1})){
                                getUserData = getrows
                                getToken = getToken.token
                                checkLoginValue = true
                            }else if(typeof(getrows) === typeof("hello")){
                                this.setState(prev => ({email:prev.email, pass:prev.pass, serverMessage:getrows}))
                            }else{
                                this.setState(prev => ({email:prev.email, pass:prev.pass, serverMessage:"Server is down3"}))    
                            }


                        }else if(typeof(getToken) === typeof('Hello')){
                            this.setState(prev => ({email:prev.email, pass:prev.pass, serverMessage:getToken}))
                        }else{
                            this.setState(prev => ({email:prev.email, pass:prev.pass, serverMessage:"Server is down2"}))
                        }
                }

                } catch (error) {
                    this.setState(prev => ({email:prev.email, pass:prev.pass, serverMessage:"Server is down1"}))
                    console.log(error.message);
                }
            }
            const wait = await checkLogin()
            if(checkLoginValue === true){
                changePage(false, false, false, true)
            }
        }


        const backHome = () => {
                changePage(true, false, false, false)
        }


        const {serverMessage} = this.state

        return(
            <div className='LoginContainer'>
                <h1> Signin to your Popx account </h1>
                <p> Popx India Private Limited is an IT company that focuses on application development and software solutions in the information technology sector </p>
                <form className='loginForm' onSubmit={goToUser}>
                    <div className='loginCard'>
                        <for className='loginFor' for='email'> Email </for>
                        <input className='loginEmail' onChange={this.inputEmail} id='email' value={email}/>
                    </div>
                    <div className='loginCard'>
                        <for className='loginFor' for='pass'> Password </for>
                        <input className='loginEmail' onChange={this.inputPass} id='pass' value={pass} type='password'/>
                    </div>
                    <button className='loginButton1' type='submit'> Login </button>
                    <button className='loginButton2' onClick={backHome}> Back </button>    
                    <p className='LoginError'> {serverMessage} </p>
                </form>
            </div>
        )
    }
}

