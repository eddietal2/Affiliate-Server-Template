export {};
const config = require('config');
const mongoose = require('mongoose');

const LandingPageSchema = new mongoose.Schema(
  {
    welcomeMessage: {
      type: String,
      maxlength: 100,
      default: 'Default Welcome Message'
    },
    sample: {
      type: String,
      maxlength: 400,
      default: 'Default Track'
    },
    featuredProducts: {
      type: Array,
      default: []
    },
    whyHypnosis: {
      type: String,
      maxlength: 800,
      default: 'Default Why Hypnosis Text'
    },
    membershipMessage: {
      type: String,
      maxlength: 500,
      default: 'Default Membership Message'
    },
})


LandingPageSchema.methods.helloWorld = function(candidatePassword: any, cb: (err: Error | null, isMatch: boolean) => void) {
 console.log('Landing Page Schema Method -- helloWorld()');
 console.log('Hello World!');
 
}


const LandingPage = mongoose.model('LandingPage', LandingPageSchema);
module.exports = LandingPage;