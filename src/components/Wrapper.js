import React, { useState, useEffect, createContext } from 'react'
import styled from 'styled-components'
import { Switch, Route } from 'react-router-dom'
import Unsplash from 'unsplash-js'

import Header from './Header'
import Main from './Main'
import Collections from './Collections'
import Gallery from './Gallery'
import Photo from './Photo'
import Loading from './Loading'
import {
  getCollections,
  getPhotos,
  getSinglePhoto,
  filterCollectionsDetails,
  filterPhotosDetails,
  filterSinglePhotoDetails,
  addPhotosFromArray,
  addSinglePhoto,
} from '../utils/helpersApi'

const WrapperLayout = styled.div`
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const UNSPLASH_API_ACCESS = process.env.UNSPLASH_API_ACCESS
const UNSPLASH_API_SECRET = process.env.UNSPLASH_API_SECRET

const unsplash = new Unsplash({
  applicationId: UNSPLASH_API_ACCESS,
  secret: UNSPLASH_API_SECRET,
})

// Context to pass hooks that trigger photos loading in Gallery
export const PhotosLoadingContext = createContext([false, () => {}])

// Context to pass Photos details
export const PhotosDetailsContext = createContext([{}, () => {}])

const Wrapper = ({ children }) => {
  // Initial API request - collections data without photos details
  const [collectionsArray, setCollectionsArray] = useState([])
  const [jsonReady, setJsonReady] = useState(false)

  useEffect(() => {
    if (!jsonReady) {
      let a = getCollections(unsplash)
        .then(result => {
          let array = filterCollectionsDetails(result)
          setCollectionsArray(array)
          return array
        })
        .then(array => {
          array.forEach(collection => {
            addPhotosFromArray(
              collection.preview_photos,
              photosDetails,
              setPhotosDetails,
            )
          })
          return array
        })
        .then(() => setJsonReady(true))
        .catch(err => new Error(err))
    }
  }, [jsonReady])

  // API request for data of first group of photos from collections
  const [collectionsWithPhotos, setCollectionsWithPhotos] = useState([])
  const [initialPhotosReady, setInitialPhotosReady] = useState(false)

  useEffect(() => {
    if (collectionsArray.length > 0) {
      let collections = []
      let flag = 0
      collectionsArray.forEach((collection, index) => {
        const { id } = collection
        let currentCollection = { ...collection }
        const images = getPhotos(unsplash, id)
          .then(photos => {
            return filterPhotosDetails(photos)
          })
          .then(array => {
            addPhotosFromArray(array, photosDetails, setPhotosDetails)
            return array
          })
          .then(photos => {
            currentCollection.images = photos
            return currentCollection
          })
          .then(collection => {
            collections[index] = collection
            flag++
            setCollectionsWithPhotos(collections)
          })
          .then(() => {
            if (collectionsArray.length === flag) setInitialPhotosReady(true)
          })
          .catch(err => new Error(err))
      })
    }
  }, [collectionsArray.length])

  // Request Unsplash API for next page of photos
  const [photosLoading, setPhotosLoading] = useState({
    loading: false,
    ready: true,
    id: 0,
  })

  useEffect(() => {
    if (photosLoading['loading'] && photosLoading['ready']) {
      const id = photosLoading.id
      const index = collectionsWithPhotos.findIndex(
        nextCollection => nextCollection.id === id,
      )
      let collections = collectionsWithPhotos.slice(0)
      let currentCollection = collections[index]

      let { images, total_photos } = currentCollection
      const photosCount = images ? images.length : 0
      if (photosCount >= total_photos) {
        setPhotosLoading({ loading: false, ready: false, id: 0 })
        return
      }
      const perPage = 20
      const page = Math.ceil((photosCount + 1) / perPage)
      const skipResults = photosCount % perPage
      const photosNeeded = total_photos - photosCount

      const imagesRequest = getPhotos(unsplash, id, page, perPage)
        .then(photos => {
          if (photos.length === 0) {
            console.error(
              `No photos available from API with this query params: collection_id: ${id}, page: ${page}, perPage: ${perPage}.`,
            )
          }
          return photos
        })
        .then(photos => {
          return filterPhotosDetails(photos)
        })
        .then(photos => {
          const actualLength = photos.length
          const photosCut =
            perPage < photosNeeded ||
            actualLength === skipResults + photosNeeded
              ? photos.slice(skipResults)
              : photos.slice(
                  skipResults,
                  Math.min(skipResults + photosNeeded, perPage),
                )
          const updatedImages = images.concat(photosCut)
          return updatedImages
        })
        .then(array => {
          addPhotosFromArray(array, photosDetails, setPhotosDetails)
          return array
        })
        .then(updatedImages => {
          currentCollection.images = updatedImages

          collections[index] = currentCollection
          setCollectionsWithPhotos(collections)
        })
        .then(() => setPhotosLoading({ loading: false, ready: true, id: 0 }))
        .catch(err => new Error(err))
    }
  }, [photosLoading.id > 0])

  // Details of photos requested from API
  const [photosDetails, setPhotosDetails] = useState({})

  // Request single photo details
  const getPhotoDetails = id => {
    return getSinglePhoto(unsplash, id)
      .then(photo => {
        return filterSinglePhotoDetails(photo)
      })
      .then(photo => {
        addSinglePhoto(photo, photosDetails, setPhotosDetails)
        return photo
      })
      .catch(err => new Error(err))
  }

  return (
    <WrapperLayout>
      <Header />
      {children}
      <Main>
        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <Collections
                {...props}
                collectionsArray={
                  jsonReady && !initialPhotosReady
                    ? collectionsArray
                    : collectionsWithPhotos
                }
                jsonReady={jsonReady}
              />
            )}
          />
          <Route
            path="/collections/:id"
            render={props => {
              return initialPhotosReady ? (
                <PhotosLoadingContext.Provider
                  value={[photosLoading, setPhotosLoading]}
                >
                  <PhotosDetailsContext.Provider
                    value={[photosDetails, getPhotoDetails]}
                  >
                    <Gallery
                      {...props}
                      collectionsArray={collectionsWithPhotos}
                    />
                  </PhotosDetailsContext.Provider>
                </PhotosLoadingContext.Provider>
              ) : (
                <Loading />
              )
            }}
          />
          <Route
            path="/photos/:id"
            render={props => {
              return props.match.params.id in photosDetails ? (
                <PhotosDetailsContext.Provider
                  value={[photosDetails, getPhotoDetails]}
                >
                  <Photo {...props} />
                </PhotosDetailsContext.Provider>
              ) : (
                <Loading />
              )
            }}
          />
        </Switch>
      </Main>
    </WrapperLayout>
  )
}

export default Wrapper
