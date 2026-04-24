const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ⚠️ MOVE TOKEN TO ENV VARIABLE
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
            { email },
            {
                headers: {
                    Authorization: `JWT ${EXNESS_TOKEN}`,
                    "Content-Type": "application/json"
                }
            }
        );

        const data = response.data;

        if (data.affiliation === true) {

            return res.json({
                status: "approved",
                accounts: data.accounts || []
            });

        } else {

            return res.json({
                status: "not_found"
            });

        }

    } catch (error) {

        return res.json({
            status: "error"
        });

    }

});

// REMOVE THIS if not needed (can break deployment)
// require("./telegrambot");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});