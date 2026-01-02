let db_obj 
let path = require('path')
let {open} = require('sqlite');
let {Database} = require('sqlite3');
let jwtToken = require('jsonwebtoken');
let bcrypt = require('bcrypt');
let cors = require('cors')
let express = require('express');
let app = express();
app.use(express.json()) 
app.use(cors());

const PORT = process.env.PORT || 3000;


let start_server = async()=>{
    try {
        db_obj = await open({
            filename: path.join(__dirname, 'userData.db'),
            driver:Database
        })

        const run_ = await db_obj.run('PRAGMA foreign_keys = ON')

        app.listen(PORT, ()=>{ console.log(`Server is running on port ${PORT}`)})

    } catch (error) {
        console.log(error.message);
    }
}
start_server();

let Authentication = (req, resp, next)=>{
    let token
    const check_token = req.headers["authorization"]
    if (check_token !== undefined){
        token = check_token.split(" ")[1];
        jwtToken.verify(token, 'Educase India', async(error, payload)=>{
            if(error){
                resp.status(401)
                resp.send("Authentication failed: You do not have permission to access this resource")
            }else{
                req.userEmail = payload.email
                next()
            }
        })

    }else {
        resp.status(401)
        resp.send("Authentication failed: You do not have permission to access this resource")
    }
}


app.post('/create', async(req, resp)=>{
    try {
        let {name, phone, email, pass, company} = req.body
        let checK_user = await db_obj.get('select email from userData where email=?', [email])
        if (checK_user === undefined){
            let hastedPass = await bcrypt.hash(pass, 7)
            const query = `
                INSERT INTO userData(name, email, pass, company, phone) 
                values(?,?,?,?,?)
            `
            const adduser = await db_obj.run(query, [name, email, hastedPass, company, phone]);
            resp.send('Successfully Created Account')
        }
        else {
            resp.send('An account with this email address already exists')
        }


        
    } catch (error) {
        console.log(error.message)
        resp.send('Something went wrong on server side')
    }

})


app.post('/login', async(req, resp)=>{
    try {
        const {email, pass} = req.body
        let user = await db_obj.get('select * from userData where email=?',[email])
        if(user !== undefined){
            let checK_pass = await bcrypt.compare(pass, user.pass)  
            if(checK_pass){
                const payload = {email:user.Email}
                let token = jwtToken.sign(payload, 'Educase India')
                resp.send({token:token})                
            }else{
                resp.send('Wrong Password')
            }
        }else {
            resp.send('Wrong email address')
        }

    } catch (error) {
        console.log(error.message)
        resp.send('Something went wrong on server side')
    } 
})


app.get('/user', Authentication, async(req, resp)=>{
    try {
        const userEmail = req.userEmail
        const userData = await db_obj.get('select * from userData where email=?', [userEmail])
        if (userData !== undefined){
            resp.send(userData)
        }else{
            resp.send('User Data is Not Present')
        }
    } catch (error) {
        console.log(error.message)
        resp.send('Something went wrong on server side')
    }
})





app.post('/createPost', Authentication, async(req, resp)=>{
    try {
        const {Id, title, para} = req.body
        const query = `
            INSERT INTO loginUser(user_id, para, title) 
            values(?,?,?)
            `
        const adduser = await db_obj.run(query, [Id, para, title]);
        resp.send('Successfully Added Post')
    } catch (error) {
        console.log(error.message)
        resp.send('Something went wrong on server side')
    }

})



app.post('/getPosts', Authentication, async(req, resp)=>{
    try {
        const {Id} = req.body
        const userData = await db_obj.all('select * from loginUser where user_id=?', [Id])
        if (userData.length !== 0){
            resp.send(userData)
        }else{
            resp.send('User Data is Not Present')
        }
    } catch (error) {
        console.log(error.message)
        resp.send('Something went wrong on server side')
    }
})


app.get('/', (req, res) => {
    res.send('Dflex API is running 🚀')
  })
  





