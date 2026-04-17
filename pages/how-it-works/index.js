'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useRouter } from "next/router";

export default function HowItWorksPage() {
    const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);

  const steps = [
    {
      number: '1',
      icon: '📝',
      title: 'Upload your knowledge',
      description: 'Point advAIsor at your documents, your website, or your existing knowledge base. That becomes your agent\'s brain — specific to your business, not generic AI.',
      points: [
        'Documents, policies, manuals, FAQs',
        'Your website — we handle the rest',
        'Cloud storage you already use'
      ]
    },
    {
      number: '2',
      icon: '🧠',
      title: 'Your agent learns it',
      description: 'advAIsor reads and understands your content so your agent can answer questions in plain English — accurately, instantly, and always within the boundaries you set.',
      points: [
        'Understands context, not just keywords',
        'Only answers from your content',
        'Test it before anyone else sees it'
      ]
    },
    {
      number: '3',
      icon: '🚀',
      title: 'Go live anywhere',
      description: 'One click and your agent is live — on your website, on WhatsApp, embedded in your tools, or shared as a link. No developer, no waiting, no complexity.',
      points: [
        'Website, WhatsApp, email, or a link',
        'Works on any device, any browser',
        'No developer or IT team needed'
      ]
    }
  ];

  const differences = [
    {
      icon: '🎯',
      title: 'It only knows what you teach it',
      description: 'Your agent answers from your content only — not the internet, not other companies data. It stays within the boundaries you set, every time.'
    },
    {
      icon: '🔒',
      title: 'Your data stays yours',
      description: 'Your documents and conversations are never used to train other companies models. What you upload belongs to you — always private, always secure.'
    },
    {
      icon: '✓',
      title: 'You test before anyone else sees it',
      description: 'Before going live, you interact with your agent privately. You decide when it is ready. Nothing goes live until you are satisfied with how it performs.'
    },
    {
      icon: '📈',
      title: 'It gets smarter as you add more',
      description: 'Every document you add improves your agent. Update your content and your agent updates with it. The more you put in, the better it performs.'
    },
    {
      icon: '🤝',
      title: 'It knows when to hand over to a human',
      description: 'When questions fall outside its knowledge base or require human judgment, it seamlessly routes the conversation to your team with full context.'
    },
    {
      icon: '👀',
      title: 'You see everything it does',
      description: 'Access full conversation histories and analytics to understand what your users are asking, identify knowledge gaps, and continuously improve.'
    }
  ];

  const results = [
    {
      stat: '78%',
      label: 'of questions answered without human involvement'
    },
    {
      stat: '<2s',
      label: 'response time versus hours by email'
    },
    {
      stat: '10',
      label: 'minutes from signup to first live agent'
    },
    {
      stat: '24/7',
      label: 'availability at no extra cost'
    }
  ];

  const faqs = [
    {
      q: 'Do I need technical knowledge to set this up?',
      a: 'No. advAIsor is designed for non-technical users. Upload your content, train your agent, go live — all through a simple interface. No coding required.'
    },
    {
      q: 'What kind of content can my agent learn from?',
      a: 'PDFs, Word documents, text files, spreadsheets, entire websites, Google Drive, Dropbox, Notion, SharePoint — basically any knowledge you already have documented.'
    },
    {
      q: 'Will my agent make up answers it does not know?',
      a: 'No. Your agent only answers from your content. It will not guess, invent, or go beyond what you have taught it. If it does not know something, it says so.'
    },
    {
      q: 'How quickly can I see results?',
      a: 'Most customers are live within 10 minutes of signing up. You can test your agent immediately on your own content and deploy the same day.'
    },
    {
      q: 'Is my content safe and private?',
      a: 'Yes. Your content never leaves your account. It is never used to train other customers\' agents or to improve our general AI models. You own it completely.'
    },
    {
      q: 'What if my content changes?',
      a: 'Your agent updates automatically. Upload new documents or update existing ones, and your agent learns the changes instantly. No retraining needed.'
    },
    {
      q: 'Can I try it before committing to anything?',
      a: 'Absolutely. 14-day free trial. No credit card required. Your first agent goes live in 10 minutes. Cancel anytime, no exit fees.'
    },
    {
      q: 'What if I need help getting started?',
      a: 'We have comprehensive guides, video tutorials, and a support team ready to help. Plus, the entire setup is designed to be self-service and intuitive.'
    }
  ];

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const handleLogin = ()=>{
      window.location.href = "http://myadvaisor.com:4002/";
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-amber-50">
      {/* HEADER / NAVIGATION */}
      <header className="sticky top-0 z-50 bg-white border-b border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
              A
            </div>
            <span className="text-xl font-serif font-semibold text-slate-900 hidden sm:inline">advAIsor</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm text-slate-600 hover:text-slate-900 transition">
              Home
            </Link>
            <Link href="/use-cases" className="text-sm text-slate-600 hover:text-slate-900 transition">
              Use Cases
            </Link>
            <Link href="/how-it-works" className="text-sm text-amber-600 font-semibold">
              How It Works
            </Link>
            <Link href="/pricing" className="text-sm text-slate-600 hover:text-slate-900 transition">
              Pricing
            </Link>
            <Link href="/survey" className="text-sm text-slate-600 hover:text-slate-900 transition">
              Find My Agent
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <button onClick={handleLogin} className="text-sm text-slate-600 hover:text-slate-900 transition font-medium">
              Log in
            </button>
            <button onClick={() => router.push("/survey")} className="px-4 py-2 bg-amber-500 text-white rounded-lg text-sm font-semibold hover:bg-amber-600 transition">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-amber-100 py-4 px-4">
            <nav className="flex flex-col gap-4">
              <Link href="/" className="text-sm text-slate-600 hover:text-slate-900">
                Home
              </Link>
              <Link href="/use-cases" className="text-sm text-slate-600 hover:text-slate-900">
                Use Cases
              </Link>
              <Link href="/how-it-works" className="text-sm text-amber-600 font-semibold">
                How It Works
              </Link>
              <Link href="/pricing" className="text-sm text-slate-600 hover:text-slate-900">
                Pricing
              </Link>
              <Link href="/survey" className="text-sm text-slate-600 hover:text-slate-900">
                Find My Agent
              </Link>
              <div className="flex gap-2 pt-4">
                <button onClick={handleLogin} className="flex-1 text-sm text-slate-600 hover:text-slate-900 font-medium py-2">
                  Log in
                </button>
                <button onClick={() => router.push("/survey")} className="flex-1 px-4 py-2 bg-amber-500 text-white rounded-lg text-sm font-semibold hover:bg-amber-600">
                  Get Started
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section className="pt-12 sm:pt-20 lg:pt-28 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="space-y-6 sm:space-y-8 text-center">
          <div>
            <span className="text-xs sm:text-sm font-mono font-semibold text-amber-600 uppercase tracking-widest">
              HOW IT WORKS
            </span>
          </div>

          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-slate-900 leading-tight mb-4">
              Simple to start
            </h1>
            <p className="text-2xl sm:text-3xl font-serif font-light text-amber-600 italic mb-6">
              Powerful from day one.
            </p>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              No technical setup. No developer. No long implementation project. Your AI agent is live in minutes — trained on your content, deployed on your channels.
            </p>
          </div>

          <div className="bg-amber-100 border border-amber-300 rounded-lg px-4 py-3 inline-block mx-auto mt-4">
            <p className="text-sm sm:text-base text-slate-800 font-semibold">
              Most customers are live within 10 minutes of signing up
            </p>
          </div>
        </div>
      </section>

      {/* 3 STEPS SECTION */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20 sm:pb-28 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-amber-100 to-amber-50 border-2 border-amber-200 rounded-3xl p-8 sm:p-10"
            >
              <div className="text-5xl mb-6">{step.icon}</div>
              
              <h3 className="text-2xl font-serif font-semibold text-slate-900 mb-4">
                {step.title}
              </h3>

              <p className="text-slate-700 mb-6 leading-relaxed">
                {step.description}
              </p>

              <ul className="space-y-3">
                {step.points.map((point, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <span className="text-amber-600 font-bold mt-1">•</span>
                    <span className="text-sm text-slate-700">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* WHY ADVAISOR DIFFERENT */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs sm:text-sm font-mono font-semibold text-amber-600 uppercase tracking-widest block mb-4">
              WHAT MAKES ADVAISOR DIFFERENT
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-slate-900 mb-4">
              Built around <span className="italic text-amber-600">your knowledge</span>
            </h2>
            <p className="text-xl sm:text-2xl font-serif font-light text-slate-700">
              Not generic AI
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {differences.map((item, index) => (
              <div key={index} className="bg-slate-50 border border-amber-100 rounded-2xl p-8">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-serif font-semibold text-slate-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RESULTS SECTION */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 sm:py-28 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs sm:text-sm font-mono font-semibold text-amber-400 uppercase tracking-widest block mb-4">
              WHAT CUSTOMERS EXPERIENCE
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light mb-2">
              Real results.
            </h2>
            <p className="text-xl sm:text-2xl font-serif font-light text-amber-400 italic">
              Right from the start.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {results.map((result, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl sm:text-6xl font-serif font-light text-amber-400 mb-3">
                  {result.stat}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {result.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BEFORE YOU START SECTION */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 sm:py-28 max-w-7xl mx-auto">
        <div className="mb-16">
          <div className="text-center mb-12">
            <span className="text-xs sm:text-sm font-mono font-semibold text-amber-600 uppercase tracking-widest block mb-4">
              BEFORE YOU START
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-slate-900 mb-4">
              Questions we hear <span className="italic text-amber-600">before the trial</span>
            </h2>
          </div>

          <div className="space-y-3 mb-8">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white border border-amber-100 rounded-2xl overflow-hidden hover:shadow-lg transition"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 sm:px-8 py-4 sm:py-5 flex justify-between items-center text-left hover:bg-amber-50 transition"
                >
                  <span className="font-semibold text-slate-900 text-sm sm:text-base">
                    {faq.q}
                  </span>
                  <ChevronDown
                    size={20}
                    className={`text-amber-600 flex-shrink-0 transition ${
                      expandedFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                
                {expandedFaq === index && (
                  <div className="px-6 sm:px-8 py-4 border-t border-amber-100 bg-amber-50">
                    <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Trust Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: '🔐',
              title: 'Your data is private',
              desc: 'What you upload stays yours. Never shared, never used to train other customers agents.'
            },
            {
              icon: '✓',
              title: 'No hallucinations',
              desc: 'Your agent only answers from your content. It does not guess, invent, or go beyond what you have taught it.'
            },
            {
              icon: '✋',
              title: 'Cancel anytime',
              desc: 'No long term contracts. No exit fees. Start free, upgrade when you see value, leave if you ever want to.'
            }
          ].map((item, index) => (
            <div key={index} className="bg-slate-900 rounded-2xl p-8 text-white">
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="font-semibold text-lg mb-3">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 sm:py-28 bg-gradient-to-r from-amber-500 to-amber-600 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-serif font-light mb-4">
            See it working on <span className="italic">your content</span>
          </h2>
          <p className="text-base sm:text-lg mb-8 opacity-95 leading-relaxed">
            Free 14-day trial. No credit card. Your first agent live in 10 minutes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => router.push("/survey")} className="px-8 py-3 bg-white text-amber-600 rounded-lg font-semibold hover:bg-gray-100 transition">
              Find My Agent
            </button>
            <button className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-amber-600 transition">
              View Demo
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="font-serif font-semibold text-lg mb-4">advAIsor</h3>
              <p className="text-sm text-gray-400">
                The ultimate AI advisory platform designed for modern teams and growing agencies.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/" className="hover:text-white transition">Home</Link></li>
                <li><Link href="/use-cases" className="hover:text-white transition">Use Cases</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition">Pricing</Link></li>
                <li><Link href="/how-it-works" className="hover:text-white transition">How It Works</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="#" className="hover:text-white transition">Contact Us</Link></li>
                <li><Link href="#" className="hover:text-white transition">Partner with Us</Link></li>
                <li><Link href="#" className="hover:text-white transition">Support and Help</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="#" className="hover:text-white transition">Terms & Conditions</Link></li>
                <li><Link href="#" className="hover:text-white transition">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2026 advAIsor. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
