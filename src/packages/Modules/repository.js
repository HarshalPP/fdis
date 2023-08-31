import { ErrorCategory } from '../../models';
import { Modules , ElementSeq,ElementTypeSeq } from '../../models';
import { Sequelize } from 'sequelize';
import { UserSeq,SuperPerformer} from '../../models';
import { queryBuilderGetList } from './query-builder'
import { listInitOptions } from '../../utils/paginate'
import method from './method'

import{ Table } from 'mssql';
import { func } from 'joi';

// async function findAll(query) {
//   const raw='SELECT  * FROM [dbo].[Modules]'
//   return Modules.sequelize.query(raw, {
//     replacements:[],
//     type: Sequelize.QueryTypes.SELECT
//    })
// }

async function findById(id) {
  try {
    const module = await Modules.findOne({
      where: {
        id: id
      }
    });

    if (!module) {
      throw new Error('Module not found');
    }

    return module;

  } catch (error) {
    // Handle the error here
    console.error('Error fetching module by id:', error);
    throw error;
  }
}

async function create(body) {
  const createdModule = await Modules.create(body)
  return createdModule.get({ plain: true });
}


async function feedBack(body) {
  try {
    const createdModule = await Modules.create(body);

    // Convert the Sequelize object to plain JSON
    const moduleData = createdModule.toJSON();

    // Remove the unwanted properties
    delete moduleData.Name;
    delete moduleData.AreaName;

    return moduleData;
  } catch (error) {
    console.error('Error creating module:', error);
    throw error;
  }
}






async function findAll() {
  try {
    const modulesWithFeedback = await Modules.findAll({
      where: {
        name: {
          [Sequelize.Op.not]: null,
        },
      },
      attributes: ['Id', 'Name', 'AreaName'], // Include 'Feedback' column
    });
    return modulesWithFeedback;
  } catch (error) {
    console.error('Error fetching modules:', error);
    throw error;
  }
}



async function findAllJoin(query) {
  const raw='SELECT  * FROM [dbo].[Audits]'
  return Modules.sequelize.query(raw, {
    replacements:[],
    type: Sequelize.QueryTypes.SELECT
   })
}

async function feedback(query, body) {
  const rawQuery = `
    INSERT INTO ElementAudit (IdElement, IdAudit, ElementAuditComment, ElementAuditStatus)
    VALUES ('${body.IdElement}', '${body.IdAudit}', '${body.ElementAuditComment}', '${body.ElementAuditStatus}');
  `;

  try {
    const result = await Modules.sequelize.query(rawQuery, {
      type: Sequelize.QueryTypes.INSERT,
    });

    console.log('Insertion result:', result); // Log the insertion result
    return result;
  } catch (error) {
    console.error('Error inserting feedback:', error);
    throw error;
  }
}






export default {

findAll ,
findAllJoin,
feedback,
findById,
create,
feedBack

}
