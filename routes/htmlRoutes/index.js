const router = require("express").Router()
const path = require("path")
const uuid = require("../../uuid/uuid")
const data = require("../../db/purchases.json")
const fs = require("fs")
let uuidList = []
//get the already created uuids and push it to the array
uuidList = data.map((t)=>{
    return t.id
})
router.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"../../public/index.html"))
})
router.get("/purchases",(req,res)=>{
    res.sendFile(path.join(__dirname,"../../db/purchases.json"))
})
router.post("/purchases",(req,res)=>{
    uuidList.push(uuid(uuidList))
    req.body.id = uuidList[uuidList.length-1]
    console.log(req.body)
    data.unshift(req.body)
    fs.writeFile(path.join(__dirname,"../../db/purchases.json"),JSON.stringify(data),err=>{
        if(err) throw err
        console.log("New purchase written in json")

    })
    res.send("")
})
// router.get("*",(req,res)=>{
//     res.sendFile(path.join(__dirname,"../../public/index.html"))
// })

module.exports = router