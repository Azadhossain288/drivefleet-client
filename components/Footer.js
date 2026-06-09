export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-white text-xl font-black mb-3 tracking-tight">DriveFleet</h3>
          <p className="text-sm leading-relaxed">Making premium mobility accessible, clear, and perfectly integrated across smart local networks.</p>
        </div>
        <div>
          <h4 className="text-white text-sm font-bold mb-3 uppercase tracking-wider">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/cars" className="hover:text-white transition">Explore Car Listings</a></li>
            <li><a href="#" className="hover:text-white transition">Terms & Liability Support</a></li>
            <li><a href="#" className="hover:text-white transition">Emergency Fleet Rules</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white text-sm font-bold mb-3 uppercase tracking-wider">Contact Corporate</h4>
          <p className="text-sm text-gray-300">📍 Elite Tower, Level 4, Dhaka, BD</p>
          <p className="text-sm text-gray-300 mt-1">✉️ operations@drivefleet.com</p>
        </div>
      </div>
      <div className="text-center text-xs text-gray-600 mt-12 pt-6 border-t border-gray-800">
        © 2026 DriveFleet Core Portal. All Rights Reserved Assignment Setup.
      </div>
    </footer>
  );
}