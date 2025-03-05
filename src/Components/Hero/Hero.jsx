import React from 'react'
import './Hero.css'
import Typewriters from './Typewriters';

export const Hero = () => {
  return (
    <div className='hero '>
        <div className='hero-text'>
            <h1>Le savoir à portée de main 📚✨</h1>
        </div>
        <Typewriters/>
        

    </div>
  )
}
export default Hero;