

const mongoose = require('mongoose');


const Product = require('../models/product');
const Category = require('../models/category');

exports.createProduct = (req , res , next) =>{
   // fetching data 
    const {productName, qtyPerUnit , unitPrice ,unitInStock , discontinued , categoryName } = req.body;
    let categoryId;

    // check wheather product has any category or not 
    if(categoryName){
        const category = new Category({
            categoryName: categoryName
        });

   // save category to table 
        category
        .save()
        .then(result => {
          console.log(result);
          res.json({
            message: 'Category created successfully!',
            post: result
          });
          categoryId = mongoose.Types.ObjectId(result._id);
          return categoryId;
        })
        .then(data =>{
          const product = new Product({
            productName :productName,
            qtyPerUnit :qtyPerUnit,
            unitPrice :unitPrice,
            unitInStock :unitInStock,
            discontinued :discontinued,
            categoryId : data
        });
    
        //save product in the table
         return product
               .save()
               .then(result => {
                    console.log(result);
                 })       
        })
        .catch(err => {
        console.log(err);
        });
     }


// if category does not exist then we only create product.
    else{

      const product = new Product({
        productName :productName,
        qtyPerUnit :qtyPerUnit,
        unitPrice :unitPrice,
        unitInStock :unitInStock,
        discontinued :discontinued
        });

       product
       .save()
       .then(result => {
        res.json({
          message: 'Product created successfully!',
          post: result
        });
           console.log(result);
        })
       .catch(err => {
          console.log(err);
        });

     }
    
    
    
     
};

exports.deleteProduct = (req , res , next) =>{

     // fetch the product ID which is passes in URL
       const productId = req.params.productId;
       Product.findById(productId)
       .then(result =>{
           if(!result){
            const error = new Error('Could not find product.');
            throw error;
           }
           return Product.findByIdAndRemove(productId);
       })
       .catch(err =>console.log(err));
};

exports.getProduct = (req , res , next) =>{

  // fetch the product ID which is passes in URL
    const productId = req.params.productId;

    Product.findById(productId)
    .then(result => {
      
      if (!result) {
        const error = new Error('Could not find Product.');
        throw error;
      }

      //  this if block check wheather product has any category
      // if it has then it will fetch and return otherwise it will only return product.


      if(result.categoryId){
        Category.findById(result.categoryId)
             .then(data =>{
              res.json({ message: 'Data fetched.', product:result , category : data });
             })
             .catch(err => console.log(err));
      }
      else{
        console.log(result);
        res.json({ message: 'Product fetched.', product:result });
      }
      
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getProducts = (req , res , next) =>{
    let pr=[];
    let ca =[];

    //first we will find all the products and store it to an array pr.

     Product.find()
    .then(result => {
      if (!result) {
        const error = new Error('Could not find Product.');
       
        throw error;
      }
      pr = result;
    })

    //then we will fetch all category and stored in an array ca.
    .then(f =>{
     return Category.find()
      .then(d =>{
       ca = d;
       
      })
      .catch(err =>{
        console.log(err);
      });
    })
    .then(r =>{
      //helper function return an array of all products and it category if it has.
      return fetchAll(pr , ca) ;
    })
    .then(rs =>{
  
      res.json({ message: 'Product_Category fetched.', product_Category: rs });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.updateProduct = (req , res , next) =>{

  // fetch the product ID which is passes in URL
    const productId = req.params.productId;

    // fetching data
    
    const {productName, qtyPerUnit , unitPrice ,unitInStock , discontinued ,categoryId  } = req.body;
    
    // finding the product which we want to update.
    Product.findById(productId)
      .then(result => {
        if (!result) {
          const error = new Error('Could not find Product.');
         
          throw error;
        }

        //if new value is available then it will update , otherwise value of the fields will remain same.

        result.productName = productName ? productName : result.productName;
        result.qtyPerUnit = qtyPerUnit ? qtyPerUnit : result.qtyPerUnit;
        result.unitPrice = unitPrice ? unitPrice : result.unitPrice;
        result.unitInStock = unitInStock ? unitInStock : result.unitInStock;
        result.discontinued = discontinued ? discontinued : result.discontinued;
        result.categoryId =  categoryId ? categoryId : result.categoryId;
        return result.save();
      })
      .then(result => {
        res.json({ message: 'Product updated!', post: result });
      })
      .catch(err => {
        console.log(err);
      });
};


//This is helper function of getProduct controller

const fetchAll = (result , data)  =>{
     let product_category = [];
     var i;
     const p = result;

     for(i=0 ; i<result.length ; i++){

      if(p[i].categoryId){

        let j=0;
        
          for(j=0 ; j<data.length ;j++){
              
               if(data[j]._id.toString() === p[i].categoryId.toString()){
                
                      product_category.push({ product:p[i] , Category:data[j] });

                }
            
            } 
        }
        else{
          product_category.push({ product:p[i] });
        }
       }
       
       return product_category;
};

  