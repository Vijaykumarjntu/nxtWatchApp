import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Sidebar from '../Sidebar'
import GamingVideo from '../GamingVideo'

class Gaming extends Component {
  state = {videos: [], isLoading: true, showError: false}

  componentDidMount() {
    this.getVideos()
  }

  getVideos = async () => {
    this.setState({isLoading: true})
    const gamingVideosApiUrl = `https://apis.ccbp.in/videos/gaming`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const res = await fetch(gamingVideosApiUrl, options)
    const data = await res.json()
    if (res.ok) {
      this.handleSuccess(data)
    } else {
      this.setState({isLoading: false, showError: true})
    }
  }

  handleSuccess = y => {
    console.log(y)
    this.setState({isLoading: false})
    const updatedVideos = y.videos.map(x => ({
      id: x.id,
      title: x.title,
      thumbnailUrl: x.thumbnail_url,
      viewCount: x.view_count,
    }))
    this.setState({isLoading: false, videos: updatedVideos})
  }

  renderErrorPage = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We are having some trouble</p>
      <button type="button" onClick={() => this.getVideos()}>
        Retry
      </button>
    </>
  )

  renderLoading = () => (
    <div className="loading">
      <Loader type="ThreeDots" color="#aaff11" height={50} width={50} />
    </div>
  )

  render() {
    const {videos, isLoading, showError} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <div className="homeContainer">
        <Header />
        <Sidebar />
        {isLoading && this.renderLoading()}
        {showError && this.renderErrorPage()}
        <ul>
          {videos.map(x => (
            <GamingVideo key={x.id} details={x} />
          ))}
        </ul>
      </div>
    )
  }
}
export default Gaming
