'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronRight } from 'lucide-react';
import { useRouter } from "next/router";

export default function UseCasesPage() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Customer Support', 'Sales & Marketing', 'Internal Operations', 'Field & Learning'];

  const useCases = [
    {
      title: 'Customer Support Agent',
      description: '24/7 AI handles FAQs, policy questions, order status. Reduces support tickets by 70%, improves response time to instant.',
      icon: '💬',
      category: 'Customer Support',
      benefits: ['70% fewer tickets', 'Instant response', 'Available 24/7', 'Multilingual'],
      industry: 'E-commerce, SaaS, Retail'
    },
    {
      title: 'Sales Qualification Agent',
      description: 'Pre-qualifies leads, answers pricing questions, books demos. Keeps sales team focused on closing deals.',
      icon: '🎯',
      category: 'Sales & Marketing',
      benefits: ['Qualified leads', 'Demo bookings', 'Instant responses', 'Lead scoring'],
      industry: 'B2B SaaS, Enterprises'
    },
    {
      title: 'Internal Knowledge Bot',
      description: 'Staff query policies, SOPs, benefits instantly. Reduces HR ticket volume by 60%, boosts employee productivity.',
      icon: '📚',
      category: 'Internal Operations',
      benefits: ['60% fewer tickets', 'Instant answers', 'Always available', 'Searchable docs'],
      industry: 'Large enterprises, Distributed teams'
    },
    {
      title: 'HR & Benefits Agent',
      description: 'Leave, payroll, benefits questions answered instantly. Works across time zones, 24/7 availability.',
      icon: '👥',
      category: 'Internal Operations',
      benefits: ['24/7 availability', 'Time zone coverage', 'Instant answers', 'Reduced support load'],
      industry: 'Enterprises, Remote teams'
    },
    {
      title: 'Field Engineer Support',
      description: 'Installation steps, error codes, manuals on mobile. Engineers get instant answers without calling HQ.',
      icon: '🔧',
      category: 'Field & Learning',
      benefits: ['Mobile access', 'Instant manuals', 'Error resolution', 'Offline ready'],
      industry: 'Manufacturing, Installation, Telecoms'
    },
    {
      title: 'Student Support Portal',
      description: 'Admissions, course info, schedules, campus questions answered 24/7. Reduces admission office load.',
      icon: '🎓',
      category: 'Field & Learning',
      benefits: ['Admissions support', 'Always available', 'Instant answers', 'Reduced staff load'],
      industry: 'Universities, Online schools'
    },
    {
      title: 'Course Content Agent',
      description: 'Students ask about lectures, assignments, grades. Supplement instructor support, improve learning outcomes.',
      icon: '📖',
      category: 'Field & Learning',
      benefits: ['24/7 tutoring', 'Instant answers', 'Personalized', 'Reduces load on instructors'],
      industry: 'EdTech, Universities'
    },
    {
      title: 'Website Visitor Agent',
      description: 'Welcome visitors, answer product questions, capture leads. Turns website into a lead generation machine.',
      icon: '🌐',
      category: 'Sales & Marketing',
      benefits: ['Lead capture', 'Product info', 'Visitor engagement', 'Lead qualification'],
      industry: 'All industries'
    },
    {
      title: 'Policy & Compliance Advisor',
      description: 'Employees, partners, customers get instant policy answers. Ensures compliance without overwhelming HR.',
      icon: '⚖️',
      category: 'Internal Operations',
      benefits: ['Compliance assured', 'Instant answers', 'Audit trails', 'Policy distribution'],
      industry: 'Finance, Healthcare, Insurance'
    },
    {
      title: 'Product Documentation Agent',
      description: 'Users find answers in your docs without searching. Reduces support tickets, improves customer satisfaction.',
      icon: '📋',
      category: 'Customer Support',
      benefits: ['Reduced support', 'Improved satisfaction', 'Self-service', 'Better UX'],
      industry: 'Software, SaaS, Tech'
    },
    {
      title: 'Recruitment Assistant',
      description: 'Answer candidate questions about roles, culture, process. Accelerates hiring pipeline, improves candidate experience.',
      icon: '💼',
      category: 'Sales & Marketing',
      benefits: ['Faster hiring', 'Better candidates', 'Improved experience', 'Reduced time-to-hire'],
      industry: 'Tech, Professional services'
    },
    {
      title: 'Customer Onboarding Agent',
      description: 'Guide new customers through setup, best practices, features. Improves time-to-value, reduces churn.',
      icon: '🚀',
      category: 'Customer Support',
      benefits: ['Better onboarding', 'Time-to-value', 'Reduced churn', 'Upsell opportunities'],
      industry: 'SaaS, Software, Services'
    },
  ];

  const filteredCases = activeCategory === 'All' 
    ? useCases 
    : useCases.filter(uc => uc.category === activeCategory);

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
            <Link href="/use-cases" className="text-sm text-amber-600 font-semibold">
              Use Cases
            </Link>
            <Link href="/how-it-works" className="text-sm text-slate-600 hover:text-slate-900 transition">
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
              <Link href="/use-cases" className="text-sm text-amber-600 font-semibold">
                Use Cases
              </Link>
              <Link href="/how-it-works" className="text-sm text-slate-600 hover:text-slate-900">
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
              USE CASES
            </span>
          </div>

          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-slate-900 leading-tight mb-4">
              Every knowledge need.
              <br />
              <span className="italic text-amber-500">One platform.</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              From customer support to internal wikis, from sales to field operations. Each use case is a separate AI agent, trained on your knowledge, deployed where your users live.
            </p>
          </div>
        </div>
      </section>

      {/* CATEGORY FILTER */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 max-w-7xl mx-auto">
        <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 sm:px-6 py-2 rounded-full text-sm font-semibold transition ${
                activeCategory === cat
                  ? 'bg-amber-500 text-white'
                  : 'bg-white border border-amber-200 text-slate-600 hover:border-amber-500'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* USE CASES GRID */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20 sm:pb-28 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCases.map((useCase, index) => (
            <div
              key={index}
              className="bg-white border border-amber-100 rounded-3xl p-8 sm:p-10 hover:shadow-xl hover:-translate-y-1 transition group cursor-pointer h-full flex flex-col"
            >
              {/* Icon & Title */}
              <div className="mb-6">
                <div className="text-5xl mb-4">{useCase.icon}</div>
                <h3 className="text-xl sm:text-2xl font-serif font-semibold text-slate-900 group-hover:text-amber-600 transition mb-2">
                  {useCase.title}
                </h3>
                <p className="text-xs sm:text-sm font-mono text-amber-600 font-semibold">
                  {useCase.category === 'All' ? 'All Roles' : useCase.category}
                </p>
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6 flex-grow">
                {useCase.description}
              </p>

              {/* Benefits */}
              <div className="mb-6 pb-6 border-t border-amber-100">
                <div className="space-y-2">
                  {useCase.benefits.map((benefit, i) => (
                    <div key={i} className="flex gap-2 items-start">
                      <span className="text-amber-500 mt-1">✓</span>
                      <span className="text-sm text-slate-600">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Industry */}
              <div className="flex justify-between items-center pt-4 border-t border-amber-100">
                <p className="text-xs text-slate-500">
                  <span className="font-semibold text-slate-600">Industry:</span> {useCase.industry}
                </p>
                <ChevronRight size={18} className="text-amber-500 group-hover:translate-x-1 transition" />
              </div>
            </div>
          ))}
        </div>

        {filteredCases.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-600 mb-4">No use cases found in this category.</p>
            <button
              onClick={() => setActiveCategory('All')}
              className="px-6 py-2 bg-amber-500 text-white rounded-lg font-semibold hover:bg-amber-600 transition"
            >
              View All Use Cases
            </button>
          </div>
        )}
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 sm:py-28 bg-gradient-to-r from-amber-50 to-white border-y border-amber-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-serif font-light text-center text-slate-900 mb-4">
            How to build <span className="italic text-amber-600">your use case</span>
          </h2>
          <p className="text-center text-slate-600 mb-12">
            Each agent follows the same simple process
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                num: '1',
                title: 'Upload Your Knowledge',
                desc: 'Documents, website, Google Drive, Notion — we read everything.'
              },
              {
                num: '2',
                title: 'Train Your Agent',
                desc: 'AI learns your content, adopts your tone, learns your guardrails.'
              },
              {
                num: '3',
                title: 'Test & Refine',
                desc: 'Try 10 suggested questions. Rate responses. Improve accuracy.'
              },
              {
                num: '4',
                title: 'Deploy Anywhere',
                desc: 'Website widget, WhatsApp, email, Slack. No code needed.'
              },
            ].map((step, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-amber-100">
                <div className="w-12 h-12 bg-amber-500 text-white rounded-full flex items-center justify-center font-serif text-xl font-semibold mb-4">
                  {step.num}
                </div>
                <h3 className="font-semibold text-slate-900 mb-2 text-lg">{step.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY ADVISOR SECTION */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 sm:py-28 max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-3xl sm:text-4xl font-serif font-light text-slate-900 mb-4">
            Why advAIsor for <span className="italic text-amber-600">use cases</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl">
            Built specifically for teams who need multiple agents doing different jobs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: 'One Platform, Many Agents',
              desc: 'Run customer support + HR + sales agents on one platform. Each with its own training, guardrails, and deployment.'
            },
            {
              title: 'Priced Per Agent',
              desc: 'Not per account. Your support agent on Growth plan doesn\'t subsidize your sales agent. Pay only for what you use.'
            },
            {
              title: 'Deploy Anywhere',
              desc: 'Website widget, WhatsApp Business, email, Slack, SharePoint. Your agents live where your users are.'
            },
            {
              title: 'Easy Customization',
              desc: 'Brand your agents, set guardrails, control tone. You control the user experience.'
            },
            {
              title: 'Real-time Analytics',
              desc: 'See what questions agents get asked. Monitor accuracy. Improve over time.'
            },
            {
              title: 'Enterprise Ready',
              desc: 'SSO, audit logs, data sovereignty options. Works for regulated industries.'
            },
          ].map((item, i) => (
            <div key={i} className="bg-gradient-to-br from-amber-50 to-white border border-amber-200 rounded-2xl p-8">
              <h3 className="text-xl font-serif font-semibold text-slate-900 mb-3">{item.title}</h3>
              <p className="text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* RESULTS SECTION */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 sm:py-28 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-serif font-light text-center mb-16">
            Expected Results
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                stat: '70%',
                label: 'Reduction in Support Tickets',
                desc: 'AI handles repetitive questions, your team focuses on complex issues.'
              },
              {
                stat: '24/7',
                label: 'Availability',
                desc: 'Agents work around the clock, weekends, holidays. No downtime.'
              },
              {
                stat: '5 min',
                label: 'Setup Time',
                desc: 'Your first agent is live and answering in 5 minutes, not weeks.'
              },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="text-5xl sm:text-6xl font-serif font-light text-amber-400 mb-2">
                  {item.stat}
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.label}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 p-8 bg-white bg-opacity-10 rounded-2xl border border-amber-500 border-opacity-30 text-center">
            <p className="text-lg mb-6">
              Each use case reduces operational cost. Together, they transform how your company operates.
            </p>
            <button onClick={() => router.push("/survey")} className="px-8 py-3 bg-amber-500 text-slate-900 rounded-lg font-semibold hover:bg-amber-400 transition">
              Start Your First Use Case →
            </button>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 sm:py-28 bg-amber-100 border-y-4 border-amber-400">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-serif font-light text-slate-900 mb-4">
            Ready to deploy your first <span className="italic text-amber-600">agent</span>?
          </h2>
          <p className="text-slate-700 mb-8 leading-relaxed">
            14-day free trial. No credit card. Your agent live in 10 minutes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => router.push("/survey")} className="px-8 py-3 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition">
              Start Free Trial
            </button>
            <button onClick={() => router.push("/survey")} className="px-8 py-3 border-2 border-slate-900 text-slate-900 rounded-lg font-semibold hover:bg-slate-900 hover:text-white transition">
              Discover Your Use Case
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
