import React from 'react'

import { useRouter } from 'next/router'
import SearchResults from '../components/SearchResults'

function SearchPage() {
  const router = useRouter()
  const query = router.query.q

  return (
    <div style={{ height: '80vh', padding: '2em' }}>
      <SearchResults query={query} />
    </div>
  )
}

export default SearchPage
