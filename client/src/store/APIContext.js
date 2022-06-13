import React from 'react'

const APIContext = React.createContext({
    authorization: String, 
    api_url: String
})

export default APIContext;