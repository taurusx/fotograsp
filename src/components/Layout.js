import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Switch, Route } from 'react-router-dom'

import Header from './Header'
import Main from './Main'
import Collections from './Collections'
import Gallery from './Gallery'
import Loading from './Loading'
import { unsplash } from './../utils/apiSimulation'
import {
  getCollections,
  getPhotos,
  parseCollectionsDetails,
  parsePhotosDetails,
} from './../utils/helpersApi'

const LayoutWrapper = styled.div`
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const Layout = ({ children }) => {
  const [collectionsArray, setCollectionsArray] = useState([])
  const [jsonReady, setJsonReady] = useState(false)

  useEffect(() => {
    if (!jsonReady) {
      setJsonReady(true)
      let a = getCollections(unsplash)
        .then(result => {
          let array = parseCollectionsDetails(result)
          setCollectionsArray(array)
          return array
        })
        .catch(err => new Error(err))
    }
  }, [jsonReady])

  const [collectionsWithPhotos, setCollectionsWithPhotos] = useState([])
  const [photosReady, setPhotosReady] = useState(false)

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
            if (collectionsArray.length === flag) setPhotosReady(true)
          })
      })
    }
  }, [collectionsArray.length])

  return (
    <LayoutWrapper>
      <Header />
      {children}
      <Main>
        {photosReady ? (
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <Collections
                  {...props}
                  collectionsArray={collectionsWithPhotos}
                />
              )}
            />
            <Route
              path="/collections/:id"
              render={props => (
                <Gallery {...props} collectionsArray={collectionsWithPhotos} />
              )}
            />
          </Switch>
        ) : (
          <Loading />
        )}
      </Main>
    </LayoutWrapper>
  )
}

export default Layout
