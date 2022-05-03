import isJpg from "is-jpg";
import sharp from "sharp";

const convertToJpg = async (input) => {
  if (isJpg(input)) {
    return input;
  }
  return sharp(input).jpeg().toBuffer();
};

export default convertToJpg;
