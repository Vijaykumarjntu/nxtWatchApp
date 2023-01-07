import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Sidebar from '../Sidebar'
import WatchContext from '../../context/WatchContext'

class VideoItemDetails extends Component {
  state = {
    video: {},
    isLoading: true,
    isLiked: false,
    isDisliked: false,
    showError: false,
    isSaved: false,
  }

  componentDidMount() {
    this.getVideo()
  }

  getVideo = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    console.log(jwtToken)
    const videoItemDetailsApiUrl = `https://apis.ccbp.in/videos/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const res = await fetch(videoItemDetailsApiUrl, options)
    const data = await res.json()
    if (res.ok) {
      this.handleSuccess(data.video_details)
    } else {
      this.setState({isLoading: false, showError: true})
    }
  }

  handleSuccess = x => {
    const updatedVideos = {
      id: x.id,
      title: x.title,
      thumbnailUrl: x.thumbnail_url,
      channel: {
        name: x.channel.name,
        profileImageUrl: x.channel.profile_image_url,
        subscriberCount: x.channel.subscriber_count,
      },
      viewCount: x.view_count,
      publishedAt: x.published_at,
      videoUrl: x.videoUrl,
      description: x.description,
    }
    this.setState({video: updatedVideos, isLoading: false})
  }

  renderLoading = () => (
    <div className="loading">
      <Loader type="ThreeDots" color="#aaff11" height={50} width={50} />
    </div>
  )

  renderErrorPage = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We are having some trouble</p>
      <button type="button" onClick={() => this.getVideo()}>
        Retry
      </button>
    </>
  )

  renderPage = () => {
    const {video, isLiked, isDisliked, isSaved} = this.state
    const {
      title,
      thumbnailUrl,
      channel,
      viewCount,
      publishedAt,
      videoUrl,
      description,
    } = video
    const {name, profileImageUrl, subscriberCount} = channel
    return (
      <WatchContext.Consumer>
        {value => {
          const {insertVideo} = value
          const vj = () => {
            this.setState({isSaved: true})
            insertVideo(video)
          }
          return (
            <>
              <Sidebar />
              <Header />
              <p>{title}</p>
              <p>{viewCount}</p>
              <p>{publishedAt}</p>
              <p>{name}</p>
              <p>{subscriberCount}</p>
              <p>{description}</p>
              <img src={profileImageUrl} alt="channel logo" />
              <button type="button" className={isLiked ? 'like' : 'notLike'}>
                Like
              </button>
              <button
                type="button"
                className={isDisliked ? 'disLike' : 'notDisLike'}
              >
                Dislike
              </button>
              <button type="button" onClick={vj}>
                {isSaved ? 'Saved' : 'Save'}
              </button>
            </>
          )
        }}
      </WatchContext.Consumer>
    )
  }

  render() {
    const {video, isLoading, showError} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <WatchContext.Consumer>
        {value => {
          const {insertVideo} = value
          const vj = () => {
            insertVideo(video)
          }
          return (
            <>
              {isLoading && this.renderLoading()}
              {!isLoading && this.renderPage()}
              {showError && this.renderErrorPage()}
            </>
          )
        }}
      </WatchContext.Consumer>
    )
  }
}
export default VideoItemDetails
