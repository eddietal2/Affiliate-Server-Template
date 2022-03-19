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
                  console.log(user.favoriteProducts);
                  return res.status(200).json(user.favoriteProducts);
            })
        } else {
            console.log("User has already favorited this product.")            
            return res.status(200).json(user.favoriteProducts)
        }
    })
    
}

exports.unfavoriteProduct = (req: any, res: any) => {
    let email = req.body.email;
    let productID = req.body._id;

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
            return res.status(200).json(user.favoriteProducts)
        }
    })
}

exports.getCart = (req: any, res: any ) => {
    let email = req.body.email;

    console.clear()
    console.log('Get Cart');

    User.findOne(
        {email},
        (err: any, user: any) => {
        if(err) {
            return res.status(400).json(err)
        }
        if(!user){
            return res.status(400).json({
                msg: `There was no user with the email ${email}`
            })
        }
        console.log('Getting Products...')
        Product.find((err: any, products: Array<Object>) => {
            let userCart: any[] = [];

            if(err) {
                return res.status(400).json(err);
            }

            user['cart'].forEach((cartItem: string) => {
              
                products.forEach((product: any) => {
                  if(product['_id'] == cartItem) {
                    userCart.push(product);
                  }
                })
              })
            return res.status(200).json(userCart)
          })
        
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
                  console.log(user.cart);

                  return res.status(200).json(user.cart)
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
                  
                  Product.find((err: any, products: Array<Object>) => {
        
                    if(err) {
                        return res.status(400).json(err);
                    }

                    console.log(user.cart)

                    return res.status(200).json(user.cart)
                  })
            })
        } else {
            console.log("User has never added this product in their cart.")
            return res.status(400).json({msg: "User has never added this product in their cart."})
        }
        
    })
}

exports.emptyCart = (req: any, res: any) => {
    let email = req.body.email;

    console.clear()
    console.log(`Emptying from Cart for user: ${email}`);

    User.findOneAndUpdate(
        {email: email},
        {cart: []},
        {new: true},
        (err: any, user: any) => {
        if(err) {
            return res.status(400).json(err)
        }
        if(!user) {
            console.log('No user with that email');
            return res.status(400).json({msg: 'No user with that email'})
            
        }
        if(user) {
            console.log('Emptied Users Cart');
            console.log('Cart: ' + user.cart);
            
            return res.status(200).json(user.cart)
            
        } else {
            console.log("User has never added this product in their cart.")
            return res.status(400).json({msg: "User has never added this product in their cart."})
        }
        
    })
}

exports.addReview = (req: any, res: any) => {
    console.clear();
    console.log('Request to Add a Review Recieved --');
    console.log(req.body);
    
    let email = req.body.email;
    let review = req.body.review;
    let userRating = req.body.rating;
    let id = req.body._id;
    let date = Date.now();

    // Find Product
    Product.findOneAndUpdate(
        {_id: id},
        { $push: { reviews: {
            email,
            review,
            rating: userRating,
            date
        } }},
        (err: any, productOne: any) => {
            if(err) {
                console.log('There was an Error Updating Reviews');
                return res.status(400).json(err)
            }
            if(!productOne) {
                return res.status(400).json({msg: 'No Product with that ID'})
            }

            function updateRating(rating:number, reviews: any) {

                let reviewsLength = reviews.length;
                let reviewsRatingTotal = 0;

                reviews.forEach((review: any) => {
                    reviewsRatingTotal = reviewsRatingTotal + review.rating
                });

                return (reviewsRatingTotal + rating) / (reviewsLength + 1);
            }

            if(productOne) {
                Product.findOneAndUpdate(
                    {_id: id},
                    {$set: { rating: updateRating(userRating, productOne.reviews)}},
                    {new: true},
                    (err: any, product: any) => {
                        if(err) {
                            console.log(err);
                            return res.status(400).json(err);
                        }
                        if(product) {
                            console.log('Successfully Added Review and Updated that Product\'s Rating');
                            console.log('Rating: ' + product.rating);
                            console.log('Reviews: ' + product.reviews.length);
                            
                            
                            return res.status(200).json(product.reviews);
                        }
                        
                    }
                ) 
            }
      })
}

