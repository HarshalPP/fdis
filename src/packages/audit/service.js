import repo from './repository'
import { commonLocale } from '../../locales'
import userClientRepo from '../userClient/repository'

async function create(body) {
  return repo.create(body)
}

async function update(id, body) {
  await repo.updateOne({ Id: id }, body)
  return show(id)
}

async function index(query) {
  return repo.findAll(query)
}

async function uploadImageById(id, imageBase64) {
  return repo.uploadImageById(id, imageBase64);
}


async function show(id) {
  return repo.findById(id)
}

async function destroy(id) {
  return repo.destroy(id)
}

async function destroyAll() {
  return repo.destroyAll();
}



// async function destroy(id) {
//   const elementType = await repo.findById(id)
//   if (elementType && elementType.UserClient && elementType.UserClient.length) {
//     elementType.UserClient.map(m => m.removeCategory(elementType))
//   }
//   return repo.destroy(id)
// }

async function indexJoin(query) {
  return userClientRepo.findAllJoin(query)
}

async function locationbyclient(body){
  return repo.findAllLocations(body)
}


async function findallaudit(query) {
  return repo.findallaudit(query)
}

export default {
  create,
  index,
  show,
  update,
  destroy,
  destroyAll,
  indexJoin,
  locationbyclient,
  findallaudit,
  uploadImageById
}
