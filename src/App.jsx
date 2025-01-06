
import { useState, useEffect, useRef } from 'react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
   
  const homeRef = useRef(null);
  const servicesRef = useRef(null);
  const spotsRef = useRef(null);
  const contactRef = useRef(null);

  const scrollToSection = (sectionRef) => {
    sectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  
  const [servicesData, setServicesData] = useState([]);

 
  useEffect(() => {
    fetch('http://localhost:8080/services')  
      .then(response => response.json())
      .then(data => setServicesData(data))
      .catch(error => console.error('Error fetching services data:', error));
  }, []);

  return (
    < div>
               
          <nav className="navbar navbar-expand-lg ">

            <div className="container-fluid">

              <div className='name'>
                <span><img src="/images/population.png" height={30} width={30}/></span>
                <span className="navbar-brand text-dark">B4uGO</span>
              </div>

 

              <div>
              <ul className="nav rounded-5 ps-5 pe-5 text-dark">
              <li className="nav-item"><a href="#home" onClick={() => scrollToSection(homeRef)}  data-bs-toggle="tab" className="nav-link ">Home</a></li>
              <li className="nav-item"><a href="#services" onClick={() => scrollToSection(servicesRef)}   data-bs-toggle="tab" className="nav-link ">Services</a></li>
              <li className="nav-item"><a href="#spots" onClick={() => scrollToSection(spotsRef)}  data-bs-toggle="tab" className="nav-link ">Spots</a></li>
              <li className="nav-item"><a href="#contact" onClick={() => scrollToSection(contactRef)}  data-bs-toggle="tab" className="nav-link ">Contact</a></li>
              </ul>

              </div>


              <div className='btn-login'>
              <button className='btn'>Login</button>
              </div>

 
            </div>          
 
          </nav>
           


           <section id='home' ref={homeRef}>
           <div className='photo'>
              
                <div className='container-home'>
                <h1>Discover the World <br/> Before You Go</h1>
                <p>Explore Cultures, Traditions, and Famous Spots Worldwide</p>
                </div>
                <div className="input-group  w-50 mb-3">
                <input type="text" className="form-control rounded-start-4" placeholder="Enter Your Favorite Place Name..."/>
                <button className="bi bi-search-heart rounded-end-4" type="button" id="button-addon2"></button>
                </div>
            </div>
           </section>
 
    

            <section id='services' ref={servicesRef}>
             <div>
             
             <h2> <img src="/images/customer-care.png" height={50} width={50}/>Services</h2>
             </div>
                <div className='container-service'>
                      <div className='card' >

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
                              <img src="/images/free-photo.jpg"  height={250} width={300}/>
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

          <section id='spots' ref={spotsRef}>
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
              <h4 className='mt-5'><strong>Famous Places:</strong></h4>
              <div className='divtraddy'>
              {service.famousPlaces.map((place, i) => (
                <div key={i} style={{ marginBottom: "15px" }} >
                  <img src={place.image} alt={place.name} height={390} width={300} style={{ borderRadius: "5px" }} />
                  <p>{place.name}- {place.region}</p>
                  <p>{place.description}</p>
                </div>
              ))}
              </div>
            </div>




            <div>
              <h4 className='mt-5'><strong>Famous Foods:</strong></h4>
              <div className='divtraddy'>
              {service.famousFood.map((food, i) => (
                <div key={i} style={{ marginBottom: "15px" }}>
                  <img src={food.image} alt={food.name} height={390} width={300} style={{ borderRadius: "5px" }} />
                  <p>{food.name}-{food.region}</p>
                  <p>{food.description}</p>
                </div>
              ))}
              </div>
            </div>
 

           
          <h4 className='mt-5'><strong>Traditional Dress:</strong></h4>
            {service.traditionalDress && service.traditionalDress.length > 0 && (
              <div  className='divtraddy'>
                
                
                {service.traditionalDress.map((dress, index) => (
                  
                <div  key={index} style={{ marginBottom: '10px' }}>
                  <img 
                    src={dress.image} 
                    alt={dress.name} 
                    height={380} 
                    width={300} 
                  />
                  <p>{dress.name} - {dress.region}</p>
                  <p>{dress.description}</p>
                </div>
              ))}
               

              </div>
            )}

           

           

            
            <h4 className='mt-5'><strong>Languages:</strong></h4>
            <div className='divtraddy'>
                  {service.language.map((lang, i) => (
                      <div key={i} style={{ marginBottom: "15px" }} >
                      
                        <p>{lang.name}- {lang.region}</p>
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

 
            
           <section id='contact'  ref={contactRef}>
           



           
      

      <div className="contact-image2">

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

         
          <footer>
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
              <p>&copy; 2024 B4uGO | Designed by Sheeben</p>
            </div>   
          </footer>

         
    </div>
  )
}

export default App
