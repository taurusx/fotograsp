/*
 * Return Promise that resolves to latest Unsplash API collections
 * ('latest' and '5' results are set imperatively here)
 */
function getCollections(unsplash) {
  let collectionsArray = []
  return new Promise((resolve, reject) => {
    unsplash.collections
      .listCollections(1, 5, 'latest')
      .then(unsplash.toJson) // todo: original API without 'unsplash'
      .then(json => {
        collectionsArray = json.default
        resolve(collectionsArray) // todo: original API without 'default'
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
      .then(unsplash.toJson) // todo: original API without 'unsplash.'
      .then(json => {
        photosArray = json
        resolve(photosArray) // todo: check if json or array from api
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
      .then(unsplash.toJson) // todo: original API without 'unsplash.'
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
function parseCollectionsDetails(collectionsArray = []) {
  let collectionsDetails = []
  collectionsArray.forEach(collection => {
    const { id, title, total_photos, links } = collection
    const { html } = links
    const slug = html.match('(?:[^/])*$')[0]
    let current = { id, title, total_photos, html, slug }
    collectionsDetails.push(current)
  })
  return collectionsDetails
}

/*
 * Return an array with single collection photos details
 */
function parsePhotosDetails(photosArray = []) {
  let photosDetails = []
  photosArray.forEach(photo => {
    const { id, color, urls, likes, description } = photo
    delete urls.raw
    delete urls.full
    let current = { id, color, urls, likes, description }
    photosDetails.push(current)
  })
  return photosDetails
}

/*
 * Return an array with single photo details
 */
function parseSinglePhotoDetails(photo = {}) {
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

export {
  getCollections,
  getPhotos,
  getSinglePhoto,
  parseCollectionsDetails,
  parsePhotosDetails,
  parseSinglePhotoDetails,
}
