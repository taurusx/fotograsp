import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const CollectionsWrapper = styled.section`
  max-width: 100%;
  color: ${props => props.theme.fgTopView};
  background-color: ${props => props.theme.bgTopView};
`

const Collections = () => {
  return (
    <CollectionsWrapper>
      <h1>Aktualne kolekcje z Unsplasha</h1>
      <p>
        (Kolekcja - 1.){` `}
        <Link to="/collections/1">Zdjęcia z kolekcji 1.</Link>
      </p>
      <p>
        (Kolekcja - 2.){` `}
        <Link to="/collections/2">Zdjęcia z kolekcji 2.</Link>
      </p>
      <p>
        (Kolekcja - 3.){` `}
        <Link to="/collections/3">Zdjęcia z kolekcji 3.</Link>
      </p>
    </CollectionsWrapper>
  )
}

export default Collections
