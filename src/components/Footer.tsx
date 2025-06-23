import React from 'react';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin,
  ExternalLink,
  BookOpen,
  Users,
  Award,
  Globe
} from 'lucide-react';

interface FooterProps {
  isDark: boolean;
}

const Footer: React.FC<FooterProps> = ({ isDark }) => {
  const socialLinks = [
    {
      name: 'Facebook',
      icon: Facebook,
      url: 'https://www.facebook.com/VidyalankarInstituteOfTechnology',
      color: 'hover:text-blue-600'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      url: 'https://twitter.com/VIT_Mumbai',
      color: 'hover:text-blue-400'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://www.instagram.com/vit_mumbai',
      color: 'hover:text-pink-500'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://www.linkedin.com/school/vidyalankar-institute-of-technology',
      color: 'hover:text-blue-700'
    },
    {
      name: 'YouTube',
      icon: Youtube,
      url: 'https://www.youtube.com/c/VidyalankarInstituteOfTechnology',
      color: 'hover:text-red-600'
    }
  ];

  const quickLinks = [
    { name: 'About VIT', url: 'https://vit.edu.in/about-us' },
    { name: 'Admissions', url: 'https://vit.edu.in/admissions' },
    { name: 'Academics', url: 'https://vit.edu.in/academics' },
    { name: 'Research', url: 'https://vit.edu.in/research' },
    { name: 'Placements', url: 'https://vit.edu.in/placements' },
    { name: 'Alumni', url: 'https://vit.edu.in/alumni' }
  ];

  const departments = [
    { name: 'Computer Engineering', url: 'https://vit.edu.in/computer-engineering' },
    { name: 'Electronics & Telecom', url: 'https://vit.edu.in/electronics-telecom' },
    { name: 'Information Technology', url: 'https://vit.edu.in/information-technology' },
    { name: 'Mechanical Engineering', url: 'https://vit.edu.in/mechanical-engineering' },
    { name: 'Civil Engineering', url: 'https://vit.edu.in/civil-engineering' },
    { name: 'Electrical Engineering', url: 'https://vit.edu.in/electrical-engineering' }
  ];

  const stats = [
    { icon: Users, label: 'Students', value: '5000+' },
    { icon: BookOpen, label: 'Programs', value: '15+' },
    { icon: Award, label: 'Awards', value: '100+' },
    { icon: Globe, label: 'Alumni Network', value: '25000+' }
  ];

  return (
    <footer className={`relative overflow-hidden transition-all duration-500 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-700' 
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-100 border-gray-200'
    } border-t`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-10 animate-pulse ${
          isDark ? 'bg-blue-500' : 'bg-blue-400'
        }`} />
        <div className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-10 animate-pulse delay-1000 ${
          isDark ? 'bg-purple-500' : 'bg-purple-400'
        }`} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Section */}
        <div className="py-12 border-b border-opacity-20 border-gray-400">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={stat.label}
                className={`text-center group transform transition-all duration-500 hover:scale-105 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 transition-all duration-300 group-hover:shadow-lg ${
                  isDark 
                    ? 'bg-blue-600 text-white group-hover:bg-blue-500' 
                    : 'bg-blue-500 text-white group-hover:bg-blue-600'
                }`}>
                  <stat.icon className="h-8 w-8" />
                </div>
                <div className={`text-2xl font-bold mb-1 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {stat.value}
                </div>
                <div className="text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* College Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className={`p-3 rounded-xl transition-all duration-300 ${
                  isDark ? 'bg-blue-600' : 'bg-blue-500'
                }`}>
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className={`text-xl font-bold ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    VIT Mumbai
                  </h3>
                  <p className={`text-sm ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Excellence in Education
                  </p>
                </div>
              </div>
              
              <p className={`text-sm leading-relaxed mb-6 ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Vidyalankar Institute of Technology is committed to providing quality education 
                and fostering innovation in engineering and technology.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className={`flex items-center space-x-3 text-sm ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  <MapPin className="h-4 w-4 flex-shrink-0" />
                  <span>Wadala, Mumbai, Maharashtra 400037</span>
                </div>
                <div className={`flex items-center space-x-3 text-sm ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  <span>+91 22 2416 1126</span>
                </div>
                <div className={`flex items-center space-x-3 text-sm ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  <span>info@vit.edu.in</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className={`text-lg font-semibold mb-6 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Quick Links
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={link.name}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group flex items-center space-x-2 text-sm transition-all duration-300 transform hover:translate-x-2 ${
                        isDark 
                          ? 'text-gray-300 hover:text-blue-400' 
                          : 'text-gray-600 hover:text-blue-600'
                      }`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <span className="group-hover:underline">{link.name}</span>
                      <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Departments */}
            <div>
              <h4 className={`text-lg font-semibold mb-6 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Departments
              </h4>
              <ul className="space-y-3">
                {departments.map((dept, index) => (
                  <li key={dept.name}>
                    <a
                      href={dept.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group flex items-center space-x-2 text-sm transition-all duration-300 transform hover:translate-x-2 ${
                        isDark 
                          ? 'text-gray-300 hover:text-purple-400' 
                          : 'text-gray-600 hover:text-purple-600'
                      }`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <span className="group-hover:underline">{dept.name}</span>
                      <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Media & Newsletter */}
            <div>
              <h4 className={`text-lg font-semibold mb-6 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Connect With Us
              </h4>
              
              {/* Social Media Icons */}
              <div className="flex space-x-4 mb-8">
                {socialLinks.map((social, index) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group p-3 rounded-full transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 ${
                      isDark 
                        ? 'bg-gray-800 text-gray-400 hover:bg-gray-700' 
                        : 'bg-gray-100 text-gray-600 hover:bg-white hover:shadow-lg'
                    } ${social.color}`}
                    style={{ animationDelay: `${index * 150}ms` }}
                    title={`Follow us on ${social.name}`}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>

              {/* Newsletter Signup */}
              <div className={`p-4 rounded-lg ${
                isDark ? 'bg-gray-800/50' : 'bg-gray-50'
              }`}>
                <h5 className={`font-medium mb-2 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  Stay Updated
                </h5>
                <p className={`text-xs mb-3 ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Get the latest news and updates from VIT
                </p>
                <div className="flex space-x-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className={`flex-1 px-3 py-2 text-sm rounded-lg border transition-all duration-200 focus:ring-2 focus:ring-offset-2 ${
                      isDark
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500'
                    }`}
                  />
                  <button className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:shadow-lg transform hover:scale-105 ${
                    isDark
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}>
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`py-6 border-t border-opacity-20 border-gray-400 ${
          isDark ? 'text-gray-400' : 'text-gray-600'
        }`}>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm">
              <p>© 2024 Vidyalankar Institute of Technology. All rights reserved.</p>
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <a href="#" className="hover:underline transition-all duration-200">Privacy Policy</a>
              <a href="#" className="hover:underline transition-all duration-200">Terms of Service</a>
              <a href="#" className="hover:underline transition-all duration-200">Cookie Policy</a>
            </div>
          </div>
          <div className="text-center mt-4">
            <p className="text-xs">
              Made with ❤️ for Vidyalankar Institute of Technology - Empowering students through accessible academic insights
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;