'use client'
// import { motion } from "framer-motion"
import { useState } from 'react'
import { sideLinks } from '@/constants'
import Image from 'next/image'
import { TypeAnimation } from 'react-type-animation'

const Hero = () => {
  const [active, setActive] = useState(''); // set active to empty string
  return (
    <section className="relative w-full h-screen
    mx-auto items-center" id="hero">
      <div className='sm:px-16 px-6 absolute
      inset-0 top-[120px] max-w-7xl mx-auto flex
      flex-row items-start gap-2'>
        { /* div below is for the text */ }
          <div>
          { /* &apos; is for escaping ' sign */ }

            <h1 className='heroHeadText'>
              <TypeAnimation
                sequence={[
                    "Hi, I'm Fabian", // Types 'Discover'
                    1000, // Waits 1s
                    "Hi, I'm Fabian", // Types 'Discover'
                    1000, // Waits 1s
                    '', // Types ''
                ]}
                wrapper="div"
                cursor={true}
                repeat={Infinity}
              />
            </h1>
            <p className='heroSubText mt-2
            text-[#ecebeb] opacity-80'>
              Have Interest on&nbsp;Fullstack Web <br />& Machine Learning
              <br className="sm:block hidden"/>
            </p>
          </div>
        </div>
        <div className=''>
          <ul className='list-none px-[16px] py-6 top-[195.5px] right-0 my-2  
          z-10 flex justify-end rounded-tl-xl rounded-bl-xl
          items-start flex-col gap-[44px] fixed bg-[#4b4b4b9a]'> 
            {sideLinks.map((link, index) => (
              <li
                key={index} // key is for unique identifier
                className={`${
                  // active state value is getting from useState
                  active === link.title // if active is equal to link.title
                    ? "transition-all"
                    : "underline"
                } hover:cursor-pointer opacity-75 hover:opacity-100`}
                onClick={() => { 
                  setActive(link.title)} // set active to link.title
                }
                >
                <a href={`#${link.id}`}>
                  <Image 
                    src={link.icon}
                    alt={link.title}
                    className='w-[28px] h-[28px]
                    object-contain '
                  />
                </a> 
              </li>
            ))}
          </ul>
        </div>
    </section>
  )
}

export default Hero