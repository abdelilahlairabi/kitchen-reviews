const teamData = [
  { name: 'Ethan Reed', role: 'Founder & Editor', image: '/about/team-founder-editor.jpeg' },
  { name: 'Sarah Chen', role: 'Kitchen Product Specialist', image: '/about/team-kitchen-specialist.jpeg' },
  { name: 'Mark Johnson', role: 'Content Writer', image: '/about/team-content-writer.jpeg' },
];

const AboutTeam = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Team Section</h3>
        <h2 className="text-3xl font-bold text-black">Meet the Team</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {teamData.map((member, index) => (
          <div key={index} className="bg-white border border-gray-100 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-6 bg-gray-100">
              <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
            </div>
            <h4 className="text-lg font-bold text-black">{member.name}</h4>
            <p className="text-sm text-gray-500">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutTeam;