// vim: noai: ts=2 et

const {
  S3Client,
} = require("@aws-sdk/client-s3");
const { Upload } = require("@aws-sdk/lib-storage");
const { createReadStream } = require('fs-extra');

const localPath = '/etc/motd'

// Uncomment to test against fake UoM S3
/*
const S3_BUCKET="";
const S3_ENDPOINT="https://objects.storage.unimelb.edu.au";
const S3_ACCESS_KEY_ID="";
const S3_SECRET_ACCESS_KEY="";
const REGION="ap-southeast-2";
*/

// Uncomment to test against real AWS S3
const S3_BUCKET="";
const S3_ENDPOINT="https://s3-ap-southeast-2.amazonaws.com";
const S3_ACCESS_KEY_ID="";
const S3_SECRET_ACCESS_KEY="";
const REGION="ap-southeast-2";

(async () => {
    const configuration = {
      endpoint: S3_ENDPOINT,
      credentials: {
        accessKeyId: S3_ACCESS_KEY_ID,
        secretAccessKey: S3_SECRET_ACCESS_KEY
      },
      region: REGION
    }
    const client = new S3Client(configuration);


    const fileStream = createReadStream(localPath);
    fileStream.on("error", function (err) {
      console.log("File Error", err);
    });

    const params = {
      Bucket: S3_BUCKET,
      Key: 'motd',
      Body: fileStream
    };

    let response;
    try {
    	const uploader = new Upload({
      	client: client,
      	params: params,
    	});

    	uploader.on("httpUploadProgress", (progress) => {
        console.log(progress);
    	});

    	response = await uploader.done();
    } catch(error) {
      console.log('***', error)
    }

})()
