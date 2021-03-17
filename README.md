# test-s3-multipart-upload


UoM S3 storage doesn't play well with AWS v3 JS SDK multi part upload.

## Set up dependencies

> npm install

## Set up the required variables

Edit the script `test-s3-multipart-upload.js` set the var's at the top:
```
// Uncomment to test against fake UoM S3
/*
const S3_BUCKET="";
const S3_ENDPOINT="https://objects.storage.unimelb.edu.au";
const S3_ACCESS_KEY_ID="";
const S3_SECRET_ACCESS_KEY="";
const REGION="ap-southeast-2";
*/
```

or to test against real S3
```
// Uncomment to test against real AWS S3
const S3_BUCKET="";
const S3_ENDPOINT="https://s3-ap-southeast-2.amazonaws.com";
const S3_ACCESS_KEY_ID="";
const S3_SECRET_ACCESS_KEY="";
const REGION="ap-southeast-2";
```

## Run it

> node ./test-s3-multipart-upload.js

## Results running against UoM fake S3

```
debian@modern-pdsc:~/src/test$ node test-s3-multipart-upload.js
{
  loaded: 314,
  total: 314,
  part: 1,
  Key: 'motd',
  Bucket: '1190_pdsc_2020'
}
*** MalformedXML: MalformedXML
    at deserializeAws_restXmlCompleteMultipartUploadCommandError (/home/debian/src/test/node_modules/@aws-sdk/client-s3/dist/cjs/protocols/Aws_restXml.js:4170:41)
    at processTicksAndRejections (internal/process/task_queues.js:93:5)
    at async /home/debian/src/test/node_modules/@aws-sdk/middleware-serde/dist/cjs/deserializerMiddleware.js:6:20
    at async /home/debian/src/test/node_modules/@aws-sdk/middleware-signing/dist/cjs/middleware.js:12:24
    at async StandardRetryStrategy.retry (/home/debian/src/test/node_modules/@aws-sdk/middleware-retry/dist/cjs/defaultStrategy.js:56:46)
    at async /home/debian/src/test/node_modules/@aws-sdk/middleware-logger/dist/cjs/loggerMiddleware.js:6:22
    at async Upload.__doMultipartUpload (/home/debian/src/test/node_modules/@aws-sdk/lib-storage/dist/cjs/Upload.js:104:41)
    at async Upload.done (/home/debian/src/test/node_modules/@aws-sdk/lib-storage/dist/cjs/Upload.js:45:16)
    at async /home/debian/src/test/test-s3-multipart-upload.js:61:17 {
  Code: 'MalformedXML',
  BucketName: '1190_pdsc_2020',
  RequestId: 'tx0000000000000003e0a39-00605154ab-82cc3b0-unimelb-qh2',
  HostId: '82cc3b0-unimelb-qh2-unimelb',
  '$fault': 'client',
  '$metadata': {
    httpStatusCode: 400,
    requestId: undefined,
    extendedRequestId: undefined,
    cfId: undefined,
    attempts: 1,
    totalRetryDelay: 0
  }
}
```

## Results running against real S3

```
debian@modern-pdsc:~/src/test$ node test-s3-multipart-upload.js
{
  loaded: 314,
  total: 314,
  part: 1,
  Key: 'motd',
  Bucket: 'ai.inteja.paradisec-tests'
}
```

## Using v2 sdk

No issues with either endpoint.
