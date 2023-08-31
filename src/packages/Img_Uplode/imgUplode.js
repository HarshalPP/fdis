require('dotenv').config()
const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')
const path = require('path');
import {ImageSqe} from '../../models';

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey
})

// uploads a file to s3
function uploadFile(file) {
  const fileStream = fs.createReadStream(file.path)
   const file_original = file.originalname
   const Extention=path.extname(file_original);
   const Mimetype=file.mimetype;
   const ImageDataLocation=file.path+`${Extention}`
   console.log(`Mimetype =  ${Mimetype}`)
   console.log(`ImageData Location = ${ImageDataLocation}`)
   const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename
   }
   s3.upload(uploadParams).promise()
}
exports.uploadFile = uploadFile


// downloads a file from s3
function getFileStream(fileKey) {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName
  }

  return s3.getObject(downloadParams).createReadStream()
}
exports.getFileStream = getFileStream