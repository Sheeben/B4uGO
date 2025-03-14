"use client"

import { useState, useEffect, useRef } from "react"
import "./App.css"

function App() {
  const homeRef = useRef(null)
  const servicesRef = useRef(null)
  const spotsRef = useRef(null)
  const contactRef = useRef(null)

  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Search functionality
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredData, setFilteredData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // Authentication states
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const [showLoginForm, setShowLoginForm] = useState(false)
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [loginError, setLoginError] = useState("")

  // Check if user is already logged in from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser)
        setUser(userData)
        setIsLoggedIn(true)
      } catch (error) {
        console.error("Failed to parse stored user:", error)
        localStorage.removeItem("user")
      }
    }
  }, [])

  const scrollToSection = (sectionRef) => {
    sectionRef.current.scrollIntoView({ behavior: "smooth" })
  }

  // Toggle mobile menu function
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  // Toggle login form
  const toggleLoginForm = () => {
    setShowLoginForm(!showLoginForm)
    setLoginError("")
  }

  // Handle login
  const handleLogin = (e) => {
    e.preventDefault()

    // Basic validation
    if (!loginEmail || !loginPassword) {
      setLoginError("Please enter both email and password")
      return
    }

    // In a real app, you would call your authentication API here
    // For demo purposes, we'll simulate a successful login with any credentials
    setTimeout(() => {
      // Create user object with name from email (before the @ symbol)
      const userName = loginEmail.split("@")[0]
      const userData = {
        name: userName,
        email: loginEmail,
      }

      // Store in state and localStorage
      setUser(userData)
      setIsLoggedIn(true)
      localStorage.setItem("user", JSON.stringify(userData))

      // Close login form
      setShowLoginForm(false)
      setLoginEmail("")
      setLoginPassword("")
      setLoginError("")

      // Show success message
      alert("Login successful! Welcome " + userName)
    }, 1000)
  }

  // Handle logout
  const handleLogout = () => {
    setUser(null)
    setIsLoggedIn(false)
    localStorage.removeItem("user")
  }

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuOpen && !event.target.closest("ul") && !event.target.closest(".mobile-menu-button")) {
        setMobileMenuOpen(false)
      }

      // Also close login form when clicking outside
      if (
        showLoginForm &&
        !event.target.closest(".login-form-container") &&
        !event.target.closest(".btn-login button")
      ) {
        setShowLoginForm(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [mobileMenuOpen, showLoginForm])

  // Close menu when a link is clicked
  const handleNavLinkClick = (sectionRef) => {
    scrollToSection(sectionRef)
    setMobileMenuOpen(false)
  }

  const [servicesData, setServicesData] = useState([])

  // Sample fallback data in case the API is unavailable
  const fallbackData = [
    {
      country: "India",
      famousPlaces: [
        {
          name: "Taj Mahal",
          region: "Agra",
          image: "/images/taj-mahal.jpg",
          description: "One of the seven wonders of the world, a symbol of love.",
        },
        {
          name: "Golden Temple",
          region: "Amritsar",
          image: "/images/golden-temple.jpg",
          description: "The holiest gurdwara and an important pilgrimage site.",
        },
      ],
      famousFood: [
        {
          name: "Butter Chicken",
          region: "Punjab",
          image: "/images/butter-chicken.jpg",
          description: "Creamy curry dish with tender chicken pieces.",
        },
        {
          name: "Masala Dosa",
          region: "South India",
          image: "/images/masala-dosa.jpg",
          description: "Crispy crepe filled with spiced potatoes.",
        },
      ],
      traditionalDress: [
        {
          name: "Saree",
          region: "All India",
          image: "/images/saree.jpg",
          description: "Traditional garment worn by women across India.",
        },
        {
          name: "Kurta Pajama",
          region: "North India",
          image: "/images/kurta.jpg",
          description: "Traditional attire for men in India.",
        },
      ],
      language: [
        {
          name: "Hindi",
          region: "North India",
          description: "One of the official languages of India.",
        },
        {
          name: "Tamil",
          region: "Tamil Nadu",
          description: "Classical language with rich literary history.",
        },
      ],
    },
    {
      country: "Japan",
      famousPlaces: [
        {
          name: "Mount Fuji",
          region: "Honshu",
          image: "/images/mount-fuji.jpg",
          description: "Japan's highest mountain and an iconic symbol.",
        },
        {
          name: "Kyoto Temples",
          region: "Kyoto",
          image: "/images/kyoto.jpg",
          description: "Historic temples showcasing traditional architecture.",
        },
      ],
      famousFood: [
        {
          name: "Sushi",
          region: "All Japan",
          image: "/images/sushi.jpg",
          description: "Vinegared rice topped with fresh fish and seafood.",
        },
        {
          name: "Ramen",
          region: "All Japan",
          image: "/images/ramen.jpg",
          description: "Noodle soup dish with various toppings.",
        },
      ],
      traditionalDress: [
        {
          name: "Kimono",
          region: "All Japan",
          image: "/images/kimono.jpg",
          description: "Traditional Japanese garment with cultural significance.",
        },
        {
          name: "Yukata",
          region: "All Japan",
          image: "/images/yukata.jpg",
          description: "Casual summer kimono often worn at festivals.",
        },
      ],
      language: [
        {
          name: "Japanese",
          region: "All Japan",
          description: "The official language of Japan with unique writing systems.",
        },
      ],
    },
  ]

  useEffect(() => {
    setIsLoading(true)
    fetch("http://localhost:8080/services")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        return response.json()
      })
      .then((data) => {
        setServicesData(data)
        setError(null)
      })
      .catch((error) => {
        console.error("Error fetching services data:", error)
        setError("Unable to connect to the server. Using sample data instead.")
        // Use fallback data when API is unavailable
        setServicesData(fallbackData)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredData(servicesData)
    } else {
      const filtered = servicesData.filter((service) =>
        service.country.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setFilteredData(filtered)
    }
  }, [servicesData, searchQuery])

  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <div className="name">
            <span>
              <img src="/images/population.png" height={30} width={30} alt="Population icon" />
            </span>
            <span className="navbar-brand text-dark">B4uGO</span>
          </div>

          {/* Add mobile menu button */}
          <button className="mobile-menu-button" onClick={toggleMobileMenu}>
            <i className={`bi ${mobileMenuOpen ? "bi-x-lg" : "bi-list"}`}></i>
          </button>

          {/* Add mobile menu overlay */}
          <div
            className="mobile-menu-overlay"
            style={{ display: mobileMenuOpen ? "block" : "none" }}
            onClick={() => setMobileMenuOpen(false)}
          ></div>

          <div>
            <ul className={`nav rounded-5 ps-5 pe-5 text-dark ${mobileMenuOpen ? "show" : ""}`}>
              <li className="nav-item">
                <a href="#home" onClick={() => handleNavLinkClick(homeRef)} data-bs-toggle="tab" className="nav-link">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#services"
                  onClick={() => handleNavLinkClick(servicesRef)}
                  data-bs-toggle="tab"
                  className="nav-link"
                >
                  Services
                </a>
              </li>
              <li className="nav-item">
                <a href="#spots" onClick={() => handleNavLinkClick(spotsRef)} data-bs-toggle="tab" className="nav-link">
                  Spots
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#contact"
                  onClick={() => handleNavLinkClick(contactRef)}
                  data-bs-toggle="tab"
                  className="nav-link"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="btn-login">
            {isLoggedIn ? (
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ color: "#01796f", fontWeight: "bold" }}>{user.name}</span>
                <button className="btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            ) : (
              <button className="btn" onClick={toggleLoginForm}>
                Login
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Login Form Popup */}
      {showLoginForm && (
        <div
          className="login-form-container"
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
            width: "90%",
            maxWidth: "400px",
          }}
        >
          <h2 style={{ color: "#01796f", marginBottom: "20px", textAlign: "center" }}>Login to B4uGO</h2>

          {loginError && (
            <div
              style={{
                backgroundColor: "#fff3cd",
                color: "#664d03",
                padding: "10px",
                borderRadius: "4px",
                marginBottom: "15px",
              }}
            >
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="email" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                Email
              </label>
              <input
                type="email"
                id="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
                placeholder="your.email@example.com"
                required
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                <label htmlFor="password" style={{ fontWeight: "bold" }}>
                  Password
                </label>
                <a href="#" style={{ color: "#01796f", textDecoration: "none", fontSize: "14px" }}>
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                id="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
                required
              />
            </div>

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "10px",
                backgroundColor: "#01796f",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Sign in
            </button>
          </form>

          <div style={{ marginTop: "20px", textAlign: "center", fontSize: "14px", color: "#666" }}>
            Don't have an account?{" "}
            <a href="#" style={{ color: "#01796f", textDecoration: "none" }}>
              Sign up
            </a>
          </div>

          <button
            onClick={toggleLoginForm}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              background: "none",
              border: "none",
              fontSize: "18px",
              cursor: "pointer",
            }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Home section - no changes needed here, CSS will handle responsiveness */}
      <section id="home" ref={homeRef}>
        <div className="photo">
          <div className="container-home">
            <h1>
              Discover the World <br /> Before You Go
            </h1>
            <p>Explore Cultures, Traditions, and Famous Spots Worldwide</p>
          </div>
          <div className="input-group w-50 mb-3">
            <input
              type="text"
              className="form-control rounded-start-4"
              placeholder="Enter Your Favorite Place Name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && document.getElementById("search-button").click()}
            />
            <button
              className="bi bi-search-heart text-dark rounded-end-4 bg-white"
              type="button"
              id="search-button"
              onClick={() => {
                if (searchQuery.trim() !== "") {
                  // Scroll to spots section when search is performed
                  scrollToSection(spotsRef)
                }
              }}
            ></button>
          </div>
        </div>
      </section>

      {/* Services section - no changes needed here, CSS will handle responsiveness */}
      <section id="services" ref={servicesRef}>
        <div>
          <h2>
            <img src="/images/customer-care.png" height={50} width={50} alt="Customer care icon" />
            Services
          </h2>
        </div>
        <div className="container-service">
          <div className="card">
            <div className="card-header">
              <p>Traditional Dress</p>
            </div>
            <div className="card-body">
              <img src="/images/young-japanese.jpg" height={250} width={300} alt="Traditional Japanese dress" />
            </div>
            <div className="card-footer">
              <span>
                Cultural Attire <br /> Admire Traditional Fashion from Around the World
              </span>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <p>Language</p>
            </div>
            <div className="card-body">
              <img src="/images/lang.png" height={250} width={300} alt="Languages" />
            </div>
            <div className="card-footer">
              <span>
                Languages of the World <br />
                Learn the Native Tongues of Each Region
              </span>
            </div>
          </div>
        </div>

        <div className="container-service2">
          <div className="card">
            <div className="card-header">
              <p>Famous Foods</p>
            </div>
            <div className="card-body">
              <img src="/images/foodd.jpg" height={250} width={300} alt="Famous foods" />
            </div>
            <div className="card-footer">
              <span>
                Taste the World <br /> Explore Iconic Dishes and Local Flavors
              </span>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <p>Famous Places</p>
            </div>
            <div className="card-body">
              <img src="/images/free-photo.jpg" height={250} width={300} alt="Famous places" />
            </div>
            <div className="card-footer">
              <span>
                Discover Must-Visit Spots <br /> Uncover the Landmarks and Hidden Gems
              </span>
            </div>
          </div>
        </div>
      </section>

      <section id="imagess">
        <div className="div1-border">
          <div></div>
        </div>
        <div className="div2-border">
          <div></div>
        </div>
      </section>

      {/* Spots section - update the image styles */}
      <section id="spots" ref={spotsRef}>
        <h2>Explore Global Cultures</h2>

        {error && (
          <div className="alert alert-warning" role="alert">
            {error}
          </div>
        )}

        {searchQuery.trim() !== "" && (
          <div className="search-controls">
            <button className="btn btn-outline-secondary mb-4" onClick={() => setSearchQuery("")}>
              Clear Search
            </button>
            <p className="search-results">Showing results for: {searchQuery}</p>
          </div>
        )}

        <div className="spots-container">
          {isLoading ? (
            <div className="loading-spinner">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p>Loading data...</p>
            </div>
          ) : filteredData.length > 0 ? (
            filteredData.map((service, index) => (
              <div key={index} className="spots-card">
                <div className="spots-card-header">
                  <h1>{service.country}</h1>
                </div>
                <div className="spots-card-body">
                  <div>
                    <h4 className="mt-5">
                      <strong>Famous Places:</strong>
                    </h4>
                    <div className="divtraddy">
                      {service.famousPlaces.map((place, i) => (
                        <div key={i} style={{ marginBottom: "15px" }}>
                          <img
                            src={place.image || "/placeholder.svg"}
                            alt={place.name}
                            style={{
                              width: "80%",
                              height: "70%",
                              borderRadius: "5px",
                              objectFit: "cover",
                            }}
                          />
                          <p>
                            {place.name}- {place.region}
                          </p>
                          <p>{place.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="mt-5">
                      <strong>Famous Foods:</strong>
                    </h4>
                    <div className="divtraddy">
                      {service.famousFood.map((food, i) => (
                        <div key={i} style={{ marginBottom: "15px" }}>
                          <img
                            src={food.image || "/placeholder.svg"}
                            alt={food.name}
                            style={{
                              width: "80%",
                              height: "70%",
                              borderRadius: "5px",
                              objectFit: "cover",
                            }}
                          />
                          <p>
                            {food.name}-{food.region}
                          </p>
                          <p>{food.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <h4 className="mt-5">
                    <strong>Traditional Dress:</strong>
                  </h4>
                  {service.traditionalDress && service.traditionalDress.length > 0 && (
                    <div className="divtraddy">
                      {service.traditionalDress.map((dress, index) => (
                        <div key={index} style={{ marginBottom: "10px" }}>
                          <img
                            src={dress.image || "/placeholder.svg"}
                            alt={dress.name}
                            style={{
                              width: "80%",
                              height: "70%",
                              borderRadius: "5px",
                              objectFit: "cover",
                            }}
                          />
                          <p>
                            {dress.name} - {dress.region}
                          </p>
                          <p>{dress.description}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  <h4 className="mt-5">
                    <strong>Languages:</strong>
                  </h4>
                  <div className="divtraddy">
                    {service.language.map((lang, i) => (
                      <div key={i} style={{ marginBottom: "15px" }}>
                        <p>
                          {lang.name}- {lang.region}
                        </p>
                        <p>{lang.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No results found for "{searchQuery}". Try a different search term.</p>
          )}
        </div>
      </section>

      {/* Contact section - no changes needed here, CSS will handle responsiveness */}
      <section id="contact" ref={contactRef}>
        {/* Your existing contact section code */}

        <div className="contact-image2">
          <div className="contact-video">
            <video autoPlay loop muted playsInline className="video-bg">
              <source src="/videos/8357342-uhd_4096_2160_25fps.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        <div className="contact-content">
          <h2>Get in Touch</h2>
          <p>If you'd like to discuss a project or just want to say hello, feel free to reach out!</p>

          <form action="https://api.web3forms.com/submit" method="POST" className="form ms-5" id="emailForm">
            <input type="hidden" name="access_key" value="e722b967-4a1a-4078-8c0d-777eab775f37" />

            <label className="form-label" htmlFor="subject">
              Name:
            </label>
            <input className="form-control" type="text" name="name" placeholder="Enter Name..." required id="inputid" />
            <br />

            <label className="form-label" htmlFor="email">
              Your Email:
            </label>
            <input
              className="form-control"
              id="inputid"
              type="email"
              name="email"
              placeholder="Enter Email..."
              required
            />
            <br />

            <label className="form-label" htmlFor="message">
              Message:
            </label>
            <textarea
              className="form-control"
              id="inputid"
              name="message"
              rows="4"
              placeholder="Enter Message..."
              required
            ></textarea>

            <button type="submit" className="btn">
              Submit
            </button>
          </form>
        </div>
      </section>

      <footer>
        {/* Your existing footer code */}

        <div className="footer-content">
          <h3>B4uGO</h3>
          <p>Your gateway to exploring global cultures, traditions, and landmarks.</p>
          <ul className="socials">
            <li>
              <a href="#">
                <i className="bi bi-facebook"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="bi bi-twitter"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="bi bi-instagram"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="bi bi-linkedin"></i>
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 B4uGO | Designed by Sheetal</p>
        </div>
      </footer>
    </div>
  )
}

export default App

