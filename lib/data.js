import fs from 'fs'
import path from 'path'

function dataFile(filename){
  return path.join(process.cwd(), 'data', filename)
}

export function readJSON(filename){
  const p = dataFile(filename)
  try{
    const raw = fs.readFileSync(p, 'utf8')
    return JSON.parse(raw)
  }catch(e){
    return null
  }
}

export function writeJSON(filename, obj){
  const p = dataFile(filename)
  fs.writeFileSync(p, JSON.stringify(obj, null, 2), 'utf8')
  return obj
}
