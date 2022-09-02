const express = require("express") ;
const supertokens = require("supertokens-node");
const Session = require("supertokens-node/recipe/session");
const ThirdPartyEmailPassword = require("supertokens-node/recipe/thirdpartyemailpassword");
const { errorHandler } = require("supertokens-node/framework/express");
const {middleware} = require("supertokens-node/framework/express");
const cors = require("cors");
const { Google, Facebook } = ThirdPartyEmailPassword;

const app = express();

const apiPort = 3001;
const apiDomain = 'http://localhost:' + apiPort;

supertokens.init({
  framework: "express",
  supertokens: {
    // These are the connection details of the app you created on supertokens.com
    connectionURI:
      "https://f4504c112a4011edb4efa1149c305def-ap-southeast-1.aws.supertokens.io:3571",
    apiKey: "gpoINe-NQ0XZQUAk8XatRLWX6dMNSL",
  },
  appInfo: {
    // learn more about this on https://supertokens.com/docs/thirdpartyemailpassword/appinfo
    appName: "RnSuperTokens",
    apiDomain: apiDomain,
    websiteDomain: "http://localhost:3000",
  },
  recipeList: [
    ThirdPartyEmailPassword.init({
      providers: [
        // We have provided you with development keys which you can use for testing.
        // IMPORTANT: Please replace them with your own OAuth keys for production use.
        Google({
            clientId: "1057946605180-qs85u96cga879b5m9baujt3rgr7u0r6a.apps.googleusercontent.com",
            clientSecret: ""
        }),
        Facebook({
            clientSecret: "7e43c28b5bc3b374d0b9a98de5e31886",
            clientId: "1046716159361993"
        })
    ]

    }),
    Session.init(), // initializes session features
  ],
});

app.use(cors({
  origin: "http://localhost:3000",
  allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
  credentials: true,
}));

// IMPORTANT: CORS should be before the below line.
app.use(middleware());
app.use(express.json());

// api routes


app.use(errorHandler())

// your own error handler
// app.use((err, req: express.Request, res: express.Response, next: express.NextFunction) => {
//     // Your error handler logic
// });

app.listen(apiPort, () => console.log("App running"))
