import React from 'react'
import Particles from './ui/particles'
import PillNav from './ui/Pillnav';
import logo from "../assets/logo.jpeg";

const Hero = () => {
  return (
    <div className='w-screen min-h-screen bg-black relative overflow-hidden'>

      {/* ✨ Particle Background */}
      <div className="w-screen h-screen relative">
        <Particles
          particleColors={['#ffffff', '#ffffff']}
          particleCount={500}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={150}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      {/* 🌟 Navbar */}
        {/* <nav className='absolute border mt-10 border-white top-0 left-0 w-full z-20 flex justify-between items-center px-8 py-4 bg-transparent pointer-events-none'>
          <h1 className='text-white text-4xl pl-20 font-bold pointer-events-auto'>Shiva</h1>
          <ul className='flex space-x-8 text-white font-medium pointer-events-auto'>
            <li className='hover:text-gray-400 cursor-pointer'>Home</li>
            <li className='hover:text-gray-400 cursor-pointer'>Projects</li>
            <li className='hover:text-gray-400 cursor-pointer'>About</li>
            <li className='hover:text-gray-400 cursor-pointer'>Contact</li>
          </ul>
        </nav> */}

        <div className='w-full flex justify-center items-center'>
                    <PillNav
              logo={logo}
              logoAlt="Company Logo"
              items={[
                { label: 'Home', href: '/' },
                { label: 'About', href: '/about' },
                { label: 'Services', href: '/services' },
                { label: 'Contact', href: '/contact' }
              ]}
              activeHref="/"
              className="custom-nav"
              ease="power2.easeOut"
              baseColor="#000000"
              pillColor="#ffffff"
              hoveredPillTextColor="#ffffff"
              pillTextColor="#000000"
            />
    </div>

      {/* 🖤 Center Hero Content */}
      <div className='absolute inset-0 flex flex-col items-center justify-center text-white z-10 pointer-events-none'>
        <h1 className='text-5xl font-bold mb-4 pointer-events-auto'>Welcome to My Portfolio</h1>
        <p className='text-lg text-gray-300 pointer-events-auto'>I build modern web experiences</p>
      </div>

    </div>
  )
}

export default Hero
