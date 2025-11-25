import "./Navbar.css";

const Navbar = ({ auth }) => {
  const handleLogin = (e) => {
    e.preventDefault()
    if (auth.isAuthenticated) {
      //handle logout
      auth.removeUser()
      const clientId = "6f6rvbgju63b6kfst332maqli6";
      const logoutUri = "http://localhost:5173";
      const cognitoDomain = "https://us-east-2x2v0zsvp3.auth.us-east-2.amazoncognito.com";
      console.log("logout")
      window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
    } else {
      console.log("test")
      auth.signinRedirect()
    }
  };

  return (
    <nav className={"navbar"}>
      <div className={"nav-container"}>
        <h1>EasyPark</h1>
        <button className={"login-link"} onClick={handleLogin}>{auth.isAuthenticated ? "Logout" : "Login"}</button>
      </div>
    </nav>
  );
};

export default Navbar;
