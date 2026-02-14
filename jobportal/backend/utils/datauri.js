import DataUriParser from "datauri/parser.js";
import path from "path";

/**
 * Converts an uploaded file (buffer) into a Data URI string.
 * This is commonly used to upload files directly to services like Cloudinary
 * without saving them to disk first.
 *
 * @param {Object} file - File object (usually from multer)
 * @param {string} file.originalname - Original filename (used to detect extension)
 * @param {Buffer} file.buffer - File data in memory
 * @returns {string} - Data URI string (base64 encoded)
 */
const getDataUri = (file) => {
  // Create Data URI parser instance
  const parser = new DataUriParser();

  // Extract file extension (e.g., .png, .jpg) from original file name
  const extName = path.extname(file.originalname).toString();

  // Convert buffer to Data URI format: data:image/png;base64,xxxx
  return parser.format(extName, file.buffer);
};

export default getDataUri;
