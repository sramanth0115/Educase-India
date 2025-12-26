import { Component } from 'react'
import { getUserData, getToken } from '../LoginUser/LoginUser'
import axios from 'axios'
import './UserPage.css'

class UserP extends Component {
  state = {
    listOfPosts: [],
    title: '',
    para: ''
  }

  componentDidMount() {
    this.getPosts()
  }

  getPosts = async () => {
    try {
      const { Id } = getUserData   // ✅ call function
      const token = getToken     // ✅ call function

      const config = {
        headers: {
          authorization: `Bearer ${token}`
        }
      }

      const response = await axios.post(
        'http://localhost:3001/getPosts',
        { Id },
        config
      )

      const lists = response.data

      if (Array.isArray(lists)) {
        this.setState({ listOfPosts: lists }) // ✅ same variable updated
        console.log(this.state.listOfPosts,'end')
      }
    } catch (error) {
      console.error('Error fetching posts:', error)
    }
  }

  inputTitle = event => {
    this.setState({ title: event.target.value })
  }

  inputPara = event => {
    this.setState({ para: event.target.value })
  }

  addPost = async () => {
    try {
      const { title, para } = this.state
      const { Id } = getUserData
      const token = getToken

      const config = {
        headers: {
          authorization: `Bearer ${token}`
        }
      }

      const response = await axios.post(
        'http://localhost:3001/createPost',
        { Id, title, para },
        config
      )

      if (response.data === 'Successfully Added Post') {
        await this.getPosts() // ✅ updates SAME listOfPosts variable
        this.setState({ title: '', para: '' })
      }
    } catch (error) {
      console.error('Error adding post:', error)
    }
  }

  goToHome = () => {
    const { changePage } = this.props
    changePage(true, false, false, false)
  }

  render() {
    const { listOfPosts, title, para } = this.state
    const { Name, Email, company } = getUserData

    return (
      <div className='userContainer'>
        <h1 className='userHead1'>Account Setting</h1>

        <div className='userCard1'>
          <img className='userImg1' src='' alt=''/>
          <div>
            <h1 className='userHead1'>{Name}</h1>
            <p className='userPara1'>{Email}</p>
          </div>
        </div>

        <p className='userPara2'>
          {company} India Private Limited is an IT company that focuses on
          application development and software solutions.
        </p>

        <div className='userPostCard'>
          <h3 className='userPostTitle'>Title</h3>
          <input className='userPostInput' type="text" value={title} onChange={this.inputTitle} />

          <h3 className='userPostPara'>Paragraph</h3>
          <textarea className='userPostText' value={para} onChange={this.inputPara} />

          <br />
          <button className='userPostButton' onClick={this.addPost}>POST</button>
        </div>

        <hr />

        <h2 className='userTweetHead1'>Your Posts</h2>
        {listOfPosts.map(post => (
          <div className='userTweetCard' key={post.id}>
            <h3 className='userTweetHead2'>{post.title}</h3>
            <p className='userTweetPara'>{post.para}</p>
          </div>
        ))}

        <button className='UserButtonLogout' onClick={this.goToHome}>Logout</button>
      </div>
    )
  }
}

export default UserP
