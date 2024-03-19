document.addEventListener("DOMContentLoaded", (event)=>{
    axios.get("https://crudcrud.com/api/302585f19f3040279faf6e3fddf8f346/mini_inventory")
    .then((res) =>{
        console.log(res.data[0]);
        const alldata = res.data;
        const ul = document.getElementById("show_items")
        for(let i=0; i < alldata.length; i++){
            const li = document.createElement("li");
            li.innerHTML = `${alldata[i].item_name} - ${alldata[i].discription} - ${alldata[i].price} - ${alldata[i].qnt} - `;
            const buy_btn = document.createElement("button");
            const btn_txt = document.createTextNode("Buy");
            buy_btn.appendChild(btn_txt);
            li.appendChild(buy_btn);
            li.id = alldata[i]._id;
           
            ul.appendChild(li);
    
            buy_btn.addEventListener("click", ()=>{
                // console.log('click')
                if(alldata[i].qnt > 0){
                    alldata[i].qnt = alldata[i].qnt - 1;
                    const put_data = {
                        item_name : alldata[i].item_name,
                        discription : alldata[i].discription,
                        price : alldata[i].price,
                        qnt : alldata[i].qnt,
                    };
    
                    axios.put(`https://crudcrud.com/api/302585f19f3040279faf6e3fddf8f346/mini_inventory/${li.id}`, put_data)
                    .then((res)=>{
                        li.innerHTML = `${alldata[i].item_name} - ${alldata[i].discription} - ${alldata[i].price} - ${alldata[i].qnt} - `;
                        li.appendChild(buy_btn);
                    })
                    .catch(err => console.log(err))
                }
                
            });
        }
    })
    .catch(err => console.log(err))
})

function addItem(e){
    e.preventDefault();
    const item_name = document.getElementById("item_name").value;
    const discription = document.getElementById("discription").value;
    const price = document.getElementById("price").value;
    let qnt = document.getElementById("qnt").value;

    const data = {
        item_name : item_name,
        discription : discription,
        price : price,
        qnt : qnt,
    }
    axios.post("https://crudcrud.com/api/302585f19f3040279faf6e3fddf8f346/mini_inventory", data)
    .then((res)=>{
        createRow(res);
    })
    .catch(err => console.log(err));
    function createRow(res){
        const li = document.createElement("li");
        li.innerHTML = `${item_name} - ${discription} - ${price} - ${qnt} - `;
        const buy_btn = document.createElement("button");
        const btn_txt = document.createTextNode("Buy");
        buy_btn.appendChild(btn_txt);
        li.appendChild(buy_btn);
        li.id = res.data._id;
        const ul = document.getElementById("show_items")
        ul.appendChild(li);

        buy_btn.addEventListener("click", ()=>{
            if(qnt > 0){
                qnt = qnt - 1;
                const put_data = {
                    item_name : item_name,
                    discription : discription,
                    price : price,
                    qnt : qnt,
                };

                axios.put(`https://crudcrud.com/api/302585f19f3040279faf6e3fddf8f346/mini_inventory/${li.id}`, put_data)
                .then((res)=>{
                    li.innerHTML = `${item_name} - ${discription} - ${price} - ${qnt} - `;
                    li.appendChild(buy_btn);
                })
                .catch(err => console.log(err))
            }
            
        });
    }
    console.log(data);
}