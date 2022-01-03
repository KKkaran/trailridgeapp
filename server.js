const express = require("express")
const path = require("path");
const app = express()
const PORT = process.env.PORT || 3001
const htmlRoutes = require("./routes/htmlRoutes/index")
const apiRoutes = require("./routes/apiRoutes/apiRoutes")
const Members = require("./lib/members")
const fs = require("fs")

app.use(express.static(path.join(__dirname,"./public")))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use("/",htmlRoutes)
app.use("/api",apiRoutes)

//write the members to json file so select can be populated
fs.writeFile("./db/members.json", JSON.stringify(Members.getMembers()),er=>{
    if (er) throw er
    console.log("Members added to json file")
})

console.log(Members.getMembers())


app.listen(PORT,()=>{
    console.log(`running on ${PORT}`)
})