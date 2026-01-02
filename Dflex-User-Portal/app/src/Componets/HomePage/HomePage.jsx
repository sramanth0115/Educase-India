
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
                <h1 className='homeHead'> Welcome to Dflex </h1> 
                <p className='homePara'> Dflex is a web platform that allows users to create accounts, log in securely, and share posts seamlessly.
It focuses on providing a clean, user-friendly experience for managing user content and interactions </p>
                <button className='homeButton1' onClick={goToCrete}> Create Account </button>
                <button className='homeButton2' onClick={goToLogin}> Already Registered? Login </button> 
            </div>
        )
    }
}

export default HomeP