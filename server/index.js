const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.post("/compile", async (req, res) => {
  try {
    const { code, language, input } = req.body;

    // Map language to its corresponding code
    const languageMap = {
      python: "py",
      // Add more mappings as needed
    };

    const mappedLanguage = languageMap[language] || language;

    const data = new URLSearchParams();
    data.append("code", code);
    data.append("language", mappedLanguage);
    data.append("input", input);

    const config = {
      method: "post",
      url: "https://api.codex.jaagrav.in",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    const response = await axios(config);

    res.send(response.data);
    console.log(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
