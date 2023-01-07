import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Sidebar from '../Sidebar'
import Video from '../Video'
import Header from '../Header'
import './index.css'

class Home extends Component {
  state = {
    videos: [],
    input: '',
    showBanner: true,
    isLoading: true,
    showError: false,
  }

  componentDidMount() {
    this.getVideos()
  }

  changeBanner = () => {
    this.setState(prevState => ({
      showBanner: !prevState.showBanner,
    }))
  }

  onChangeInput = e => {
    this.setState({input: e.target.value})
  }

  searchInput = () => {
    this.getVideos()
  }

  getVideos = async () => {
    const {input} = this.state
    this.setState({isLoading: true})
    const homeVideosApiUrl = `https://apis.ccbp.in/videos/all?search=${input}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const res = await fetch(homeVideosApiUrl, options)
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
      channel: {
        name: x.channel.name,
        profileImageUrl: x.channel.profile_image_url,
      },
      viewCount: x.view_count,
      publishedAt: x.published_at,
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
    <div className="loading" data-testid="loader">
      <Loader type="ThreeDots" color="#aaff11" height={50} width={50} />
    </div>
  )

  renderEmptyPage = () => (
    <div className="emptyContainer">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
        alt="no videos"
      />
      <h1>No Search results found</h1>
      <p>Try different key words or remove search filter</p>
      <button type="button" onClick={() => this.getVideos()}>
        Retry
      </button>
    </div>
  )

  render() {
    const {input, videos, isLoading, showBanner, showError} = this.state
    const showEmptyPage = videos.length === 0
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }

    return (
      <div className="homeContainer">
        <Header />
        <Sidebar />
        <input
          type="search"
          placeholder="enter search terms"
          value={input}
          onChange={this.onChangeInput}
        />
        <button
          type="button"
          onClick={this.searchInput}
          data-testid="searchButton"
        >
          Search
        </button>
        {showBanner && (
          <div className="bannerContainer" data-testid="banner">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
              alt="nxt watch logo"
            />
            <p>Buy Nxt Watch Premium</p>
            <button type="button">GET IT NOW</button>
            <button
              type="button"
              onClick={() => this.changeBanner()}
              data-testid="close"
            >
              X
            </button>
          </div>
        )}
        {isLoading && this.renderLoading()}
        {showError && this.renderErrorPage()}
        {showEmptyPage && this.renderEmptyPage()}
        <ul>
          {videos.map(x => (
            <Video key={x.id} details={x} />
          ))}
        </ul>
      </div>
    )
  }
}
export default Home
