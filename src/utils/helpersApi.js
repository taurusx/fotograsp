import { toJson } from 'unsplash-js'

import { mergeDeep } from './mergeDeep'

/*
 * Return Promise that resolves to latest Unsplash API collections
 * ('latest' and '5' results are set imperatively here)
 */
function getCollections(unsplash) {
  let collectionsArray = []
  return new Promise((resolve, reject) => {
    unsplash.collections
      .listCollections(1, 6, 'latest')
      .then(toJson)
      .then(json => {
        collectionsArray = json
        resolve(collectionsArray)
      })
      .catch(err => reject(new Error(err)))
  })
}

/*
 * Return Promise that resolves to array of photos in a collection
 */
function getPhotos(unsplash, id, page, perPage, orderBy = 'latest') {
  let photosArray = []
  return new Promise((resolve, reject) => {
    unsplash.collections
      .getCollectionPhotos(id, page, perPage, orderBy)
      .then(toJson)
      .then(json => {
        photosArray = json
        resolve(photosArray)
      })
      .catch(err => reject(new Error(err)))
  })
}

/*
 * Return Promise that resolves to photo details
 * Only use required id parameter, no width and height
 */
function getSinglePhoto(unsplash, id) {
  let photo = {}
  return new Promise((resolve, reject) => {
    unsplash.photos
      .getPhoto(id)
      .then(toJson)
      .then(json => {
        photo = json
        resolve(photo)
      })
      .catch(err => reject(new Error(err)))
  })
}

/*
 * Return an array with latest collections' most important details
 */
function filterCollectionsDetails(collectionsArray = []) {
  let collectionsDetails = []
  collectionsArray.forEach(collection => {
    const { id, title, total_photos, links, preview_photos } = collection
    const { html } = links
    const slug = html.match('(?:[^/])*$')[0]
    let current = { id, title, total_photos, html, slug, preview_photos }
    collectionsDetails.push(current)
  })
  return collectionsDetails
}

/*
 * Return an array with single collection photos details
 */
function filterPhotosDetails(photosArray = []) {
  let photosDetails = []
  photosArray.forEach(photo => {
    const { id, color, urls, likes, description, user } = photo
    delete urls.raw
    delete urls.full
    let current = { id, color, urls, likes, description, user }
    photosDetails.push(current)
  })
  return photosDetails
}

/*
 * Return an array with single photo details
 */
function filterSinglePhotoDetails(photo = {}) {
  let emptyDetails = {}
  const {
    alt_description,
    downloads,
    exif,
    id,
    likes,
    links,
    location,
    urls,
    user,
    views,
  } = photo
  delete urls.raw
  delete urls.full

  let photoDetails = Object.assign(emptyDetails, {
    alt_description,
    downloads,
    exif,
    id,
    likes,
    links,
    location,
    urls,
    user,
    views,
  })
  return photoDetails
}

function addPhotosFromArray(array, photosState, setPhotosStateHookFn) {
  let newRecords = {}
  array.forEach(photo => {
    const { id } = photo
    newRecords[id] = photo
  })
  return setPhotosStateHookFn(mergeDeep(photosState, newRecords))
}

function addSinglePhoto(photoObject, photosState, setPhotosStateHookFn) {
  let newRecord = {}
  const { id } = photoObject
  newRecord[id] = photoObject
  return setPhotosStateHookFn(mergeDeep(photosState, newRecord))
}

export {
  getCollections,
  getPhotos,
  getSinglePhoto,
  filterCollectionsDetails,
  filterPhotosDetails,
  filterSinglePhotoDetails,
  addPhotosFromArray,
  addSinglePhoto,
}
