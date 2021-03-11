import { highlightHit } from '@algolia/autocomplete-js'
import React, { createElement } from 'react'

export default function ProductItem({ hit }) {
  return (
    <a href={`/products/${hit.url}`} className="aa-ItemLink">
      <div className="aa-ItemContent">
        <div className="aa-ItemTitle">
          {highlightHit({
            hit,
            attribute: 'name',
            createElement,
          })}
        </div>
      </div>
    </a>
  )
}
