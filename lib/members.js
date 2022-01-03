class Members{

    static listOfMembers = []

    constructor(name,phoneNumber){
        this.name = name;
        this.phoneNumber = phoneNumber
        this.addMembers()
    }
    addMembers(){
        let obj = {
            name:this.name,
            phoneNumber:this.phoneNumber
        }
        Members.listOfMembers.push(obj)
    }
    static getMembers(){
       return Members.listOfMembers
    }
}
let m1 = new Members("Sodhi",4168460498)
let m2= new Members("Chachs",4168460498)
let m3 = new Members("Bobin",6479360747)
let m4= new Members("Sukhii",4168460498)
let m5 = new Members("Arsh",4168460498)

module.exports = Members