import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-20">
      <div className="px-4 sm:px-10 lg:px-20 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold">
              M
            </div>
            <span className="text-lg font-semibold">Medi.care</span>
          </div>

          <p className="text-sm text-gray-600 leading-relaxed">
            Empowering patients with seamless access to world-class
            healthcare specialists.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <Link href="/doctors" className="hover:text-blue-600">
                Find a Doctor
              </Link>
            </li>
            <li>
              <Link href="/departments" className="hover:text-blue-600">
                Departments
              </Link>
            </li>
            <li>
              <Link href="/blogs" className="hover:text-blue-600">
                Medical Blogs
              </Link>
            </li>
            <li>
              <Link href="/faqs" className="hover:text-blue-600">
                FAQs
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="font-semibold mb-4">Support</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <Link href="/help" className="hover:text-blue-600">
                Help Center
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-blue-600">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-blue-600">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-blue-600">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-semibold mb-4">Contact Info</h4>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="flex gap-2">
              📧 support@healthsync.com
            </li>
            <li className="flex gap-2">
              📞 +1 (555) 000-1234
            </li>
            <li className="flex gap-2">
              📍 123 Healthcare Way, Medical District
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t text-center text-sm text-gray-500 py-4">
        © 2024 HealthSync Medical Group. All rights reserved.
      </div>
    </footer>
  );
}
