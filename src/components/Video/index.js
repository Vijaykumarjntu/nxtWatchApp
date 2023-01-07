import {Link} from 'react-router-dom'

const Video = props => {
  const {details} = props
  const {id, title, channel, thumbnailUrl, viewCount, publishedAt} = details
  const {profileImageUrl, name} = channel
  return (
    <li className="videoContainer">
      <Link to={`/videos/${id}`}>
        <p>{title}</p>
        <img src={thumbnailUrl} alt="video thumbnail" />
        <img src={profileImageUrl} alt="profile_image_url" />
        <p>{name}</p>
        <p>{viewCount}</p>
        <p>{publishedAt}</p>
      </Link>
    </li>
  )
}
export default Video
