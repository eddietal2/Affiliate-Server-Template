const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const User = require('../models/user.model.ts');
const config = require('../config/default.json'); 
const nodemailer = require('nodemailer');

/**
 * 
 * @param user
 * @returns JSON Web Token
 */
function createToken(user: any) {
    return jwt.sign({ id: user.id, email: user.email, fullName: user.fullName, picture: user.picture }, config.jwtSecret, {
        expiresIn: 200 // 86400 expires in 24 hours
      });
  }


/**
 * 
 */
exports.login = (req: any, res: any ) => {
    console.log('Attempting to log in...')
    if (!req.body.email || !req.body.password) {
        return res.status(400).send({ 'msg': 'You need to send email and password' });
    }
  
    User.findOne({ email: req.body.email }, (err: any, user: any) => {
        if (err) {
            return res.status(400).send({ 'msg': err });
        }
  
        if (!user) {
            return res.status(400).json({ 'msg': 'The user does not exist' });
        }
  
        user.comparePassword(req.body.password, (err: any, isMatch: any) => {
            if (isMatch && !err) {
                console.log('Logged in as: ' + user.email);
                res.status(200).json({
                    msg: 'User @' + user.email + ' has logged in',
                    token: createToken(user),
                    fullName: user.fullName,
                    picture: user.picture,
                    email: user.email
                });
            } else {
                return res.status(400).json({ msg: 'The email and password don\'t match.' });
            }
        });
    });
}
/**
 * @param email
 * @param password
 * @param fullName
 * @param picture
 * @param email
 */
exports.register = (req: any, res: any) => {
    console.log(req.body);
    let email = req.body.email;
    let password = req.body.password;
    let fullName = req.body.fullName;
    let picture = req.body.picture;
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ 'msg': 'You need to send email and password' });
    }

    User.findOne({ email: req.body.email }, (err: any, user: any) => {
        if (err) {
            return res.status(400).json({ 'msg': err });
        }

        if (user) {
            return res.status(400).json({ 'msg': 'The user already exists' });
        }

        let newUser = User({
          email,
          password,
          fullName,
          picture
       });
        newUser.save((err: any, user: any) => {
            if (err) {
                console.log(err)
                return res.status(400).json({ 'msg': err });
            }
            if (!user) {
                console.log('There was no user saved!')
                return res.status(400).json({ msg: 'There was no user saved!' });
            }
            console.log('User registered!');
            return res.status(200).json(user);
        });
    });
    // return res.status(200).json({msg: "register"})
}

/**
 * Server recieves email & code sent fron client
 */
exports.sendSixDigitCode = (req: any, res: any ) => {
    console.clear();
    console.log(req.body);
    let code = req.body.code;
    let email = req.body.email;
    // Set transport service which will send the emails
    var transporter =  nodemailer.createTransport({
      service: 'gmail',
      auth: {
            user: 'eddielacrosse2@gmail.com',
            pass: 'taliaferro2',
        },
        debug: true, // show debug output
        logger: true // log information in console
    });
  
  //  configuration for email details
   const mailOptions = {
    from: 'eddielacrosse2@gmail.com', // sender address
    to: `${email}`, // list of receivers
    subject: 'EddieTaliaferro.com Registration Code',
    html:
    `
      <img
        style="width: 100px; margin: 35px 0 20px"
        src="https://eddietaliaferro-com.s3.us-east-2.amazonaws.com/logos-and-default-profile-picture/002001635260539420_picture.png" />
      <h3 style="
        font-size: 1.4em;
        color: #333;
      ">Here is your 6 digit code:</h3>
      <p style="
        background: #1d071f;
        border-radius: 100px;
        border: 2px solid #3cf63c;
        width: 200px;
        color: #d8cca8;
        padding: 0.5em;
        text-align: center;
        font-size: 2em;
        letter-spacing: 11px;">${code}</p>`,
    };
  
   transporter.sendMail(mailOptions, function (err: any, info: any) {
    if(err) {
      console.log(err)
      return res.status(400).json(err);
    }
    else {
      console.log(info);
      return res.status(200).json(info)
    }
   });
}

exports.changePasswordForgot = (req: any, res: any) => {
    console.log(req.body);

    if ( !req.body.oldPassword || !req.body.newPassword) {
      return res.status(400).send('Please enter an old password and a new password')
    }

    else if (req.body.oldPassword === req.body.newPassword) {
      console.log('New Password is the same as old password');
      return res.status(400).send('Please enter a password that is different than your old password');
    }
      else {

      console.log('Changing passsword..');
      User.findOne({ email: req.body.email }, (err: any, user: { comparePassword: (arg0: any, arg1: (err: any, isMatch: any) => any) => void; password: any; }) => {
        if (err) {
          return res.status(400).json({ 'msg': err });
        } else {
          console.log(user);

          user.comparePassword(req.body.oldPassword, (err: any, isMatch: boolean) => {

            if (isMatch && !err) {

              // Create new hashed password
              bcrypt.genSalt(10, (err: any, salt: any) => {

                if (err) {
                    return err;
                };

                bcrypt.hash(req.body.newPassword, salt, (err: any, hash: string) => {
                  console.log('New Password Hashed: ' + hash);
                  let newPassword = hash;
                  let filter = { password: user.password };
                  let update = { password: newPassword }

                  User.updateOne(filter, update)
                    .then( (data: any) => {
                      console.log('Updated Password: ' + JSON.stringify(data));
                      return res.status(200).send(true);
                    })
                    .catch( (err: any) => {
                      console.log(err);
                      return res.status(400).end('There was an error');
                    })
                  })
                })
            } else {
              console.log(isMatch);
              return res.status(200).send(false);
            }
          })
        }
      })
    }
}

export {}
