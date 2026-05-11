import React, { useRef } from 'react'
import Particles from './ui/particles'
import PillNav from './ui/Pillnav';
import logo from "../assets/logo.jpeg";
import SplitText from "./ui/SplitText";
import ShinyText from './ui/ShinyText';
import VariableProximity from './ui/VariableProximity';
import Ajay from "../assets/ajay-kumar-removebg-preview.png"

const Hero = () => {
  const containerRef = useRef(null);

  const handleAnimationComplete = () => {
    console.log('All letters have animated!');
  };

  return (
    <div className='w-screen min-h-screen bg-black relative overflow-hidden'>

      {/* ✨ Particle Background */}
      <div className="absolute inset-0 z-0">
        <Particles
          particleColors={['#ffffff', '#ffffff']}
          particleCount={500}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={150}
          moveParticlesOnHover={false} // disabled background interactivity
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      {/* 🌟 Navbar */}
      <div className='w-full flex justify-center items-center relative z-20 pointer-events-none'>
        {/* <div className='pointer-events-auto'> */}
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
        {/* </div> */}
      </div>

      {/* 🖤 Center Hero Content */}
      <div className='absolute inset-0 flex flex-row items-center justify-center text-white z-10 pointer-events-auto'>

        {/* LEFT SIDE */}
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

          {/* Re-enable interaction only here */}
          <div className="pointer-events-auto">
            <ShinyText 
              text="Senior Software Engineer at @Victoria's Secret | ex @Verizon, @TechMahindra" 
              disabled={false} 
              speed={10} 
              className='custom-class'
            />
          </div>

          <div
            ref={containerRef}
            className='text-xl pointer-events-auto'
            style={{ position: 'relative', paddingLeft: '48px', paddingRight: "53px", cursor: "pointer" }}
          >
            <VariableProximity
              label={'Experienced Senior Software Engineer with 8.5+ years of expertise in Golang and Java, specializing in designing and developing scalable microservices, distributed systems, and cloud-native applications. Skilled in Golang, Java, Spring Boot, Microservices Architecture, Hibernate, JPA, SQL Databases, Redis, Kafka, Docker, Kubernetes, Git, Jenkins, Azure, AWS, Data Structures, Algorithms, and System Design. Experienced in implementing CI/CD pipelines, automation, and monitoring solutions. Strong engineering professional with a Bachelor of Technology (B.Tech) in Computer Science & Engineering, with proven success delivering enterprise-grade solutions in Agile environments.'}
              className={'variable-proximity-demo'}
              fromFontVariationSettings="'wght' 400, 'opsz' 9"
              toFontVariationSettings="'wght' 1000, 'opsz' 40"
              containerRef={containerRef}
              radius={100}
              falloff='linear'
            />
          </div>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className='w-160 h-full flex flex-col justify-center items-center'>
          <img 
            src={Ajay}
            alt='photo'
            className='w-130 mt-20 select-none pointer-events-none'
          />
        </div>
      </div>
    </div>
  )
}

export default Hero;
