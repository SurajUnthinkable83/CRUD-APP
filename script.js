// container to keep the data on add 
let productContainer =JSON.parse(localStorage.getItem('products')) ||[];
let productList=document.querySelector('tbody');


upadelist();

let updatedProductind=-1;

// all query selectors
const form = document.querySelector('form');

// edit button
let editButton = document.querySelectorAll('.edit');

// delete button
let deleteButton = document.querySelectorAll('.delete');

// image button handle
let imagePreview ;
let imghandler=document.querySelector('input[type="file"]');

// product constructor class
class Product{
    constructor(name, price, image, description){
        this.name = name;
        this.price = parseFloat(price).toFixed(2);
        this.image = image;
        this.description = description;
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    if(form.submit.value==="UPDATE"){
        let newproductName = event.target.productname.value;
        let newproductPrice = event.target.price.value;
        let newproductImage=event.target.file.value?imagePreview:productContainer[updatedProductind].image;
        
        let newproductDescription = event.target.description.value;
        
        let updatedProduct = new Product(newproductName, newproductPrice, newproductImage, newproductDescription);
        productContainer[updatedProductind] = updatedProduct;
        
        localStorage.setItem('products', JSON.stringify(productContainer));
        form.submit.value="Add Product";
    }
   else{
    let productName = event.target.productname.value;
    let productPrice = event.target.price.value;
    let productImage = imagePreview;
    let productDescription = event.target.description.value;
   
    let newProduct = new Product(productName, productPrice, productImage, productDescription);
    productContainer.push(newProduct);
    
    localStorage.setItem('products', JSON.stringify(productContainer));
   }
    window.location.reload();
    
});


imghandler.addEventListener('change',(event)=>{
    previewImage(event.target.files[0]);
});
// change the image file name

function previewImage(imgD) {
   
    const reader = new FileReader();
    reader.addEventListener("load", function () {
        imagePreview = reader.result;
    })
    reader.readAsDataURL(imgD);        
}

function upadelist(){
    let list = "";

    productContainer.map((product, index) =>(

     list += `<tr>
                <td>${index+1}</td>
                <td>${product.name}</td>
                <td style="text-align:left;padding-left:5px;">${product.description}</td>
                <td style="text-align:right;padding-right:5px;">${product.price}</td>
                <td>
                <img src="${product.image}" alt="" width="50px" height="50px">
                </td>
                <td>
                    <i class="fa-solid fa-pen-to-square edit"></i>
                    <i class="fa-solid fa-trash delete"></i>
                </td>
            </tr>`
    ));
productList.innerHTML = list;
}



// function to update the product the list 
editButton.forEach((button) => {
    button.addEventListener('click',(event)=>{
         form.submit.value="UPDATE";
         let productId = +event.target.parentNode.parentNode.innerText[0]-1;
         editProduct(productId);
    });
});

function editProduct(productIndex){
    updatedProductind=productIndex;
    let product = productContainer[productIndex];
    form.productname.value = product.name;
    form.price.value = product.price;
    form.description.value = product.description;
}


// to delete product
deleteButton.forEach((button) => {
    button.addEventListener('click',(event)=>{
        let productId = +event.target.parentNode.parentNode.innerText[0]-1;
        deleteProduct(productId);
    });
});

function deleteProduct(productIndex){
    console.log("deleteProduct");
    productContainer.splice(productIndex,1);
    localStorage.setItem('products', JSON.stringify(productContainer));
    console.log(productContainer.length);
    window.location.reload();
}
