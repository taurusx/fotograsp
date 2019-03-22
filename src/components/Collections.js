import React from 'react'
import styled from 'styled-components'

import CollectionsCard from './CollectionsCard'

const CollectionsWrapper = styled.section`
  max-width: 100%;
  color: ${props => props.theme.fgTopView};
  background-color: ${props => props.theme.bgTopView};
`

const Title = styled.h1`
  text-align: center;

  a {
    text-decoration: none;
    color: inherit;
    position: relative;

    &:hover {
      text-shadow: 1px 1px 3px ${props => props.theme.accent};

      &::after {
        content: '➥';
        transform: rotate(-45deg);
        position: absolute;
        left: 100%;
        top: 0;
      }
    }
  }
`

const CollectionsGrid = styled.div`
  min-width: 250px;
  width: 100%;
  display: grid;
  grid-gap: 30px;
  grid-template-columns: 1fr 1fr;

  @media (max-width: 1280px) {
    grid-template-columns: 1fr;
    grid-gap: 20px;
  }
`

const Collections = ({ collectionsArray }) => {
  return (
    <CollectionsWrapper>
      <Title>
        Aktualne kolekcje z{' '}
        <a href="http://unsplash.com" rel="noopener noreferrer" target="_blank">
          Unsplash.com
        </a>
      </Title>
      <CollectionsGrid>
        {collectionsArray.map(collection => (
          <CollectionsCard key={collection.id} collection={collection} />
        ))}
      </CollectionsGrid>
    </CollectionsWrapper>
  )
}

export default Collections
