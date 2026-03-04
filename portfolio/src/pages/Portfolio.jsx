import React from 'react'
import WorkCard from '../components/WorkCard'

function Portfolio({ withTopOffset = true }) {
  const works = [
    {
      id:1,
      title: 'Logo Design',
      description:"Crafting unique and memorable logos that capture the essence of your brand and leave a lasting impression on your audience.",
      imageURL: 'https://via.placeholder.com/400x300?text=Logo+Design',
      pagename:'logo'
    },
    {
      id:2,
      title: 'Graphic Design',
      description:"Eye-catching visuals for social media, marketing materials, and digital platforms that capture attention and drive engagement.",
      imageURL: 'https://via.placeholder.com/400x300?text=Graphic+Design',
      pagename:'graphic'
    },
    {
      id:3,
      title: 'Brand Identity Design',
      description:"Complete brand packages including color palettes, typography, and design systems that tell your unique story.",
      imageURL: 'https://via.placeholder.com/400x300?text=Brand+Identity+Design',
      pagename:'brand'
    },
    {
      id:4,
      title: 'Social Media,Poster,Banner Design',
      description:"Eye-catching visuals for social media, marketing materials, and digital platforms that capture attention and drive engagement.",
      imageURL: 'https://via.placeholder.com/400x300?text=Social+Media+Poster+Banner+Design',
      pagename:'socialmedia'
    },
    {
      id:5,
      title: 'UI Design',
      description:"User-centered interface designs that are both beautiful and functional, ensuring seamless digital experiences.",
      imageURL: 'https://via.placeholder.com/400x300?text=UI-UX+Design',
      pagename:'ui'
    }
  ]

  const containerClass = withTopOffset
    ? 'min-h-screen mt-16'
    : 'mt-0'

  return (
    <div className={`bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 pt-6 ${containerClass}`}>
      <h1 className="text-4xl font-bold text-center text-cyan-400 mt-8 mb-12">My Portfolio</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {works.map((work) => (
        <WorkCard key={work.id} title={work.title} description={work.description} imageURL={work.imageURL} pagename={work.pagename}/>
      ))}
    </div>
  </div>
  )
}

export default Portfolio