const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// PUT YOUR EXNESS TOKEN HERE
const EXNESS_TOKEN = process.env.EXNESS_TOKEN;

app.post("/verify", async (req, res) => {

    const email = req.body.email;

    if (!email) {
        return res.json({
            status: "error",
            message: "Email required"
        });
    }

    try {

        const response = await axios.post(
            "https://my.exnessaffiliates.com/api/partner/affiliation/",
            {
                email: email
            },
            {
                headers: {
                    Authorization: `JWT ${EXNESS_TOKEN}`,
                    "Content-Type": "application/json"
                }
            }
        );

        const data = response.data;
        console.log("EXNESS FULL RESPONSE:", JSON.stringify(data, null, 2));

        console.log("EXNESS RESPONSE:", data);

        // Correct field from API
        if (data.affiliation === true) {

            res.json({
                status: "approved",
                accounts: data.accounts,
                client_uid: data.client_uid
            });

        } else {

            res.json({
                status: "not_found"
            });

        }

    } catch (error) {

        console.log("EXNESS ERROR:", error.response?.data || error.message);

        res.json({
            status: "error"
        });

    }

});

// require("./telegrambot");

const PORT = process.env.PORT || 3000;
require("./telegrambot");
app.listen(PORT, () => {
    console.log(`Verification server running on port ${PORT}`);
});
