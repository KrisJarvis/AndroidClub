import { Link } from "react-router-dom"
import { signOut } from "firebase/auth"
import { auth } from "../../firebaseconfig"
import { useContext } from "react"
import { Authcontext } from "../../contextProvider"
import { useState } from "react"
import logo from "../../images/logo.jpg";
import "./Navbar.css"


function Navbar() {
    const { currentUser } = useContext(Authcontext)
    const [vis, setVis] = useState("hidden")
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-success navbar-dark fixed-top" id="NvBr">
                <div className="container-fluid">
                    <Link className="nav-link" to="#">
                        <img className="nav-logo-img" src={logo} alt="" />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${window.location.pathname === "/home" ? "active" : " "}`} aria-current="page" to="/home">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${window.location.pathname === "/AboutUs" ? "active" : " "}`} aria-current="page" to="/AboutUs">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${window.location.pathname === "/OurProjects" ? "active" : " "}`} aria-current="page" to="/OurProjects">Projects</Link>
                            </li>
                            {
                                currentUser &&
                                <li className="nav-item">
                                    <Link className={`nav-link ${window.location.pathname === "/RegisteredEvents" ? "active" : " "}`} aria-current="page" to="/RegisteredEvents">Registered Events</Link>
                                </li>
                            }
                            {
                                currentUser &&
                                <>
                                    <img className="nav-profile-img" src={`${currentUser.photoURL}`} alt="profile"  onClick={() => setVis("visible")}></img>
                                </>
                            }
                            {
                                currentUser &&
                                <div onClick={() => setVis("visible")}  className="nav-profile-name">{currentUser.displayName}</div>
                            }
                            {
                                !currentUser &&
                                <li className="nav-item">
                                    <Link className={`nav-link ${window.location.pathname === "/login" ? "active" : " "}`} aria-current="page" to="/login">Login</Link>
                                </li>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="PopUpWindow" onClick={() => { setVis("hidden") }} style={{ visibility: `${vis}` }}>
                <div className="UserPopUpForm">
                    <input type='button' onClick={() => { signOut(auth) }} value='Logout'></input>
                </div>
            </div>
        </>
    )
}
export default Navbar