import got from "got";

export const getConfig = async (html) => {
  if (typeof html !== "string") throw new TypeError("'html' isn't string");
  const regex = new RegExp(/ilovepdfconfig\s+\=\s+(.*)/, "i");
  try {
    return JSON.parse(html.match(regex)?.at(1)?.replace(/\;/g, ""));
  } catch {
    return {};
  }
};

/**
 * @param {string} tool Ilovepdf tool
 * @return {boolean}
 */
export const validateTool = (tool) => {
  return [
    "merge",
    "split",
    "compress",
    "pdfjpg",
    "imagepdf",
    "unlock",
    "pagenumber",
    "watermark",
    "officepdf",
    "repair",
    "rotate",
    "protect",
    "pdfa",
    "htmlpdf",
  ].includes(tool.toLowerCase());
};
