// import { sendmailseq } from '../../models';
// import { queryBuilderGetList } from './query-builder';
// import { listInitOptions } from '../../utils/paginate';
// import { Sequelize } from 'sequelize';
// import sgMail from '@sendgrid/mail';

// // Set your SendGrid API token directly
// const sendgridApiKey = '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 ';
// sgMail.setApiKey(sendgridApiKey);

// async function create(body) {
//   try {
//     // Log the body data
//     console.log('Data before creating the record:', body);

//     // Create the record using sendmailseq.create
//     const createdRecord = await sendmailseq.create(body);

//     // Send an email using SendGrid
//     const msg = {
//       to: 'harshal.brilliance@gmail.com', // Change this to the recipient's email
//       from: 'harshal.coderfarm@gmail.com', // Change this to your verified sender email
//       subject: 'Quality Check',
//       text: 'fdis',
//       html: '<p>Mr/Madam, The Reporting of the  Performed Quality Control of the Location</p>',
//     };

//     // Send the email
//     const response = await sgMail.send(msg);

//     // Log the response from SendGrid
//     console.log('SendGrid Response:', response);

//     return createdRecord;
//   } catch (error) {
//     // Handle any errors that might occur during record creation
//     console.error('Error creating record:', error);
//     throw error; // Re-throw the error to be caught by the caller
//   }
// }

// export default {
//   create,
// };


import { sendmailseq } from '../../models';
import { queryBuilderGetList } from './query-builder';
import { listInitOptions } from '../../utils/paginate';
import { Sequelize } from 'sequelize';
import sgMail from '@sendgrid/mail';

// Set your SendGrid API token directly
const sendgridApiKey = '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 ';
sgMail.setApiKey(sendgridApiKey);

async function create(body, subject,Text,html) {
  try {
    // Log the body data
    console.log('Data before creating the record:', body);

    // Create the record using sendmailseq.create
    const createdRecord = await sendmailseq.create(body,subject,Text,html);

    // Send an email using SendGrid
    const msg = {
      to: 'dhananjay.brilliance@gmail.com', // Change this to the recipient's email
      from: 'harshal.coderfarm@gmail.com', // Change this to your verified sender email
      subject: subject,
      text: Text,
      html: html,
    };

    // Send the email
    const response = await sgMail.send(msg);

    // Log the response from SendGrid
    console.log('SendGrid Response:', response);

    return createdRecord;
  } catch (error) {
    // Handle any errors that might occur during record creation
    console.error('Error creating record:', error);
    throw error; // Re-throw the error to be caught by the caller
  }
}

export default {
  create,
};

