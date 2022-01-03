
const getMembers = ()=>{
    return fetch("/api/members").then(r=>r.json())
}
const getPurchases = ()=>{
    return fetch("/purchases").then(r=>r)
}
const postPurchase = ()=>{
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
const renderPurchases = async(list2)=>{
    const list = await list2.json()
    //showpurchases
    const container = $("<div>").addClass("showpurchases")
    list.forEach(li=>{
        const el1 = $("<div>").addClass(li.id)
        const el = $("<h2>")
        el.html(`${li.name} --- ${li.desc} --- ${li.price}`)
        el1.append(el)
        container.append(el1)
    })
    $(".showpurchases").replaceWith(container)

}
const renderSelect = (list)=>{
    list.forEach(element => {
        var t = $("<option>").attr("value",element.name)
        t.addClass(element.name)
        t.html(element.name)
        $(".shopperNames").append(t)
    });
}

getMembers().then(renderSelect)
getPurchases().then(renderPurchases)

$(".newpurchase").on("submit",(e)=>{
    e.preventDefault()
    postPurchase().then(getPurchases).then(renderPurchases)
})