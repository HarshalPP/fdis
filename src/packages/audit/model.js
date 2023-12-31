import { DataTypes } from 'sequelize'
import { dbConfig } from '../../init/db'
import { UserClientSeq, BuildingSeq, BranchSeq } from '../../models'


const AuditSeqFactory = () => {
  return dbConfig.define(
    'Audits',
    {
      AuditCode: {
        type: DataTypes.INTEGER
      },
      Date: {
        type: DataTypes.DATE(3)
      },
      IsActive: {
        type: DataTypes.BOOLEAN
      },
      IsDone: {
        type: DataTypes.BOOLEAN
      },
      Id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      Type: {
        type: DataTypes.STRING
      },
      NameClient_Id: {
        type: DataTypes.STRING
      },
      LocationClient_Id: {
        type: DataTypes.STRING
      },
      Branch_Id: {
        type: DataTypes.STRING,
        allowNull:true
      },
      PresentClient: {
        type: DataTypes.TEXT,
        allowNull:true
      },
      Attn: {
        type: DataTypes.TEXT,
      },
      week: {
        type: DataTypes.INTEGER,
      },
      LastControlDate: {
        type: DataTypes.DATE
      },
      Activate: {
        type: DataTypes.BOOLEAN
      },
      LocationManagerSignImage: {
        type: DataTypes.STRING,
        foreignKey: true
      },
      AuditHash: {
        type: DataTypes.STRING.BINARY,
      }
    },
    {
      timestamps: false,
      tableName: 'Audits'
    }
  )
};


const AuditSeq = AuditSeqFactory()

setTimeout(() => {
  AuditSeq.belongsTo(UserClientSeq, {
    as: 'Users_Client',
    foreignKey: 'NameClient_Id'
  })

  // // for tempery used only
  // AuditSeq.hasMany(UserClientSeq, {
  //   as: 'AuditUrl',
  //   foreignKey: 'URLClientPortal'
  // })


  AuditSeq.belongsTo(BuildingSeq, {
    as: 'Location',
    foreignKey: 'LocationClient_Id'
  })
  
  AuditSeq.belongsTo(BranchSeq, {
    as: 'Branches',
    foreignKey: 'Branch_Id'
  })
}, 0)


export default AuditSeq