
import { Component } from 'react'
import './HomePage.css'

class HomeP extends Component{
    
    render(){
        const {changePage} = this.props

        const goToLogin = ()=>{
            changePage(false, false, true, false)
        }

        const goToCrete = ()=>{
            changePage(false, true, false, false)
        }
        

        return (
            <div className='homeContainer'>
                <h1 className='homeHead'> Welcome to PopX </h1> 
                <p className='homePara'> Popx India Private Limited is an IT company that focuses on application development and software solutions in the information technology sector </p>
                <button className='homeButton1' onClick={goToCrete}> Create Account </button>
                <button className='homeButton2' onClick={goToLogin}> Already Registered? Login </button> 
            </div>
        )
    }
}

export default HomeP