const router = require("express").Router()
const path = require("path")

router.get("/members",(req,res)=>{
    res.sendFile(path.join(__dirname,"../../db/members.json"))
})


module.exports = router