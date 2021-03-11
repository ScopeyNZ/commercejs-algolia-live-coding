import Link from 'next/link'
import { useRouter } from 'next/router'

import CartSummary from './CartSummary'
import Autocomplete from './Autocomplete'
import ProductItem from './ProductItem'

import LogoSVG from '../svg/logo.svg'

import {
  autocomplete,
  getAlgoliaHits,
  snippetHit,
} from '@algolia/autocomplete-js'

import { createQuerySuggestionsPlugin } from '@algolia/autocomplete-plugin-query-suggestions'

import algoliasearch from 'algoliasearch'

import '@algolia/autocomplete-theme-classic'

const searchClient = algoliasearch(
  'P95ANLZK9X',
  '3a6b59673b038f38a557d58f8df4e1c5'
)

const querySuggestionsPlugin = createQuerySuggestionsPlugin({
  searchClient,
  indexName: 'products_query_suggestions',
})

import { createLocalStorageRecentSearchesPlugin } from '@algolia/autocomplete-plugin-recent-searches'

const recentSearchesPlugin = createLocalStorageRecentSearchesPlugin({
  key: 'RECENT_SEARCH',
  limit: 5,
  transformSource({ source }) {
    return {
      ...source,
      getItemUrl({ item }) {
        return `/search?q=${item.query}`
      },
      templates: {
        item(params) {
          const { item } = params
          return (
            <a className="aa-ItemLink" href={`/search?q=${item.query}`}>
              {source.templates.item(params)}
            </a>
          )
        },
      },
    }
  },
})

function Header() {
  const router = useRouter()

  return (
    <header className="md:absolute md:left-0 md:top-0 w-full z-10">
      <div className="py-3 lg:py-5 flex items-center justify-between">
        <Autocomplete
          plugins={[recentSearchesPlugin, querySuggestionsPlugin]}
          openOnFocus={true}
          onSubmit={(event) => {
            router.push(`/search?q=${event.state.query}`)
          }}
          getSources={({ query }) => [
            {
              sourceId: 'products',
              getItems() {
                return getAlgoliaHits({
                  searchClient,
                  queries: [
                    {
                      indexName: 'products',
                      query,
                    },
                  ],
                })
              },
              templates: {
                item({ item }) {
                  return <ProductItem hit={item} />
                },
              },
            },
          ]}
        />
        <div>
          <Link href="/">
            <a title="Return to ChopChop">Shop</a>
          </Link>
          <span className="pr-1">,</span>
          <CartSummary />
        </div>
      </div>

      <Link href="/">
        <a title="Return to ChopChop">
          <LogoSVG className="w-full" />
        </a>
      </Link>
    </header>
  )
}

export default Header
