import { LightningElement,track } from 'lwc';

export default class ProductslistDetails extends LightningElement {
  Columns = [
    { label: 'id', fieldName: 'id' },
    { label: 'title', fieldName: 'title' },
    { label: 'price', fieldName: 'price'},
    { label: 'images', fieldName: 'images',type:'image'},
  
];
     imageReady = false;
    loadingSpinner = false;
    pictureUrl;
    title;
    price;
    pictureUrl1;
    pictureUrl2;
    pictureUrl3;
    pictureUrl4;
    products;
    @track page=[];
    handleClick(){
        const calloutURI = 'https://dummyjson.com/products';
        fetch(calloutURI, {
            method: "GET"
        })
       
        .then(response => response.json())
        
            .then(data => {
              let pages = data.products;
              Object.keys(pages).forEach(id => {
                 this.page = pages[id];
                console.log(this.page.title);
               
            });
              // console.log(pages[Object.keys(pages)[5]].title);
              // console.log(data.products);
              // console.log(data.products[0].title);
              this.products=data.products;
                this.pictureUrl = data.products[0].images[0];
                this.pictureUrl1 = data.products[0].images[1];
                this.pictureUrl2 = data.products[0].images[2];
                this.pictureUrl3 = data.products[0].images[3];
                this.pictureUrl4 = data.products[0].images[4];
                this.title = data.products[0].title;
                this.price = data.products[0].price;
                console.log(this.pictureUrl);
                console.log(this.pictureUrl1);
                console.log(this.pictureUrl2);
                console.log(this.pictureUrl3);
                console.log(this.pictureUrl4);
                console.log(this.price);
                this.imageReady = true;
                this.loadingSpinner = false;
            });
    }
    }