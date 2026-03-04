function Skills({ withTopOffset = true }) {
  const skillCategories = [
    {
      category: 'Design',
      skills: [
        { name: 'Graphic Design', level: 95 },
        { name: 'Logo Design', level: 92 },
        { name: 'Brand Identity', level: 90 },
        { name: 'UI/UX Design', level: 85 }
      ]
    },
    {
      category: 'Multimedia',
      skills: [
        { name: 'Video Editing', level: 80 },
        { name: 'Motion Graphics', level: 75 },
        { name: 'Photo Editing', level: 88 }
      ]
    },
    {
      category: 'Tools',
      skills: [
        { name: 'Adobe Photoshop', level: 95 },
        { name: 'Adobe Illustrator', level: 92 },
        { name: 'Figma', level: 85 },
        { name: 'Adobe Premiere Pro', level: 80 }
      ]
    }
  ];

  return (
    <section className={`min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 ${withTopOffset ? 'mt-16' : 'mt-0'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Skills & Expertise
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            A comprehensive overview of my technical skills and proficiency levels
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={category.category}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10"
            >
              {/* Category Header */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-cyan-400 mb-2">
                  {category.category}
                </h3>
                <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
              </div>

              {/* Skills List */}
              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skill.name}
                    className="group"
                    style={{ animationDelay: `${(categoryIndex * 4 + skillIndex) * 100}ms` }}
                  >
                    <div className="flex justify-between mb-2">
                      <span className="text-slate-300 font-medium group-hover:text-cyan-300 transition-colors">
                        {skill.name}
                      </span>
                      <span className="text-cyan-400 font-semibold">{skill.level}%</span>
                    </div>
                    <div className="relative w-full bg-slate-700/50 rounded-full h-3 overflow-hidden">
                      <div
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-400 rounded-full transition-all duration-1000 ease-out group-hover:shadow-lg group-hover:shadow-cyan-500/50"
                        style={{ width: `${skill.level}%` }}
                      >
                        <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
    </div>
    </section>
  )
}

export default Skills