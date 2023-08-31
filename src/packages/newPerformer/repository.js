import { Sequelize } from 'sequelize';
import {UserClientSeq, newperformerseq} from '../../models'
// import { queryBuilderGetList } from './query-builder'
import { listInitOptions } from '../../utils/paginate'
import bcrypt from 'bcrypt';
import { orderBy } from 'lodash';

// find by Id

async function findById(id){
    return newperformerseq.findByPk(id,{

    })
}

// findone

async function findOne(query){
    return newperformerseq.findOne({
        where:{
            ...query
        }
    })
}

async function updateOne(query,body){
    return newperformerseq.update(body,{
        where:{
            ...query
        }
    })
}


// repository.js
async function UpdatePassword(query, body) {
    try {
      // Hash the new password
      let saltRounds = 10;
      let myPlaintextPassword = body.PasswordSalt;
      const hashedPassword = await bcrypt.hash(myPlaintextPassword, saltRounds); // Adjust salt rounds as needed
  
      // Find the user by Id
      const user = await newperformerseq.findOne({ where: { ...query } });
  
      if (!user) {
        throw new Error(`User not found.`);
      }
  
      // Log the old and new passwords
      console.log('Old Password:', user.PasswordSalt);
      console.log('New Hashed Password:', hashedPassword);
  
      // Update the password in the database
      const updatedRows = await newperformerseq.update(
        { PasswordSalt: hashedPassword },
        { where: { ...query } }
      );
  
      if (updatedRows[0] === 0) {
        throw new Error('PasswordSalt not updated.');
      }
  
      return true; // Password updated successfully
    } catch (error) {
      console.error('Error updating PasswordSalt:', error);
      throw error;
    }
  }
  

// async function UpdatePassword(query, body) {
//     try {
//       // Hash the new password
//       let saltRounds = 10;
//       let myPlaintextPassword = body.PasswordSalt;
//       const hashedPassword = await bcrypt.hash(myPlaintextPassword, saltRounds); // Adjust salt rounds as needed
  
//       // Find the user by Id
//       const user = await newperformerseq.findOne({ where: { ...query } });
  
//       if (!user) {
//         throw new Error(`User not found.`);
//       }
  
//       // Log the old and new passwords
//       console.log('Old Password:', user.PasswordSalt);
//       console.log('New Hashed Password:', hashedPassword);
  
//       // Update the password in the database
//       const updatedRows = await newperformerseq.update(
//         { PasswordSalt: hashedPassword },
//         { where: { ...query } }
//       );
  
//       if (updatedRows[0] === 0) {
//         throw new Error('PasswordSalt not updated.');
//       }
  
//       return true; // Password updated successfully
//     } catch (error) {
//       console.error('Error updating PasswordSalt:', error);
//       throw error;
//     }
//   }
  

            // findAll the data //
  const findAll = async (request, response) => {
    try {
    //   const condition = queryBuilderGetList(request);
    //   const option = listInitOptions(request);
    //   option.raw = undefined;
    
      const result = await newperformerseq.findAndCountAll({
        where: condition,
        ...option,
        include: [''],
        order: [['', 'ASC']]
      });
    
      response.status(200).json(result);
    } catch (error) {
      response.status(500).json({ error: 'An error occurred' });
    }
  };
  

        // Find data in Another way //
const rawQueryList = async (request) => {
    return newperformerseq.findAndCountAll({
      attributes: {
        exclude: request.excludes,
        include: request.includes
      },
      include: [
        {
          model: UserClientSeq,
          as: 'Users_Client',
          where: request.ClientId? { Id: request.ClientId } : {},
          order:[['UserName','ASC']]
        },
    
      ]
    });
  };

             // Delete Data //

   const destroy = async (id) => {
    return newperformerseq.destroy({ where: { Id: id } })
  }
  



export default{
    findById,
    findOne,
    updateOne,
    UpdatePassword,
    findAll,
    rawQueryList,
    destroy
    
}

