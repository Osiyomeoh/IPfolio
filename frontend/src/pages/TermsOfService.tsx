import React from 'react';
import { FileText, ArrowLeft } from 'lucide-react';

interface TermsOfServiceProps {
  onNavigate?: (view: 'home' | 'create' | 'marketplace' | 'privacy' | 'terms' | 'how-it-works') => void;
}

export default function TermsOfService({ onNavigate }: TermsOfServiceProps) {

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
          <FileText className="w-8 h-8 text-purple-600 dark:text-purple-400" />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Terms of Service</h1>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Agreement to Terms</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              By accessing or using IPfolio, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access the platform.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Platform Description</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              IPfolio is a decentralized IP bundling marketplace built on Story Protocol. Users can create, trade, and manage IP asset bundles represented as tokens on the blockchain.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">User Responsibilities</h2>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
              <li>You are responsible for maintaining the security of your wallet</li>
              <li>You must ensure you have the right to bundle and trade the IP assets you include</li>
              <li>You agree to comply with all applicable laws and regulations</li>
              <li>You will not use the platform for illegal or fraudulent purposes</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Intellectual Property Rights</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              When you create a bundle, you retain ownership of the underlying IP assets. Bundle tokens represent fractional ownership and royalty rights as defined in the bundle contract.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Transactions and Fees</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              All transactions are executed on the blockchain and are irreversible. You are responsible for all gas fees associated with your transactions. Platform fees, if any, will be clearly disclosed before transaction execution.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Disclaimer of Warranties</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              The platform is provided "as is" without warranties of any kind. We do not guarantee the accuracy, completeness, or usefulness of any information on the platform.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Limitation of Liability</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              To the maximum extent permitted by law, IPfolio shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the platform.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Changes to Terms</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We reserve the right to modify these terms at any time. Continued use of the platform after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Contact Information</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              For questions about these Terms of Service, please contact us at:
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Email: <a href="mailto:legal@ipfolio.io" className="text-purple-600 dark:text-purple-400 hover:underline">legal@ipfolio.io</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

