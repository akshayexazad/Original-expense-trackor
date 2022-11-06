function saveToLocalStorage(event){
    event.preventDefault();
    let enterAmount=event.target.expamount.value;
    let enterDescription=event.target.entdescription.value;
    let catagorySelect=event.target.selectCatagory.value;
    // console.log(catagorySelect)
    let obj={
       Amount: enterAmount,
        Description:enterDescription,
        Catagory:catagorySelect
    }
    axios.post("https://crudcrud.com/api/3065fce367694a0c90726905a8320016/newdata",obj)
    .then((res)=>{
        DisplayOnUi(res.data)
        console.log(res)})

    .catch((err)=>{console.log(err)})
    // localStorage.setItem(obj.Description,JSON.stringify(obj));
    // DisplayOnUi(obj)

}
window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/3065fce367694a0c90726905a8320016/newdata")
    .then((res)=>{
        for(i=0;i<res.data.length;i++){
          DisplayOnUi(res.data[i])
        }
        console.log(res)})
    .catch((err)=>{console.log(err)})

 })
function DisplayOnUi(items){
    document.getElementById('expamount').value = '';
    document.getElementById('entdescription').value = '';
    document.getElementById('selectCatagory').value ='';

  let   ParentLi=document.getElementById('listOfUsers');

  let   ChildsOfLi=`<li id=${items._id}> ${items.Amount} ${items.Description} ${items.Catagory}
                <button onclick=deleteItem('${items._id}')>DeleteItem</button>
                <button onclick=editItem('${items.Amount}','${items._id}','${items.Catagory}')>editItem</button>
                </li>`;
     ParentLi.innerHTML= ParentLi.innerHTML+ChildsOfLi;   


}
// delete from local storage;
function deleteItem(Descrip){
    axios.delete(`https://crudcrud.com/api/3065fce367694a0c90726905a8320016/newdata/${Descrip}`)
    .then((res)=>{
     removeItemFromUi(Descrip)
    }).catch((err)=>{
     console.log(err)
    })
}
//delete fron ui;
function removeItemFromUi(Descrip){
    let ParentLi =document.getElementById('listOfUsers');
    let delteChild=document.getElementById(Descrip);
    if(delteChild){
    ParentLi.removeChild(delteChild);
    }
}
function editItem(amount,description,catagory){
   document.getElementById('expamount').value= amount;
   document.getElementById('entdescription').value=description;
   document.getElementById('selectCatagory').value=catagory;
   deleteItem(description);
   }

