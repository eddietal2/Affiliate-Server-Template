const LandingPage = require('../models/landing-page.model.ts');

exports.landingPageInfo = (req: any, res: any ) => {LandingPage.find((err: any, landingPageInfo: any) => {

    if(err) return res.status(400).json(err);
    if(!landingPageInfo) return res.status(400).json({msg: 'There is no Landing Page Information!'});
    if(landingPageInfo) {
        console.clear();
        console.log('Getting Landing Page Info: ');
        console.log(landingPageInfo);
        return res.status(200).json({
            msg: 'Landing Page Information',
            landingPageInfo
        })
    }
  })
}

exports.getFeaturedProducts = (req: any, res: any ) => {
    return res.status(200).json({msg: "got featured products"})
}

exports.membershipSignUp = (req: any, res: any) => {
    return res.status(200).json({msg: "membership sign up"})
}

