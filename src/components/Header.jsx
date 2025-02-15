function Header() {
  return (
    <nav className="navbar" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="container d-flex justify-content-center">
        <span className="navbar-brand mb-0 h1" style={{ color: '#5E1B89' }}>
          <img
            src="/lexmeetLogo.png"  // Update this with your new logo filename
            alt="Lexmeet Logo"
            width="40"
            height="40"             // Added height to maintain aspect ratio
            className="d-inline-block align-top me-2"
          />
          LexMeet - To-Do App
        </span>
      </div>
    </nav>
  );
}

export default Header;