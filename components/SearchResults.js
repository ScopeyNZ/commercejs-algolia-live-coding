import algoliasearch from 'algoliasearch/lite'
import { InstantSearch, connectSearchBox, Hits } from 'react-instantsearch-dom'

const searchClient = algoliasearch(
  'P95ANLZK9X',
  '3a6b59673b038f38a557d58f8df4e1c5'
)

export default function SearchResults({ query }) {
  const SearchBox = ({ currentRefinement, isSearchStalled, refine }) => null

  const CustomSearchBox = connectSearchBox(SearchBox)

  const Hit = ({ hit }) => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img
        src={hit.media.source}
        style={{
          height: '10em',
          width: '10em',
        }}
      />
      <p>{hit.name}</p>
    </div>
  )

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName="products"
      searchState={{
        query: query,
      }}
    >
      <CustomSearchBox defaultRefinement={query} />
      <Hits hitComponent={Hit} />
    </InstantSearch>
  )
}
