import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white text-black border-t-4 border-black pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-yellow-300 border-3 border-black rounded-lg flex items-center justify-center shadow-[2px_2px_0px_0px_#000]">
                <i className="fas fa-home text-black text-lg"></i>
              </div>
              <span className="text-2xl font-black tracking-tight uppercase">
                HouseConnect
              </span>
            </div>
            <p className="text-black font-medium mb-4">
              India&apos;s trusted platform connecting homeowners with verified
              local professionals across 50+ cities.
            </p>
            <div className="flex gap-4">
              <a
                href="https://x.com/jayeshpatila15"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white border-3 border-black rounded-full flex items-center justify-center hover:bg-gray-100 hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_0px_#000] shadow-[2px_2px_0px_0px_#000] transition-all"
                aria-label="X (Twitter)"
              >
                <i className="fa-brands fa-x-twitter text-black"></i>
              </a>
              <a
                href="https://www.instagram.com/jayesh_patil_008?igsh=ZWY0bXpnM29lcDZt"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white border-3 border-black rounded-full flex items-center justify-center hover:bg-blue-600 hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_0px_#000] shadow-[2px_2px_0px_0px_#000] transition-all"
                aria-label="Facebook"
              >
                <i className="fa-brands fa-facebook-f text-black"></i>
              </a>
              <a
                href="https://www.instagram.com/jayesh_patil_008?igsh=ZWY0bXpnM29lcDZt"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white border-3 border-black rounded-full flex items-center justify-center hover:bg-pink-400 hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_0px_#000] shadow-[2px_2px_0px_0px_#000] transition-all"
                aria-label="Instagram"
              >
                <i className="fa-brands fa-instagram text-black"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/jayesh-vinod-patil"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white border-3 border-black rounded-full flex items-center justify-center hover:bg-blue-700 hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_0px_#000] shadow-[2px_2px_0px_0px_#000] transition-all"
                aria-label="LinkedIn"
              >
                <i className="fa-brands fa-linkedin-in text-black"></i>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-black text-lg mb-6 uppercase tracking-wide">
              Services
            </h4>
            <ul className="space-y-4 text-black font-bold">
              <li>
                <Link
                  href="/contractors?service=plumbing"
                  className="hover:underline decoration-2 decoration-black underline-offset-2 transition"
                >
                  Plumbing
                </Link>
              </li>
              <li>
                <Link
                  href="/contractors?service=electrical"
                  className="hover:underline decoration-2 decoration-black underline-offset-2 transition"
                >
                  Electrical
                </Link>
              </li>
              <li>
                <Link
                  href="/contractors?service=cleaning"
                  className="hover:underline decoration-2 decoration-black underline-offset-2 transition"
                >
                  Cleaning
                </Link>
              </li>
              <li>
                <Link
                  href="/contractors?service=hvac"
                  className="hover:underline decoration-2 decoration-black underline-offset-2 transition"
                >
                  HVAC
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-lg mb-6 uppercase tracking-wide">
              Company
            </h4>
            <ul className="space-y-4 text-black font-bold">
              <li>
                <Link
                  href="/about"
                  className="hover:underline decoration-2 decoration-black underline-offset-2 transition"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="hover:underline decoration-2 decoration-black underline-offset-2 transition"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:underline decoration-2 decoration-black underline-offset-2 transition"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:underline decoration-2 decoration-black underline-offset-2 transition"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-lg mb-6 uppercase tracking-wide">
              Contact
            </h4>
            <ul className="space-y-4 text-black font-medium">
              <li className="flex items-start gap-3">
                <i className="fas fa-map-marker-alt mt-1 text-xl"></i>
                <span>
                  Sakoli, bhandara,
                  <br />
                  maharashtra 441802
                </span>
              </li>
              <li className="flex items-center gap-3 mt-4">
                <i className="fas fa-phone-alt text-xl -scale-x-100 inline-block"></i>
                <span>+91 8263884655</span>
              </li>
              <li className="flex items-center gap-3">
                <i className="fas fa-envelope text-xl"></i>
                <span>support@houseconnect.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t-2 border-black border-dashed pt-8 text-center text-black font-bold">
          <p>
            &copy; {new Date().getFullYear()} HouseConnect Pro. All rights
            reserved. Made with ❤️ in India
          </p>
        </div>
      </div>
    </footer>
  );
}
