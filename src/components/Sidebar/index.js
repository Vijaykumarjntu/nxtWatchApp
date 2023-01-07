import {Link} from 'react-router-dom'

const Sidebar = () => (
  <>
    <ul className="sidebarContainer">
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/trending">Trending</Link>
      </li>
      <li>
        <Link to="/gaming">Gaming</Link>
      </li>
      <li>
        <Link to="/saved-videos">Saved videos</Link>
      </li>
    </ul>

    <ul>
      <p>CONTACT US</p>
      <li>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
          alt="twitter logo"
        />
      </li>
      <li>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
          alt="facebook logo"
        />
      </li>
      <li>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
          alt="linked in logo"
        />
      </li>
    </ul>
    <p>Enjoy! Now to see your channels and recommendations!</p>
  </>
)

export default Sidebar
