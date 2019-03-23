// Random time in ms that simulates time needed to get a response from API
function randomizeTime() {
  return Math.round(Math.random() * 500) + 500
}

/*
 * List latest available collections
 */
function listCollections(page = 1, perPage = 10, orderBy = 'latest') {
  const timeout = randomizeTime()
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const result = import('./dummy-data/collections/results.json')
          .then(result => result.default)
          .catch(err => new Error(err))
        resolve(result)
      } catch (error) {
        reject(new Error('No collections available. ' + error))
      }
    }, timeout)
  })
}

/*
 * Return array of photos within given collection
 */
function getCollectionPhotos(
  id = 162326,
  page = 1,
  perPage = 10,
  orderBy = 'latest',
) {
  const timeout = randomizeTime()
  id += ''

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const result = import('./dummy-data/collections/' + id + '/photos.json')
          .then(result => result.default)
          .catch(err => new Error(err))
        resolve(result)
      } catch (error) {
        reject(new Error('This collection does not exist. ' + error))
      }
    }, timeout)
  }).then(result => {
    let j = page * perPage
    let i = j - perPage
    i = Math.max(0, i)
    j = Math.max(0, j)
    return result.slice(i, j)
  })
}

// Array of existing dummy photo data
let dummyPhotos = [
  '-Keh6vLM7w0',
  'd1WGcyc_HWw',
  'Dfp83V_oSaE',
  'dsEx5fHGPS4',
  'eBEgsWBcPBU',
  'm6Cg9ouJol0',
  'pIIGZG3jBzI',
  'pNishtSCpxc',
  'vTkam84Z20c',
  'xGZXqTE4n64',
]

/*
 * Return detailed data about photo with given ID
 */
function getPhoto(id = 'Dfp83V_oSaE') {
  id += ''
  const timeout = randomizeTime()

  if (!dummyPhotos.includes(id)) {
    const index = Math.floor(Math.random() * dummyPhotos.length)
    id = dummyPhotos[index]
  }

  let response = new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const result = import('./dummy-data/photos/' + id + '/result.json')
          .then(result => result.default)
          .catch(err => new Error(err))
        resolve(result)
      } catch (error) {
        reject(new Error('No such photo found. ' + error))
      }
    }, timeout)
  })
  return response
}

function toJson(res) {
  return typeof res.json === 'function' ? res.json() : res
}

export const unsplash = {
  toJson: toJson,
  collections: {
    listCollections: listCollections,
    getCollectionPhotos: getCollectionPhotos,
  },
  photos: {
    getPhoto: getPhoto,
  },
}
