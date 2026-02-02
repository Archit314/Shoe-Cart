import { Facebook, Instagram, Twitter, Github } from "lucide-react";

function Footer() {
  return (
    <footer className="text-white bg-gradient-to-r from-black/60 via-black/80 to-black/60 backdrop-blur-lg mt-12 py-12 px-6 md:px-20 border-t border-white/20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
        
        {/* Logo & Description */}
        <div>
          <h2 className="text-3xl font-extrabold tracking-wide">
            Kick<span className="text-pink-400">Z</span>
          </h2>
          <p className="text-white/70 mt-4 leading-relaxed max-w-sm">
            Your ultimate destination for premium sneakers.  
            Step up your style game with our exclusive collections.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 border-b border-pink-400/40 pb-2 inline-block">
            Quick Links
          </h3>
          <ul className="space-y-3 text-white/70">
            {["Home", "Shop", "About", "Contact"].map((link, i) => (
              <li
                key={i}
                className="hover:text-pink-400 transition-colors duration-200 cursor-pointer"
              >
                {link}
              </li>
            ))}
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-4 border-b border-pink-400/40 pb-2 inline-block">
            Follow Us
          </h3>
          <div className="flex gap-4">
            {[
              { icon: <Facebook size={20} />, link: "#" },
              { icon: <Instagram size={20} />, link: "#" },
              { icon: <Twitter size={20} />, link: "#" },
              { icon: <Github size={20} />, link: "#" },
            ].map((item, i) => (
              <a
                key={i}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full hover:bg-pink-500 hover:scale-110 transition-all cursor-pointer text-white"
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>

      </div>

      {/* Divider */}
      <div className="mt-10 border-t border-white/10 pt-6 text-center">
        <p className="text-white/50 text-sm">
          © {new Date().getFullYear()} KickZ. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
