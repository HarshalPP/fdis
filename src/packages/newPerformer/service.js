import repo from './repository'
import { commonLocale } from '../../locales'
import { defaultMaxListeners } from 'winston-daily-rotate-file'

async function show(id) {
    return repo.findById(id)
  }



async function update(Id,body){
    await repo.updateOne({Id:Id},body)
}

 
   
   // service.js
async function UpdatePass(Id, body) {
    await repo.UpdatePassword({ Id: Id }, body);
    
  }
  

  async function indexx(query) {
    return repo.findAll(query)
  }

       //Find data
  async function index(query) {
    return repo.rawQueryList(query)
  }

  async function destroy(id) {
    return repo.destroy(id)
  }
  
  export default {
    show,
    update,
    UpdatePass,
    indexx,
    index,
    destroy
  }