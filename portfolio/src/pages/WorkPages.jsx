import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import ImageCard from '../components/ImageCard'

function WorkPages() {

    const {category} = useParams()
    const [works,setWorks] = useState([])

    useEffect(() => {
      fetch(`http://localhost:5000/api/works/${category}`)
        .then(res => res.json())
        .then(data => setWorks(data))
        .catch(err => console.log(err))
    }, [category])
  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 pt-6 mt-16">
    <h1 className='text-4xl font-bold text-center mb-6'>My <span className="text-cyan-500">{category}</span> Works</h1><br/>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 pb-6 mt-4">
      {works.map(work => (
        <ImageCard
          key={work._id}
          work={work}
        />
      ))}
    </div>
    </section>
  )
}

export default WorkPages