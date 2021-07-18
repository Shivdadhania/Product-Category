                                      **********INITIAL REQUIREMENTS********

->first of all you need to run command npm install in your terminal to install all the packages which are present in package.json file.

-> Then you need to past your mongoDB url in app.js file in the place of 'URL' , because i am using mongoDB database.

-> To send the request and get the O/P you need postman application to install in your PC .






                                       *********** PROJECT DETAILS ************


-> Here I am using MVC model so i divided my project into three main section : Model , controllers , routes .

->initially app.js file connect app with mongoDb DB and also it has middleware which will routes the request to feed.js file which is in routes folder.

->routes:

    -> In this folder feed.js file will catch the request and it will execute appropriate controller in product.js file in controllers folder.

    ->so for ex. if you send url like http://localhost:3000/feed/create it will execute controller createProduct in product.js file.

->models:

     -> models are used to create various tables in mongoDB DB. like we created two schema Category and Product both schema contain structure of the table . 

     -> here we have two files category.js and product.js both contain structure of the table.

->controllers:
   
     -> Job of the controlles is to perform various operation like create , update , delete , read etc.

     -> When you send the request routes will execute appropriate controller according to request URL .

     -> Here we have five controller createProduct , getProducts , getProduct , updateProduct , deleteProduct.

        ->createProduct: It will create new product and category.

        ->getProduct : It will return a particular product and category if it exist.

        ->getProducts : It will return all products and its category.

        ->updateProduct : It will update particular product.

        ->deleteProduct : It will delete a particular product.




                                 **************** IPUT AND OUTPUT *****************


-> First of all you need to install postman application to send the requests . 

-> Here we send and receive data in JSON format .

-> Another important thing is that you have to manually enter product Id in the URL in read , delete , update request.

-> Here Postman link : https://documenter.getpostman.com/view/16692305/TzmCgYL1



     
