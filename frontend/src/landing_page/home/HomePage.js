import React from 'react'
import Hero from './Hero'
import Testimonials from './Testimonials'
import Records from './Records'
import CallToAction from './CallToAction'
import Navbar from '../Navbar'
import Footer from '../Footer'

const HomePage = () => {
  return (
    <div>
        <Navbar/>
        <Hero/>
        <Testimonials/>
        <CallToAction/>
        <Records/>
        <Footer/>

    </div>
    

  )
}

export default HomePage