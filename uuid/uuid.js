
//this will create a unique id everytime this file is imported
//we can have upto 120 unique ids and if more we can just increase the number from 120 to whatever!!!
module.exports = (list)=>{
    while(true){
        const num = Math.floor(Math.random() * 120 + 1)
        if(list.indexOf(num) === -1){
            return num;
        }
    }
}