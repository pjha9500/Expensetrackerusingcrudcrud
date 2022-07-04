console.log("hello");


class datas
{
    constructor(amount,description,category)
    {
        this.amount=amount;
        this.description=description;
        this.category=category;
    }
}



function getMethod()
{
    axios({
        method:'get',
        url:'https://crudcrud.com/api/d4de9ede46d94490a29c4435bf31e12f/expense',
    }).then((res)=> showOnScreen(res.data));
    

}
getMethod();
function showOnScreen(res)
{
    for(let i=0;i<res.length;i++)
    {
        let dt=res[i]._id;
        let data=document.createElement('li');
        data.id=dt;
        data.innerHTML=`${res[i].amount}--${res[i].description}---${res[i].category}--<button class="deletes" onclick=deletes('${dt}')>Delete</button>-<button onclick=edits('${dt}')>Edit</button>`
        document.getElementById('showdata').appendChild(data);
    }
}



let data=document.getElementById('formbox');

data.addEventListener('submit',xyz);
function xyz(e)
{
    e.preventDefault();
    

        let expense= new datas(document.getElementById('amount').value ,document.getElementById('description').value,document.getElementById('categorys').value);
        console.log(expense);
        axios({
            method:'post',
            url:'https://crudcrud.com/api/d4de9ede46d94490a29c4435bf31e12f/expense',
            data:expense
        }).then((res)=>showOnScreen(res.data)).catch(()=>console.log("error"));
        // localStorage.setItem(document.getElementById('description').value,JSON.stringify(expense));
        location.reload();
}
function deleteFromScreen(datasx)
{
    let parent=document.getElementById('showdata');
    let child=document.getElementById(datasx);
    parent.removeChild(child);

}
function deletes(datasx)
{
        deleteFromScreen(datasx);
        axios({
        method:'delete',
        url:`https://crudcrud.com/api/d4de9ede46d94490a29c4435bf31e12f/expense/${datasx}`
    }).then((res)=>console.log("Done"));
    
}
function edits(datasx)
{
    axios({
        method:'get',
        url:`https://crudcrud.com/api/d4de9ede46d94490a29c4435bf31e12f/expense/${datasx}`
    }).then((res)=>
    {
            let dt=res.data._id;
            deletes(dt);
            document.getElementById('amount').value=res.data.amount;
            document.getElementById('description').value=res.data.description;
            document.getElementById('categorys').value=res.data.category;
    }
    ).catch((res)=>(console.log("error")));

}




