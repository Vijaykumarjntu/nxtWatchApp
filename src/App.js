import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import WatchContext from './context/WatchContext'
import SavedVideos from './components/SavedVideos'
import VideoItemDetails from './components/VideoItemDetails'
import Login from './components/Login'
import Home from './components/Home'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import NotFound from './components/NotFound'
import './App.css'

// Replace your code here
class App extends Component {
  state = {savedVideos: [], isLight: true}

  insertVideo = x => {
    console.log('insert working')
    console.log(x)
    this.setState(prevState => ({
      savedVideos: [...prevState.savedVideos, x],
    }))
  }

  changeLight = () => {
    this.setState(prevState => ({
      isLight: !prevState.isLight,
    }))
  }

  render() {
    const {savedVideos, isLight} = this.state
    console.log(savedVideos)
    return (
      <WatchContext.Provider
        value={{
          savedVideos,
          isLight,
          changeLight: this.changeLight,
          insertVideo: this.insertVideo,
        }}
      >
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/saved-videos" component={SavedVideos} />
          <Route exact path="/trending" component={Trending} />
          <Route exact path="/gaming" component={Gaming} />
          <Route exact path="/videos/:id" component={VideoItemDetails} />
          <Route component={NotFound} />
        </Switch>
      </WatchContext.Provider>
    )
  }
}

export default App
