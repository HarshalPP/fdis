import { CategorySeq } from '../../models';
import { queryBuilderGetList } from './query-builder'
import { listInitOptions } from '../../utils/paginate'


async function findById(id) {
  return CategorySeq.findByPk(id, {
    include: ['UserClient']
  })
}

async function findOne(query) {
  return CategorySeq.findOne({
    where: {
      ...query
    },
    include: ['UserClient']
  });
}

async function create(body) {
  return CategorySeq.create(body)
}

async function updateOne(query, body) {
  return CategorySeq.update(body, { where: { ...query } })
}

const findAll = async (request) => {
  return CategorySeq.findAndCountAll({
    include: ['UserClient']
  })
}

async function countDocuments(query) {
  return CategorySeq.count(query)
}

const destroy = async (id) => {
  return CategorySeq.destroy({ where: { ID: id } })
}


export default {
  findById,
  findAll,
  create,
  findOne,
  updateOne,
  countDocuments,
  destroy
}
