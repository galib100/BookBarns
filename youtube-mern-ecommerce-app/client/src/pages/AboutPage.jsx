import React from 'react'
import About from '../components/About'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const AboutPage = () => {
  return (
    <div>
        <Announcement/>
        <Navbar/>
        <About/>
        <Footer/>

    </div>
  )
}

export default AboutPage