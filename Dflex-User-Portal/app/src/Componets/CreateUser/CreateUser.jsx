import { Component } from 'react'
import './CreateUser.css'
import axios from 'axios'

class CreateP extends Component {

    state = {fullname:"", phone:"", email:"", pass:"", company:"", serverMessage:""}

    inputName = (event)=>{
        this.setState(prev => ({fullname:event.target.value, phone:prev.phone, email:prev.email, pass:prev.pass, company:prev.company}))
    }

    inputPhone = (event)=>{
        this.setState(prev => ({fullname:prev.fullname, phone:event.target.value, email:prev.email, pass:prev.pass, company:prev.company}))
    } 

    inputEmail = (event)=>{
        this.setState(prev => ({fullname:prev.fullname, phone:prev.phone, email:event.target.value, pass:prev.pass, company:prev.company}))
    } 

    inputPass = (event)=>{
        this.setState(prev => ({fullname:prev.fullname, phone:prev.phone, email:prev.email, pass:event.target.value, company:prev.company}))
    } 

    inputCompany = (event)=>{
        this.setState(prev => ({fullname:prev.fullname, phone:prev.phone, email:prev.email, pass:prev.pass, company:event.target.value}))
    } 

    render(){
        const {changePage} = this.props
        const {fullname, phone, email, pass, company} = this.state
        const createAccount = async(event) => {
            event.preventDefault();
                try {
                    if(fullname==='' || phone==='' || email===''|| pass ==='' || company === ''){
                        this.setState({serverMessage:'Please fill in all required fields'})
                    } else if (!email.toLowerCase().endsWith('@gmail.com')){
                        this.setState({serverMessage:'Please enter a valid gmail address'})
                    } else if(pass.length < 6){
                        this.setState({serverMessage:'Password is too short'})
                    } else if(phone.length !== 10){
                        this.setState({serverMessage:'Invalid phone number'})
                    }
                    else{
                        this.setState({serverMessage:'Please wait 5–20 seconds while the server responds'})
                        let data = {name:fullname, phone:phone, email:email, pass:pass, company:company}
                        let getrows = await axios.post("https://dflex-user-portal.onrender.com/create", data) 
                        this.setState(prev => ({fullname:prev.fullname, phone:prev.phone, email:prev.email, pass:prev.pass, company:prev.company, serverMessage:getrows.data}))                                 
                    }

                } catch (error) {
                    this.setState(prev => ({fullname:prev.fullname, phone:prev.phone, email:prev.email, pass:prev.pass, company:prev.company, serverMessage:"Server is down"}))
                    console.log(error.message);
                }
            
            
            
        }

        const {serverMessage} = this.state
    
        const goToHome = () => {
            changePage(true,false,false,false)
        }
    
    
        return(
            <div>
                <h1 className='createContainer'> Create your Dflex account </h1>
                <form className='createForm' onSubmit={createAccount}>
                    <div className='createCard1'>
                        <label className='createLabel1' for="name"> FullName </label>
                        <input className='createInput1' onChange={this.inputName} value={fullname} id="name" type='text'/>
                    </div>
                    <div className='createCard1'>
                        <label className='createLabel1' for="phone"> Phone </label>
                        <input className='createInput1' onChange={this.inputPhone} value={phone} id="phone" type='text'/>
                    </div>
                    <div className='createCard1'>
                        <label className='createLabel1' for="email"> Email Address </label>
                        <input className='createInput1' onChange={this.inputEmail} value={email} id="email" type='text'/>
                    </div>
                    <div className='createCard1'>
                        <label className='createLabel1' for="pass"> Password </label>
                        <input className='createInput1' onChange={this.inputPass} value={pass} id='pass' type='password'/>
                    </div>
                    <div className='createCard1'>
                        <label className='createLabel1' for="company"> Company Name </label>
                        <input className='createInput1' onChange={this.inputCompany} value={company} id="company" type='text'/>
                    </div>
                    <div>
                        <label className='createlabel2'> Are you an Agency?</label>
                        <div>
                            <div className='createRadio1'>
                                <label className='createLabel3' for="yes"> Yes </label>
                                <input className='createInput2' id="yes" type="radio" name="selectOne"/>
                            </div>
                            <div className='createRadio1'>
                                <label className='createLabel3' for="no"> No </label>
                                <input className='createInput2' id="no" type="radio" name="selectOne"/>
                            </div>
                        </div>
                    </div>
                    <button className='createButton1' type='submit'> Create Account </button>
                    {serverMessage?<p className='createErrorMessage'>{serverMessage}</p>:<p className='createErrorMessage hideMsg'>{serverMessage}</p>}
                    <button className='createButton2' onClick={goToHome}> Back </button>
                </form>
            </div>
        )
    }
}

export default CreateP
