let axios = require('axios');


let req_ = async()=>{
    try {
        let data = {name:'sramanth4', phone:'12', email:'sra@4', pass:'sramanth', company:'sracomp'}
        let getrows = await axios.post("http://localhost:3001/create", data)                                  
        console.log(getrows.data);
    } catch (error) {
        console.log(error.message);
    }
}

req_()
