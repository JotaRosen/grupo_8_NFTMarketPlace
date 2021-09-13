const { OAuth2Client } = require('google-auth-library');
const OAuth2Data = require('../../googleAuthKey.json');

//Will env variable process env variables

const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

module.exports = {
    
    authClient: async function( req, res ){
        let token = req.body.idToken;
        console.log(token);
        const ticket = await oAuth2Client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];

        console.log(payload);
        // If request specified a G Suite domain:
        // const domain = payload['hd'];
        if(!payload){
            res.status(200).send("Wrong token");
        }
        res.status(200).redirect("/market");
      },

    authCallback: function(req,res){
        const code = req.query.code;

        oAuth2Client.getToken(code, function (err, tokens) {
            if (err) {
                console.log('Error authenticating')
                console.log(err);
            } else {
                console.log('Successfully authenticated');
                oAuth2Client.setCredentials(tokens);
                res.redirect('/market')
            }
        });

    }
}