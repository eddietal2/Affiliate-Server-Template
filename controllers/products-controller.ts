const Product = require('../models/product.model.ts');
const User = require('../models/user.model.ts');

exports.getFeaturedProducts = (req: any, res: any ) => {
    Product.find((err: any, products: any) => {
        console.log('Getting Featured Products...');
        let featuredProducts = products.filter((product: any) => {
            return product.featured == true;
        })
        return res.status(200).json(
            featuredProducts)
      })
}

exports.getAllProducts = (req: any, res: any) => {
    Product.find((err: any, products: any) => {
        console.log('Getting Products...')
        return res.status(200).json(products)
      })
}

exports.getProductInfo = (req: any, res: any) => {
    let id = req.body._id;
    Product.findById(
        id,
        (err: any, product: any) => {
        console.log('Getting Products...')
        return res.status(200).json(product)
      })
}

exports.favoriteProduct = (req: any, res: any ) => {
    let email = req.body.email;
    let productID = req.body._id;

    console.clear()
    console.log(`Favorite Request Object Id: ${productID}`);
  
    // post it to users favoriteJobs array in User Model
    User.find((err: any, user: any) => {
        if(!user[0].favoriteProducts.includes(productID)) {
            User.findOneAndUpdate(
                { email: email },
                { $push: { favoriteProducts: req.body._id }},
                { new : true },
                (err: any, user: any) => {
                  
                  if (err) return res.status(400).json({ msg : 'Error finding user' });
                  if (!user) return res.status(400).json({ msg : 'User wasn\'t found' });
                  
                  console.log('Favoriting Product');
                  return res.status(200).json(user.favoriteProducts);
            })
        } else {
            console.log("User has already favorited this product.")
            return res.status(400).json({msg: "User has already favorited this product."})
        }
    })
    
}

exports.unfavoriteProduct = (req: any, res: any) => {
    let email = req.body.email;
    let productID = req.body._id;

    console.clear()
    console.log(`Unfavorite Request Object Id: ${productID}`);
  
    // remove it to users favoriteJobs array in User Model
    User.find((err: any, user: any) => {
        if(user[0].favoriteProducts.includes(productID)) {
            User.findOneAndUpdate(
                { email: email },
                { $pull: { favoriteProducts: req.body._id }},
                { new : true },
                (err: any, user: any) => {
                  
                  if (err) return res.status(400).json({ msg : 'Error finding user' });
                  if (!user) return res.status(400).json({ msg : 'User wasn\'t found' });
                  
                  console.log('Unfavoriting Product');
                  return res.status(200).json(user.favoriteProducts);
            })
        } else {
            console.log("User hasn't never favorited this Product.")
            return res.status(400).json({msg: "User hasn't never favorited this Product."})
        }
    })
}

exports.addToCart = (req: any, res: any ) => {
    let email = req.body.email;
    let productID = req.body._id;

    console.clear()
    console.log(`Add to Cart Request Object Id: ${productID}`);

    User.find((err: any, user: any) => {
        if(err) {
            return res.status(400).json(err)
        }
        if(!user[0].cart.includes(productID)) {
            User.findOneAndUpdate(
                { email: email },
                { $push: { cart: req.body._id }},
                { new : true },
                (err: any, user: any) => {
                  
                  if (err) return res.status(400).json({ msg : 'Error finding user' });
                  if (!user) return res.status(400).json({ msg : 'User wasn\'t found' });
                  
                  console.log('Adding this product to User\'s Cart');
                  return res.status(200).json(user.cart);
            })
        } else {
            console.log("User already has this product in their cart.")
            return res.status(400).json({msg: "User already has this product in their cart."})
        }
        
    })
}

exports.removeFromCart = (req: any, res: any) => {
    let email = req.body.email;
    let productID = req.body._id;

    console.clear()
    console.log(`Remove from Cart Request Object Id: ${productID}`);

    User.find((err: any, user: any) => {
        if(err) {
            return res.status(400).json(err)
        }
        if(user[0].cart.includes(productID)) {
            User.findOneAndUpdate(
                { email: email },
                { $pull: { cart: req.body._id }},
                { new : true },
                (err: any, user: any) => {
                  
                  if (err) return res.status(400).json({ msg : 'Error finding user' });
                  if (!user) return res.status(400).json({ msg : 'User wasn\'t found' });
                  
                  console.log('Removed this product from User\'s Cart');
                  return res.status(200).json(user.cart);
            })
        } else {
            console.log("User has never added this product in their cart.")
            return res.status(400).json({msg: "User has never added this product in their cart."})
        }
        
    })
}

