import express from 'express';
import multer from 'multer';
import controller from './controller';
import AWS from 'aws-sdk';
import { newperformerseq } from '../../models';
import dotenv from 'dotenv';
const bcrypt = require('bcrypt');

const router = express.Router();
dotenv.config();

// Configure AWS
AWS.config.update({
  region: 'eu-central-1',
  accessKeyId: 'AKIASHWNAZJVBVBGCWIL',
    secretAccessKey: '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',
});
const S3 = new AWS.S3();

// Configure Multer
const upload = multer({
  limits: {
    fileSize: 1024 * 1024 * 5, // Limit file size to 5MB
  },
  fileFilter: (req, file, done) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedMimeTypes.includes(file.mimetype)) {
      done(null, true);
    } else {
      done(new Error('Unsupported file format. Only JPEG, PNG, and JPG formats are allowed.'), false);
    }
  },
});

// Function to upload to S3
const uploadToS3 = (fileData) => {
  const params = {
    Bucket: 'performer-logo',
    Key: `${Date.now().toString()}.png`,
    Body: fileData,
  };

  return new Promise((resolve, reject) => {
    S3.upload(params, (err, data) => {
      if (err) {
        console.error('Error uploading image to S3:', err);
        reject(err);
      } else {
        console.log('S3 Upload Result:', data);
        resolve(data);
      }
    });
  });
};

// Route to handle image upload and data insertion
router.post('/Performer', upload.single('image'), async (req, res) => {
  try {

       // Hash the Password and PasswordSalt
       let hashedPassword=await bcrypt.hash(req.body.Password,10);
       let hashedPasswordSalt=await bcrypt.hash(req.body.PasswordSalt,10);
    if (!req.file) {
      return res.status(400).json({ message: 'Image not provided' });
    }

    const s3UploadResult = await uploadToS3(req.file.buffer);

    //  Check if the UserName already exists in the database
    const existingUserName = await newperformerseq.findOne({
      where: { UserName: req.body.UserName },
    });

    if (existingUserName) {
      return res.status(400).json({ message: 'UserName  already exists' });
      
    }
    
    let ApplicationId = '04B61B6C-DB3B-49DB-B854-42F3654AD0D2';
    let AdminId = '3CAE92A2-6F11-4BC8-8F7D-F0E7057C63B7';
    let date = new Date();
    const newperformerData = {
            UserName: req.body.UserName,
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            Email: req.body.Email,
            LoweredEmail: req.body.LoweredEmail,
            Mobile: req.body.Mobile,
            Phone: req.body.Phone,
            IsAnonymous: req.body.IsAnonymous,
            IsApproved: req.body.IsApproved,
            IsLockedOut: req.body.IsLockedOut,
            Count: req.body.Count,
            Ordinal: req.body.Ordinal,
            ReportType: req.body.ReportType,
            Password: hashedPassword,
            PasswordSalt: hashedPasswordSalt,
            CreateDate: date.toISOString(),
            CompanyName: req.body.CompanyName,
            ClientId: req.body.ClientId,
            ApplicationId: ApplicationId,
            AdminId:AdminId,
            ProfileImage: s3UploadResult.Location,
            PerformerTypes_Id: req.body.PerformerTypes_Id
          
    };

    await newperformerseq.create(newperformerData); // Use .create() to insert data
    res.status(200).json({
      message: 'File uploaded and data inserted successfully',
      ProfileImage: s3UploadResult.Location,
      data: newperformerData,
    });
    return newperformerData;
  } catch (error) {
    console.error('Error uploading image and creating data:', error);
    res.status(500).json({
      error: 'An error occurred while processing the request',
    });
  }
});



router.post('/',controller.create)
router.patch('/:id', controller.update)
router.get('/', controller.index)
router.get('/index', controller.indexx)
router.get('/:id', controller.show)
router.delete('/:id', controller.deleteRecord)
router.patch('/Password/:id', controller.UpdatePass)

export default router