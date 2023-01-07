import React from 'react'

const WatchContext = React.createContext({
  isLight: true,
  savedVideos: [],
  insertVideo: () => {},
  changeLight: () => {},
})
export default WatchContext
