const GamingVideo = props => {
  const {details} = props
  const {title, thumbnailUrl, viewCount} = details
  return (
    <li className="videoContainer">
      <p>{title}</p>
      <img src={thumbnailUrl} alt="video thumbnail" />

      <p>{viewCount}</p>
    </li>
  )
}
export default GamingVideo
