import { motion } from "framer-motion"
import { FaMusic, FaHeadphones, FaMicrophone, FaUserFriends, FaChartLine, FaMobileAlt } from "react-icons/fa"

const features = [
  { icon: FaMusic, title: "Curated Playlists", description: "Discover new music tailored to your taste" },
  { icon: FaHeadphones, title: "High Quality Audio", description: "Experience music in crystal clear quality" },
  { icon: FaMicrophone, title: "Live Sessions", description: "Join exclusive live streaming sessions" },
  { icon: FaUserFriends, title: "Social Listening", description: "Share and enjoy music with friends" },
  {
    icon: FaChartLine,
    title: "Personalized Recommendations",
    description: "Get suggestions based on your listening habits",
  },
  { icon: FaMobileAlt, title: "Offline Mode", description: "Download your favorite tracks for offline listening" },
]

export default function FeaturesSection() {
  return (
    <section className="py-[20vh] px-4 bg-gradient-to-b from-[#492bad] to-blue-900">
      <h3 className="text-4xl font-bold text-center mb-12 text-purple-300">Our Features</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="bg-[#fefefe] bg-opacity-10 rounded-lg p-6 text-center backdrop-filter backdrop-blur-md"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.1, delay: index * 0 }}
            whileHover={{ scale: 1.1, backgroundColor: "rgba(139, 92, 246, 0.3)" }}
          >
            <feature.icon className="text-5xl mb-4 mx-auto text-purple-400" />
            <h4 className="text-xl font-semibold mb-2 text-purple-200">{feature.title}</h4>
            <p className="text-purple-100">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

