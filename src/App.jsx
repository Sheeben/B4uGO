"use client"

// Modifications to make to your App.jsx file

import { useState, useEffect, useRef } from "react"
import "./App.css"

function App() {
  const homeRef = useRef(null)
  const servicesRef = useRef(null)
  const spotsRef = useRef(null)
  const contactRef = useRef(null)

  // Add this new state for mobile menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const scrollToSection = (sectionRef) => {
    sectionRef.current.scrollIntoView({ behavior: "smooth" })
  }

  // Toggle mobile menu function
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuOpen && !event.target.closest("ul") && !event.target.closest(".mobile-menu-button")) {
        setMobileMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [mobileMenuOpen])

  // Close menu when a link is clicked
  const handleNavLinkClick = (sectionRef) => {
    scrollToSection(sectionRef)
    setMobileMenuOpen(false)
  }

  const [servicesData, setServicesData] = useState([])

  useEffect(() => {
    fetch("https://b4u-go.vercel.app/services")
      .then((response) => response.json())
      .then((data) => setServicesData(data))
      .catch((error) => console.error("Error fetching services data:", error))
  }, [])

  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <div className="name">
            <span>
              <img src="/images/population.png" height={30} width={30} />
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
            <button className="btn">Login</button>
          </div>
        </div>
      </nav>

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
            />
            <button className="bi bi-search-heart rounded-end-4" type="button" id="button-addon2"></button>
          </div>
        </div>
      </section>

      {/* Services section - no changes needed here, CSS will handle responsiveness */}
      <section id='services' ref={servicesRef}>
  <div>
    <h2>
      <img src="/images/customer-care.png" height={50} width={50}/>Services
    </h2>
  </div>
  <div className='container-service'>
    <div className='card'>
      <div className='card-header'>
        <p>Traditional Dress</p>
      </div>
      <div className='card-body'>
        <img src="/images/young-japanese.jpg" height={250} width={300}/>
      </div>
      <div className='card-footer'>
        <span>Cultural Attire <br/> Admire Traditional Fashion from Around the World</span>
      </div>
    </div>

    <div className='card'>
      <div className='card-header'>
        <p>Language</p>
      </div>
      <div className='card-body'>
        <img src="/images/lang.png" height={250} width={300}/>
      </div>
      <div className='card-footer'>
        <span>Languages of the World <br/>Learn the Native Tongues of Each Region</span>
      </div>
    </div>
  </div>

  <div className='container-service2'>
    <div className='card'>
      <div className='card-header'>
        <p>Famous Foods</p>
      </div>
      <div className='card-body'>
        <img src="/images/foodd.jpg" height={250} width={300}/>
      </div>
      <div className='card-footer'>
        <span>Taste the World <br/> Explore Iconic Dishes and Local Flavors</span>
      </div>
    </div>

    <div className='card'>
      <div className='card-header'>
        <p>Famous Places</p>
      </div>
      <div className='card-body'>
        <img src="/images/free-photo.jpg" height={250} width={300}/>
      </div>
      <div className='card-footer'>
        <span>Discover Must-Visit Spots <br/> Uncover the Landmarks and Hidden Gems</span>
      </div>
    </div>
  </div>
</section>


<section id='imagess'>
  <div className='div1-border'>
    <div>
      
    </div>
  </div>
  <div className='div2-border'>
    <div>
     
    </div>
  </div>
</section>

      {/* Spots section - update the image styles */}
      <section id="spots" ref={spotsRef}>
        <h2>Explore Global Cultures</h2>
        <div className="spots-container">
          {servicesData.length > 0 ? (
            servicesData.map((service, index) => (
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
                              width:"80%",
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
                              width:"80%",
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
                              width:"80%",
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
            <p>Loading data...</p>
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
      <p>
          If you’d like to discuss a project or just want to say hello, feel free to reach out!
        </p>

        <form
          action="https://api.web3forms.com/submit"
          method="POST"
          className="form ms-5"
          id="emailForm"
        >
          <input type="hidden" name="access_key" value="e722b967-4a1a-4078-8c0d-777eab775f37" />

          <label className="form-label" htmlFor="subject">
            Name:
          </label>
          <input
            className="form-control"
            type="text"
            name="name"
            placeholder="Enter Name..."
            required
            id="inputid"
          />
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

      <footer>{/* Your existing footer code */}
 

              <div className="footer-content">
              <h3>B4uGO</h3>
              <p>Your gateway to exploring global cultures, traditions, and landmarks.</p>
              <ul class="socials">
                <li><a href="#"><i className="bi bi-facebook"></i></a></li>
                <li><a href="#"><i className="bi bi-twitter"></i></a></li>
                <li><a href="#"><i className="bi bi-instagram"></i></a></li>
                <li><a href="#"><i className="bi bi-linkedin"></i></a></li>
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



