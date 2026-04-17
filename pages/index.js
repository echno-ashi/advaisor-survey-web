'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useRouter } from "next/router";



export default function HomePage() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roiData, setRoiData] = useState({
    inquiries: 500,
    timePerInquiry: 15,
    hourlyRate: 150,
  });

  const calculateROI = () => {
    const totalTime = (roiData.inquiries * roiData.timePerInquiry) / 60;
    const totalSavings = totalTime * roiData.hourlyRate * 0.8; // 80% deflection
    const hoursSaved = totalTime * 0.8;
    return {
      savings: Math.round(totalSavings),
      hours: Math.round(hoursSaved),
    };
  };

  const roi = calculateROI();

  const useCases = [
    {
      title: 'Customer support',
      desc: '24/7 AI resolves queries, FAQs, escalations. Zero wait time.',
      icon: '💬',
    },
    {
      title: 'Sales agent',
      desc: 'Answers pricing, guides product selection, books demos.',
      icon: '🎯',
    },
    {
      title: 'Internal wiki',
      desc: 'Staff query policies, SOPs, internal docs instantly.',
      icon: '📚',
    },
    {
      title: 'HR agent',
      desc: 'Leave, payroll, onboarding, benefits across time zones.',
      icon: '👥',
    },
    {
      title: 'Field force agent',
      desc: 'Manuals, error codes, installation steps on mobile.',
      icon: '📱',
    },
    {
      title: 'Student support',
      desc: 'Admissions, course info, schedules answered 24/7.',
      icon: '🎓',
    },
    {
      title: 'Course content agent',
      desc: 'Answers from lectures, syllabus, assignments.',
      icon: '📖',
    },
    {
      title: 'Website Agent',
      desc: 'Answers visitors, captures leads.',
      icon: '🌐',
    },
  ];

  const problems = [
    {
      problem: 'My team spends all day answering the same questions',
      solution: 'Agent handles 70–80% of repetitive queries 24/7',
      color: 'from-amber-100 to-amber-50',
    },
    {
      problem: 'Teams struggle to find information',
      solution: 'Train on SharePoint, Notion, Google Drive → instant answers',
      color: 'from-amber-100 to-amber-50',
    },
    {
      problem: 'Field engineers depend on HQ',
      solution: 'Agent provides manuals, error codes, steps on mobile',
      color: 'from-amber-100 to-amber-50',
    },
    {
      problem: 'We lose leads overnight',
      solution: 'Sales agent answers, qualifies, books demos automatically',
      color: 'from-amber-100 to-amber-50',
    },
  ];

  const steps = [
    { num: '1', title: 'Create Package', desc: 'Get started by naming and describing your package' },
    { num: '2', title: 'Theme Configuration', desc: 'Get started by naming and describing your package' },
    { num: '3', title: 'Knowledge Upload', desc: 'Get started by naming and describing your package' },
    { num: '4', title: 'Data Processing', desc: 'Get started by naming and describing your package' },
  ];

  const howItWorks = [
    {
      title: 'Upload your knowledge',
      desc: 'Upload your documents, paste your website URL, or connect Google Drive, SharePoint, or Notion. advAIsor reads everything.',
      points: ['PDF, DOCX, TXT, CSV, XLSX', 'Website URL we crawl all pages', 'SharePoint, Notion, Google Drive'],
      icon: '📝',
    },
    {
      title: 'AI learns in minutes',
      desc: 'Your agent trains on your content, adopts your tone, and learns your guardrails. Test it before going live.',
      points: ['10 suggested test questions per use case', 'Rate responses to improve accuracy', 'Preview on desktop and mobile'],
      icon: '🧠',
    },
    {
      title: 'Deploy anywhere',
      desc: 'One script tag on your website. Shareable URL for WhatsApp. No developer required.',
      points: ['Website widget (one line of code)', 'Hosted URL for WhatsApp/email', 'WordPress, Shopify, Webflow, Wix'],
      icon: '🚀',
    },
  ];

  const integrations = [
    { name: 'Slack', icon: '💬' },
    { name: 'Notion', icon: '📄' },
    { name: 'Salesforce', icon: '🔗' },
    { name: 'HubSpot', icon: '🔄' },
    { name: 'Zendesk', icon: '🎧' },
    { name: 'Google Drive', icon: '☁️' },
    { name: 'Shopify', icon: '🛍️' },
    { name: 'WordPress', icon: '📝' },
  ];


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
              <Link href="/use-cases" className="text-sm text-slate-600 hover:text-slate-900">
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
      <section className="pt-12 sm:pt-20 lg:pt-28 pb-12 sm:pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="space-y-8 sm:space-y-12">
          {/* Small tag */}
          <div className="inline-block">
            <span className="text-xs sm:text-sm font-mono font-semibold text-amber-600 uppercase tracking-widest">
              AI AGENTS TRAINED ON YOUR KNOWLEDGE
            </span>
          </div>

          {/* Main Heading */}
          <div className="space-y-4 sm:space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-slate-900 leading-tight">
              Your Knowledge
              <br />
              <span className="italic text-amber-500">Answered Instantly.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
              Train an AI on your documents, website, or internal data. Deploy it on your website, WhatsApp, or any channel. In 10 minutes.
            </p>
          </div>

          {/* CTA Button */}
          <div>
            <button onClick={() => router.push("/survey")} className="px-8 py-3 bg-amber-500 text-white rounded-lg font-semibold hover:bg-amber-600 transition shadow-lg hover:shadow-xl">
              Hello! 👋
            </button>
          </div>
        </div>

        {/* Hero Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 sm:mt-24">
          {[
            {
              title: 'Add a chatbot',
              desc: 'I want visitors to get instant answers. Quick setup, fast results – upload my content and go live.',
            },
            {
              title: 'Configure my agent',
              desc: 'I have a specific use case – support, internal wiki, HR, field operations. Help me set it up properly.',
            },
            {
              title: 'Can AI help my business',
              desc: 'I have a business problem. Show me what it costs and what AI saves.',
            },
          ].map((card, i) => (
            <div key={i} className="bg-white border border-amber-100 rounded-2xl p-6 sm:p-8 hover:shadow-lg transition group cursor-pointer">
              <h3 className="text-lg sm:text-xl font-serif font-semibold text-slate-900 mb-3 group-hover:text-amber-600 transition">
                {card.title}
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>

        {/* Trial Info */}
        <div className="mt-8 text-center text-xs sm:text-sm text-slate-600 space-y-2">
          <p className="font-semibold">Free 14-day trial • No credit card • No developer needed • Cancel anytime</p>
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white border-y border-amber-100">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-slate-900 mb-4">
              Experience the platform
            </h2>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl">
              See how easy it is to set up your first advAIsor with our intuitive, beautiful interface designed for clarity.
            </p>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-3xl p-8 sm:p-12 lg:p-16">
            <h3 className="text-2xl sm:text-3xl font-serif font-semibold text-slate-900 mb-2">
              Set up your first advAIsor
            </h3>
            <p className="text-slate-600 mb-12">Start your journey with just 5 simple steps</p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {steps.map((step, i) => (
                <div key={i} className="relative">
                  <div className="bg-white rounded-2xl p-6 h-full">
                    <div className="w-10 h-10 bg-amber-500 text-white rounded-full flex items-center justify-center font-semibold mb-4">
                      {step.num}
                    </div>
                    <h4 className="text-lg font-semibold text-slate-900 mb-2">{step.title}</h4>
                    <p className="text-sm text-slate-600">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button onClick={() => router.push("/survey")} className="mt-8 px-6 py-3 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition">
              Continue
            </button>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 sm:mb-16">
            <span className="text-xs sm:text-sm font-mono font-semibold text-amber-600 uppercase tracking-widest">
              How It Works
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-slate-900 mt-2">
              From scattered knowledge to <span className="italic text-amber-500">Structured Intelligence.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
            {howItWorks.map((item, i) => (
              <div key={i} className="space-y-6">
                <div className="text-5xl">{item.icon}</div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-serif font-semibold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed mb-4">{item.desc}</p>
                  <ul className="space-y-2">
                    {item.points.map((point, j) => (
                      <li key={j} className="text-sm text-slate-600 flex gap-2">
                        <span className="text-amber-500">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 sm:mt-16 text-center">
            <p className="text-lg text-slate-700 mb-4">Add an agent available 24/7 for your customers</p>
            <button onClick={() => router.push("/survey")} className="px-8 py-3 bg-amber-500 text-white rounded-lg font-semibold hover:bg-amber-600 transition">
              Discover my Agent →
            </button>
          </div>
        </div>
      </section>

      {/* USE CASES SECTION */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-amber-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 sm:mb-16">
            <span className="text-xs sm:text-sm font-mono font-semibold text-amber-600 uppercase tracking-widest">
              Use Cases
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-slate-900 mt-2">
              One Platform <span className="italic text-amber-500">Every knowledge need</span>
            </h2>
            <p className="text-slate-600 mt-4 max-w-3xl">
              Each use case is a separate AI agent, trained on your specific content, configured with the right guardrails, deployed where your audience lives.
            </p>
          </div>

          {/* Tabs placeholder */}
          <div className="flex gap-2 mb-12 overflow-x-auto pb-4">
            {['All Agents', 'For Customers', 'For your team', 'For the field', 'For learning'].map((tab) => (
              <button
                key={tab}
                className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 border-b-2 border-transparent hover:border-amber-500 transition whitespace-nowrap"
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Use Case Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((useCase, i) => (
              <div
                key={i}
                className="bg-white border border-amber-100 rounded-2xl p-6 sm:p-8 hover:shadow-lg hover:-translate-y-1 transition group cursor-pointer"
              >
                <div className="text-4xl mb-4">{useCase.icon}</div>
                <h3 className="text-lg sm:text-xl font-serif font-semibold text-slate-900 mb-3 group-hover:text-amber-600 transition">
                  {useCase.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{useCase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY ADVAISOR SECTION */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 sm:mb-16">
            <span className="text-xs sm:text-sm font-mono font-semibold text-amber-600 uppercase tracking-widest">
              Why advAIsor
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-slate-900 mt-2">
              The problems <span className="italic text-amber-500">we eliminate.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {problems.map((item, i) => (
              <div key={i} className={`bg-gradient-to-br ${item.color} rounded-3xl p-8 sm:p-10`}>
                <div className="w-12 h-12 bg-white bg-opacity-50 rounded-full flex items-center justify-center mb-6 text-2xl">
                  💡
                </div>
                <p className="text-slate-900 font-semibold mb-4 text-lg">"{item.problem}"</p>
                <p className="text-slate-700">
                  <span className="font-semibold text-amber-700">Solution:</span> {item.solution}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI CALCULATOR SECTION */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Input Form */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light mb-4">ROI Calculator</h2>
                <p className="text-gray-300">Calculate your impact</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Monthly Inquiries</label>
                  <input
                    type="number"
                    value={roiData.inquiries}
                    onChange={(e) => setRoiData({ ...roiData, inquiries: Number(e.target.value) })}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Average Time per Inquiry (mins)</label>
                  <input
                    type="number"
                    value={roiData.timePerInquiry}
                    onChange={(e) => setRoiData({ ...roiData, timePerInquiry: Number(e.target.value) })}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Hourly Rate / Value ($)</label>
                  <input
                    type="number"
                    value={roiData.hourlyRate}
                    onChange={(e) => setRoiData({ ...roiData, hourlyRate: Number(e.target.value) })}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <button className="w-full px-6 py-3 bg-amber-500 text-slate-900 rounded-lg font-semibold hover:bg-amber-400 transition">
                  Calculate ROI
                </button>
              </div>
            </div>

            {/* Results */}
            <div className="bg-slate-800 rounded-3xl p-8 sm:p-12 flex flex-col justify-center">
              <div className="space-y-6">
                <div>
                  <p className="text-gray-400 text-sm mb-2">Estimated Monthly Savings</p>
                  <p className="text-5xl sm:text-6xl font-serif font-light text-amber-400">${roi.savings.toLocaleString()}</p>
                </div>

                <div className="border-t border-slate-700 pt-6 space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Hours Saved</span>
                    <span className="font-semibold">{roi.hours} hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Deflection Rate</span>
                    <span className="font-semibold">80%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Time to Value</span>
                    <span className="font-semibold">Immediate</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTEGRATIONS SECTION */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 sm:mb-16">
            <span className="text-xs sm:text-sm font-mono font-semibold text-amber-600 uppercase tracking-widest">
              Integrations
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-slate-900 mt-2">
              Works with the <span className="italic text-amber-500">Tools you already use</span>
            </h2>
            <p className="text-slate-600 mt-4 max-w-2xl">
              Connect your agent to your existing stack in minutes. No custom development, no IT project. Your agent fits in.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
            {integrations.map((int, i) => (
              <div
                key={i}
                className="bg-white border border-amber-100 rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center gap-3 hover:shadow-lg transition cursor-pointer group"
              >
                <span className="text-4xl sm:text-5xl group-hover:scale-110 transition">{int.icon}</span>
                <span className="text-sm sm:text-base font-semibold text-slate-900">{int.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FIND MY AGENT SECTION */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-amber-50 to-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <span className="text-xs sm:text-sm font-mono font-semibold text-amber-600 uppercase tracking-widest">
              Find My Agent
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-slate-900 mt-2">
              Find your AI Agent
            </h2>
            <p className="text-slate-600 mt-4">Not sure which agent you need? We'll figure it out.</p>
            <p className="text-sm text-slate-500 mt-2">3–4 questions • Free trial included • No account needed</p>
          </div>

          <div className="bg-white border-2 border-amber-200 rounded-3xl p-8 sm:p-12">
            <h3 className="text-xl sm:text-2xl font-serif font-semibold text-slate-900 mb-6">
              What's the biggest time drain for your team?
            </h3>

            <div className="space-y-3 mb-8">
              {[
                'Answering same customer questions repeatedly',
                "Staff can't find internal information fast enough",
                'Losing leads because no one responds fast enough',
                'Field teams calling HQ for manuals and guidance',
              ].map((option, i) => (
                <label key={i} className="flex items-center gap-3 p-3 border border-amber-100 rounded-lg hover:bg-amber-50 cursor-pointer transition">
                  <input type="radio" name="problem" className="w-4 h-4 cursor-pointer" />
                  <span className="text-slate-700">{option}</span>
                </label>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={() => router.push("/survey")} className="flex-1 px-6 py-3 bg-amber-500 text-white rounded-lg font-semibold hover:bg-amber-600 transition">
                Discover My Agent →
              </button>
              <button className="flex-1 px-6 py-3 border-2 border-amber-500 text-amber-600 rounded-lg font-semibold hover:bg-amber-50 transition">
                Contact Sales
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-3">
              <button className="flex-1 px-6 py-3 text-slate-600 hover:text-slate-900 font-semibold">Book A Demo</button>
              <button className="flex-1 px-6 py-3 text-slate-400 hover:text-slate-600 font-semibold">Not Now</button>
            </div>
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
                <li>
                  <Link href="#" className="hover:text-white transition">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-white transition">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition">
                    Integrations
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition">
                    Changelog
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition">
                    Partners
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition">
                    Terms
                  </Link>
                </li>
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
