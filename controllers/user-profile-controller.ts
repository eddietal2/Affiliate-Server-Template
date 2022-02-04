
const User = require('../models/user.model.ts');
const bcrypt = require("bcrypt");

export {}

exports.changeName = (req: any, res: any ) => {
    console.log('Attempting to change user name...')
    console.log(req.body);
  
    let fullName = req.body.fullName;
    let email = req.body.email;
    let password = req.body.password;
    let filter = {email: email};
    let update = { fullName: fullName};

    if (!fullName || !password) {
        res.status(400).send('Needs name and a password')
    } else {
  
        console.log('Finding user ...')
        // Find user, compare password, then update email.
        User.findOne({ email: email}, (err: any, user: any) => {
          if (err) {
            return res.status(400).send({ 'msg': err });
          }
  
          if (!user) {
            return res.status(400).json({ 'msg': 'The user does not exist' });
          }
  
          if (user.fullName === fullName) {
            return res.status(400).send('Please enter an name that is different than your current one.');
          }
  
          console.log('Comparing passwords ...')
          user.comparePassword(password, (err: any, isMatch: any) => {
            if (isMatch && !err) {
              console.log('Passwords matched!');
              User.updateOne(filter, update)
              .then( (data: any) => {
                console.log('Updated FullName:' + JSON.stringify(data));
                return res.status(200).send(isMatch);
              })
              .catch( (err: any) => {
                console.log(err);
                return res.status(400).send(err);
              })
            } else {
              console.log('Wrong Password');
              return res.status(400).json({ msg: 'Wrong Password' });
            }
          })
        })
      }
}

exports.changeEmail = (req: any, res: any) => {
    console.log('Attempting to change user email...')
    console.log(req.body);
  
    let email = req.body.email;
    let newEmail = req.body.newEmail;
    let password = req.body.password;
    let filter = {email: email};
    let update = { email: newEmail};

    if (!email || !password) {
        res.status(400).send('Needs name and a password')
    } else {
  
        console.log('Finding user ...')
        // Find user, compare password, then update email.
        User.findOne({ email: email}, (err: any, user: any) => {
          if (err) {
            return res.status(400).send({ 'msg': err });
          }
  
          if (!user) {
            return res.status(400).json({ 'msg': 'The user does not exist' });
          }
  
          if (user.email === newEmail) {
            return res.status(400).send('Please enter an name that is different than your current one.');
          }
  
          console.log('Comparing passwords ...')
          user.comparePassword(password, (err: any, isMatch: any) => {
            if (isMatch && !err) {
              console.log('Passwords matched!');
              User.updateOne(filter, update)
              .then( (data: any) => {
                console.log('Updated FullName:' + JSON.stringify(data));
                return res.status(200).send(isMatch);
              })
              .catch( (err: any) => {
                console.log(err);
                return res.status(400).send(err);
              })
            } else {
              console.log('Wrong Password');
              return res.status(400).json({ msg: 'Wrong Password' });
            }
          })
        })
      }
}

exports.changePassword = (req: any, res: any ) => {
    console.log('Attempting to change user password...')
    console.log(req.body);
  
    let email = req.body.email;
    let newPassword = req.body.newPassword;
    let password = req.body.password;

    if (!email || !password) {
        res.status(400).send('Needs email and a password')
    } else {
  
        console.log('Finding user ...')
        // Find user, compare password, then update email.
        User.findOne({ email: email}, (err: any, user: any) => {
          if (err) {
            return res.status(400).send({ 'msg': err });
          }
  
          if (!user) {
            return res.status(400).json({ 'msg': 'The user does not exist' });
          }

  
          console.log('Comparing passwords ...')
          user.comparePassword(password, (err: any, isMatch: any) => {

            if (isMatch && !err) {
  
              // Create new hashed password
              bcrypt.genSalt(10, (err: any, salt: any) => {
  
                if (err) return (err);
  
                bcrypt.hash(newPassword, salt, (err: any, hash: string) => {
                  console.log('New Password Hashed: ' + hash);
                  let newPassword = hash;
                  let filter = { password: user.password };
                  let update = { password: newPassword }
  
                  User.updateOne(filter, update)
                    .then( (data: any) => {
                      console.log('Updated Password: ' + JSON.stringify(data));
                      res.status(200).send(isMatch);
                    })
                    .catch( (err: any) => {
                      console.log(err);
                      res.status(400).end('There was an error');
                    })
                  })
                })
            } else {
              console.log(isMatch);
              return res.status(200).send('Passwords do not match!');
            }
          })
        })
      }
}

exports.subscribeToNewsletter = (req: any, res: any) => {
    return res.status(200).json({msg: "subscribed to newsletter"})
}

exports.unsubscribeToNewsletter = (req: any, res: any) => {
    return res.status(200).json({msg: "unsubscribed to newsletter"})
}

