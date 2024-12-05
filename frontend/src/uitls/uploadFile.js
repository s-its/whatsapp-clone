// const AWS = require('aws-sdk');
import axios from "axios";

// const s3 = new AWS.S3({
//   endpoint: process.env.REACT_APP_BUCKET_ENDPOINTS,
//   accessKeyId: 'minioadmin',
//   secretAccessKey: 'minioadmin',
//   s3ForcePathStyle: true, // Required for MinIO
// });

const uploadFile = async (file) => {
  const fileName = file.name; // Use the file name for the key
  const minioUrl = `${process.env.REACT_APP_BUCKET_ENDPOINTS}/${process.env.REACT_APP_BUCKET_NAME}/${fileName}`;
  console.log("URL: ", `${process.env.REACT_APP_BUCKET_ENDPOINTS}/${process.env.REACT_APP_BUCKET_NAME}/${fileName}`);

  try {
    const response = await axios.put(minioUrl, file, {
      headers: {
        "Content-Type": file.type, // Set the MIME type of the file
        // Authorization: "AWS4-HMAC-SHA256 Credential=minioadmin/20241202/us-east-1/s3/aws4_request, SignedHeaders=host;x-amz-date, Signature=<calculated-signature>",
      },
    });

    if (response.status === 200) {
      return `${process.env.REACT_APP_BUCKET_ENDPOINTS}/${process.env.REACT_APP_BUCKET_NAME}/${fileName}`
    }
  } catch (error) {
    console.error("Error uploading file:", error);
    return "";
  }


};

export default uploadFile;