const express = require('express') ;
const router = express.Router() ;

router.get('/set' , (req , res) => {
    req.session.views = (req.session.views || 0) + 1  ;
    req.session.userData = {name : "Bang" , role : "user"} ;
    req.session.message = "hello session ! "  ;

    return res.json({message : `Session data set views : ${req.session.views}`}) ;
}) ;

router.get('/get' ,(req ,res) => {
    if(req.session.views) {
        console.log(req.session);
        res.json({ message: "get session" })
    }
    else {
        res.json({message : "no session data .Try /set first."});
    }
}) ;

router.get('/update' , (req ,res) => {
    if(req.session.userData) {
        req.session.userData.lastSeen = new Date() ;
        res.json({message : " session data update"}) ;
    }
    else{
        res.json({ message: "no session data .Try /set first." })
    }
}) ;

router.get('/destroy' ,(req , res) => {
    if(req.session) {
       return  req.session.destroy(err =>{
            if(err) {
                console.error("error destroy session") ;
                return res.status(500).send("could not destroy session") ;
            } ;
            return res.json({message : "session destroy successfully"}) ;

        })
    }
    return res.json({ message : " no active session to destroy"})
})


module.exports = router ;