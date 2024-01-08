const fs = require("fs-extra");
const path = require("path");
const sharp = require("sharp");

async function stripRotation(filePath) {
  console.log(`Processing inside strip ${filePath}`);
  const mainImage = sharp(filePath, {
    limitInputPixels: false,
    failOnError: false,
  });
  mainImage.jpeg({ quality: 98, chromaSubsampling: "4:4:4" });
  return mainImage.toBuffer();
}

const stripRotationData = async (outputFolder) => {
  const destinationFolder = path.join(outputFolder, "originals");

  const files = fs.readdirSync(destinationFolder);

  for (const file of files) {
    console.log(`Processing ${file}`);
    const filePath = path.join(destinationFolder, file);
    // eslint-disable-next-line no-await-in-loop
    const buffer = await stripRotation(filePath);
    fs.outputFileSync(filePath, buffer);
  }
};

stripRotationData("./images");
