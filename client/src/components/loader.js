import React from 'react'
import {ColorRing} from 'react-loader-spinner'
export default function loader() {
  return (
    <div>
        <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel='blocks-loading'
            wrapperClass='blocks-wrapper'
            wrapperStyle={{}}
            colors={['#7a5bd6','#7a5bd6','#7a5bd6','#7a5bd6','#7a5bd6']}
        />

    </div>
  )
}
//,'#8971d0','#9b81e9','#ab95eb','#cbc0eb'