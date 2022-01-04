let members = [];
let purchases = [];
let rentPlusCommon = []

const getMembers = ()=>{//getting all members to display later
    return fetch("/api/members").then(r=>r.json())
}
const getPurchases = ()=>{//getting alll purchases to later display
    return fetch("/purchases").then(r=>r)
}
const postPurchase = ()=>{//post the purchase made by a shopper
    const obj = {
        name : $(".shopperNames").val(),
        price : $(".price").val(),
        desc : $(".desc").val()
    }
    console.log(obj)
    return fetch("/purchases",{
        method:"POST",
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(obj)
    })
}
const renderPurchases = async(list2)=>{//will display the purchases made
    const list = await list2.json()
    //showpurchases
    const container = $("<div>").addClass("showpurchases")
    purchases = list
    list.forEach(li=>{
        const el1 = $("<div>").addClass(li.id)
        const el = $("<h2>")
        el.html(`${li.name} --- ${li.desc} --- ${li.price}`)
        el1.append(el)
        container.append(el1)
    })
    $(".showpurchases").replaceWith(container)

}
const renderSelect = (list)=>{//will fill the select on reload
    members = list
    list.forEach(element => {
        var t = $("<option>").attr("value",element.name)
        t.addClass(element.name)
        t.html(element.name)
        $(".shopperNames").append(t)
    });
    //dynamically adding checkboxes to the departments:::
    let container = $(".addCheck1")
    list.forEach(element=>{

        $('<input />', { type: 'checkbox', id: element.name+"-rent", value: element.name }).appendTo(container);
        $('<label />', { 'for': `${element.name}-rent`, text: element.name }).appendTo(container);
        $("<br>").appendTo(container)

    })
    let container2 = $(".addCheck2")
    list.forEach(element=>{

        $('<input />', { type: 'checkbox', id: element.name + "-hydro" , value: element.name }).appendTo(container2);
        $('<label />', { 'for': `${element.name}-hydro`, text: element.name }).appendTo(container2);
        $("<br>").appendTo(container2)

    })
    let container3 = $(".addCheck3")
    list.forEach(element=>{

        $('<input />', { type: 'checkbox', id: element.name +"-water", value: element.name }).appendTo(container3);
        $('<label />', { 'for': `${element.name}-water`, text: element.name }).appendTo(container3);
        $("<br>").appendTo(container3)

    })
    let container4 = $(".addCheck4")
    list.forEach(element=>{

        $('<input />', { type: 'checkbox', id: element.name+"-gas", value: element.name }).appendTo(container4);
        $('<label />', { 'for': `${element.name}-gas`, text: element.name }).appendTo(container4);
        $("<br>").appendTo(container4)

    })
    let container5 = $(".addCheck5")
    list.forEach(element=>{

        $('<input />', { type: 'checkbox', id: element.name+"-common", value: element.name }).appendTo(container5);
        $('<label />', { 'for': `${element.name}-common`, text: element.name }).appendTo(container5);
        $("<br>").appendTo(container5)

    })
}
const commonCalc = ()=>{
    let netCommon = []
    let rentPerHead = $(".rent").val()/members.length
    let set = new Set()
    purchases.forEach(r=>{
        set.add(r.name)
    })
    set.forEach(g=>{
        const person = {
            name: g,
            total:0
        }
        purchases.forEach(h=>{
            if(g === h.name){
                person.total += parseInt(h.price)
            }
        })
        netCommon.push(person)
    })

    let totalCommon = 0;
    netCommon.forEach(r=>{
        totalCommon+=r.total
    })
    //console.log(totalCommon/members.length)
    netCommon.map(r=>{
        r.commonDue = Math.floor(totalCommon/members.length - r.total)
        r.net2pay = Math.floor(r.commonDue + rentPerHead)
    })
    console.log(netCommon)

    let net2pay = members.map(t=>{
        t.netnet = Math.floor(rentPerHead + totalCommon/members.length)
        netCommon.forEach(s=>{
                if(t.name === s.name){
                    t.netnet -= s.total   
                }
            })
        return t
    });
    console.log(net2pay)
    const container = $("<div>").addClass("dr text-center p-2")
    net2pay.forEach(li=>{
        const el1 = $("<div>").addClass(li.id)
        const el = $("<h4>")
        el.html(`${li.name} --- ${li.netnet}`)
        el1.append(el)
        container.append(el1)
    })
    $(".dr").replaceWith(container)
    
    

    console.log("checking for checked boxes")
    const departs = ["-rent","-hydro","-water","-gas","-common"]
    departs.forEach(d=>{

        members.forEach(m => {
            //console.log(`${m.name}${d}`)
            if($(`#${m.name}${d}`).is(":checked")){
                console.log(`${m.name}${d}`)
            }
        });


    })
   
    
    
}

$(".newpurchase").on("submit",(e)=>{
    e.preventDefault()
    postPurchase().then(getPurchases).then(renderPurchases)
})

$(".calcres").on("submit", (e)=>{
    e.preventDefault();
    commonCalc()
})


getMembers().then(renderSelect)
getPurchases().then(renderPurchases)
