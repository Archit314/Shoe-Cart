import { motion } from "framer-motion";

function AboutPage() {
  return (
    <div className="min-h-screen text-white flex flex-col justify-between relative overflow-hidden">
      <main className="px-6 md:px-20 py-16 flex flex-col gap-32 relative z-10">
        {/* Floating Background Circles */}
        <div className="absolute w-[600px] h-[600px] bg-pink-500/20 rounded-full blur-3xl -top-60 -left-40 animate-pulse"></div>
        <div className="absolute w-[500px] h-[500px] bg-yellow-400/20 rounded-full blur-3xl -bottom-60 right-0 animate-pulse delay-2000"></div>

        {/* Hero Section */}
        <section className="flex flex-col md:flex-row items-center gap-12">
          {/* Left Text */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 space-y-6 text-center md:text-left"
          >
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
              About{" "}
              <span className="bg-gradient-to-r from-pink-400 to-yellow-300 bg-clip-text text-transparent">
                KickZ
              </span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-xl mx-auto md:mx-0">
              Redefining sneaker culture with bold designs, premium quality, 
              and a passion for style. KickZ is more than shoes—it’s a lifestyle.
            </p>
            <button className="px-8 py-3 bg-gradient-to-r from-pink-500 to-yellow-400 rounded-full font-bold shadow-lg hover:scale-110 transition">
              Explore Collection
            </button>
          </motion.div>

          {/* Right Hero Card (Synced with HomePage) */}
          <motion.div className="flex-1 flex justify-center md:justify-end">
            <div className="w-64 sm:w-72 md:w-[350px] lg:w-[400px] h-64 sm:h-72 md:h-[350px] lg:h-[400px] bg-white/10 rounded-3xl overflow-hidden shadow-2xl transform hover:rotate-3 hover:scale-105 transition duration-500">
              <img
                src="https://images.unsplash.com/photo-1528701800489-20be9c5a5d43?q=80&w=1200&auto=format&fit=crop"
                alt="About KickZ"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </section>

        {/* Our Story (Timeline) */}
        <section>
          <h2 className="text-4xl font-bold text-center mb-16">
            Our <span className="text-pink-400">Story</span>
          </h2>
          <div className="space-y-12 max-w-3xl mx-auto">
            {[
              {
                year: "2018",
                text: "KickZ was founded with the dream of bringing exclusive sneakers to every enthusiast."
              },
              {
                year: "2020",
                text: "We launched our first limited collection drop, selling out within hours."
              },
              {
                year: "2023",
                text: "Expanded globally, delivering sneakers to 25+ countries."
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-lg"
              >
                <h3 className="text-2xl font-bold text-pink-300">{item.year}</h3>
                <p className="text-white/80 mt-2">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          {[
            { num: "50K+", label: "Happy Customers" },
            { num: "1K+", label: "Exclusive Products" },
            { num: "6+", label: "Years in Business" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.1 }}
              className="bg-gradient-to-br from-pink-500/20 to-yellow-400/20 backdrop-blur-lg p-10 rounded-2xl shadow-lg"
            >
              <h3 className="text-4xl font-extrabold text-pink-300">{stat.num}</h3>
              <p className="text-white/70 mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </section>

        {/* Team Section */}
        <section className="text-center">
          <h2 className="text-4xl font-bold mb-12">
            Meet Our <span className="text-yellow-300">Team</span>
          </h2>
          <div className="flex flex-wrap justify-center gap-10">
            {["Alex", "Jordan", "Taylor"].map((name, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.08, rotate: 2 }}
                className="w-56 bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-6 flex flex-col items-center"
              >
                <div className="w-24 h-24 rounded-full bg-white/20 mb-4"></div>
                <h3 className="font-semibold text-xl">{name}</h3>
                <p className="text-white/60 text-sm">Sneaker Expert</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center bg-gradient-to-r from-pink-500/20 via-yellow-400/20 to-pink-500/20 p-12 rounded-3xl shadow-xl">
          <h2 className="text-4xl font-bold mb-4">Join the KickZ Revolution</h2>
          <p className="text-white/70 mb-6">
            Be the first to know about new drops, exclusive collections, and special offers.
          </p>
          <button className="px-10 py-4 bg-gradient-to-r from-pink-500 to-yellow-400 rounded-full font-bold shadow-lg hover:scale-110 transition">
            Start Shopping
          </button>
        </section>
      </main>
    </div>
  );
}

export default AboutPage;
