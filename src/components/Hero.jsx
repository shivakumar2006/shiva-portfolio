import React from 'react'
import Particles from './ui/particles'
import PillNav from './ui/Pillnav';
import logo from "../assets/logo.jpeg";
import SplitText from "./ui/SplitText";
import ShinyText from './ui/ShinyText';

const Hero = () => {

    const handleAnimationComplete = () => {
  console.log('All letters have animated!');
};

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
      <div className='absolute inset-0 flex flex-row items-center justify-center text-white z-10 pointer-events-none'>
        <div className='w-200 h-full flex flex-col justify-center items-center gap-10'>
            <SplitText
              text="Shiva Kumar"
              className="text-8xl font-extrabold pr-40 text-center mt-30"
              delay={100}
              duration={0.6}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="center"
              onLetterAnimationComplete={handleAnimationComplete}
            />

            <ShinyText 
              text=" Senior Software Engineer at @Victoria's Secret | ex @Verizon, @TechMahindra" 
              disabled={false} 
              speed={10} 
              className='custom-class' 
            />
            <p className='text-xl px-10 font-extralight'>
                Experienced Senior Software Engineer with 8.5+ years of expertise in Golang and Java, specializing in designing and developing scalable microservices, distributed systems, and cloud-native applications. Skilled in Golang, Java, Spring Boot, Microservices Architecture, Hibernate, JPA, SQL Databases, Redis, Kafka, Docker, Kubernetes, Git, Jenkins, Azure, AWS, Data Structures, Algorithms, and System Design. Experienced in implementing CI/CD pipelines, automation, and monitoring solutions. Strong engineering professional with a Bachelor of Technology (B.Tech) in Computer Science & Engineering, with proven success delivering enterprise-grade solutions in Agile environments.
            </p>
        </div>
        <div className='w-160 h-full border-white border flex flex-col justify-center items-center'>
              World
        </div>
      </div>

    </div>
  )
}

export default Hero
