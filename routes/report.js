const axios = require("axios");

// req.params,id exists or does not.
module.exports = async (req, res) => {
    const baseUrl = process.env.BASE_URL;
    // Normally we'd add a check here to see if we *really* need to request a new token.
    // Not doing here for time constraints.

    const tokenResp = await axios.post(process.env.OAUTH_ENDPOINT,
        {
            grant_type: process.env.GRANT_TYPE,
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET
        },
    );

    const token = tokenResp.data.access_token;

    const hasId = "undefined" !== typeof req.params.id

    const url = hasId ? baseUrl + "/" + req.params.id : baseUrl;
    const method = hasId ? "get" : "post"

    const proxyResp = await axios({
        method: method, // no shorthand in es5
        url: url,
        headers: {
            Authorization: "Bearer " + token
        }
    })

    // We would do some filtering here but for time constraints this corner is being cut
    res.json(proxyResp.data);
}