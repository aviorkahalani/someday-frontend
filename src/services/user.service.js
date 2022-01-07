import { httpService } from './http.service'
import axios from 'axios'

export const userService = {
  login,
  setLoggedinUser,
  logout,
  signup,
  getUsers,
  getById,
  removeActivities,
  getLoggedinUser,
  uploadImg,
}

window.userService = userService

function getUsers() {
  // return storageService.query('user')
  // return httpService.get(`user`)
}

function getById(userId) {
  return httpService.get(`user/${userId}`)
}

async function removeActivities(activity) {
  return await httpService.put('activity/remove', activity)
}

async function login(userCred) {
  try {
    return await httpService.post('auth/login', userCred)
  } catch (err) {
    console.log('Error loging in...', err)
    throw err
  }
}
async function signup(userCred) {
  try {
    return await httpService.post('auth/signup', userCred)
  } catch (err) {
    console.log('Error loging in...', err)
    throw err
  }
}
async function logout() {
  sessionStorage.clear()
  return await httpService.post('auth/logout')
}

function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem('loggedinUser') || 'null')
}

async function uploadImg(ev) {
  // Defining our variables
  const CLOUD_NAME = 'rachelmistertoy' // Insert yours
  const UPLOAD_PRESET = 'oa9nnanl' // Insert yours
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

  const FORM_DATA = new FormData()
  // Building the request body
  FORM_DATA.append('file', ev.target.files[0])
  FORM_DATA.append('upload_preset', UPLOAD_PRESET)

  try {
    const res = await axios.post(UPLOAD_URL, FORM_DATA)
    return res.data
  } catch (err) {
    console.error('ERROR!', err)
  }
}

function setLoggedinUser(user) {
  sessionStorage.setItem('loggedinUser', JSON.stringify(user))
  return user
}
