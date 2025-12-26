import { Component } from 'react'
import HomeP from './Componets/HomePage/HomePage'
import CreateP from './Componets/CreateUser/CreateUser'
import { LoginP } from './Componets/LoginUser/LoginUser'
import UserP from './Componets/UserPage/UserPage'
import './App.css'

class App extends Component{

  state = {HomePage:true, CreatePage:false, LoginPage:false, UserPage:false}

  changePage = (value1, value2, value3, value4)=>{
        this.setState({HomePage:value1, CreatePage:value2, LoginPage:value3, UserPage:value4})
  }

  render(){
    const {HomePage, CreatePage, LoginPage, UserPage} = this.state
    const LoadPage = ()=>{
      if(HomePage){
        return <HomeP changePage={this.changePage}/>
      } 
      else if(CreatePage){
        return <CreateP changePage={this.changePage}/>
      }
      else if(LoginPage){
        return <LoginP changePage={this.changePage} />
      }
      else if(UserPage){
        return <UserP changePage={this.changePage}/>
      }
    }
    return(
      <div> {LoadPage()} </div> 
    )
  }
}


  export default App
