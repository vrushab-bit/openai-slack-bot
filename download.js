const axios = require("axios");

const downloadFile = async (fileUrl, filename) => {
  try {
    const downloadResponse = await axios.get(fileUrl, {
      headers: {
        Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}`,
      },
      responseType: "blob",
    });

    const filePath = `downloads/${filename}`;
    const fs = require("fs");
    fs.writeFileSync(filePath, downloadResponse.data, "binary");
    console.log(`Downloaded file: ${filename}`);
  } catch (error) {
    console.error("Error downloading file:", error);
  }
};

module.exports = downloadFile;
