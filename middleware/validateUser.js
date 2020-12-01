const db = require('../users/userDb'); 


module.exports =  async function (req, res, next) {

    try {

        const user = await db.getById(req.params.id); 

        if(!user) return res.status(404).send({error: "User does not exist"})

        req.user = user; 

        return next(); 


    }catch(e){
        res.status(500).send(e); 
    }
}