import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Switch, Route } from 'react-router-dom'

import Header from './Header'
import Main from './Main'
import Collections from './Collections'
import Gallery from './Gallery'
import Loading from './Loading'
import { unsplash } from '../utils/apiSimulation'
import {
  getCollections,
  getPhotos,
  parseCollectionsDetails,
  parsePhotosDetails,
} from '../utils/helpersApi'

const WrapperLayout = styled.div`
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const Wrapper = ({ children }) => {
  // Initial API request - collections data without photos details
  const [collectionsArray, setCollectionsArray] = useState([])
  const [jsonReady, setJsonReady] = useState(false)

  useEffect(() => {
    if (!jsonReady) {
      let a = getCollections(unsplash)
        .then(result => {
          let array = parseCollectionsDetails(result)
          setCollectionsArray(array)
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
            return parsePhotosDetails(photos)
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
      })
    }
  }, [collectionsArray.length])

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
                <Gallery {...props} collectionsArray={collectionsWithPhotos} />
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
