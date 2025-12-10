import React from 'react';
import { Shield, ArrowLeft } from 'lucide-react';

interface PrivacyPolicyProps {
  onNavigate?: (view: 'home' | 'create' | 'marketplace' | 'privacy' | 'terms' | 'how-it-works') => void;
}

export default function PrivacyPolicy({ onNavigate }: PrivacyPolicyProps) {

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button
          onClick={() => onNavigate && onNavigate('home')}
          className="mb-8 flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="flex items-center gap-3 mb-8">
          <Shield className="w-8 h-8 text-purple-600 dark:text-purple-400" />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Privacy Policy</h1>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Introduction</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              IPfolio ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our IP bundling marketplace platform built on Story Protocol.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Information We Collect</h2>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Wallet Information</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              When you connect your wallet, we collect your wallet address for transaction processing and platform functionality. We do not store private keys or seed phrases.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Usage Data</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We collect information about how you interact with our platform, including pages visited, features used, and transaction history.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">How We Use Your Information</h2>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
              <li>To provide and maintain our platform services</li>
              <li>To process transactions and manage IP bundles</li>
              <li>To improve user experience and platform functionality</li>
              <li>To communicate with you about your account and transactions</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Blockchain Transparency</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Please note that transactions on the blockchain are public and permanent. Your wallet address and transaction history are visible on the blockchain explorer.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Data Security</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We implement appropriate technical and organizational measures to protect your information. However, no method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Your Rights</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              You have the right to access, update, or delete your personal information. You can disconnect your wallet at any time to stop data collection.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Contact Us</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              If you have questions about this Privacy Policy, please contact us at:
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Email: <a href="mailto:privacy@ipfolio.io" className="text-purple-600 dark:text-purple-400 hover:underline">privacy@ipfolio.io</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

