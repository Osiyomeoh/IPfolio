import React from 'react';
import { Sparkles, Github, Twitter, Mail } from 'lucide-react';

type View = 'home' | 'create' | 'marketplace' | 'privacy' | 'terms' | 'how-it-works';

interface FooterProps {
  onNavigate?: (view: View) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const handleInternalLink = (view: View, e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(view);
      // Scroll to top when navigating
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <Sparkles className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">IPfolio</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              The first IP bundling marketplace on Story Protocol. Create diversified IP portfolios, 
              trade bundle tokens, and earn automatic royalties.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="mailto:contact@ipfolio.io" className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Product
            </h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#create" 
                  onClick={(e) => handleInternalLink('create', e)}
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm cursor-pointer"
                >
                  Create Bundle
                </a>
              </li>
              <li>
                <a 
                  href="#marketplace" 
                  onClick={(e) => handleInternalLink('marketplace', e)}
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm cursor-pointer"
                >
                  Marketplace
                </a>
              </li>
              <li>
                <a 
                  href="#how-it-works" 
                  onClick={(e) => handleInternalLink('how-it-works', e)}
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm cursor-pointer"
                >
                  How It Works
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="https://docs.story.foundation" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm">
                  Documentation
                </a>
              </li>
              <li>
                <a href="https://story.foundation" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm">
                  Story Protocol
                </a>
              </li>
              <li>
                <a href="mailto:support@ipfolio.io" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm">
                  Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              © {new Date().getFullYear()} IPfolio. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <a 
                href="#privacy" 
                onClick={(e) => handleInternalLink('privacy', e)}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm cursor-pointer"
              >
                Privacy Policy
              </a>
              <a 
                href="#terms" 
                onClick={(e) => handleInternalLink('terms', e)}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm cursor-pointer"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

