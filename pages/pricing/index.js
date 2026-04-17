'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from "next/router";

export default function PricingPage() {
  const router = useRouter();
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [estimatedVisitors, setEstimatedVisitors] = useState(50);
  const [questionsPerVisitor, setQuestionsPerVisitor] = useState(50);

  const calculateQueries = () => {
    return Math.ceil(estimatedVisitors * questionsPerVisitor);
  };

  const getRecommendation = () => {
    const queries = calculateQueries();
    if (queries <= 500) return { plan: 'MINI', price: 39, queries: 500 };
    if (queries <= 2000) return { plan: 'STARTER', price: 79, queries: 2000 };
    if (queries <= 10000) return { plan: 'GROWTH', price: 199, queries: 10000 };
    return { plan: 'PRO', price: 499, queries: 50000 };
  };

  const annualDiscount = 0.2;
  const recommendation = getRecommendation();
  const estimatedQueries = calculateQueries();

  const pricingPlans = [
    {
      name: 'MINI',
      price: 39,
      monthlyPrice: 39,
      annualPrice: Math.round(39 * 12 * (1 - annualDiscount)),
      description: 'Neighbourhood businesses — restaurants, local shops, sole traders.',
      cta: 'Start 14-day trial',
      highlighted: false,
      queries: 500,
      documents: 10,
      kb: '25 MB',
      limitType: 'Hard',
      features: [
        'Website widget',
        'Hosted URL',
        'Basic analytics',
        'WhatsApp',
        'CRM integrations',
        'Cloud connectors',
      ],
    },
    {
      name: 'STARTER',
      price: 79,
      monthlyPrice: 79,
      annualPrice: Math.round(79 * 12 * (1 - annualDiscount)),
      description: 'Small businesses making the agent part of daily operations.',
      cta: 'Choose This Plan',
      highlighted: false,
      queries: 2000,
      documents: 20,
      kb: '100 MB',
      limitType: 'Soft + overage',
      features: [
        'Widget + hosted URL + inline',
        'WhatsApp Business',
        'Standard analytics',
        'CRM integrations',
        'Cloud connectors',
        'Priority support',
      ],
    },
    {
      name: 'GROWTH',
      price: 199,
      monthlyPrice: 199,
      annualPrice: Math.round(199 * 12 * (1 - annualDiscount)),
      description: 'Established businesses running agents as core operations.',
      cta: 'Choose This Plan',
      highlighted: true,
      badge: 'MOST POPULAR',
      queries: 10000,
      documents: 100,
      kb: '500 MB',
      limitType: 'Soft + overage',
      features: [
        'All deployment surfaces',
        'Full analytics + logs',
        'All integrations + cloud',
      ],
    },
    {
      name: 'PRO',
      price: 499,
      monthlyPrice: 499,
      annualPrice: Math.round(499 * 12 * (1 - annualDiscount)),
      description: 'High traffic deployments needing enterprise grade capability.',
      cta: 'Choose This Plan',
      highlighted: false,
      queries: 50000,
      documents: 500,
      kb: '2 GB',
      limitType: 'Fair usage',
      features: [
        'Everything in Growth',
        'SSO / SAML',
        'Custom webhooks',
        'Dedicated account manager',
        '99.9% uptime SLA',
        'Audit logs',
      ],
    },
  ];

  const faqItems = [
    {
      q: 'Can I change plans anytime?',
      a: 'Yes, you can upgrade or downgrade your plan anytime. Changes take effect at your next billing cycle.',
    },
    {
      q: 'What happens if I go over my query limit?',
      a: 'On Starter and Growth plans, you can pay for additional queries (soft limit). Mini plan has hard limits and will stop accepting queries.',
    },
    {
      q: 'Is the 14-day trial really free?',
      a: 'Yes, completely free. No credit card required. Your agent goes live in 10 minutes.',
    },
    {
      q: 'Do I pay per account or per agent?',
      a: 'Per agent. Each AI agent package has its own plan. Multiple agents = multiple plans.',
    },
    {
      q: 'What counts as a query?',
      a: '1 question = 1 query. Simple math. A visitor asking 10 questions = 10 queries.',
    },
    {
      q: 'Is there an annual discount?',
      a: 'Yes! Annual billing saves 20% compared to monthly. Paid upfront.',
    },
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
            <Link href="#" className="text-sm text-slate-600 hover:text-slate-900 transition">
              Use Cases
            </Link>
            <Link href="#" className="text-sm text-slate-600 hover:text-slate-900 transition">
              How It Works
            </Link>
            <Link href="/pricing" className="text-sm text-amber-600 font-semibold">
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
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="pt-12 sm:pt-20 lg:pt-28 pb-12 sm:pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="space-y-4 sm:space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-slate-900 leading-tight">
            One price per agent
          </h1>
          <p className="text-lg sm:text-xl text-amber-600 italic font-serif font-light">
            No surprises.
          </p>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Each package is priced independently. Pay only for what each agent needs. Scale one without paying for all.
          </p>
        </div>
      </section>

      {/* BILLING TOGGLE */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 flex justify-center">
        <div className="flex gap-4 items-center bg-white border border-amber-100 rounded-lg p-2">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-6 py-2 rounded-md font-semibold text-sm transition ${
              billingCycle === 'monthly'
                ? 'bg-amber-500 text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('annually')}
            className={`px-6 py-2 rounded-md font-semibold text-sm transition ${
              billingCycle === 'annually'
                ? 'bg-amber-500 text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Annually
          </button>
          <span className="ml-4 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-semibold">
            Save 20%
          </span>
        </div>
      </section>

      {/* PRICING CARDS */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20 sm:pb-28 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
          {pricingPlans.map((plan) => {
            const displayPrice = billingCycle === 'monthly' ? plan.monthlyPrice : Math.floor(plan.annualPrice / 12);
            const displayTotal = billingCycle === 'monthly' ? `$${plan.monthlyPrice}` : `$${plan.annualPrice}`;
            
            return (
              <div
                key={plan.name}
                className={`rounded-3xl p-8 transition flex flex-col h-full ${
                  plan.highlighted
                    ? 'bg-slate-900 text-white border-2 border-amber-500 shadow-2xl'
                    : 'bg-white border border-amber-100 hover:shadow-lg'
                }`}
              >
                {plan.badge && (
                  <div className="mb-4">
                    <span className={`text-xs font-bold tracking-wider ${
                      plan.highlighted ? 'text-amber-400' : 'text-amber-600'
                    }`}>
                      {plan.badge}
                    </span>
                  </div>
                )}

                <h3 className={`text-2xl font-serif font-semibold mb-2 ${
                  plan.highlighted ? 'text-white' : 'text-slate-900'
                }`}>
                  {plan.name}
                </h3>

                <p className={`text-sm mb-6 leading-relaxed ${
                  plan.highlighted ? 'text-gray-300' : 'text-slate-600'
                }`}>
                  {plan.description}
                </p>

                <div className="mb-6">
                  <div className="text-4xl font-serif font-light mb-2">
                    <span className={plan.highlighted ? 'text-white' : 'text-slate-900'}>
                      ${displayPrice}
                    </span>
                    <span className={`text-lg ml-2 ${
                      plan.highlighted ? 'text-gray-400' : 'text-slate-600'
                    }`}>
                      /mo
                    </span>
                  </div>
                  {billingCycle === 'annually' && (
                    <p className={`text-sm ${
                      plan.highlighted ? 'text-gray-400' : 'text-slate-500'
                    }`}>
                      Billed {displayTotal}/year
                    </p>
                  )}
                </div>

                <button className={`w-full py-3 rounded-lg font-semibold mb-8 transition ${
                  plan.highlighted
                    ? 'bg-amber-500 text-slate-900 hover:bg-amber-400'
                    : 'bg-slate-900 text-white hover:bg-slate-800'
                }`}>
                  {plan.cta}
                </button>

                {/* Usage Limits */}
                <div className={`space-y-3 mb-8 pb-8 border-b ${
                  plan.highlighted ? 'border-gray-700' : 'border-amber-100'
                }`}>
                  <div className="flex justify-between text-sm">
                    <span className={plan.highlighted ? 'text-gray-300' : 'text-slate-600'}>
                      Queries/month
                    </span>
                    <span className={`font-semibold ${
                      plan.highlighted ? 'text-white' : 'text-slate-900'
                    }`}>
                      {plan.queries.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className={plan.highlighted ? 'text-gray-300' : 'text-slate-600'}>
                      Documents max
                    </span>
                    <span className={`font-semibold ${
                      plan.highlighted ? 'text-white' : 'text-slate-900'
                    }`}>
                      {plan.documents}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className={plan.highlighted ? 'text-gray-300' : 'text-slate-600'}>
                      Knowledge base
                    </span>
                    <span className={`font-semibold ${
                      plan.highlighted ? 'text-white' : 'text-slate-900'
                    }`}>
                      {plan.kb}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className={plan.highlighted ? 'text-gray-300' : 'text-slate-600'}>
                      Limit type
                    </span>
                    <span className={`font-semibold ${
                      plan.highlighted ? 'text-amber-400' : 'text-amber-600'
                    }`}>
                      {plan.limitType}
                    </span>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className={`text-lg mt-0.5 ${
                        plan.highlighted ? 'text-amber-400' : 'text-amber-600'
                      }`}>
                        ✓
                      </span>
                      <span className={`text-sm ${
                        plan.highlighted ? 'text-gray-300' : 'text-slate-600'
                      }`}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Pricing Model Explanation */}
        <div className="mt-20 p-8 sm:p-12 bg-amber-50 border-2 border-amber-200 rounded-3xl">
          <h3 className="text-2xl sm:text-3xl font-serif font-semibold text-slate-900 mb-4">
            💰 Priced per package — not per account
          </h3>
          <p className="text-slate-600 mb-6 leading-relaxed">
            Each AI agent package has its own plan. A business running three agents pays only for what each one uses — no shared limits, no overpaying for one to subsidize another.
          </p>
          <p className="text-slate-700 font-semibold bg-white p-4 rounded-lg border border-amber-100">
            Example: Support agent on Growth ($199) + HR wiki on Starter ($79) + website chatbot on Mini ($39) = $317/month for a fully AI-powered operation across all three channels.
          </p>
        </div>
      </section>

      {/* ENTERPRISE SECTION */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 sm:py-28 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light mb-6">
            ENTERPRISE
          </h2>
          <p className="text-lg mb-8 text-gray-300 leading-relaxed">
            Running 10+ agents? Need your data to never leave your environment?
          </p>

          <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-3xl p-12 mb-8">
            <p className="text-slate-900 text-base sm:text-lg leading-relaxed mb-8">
              The advAIsor Enterprise plan deploys entirely within your cloud infrastructure — AWS, Azure, GCP, or private servers. Your documents, conversations, and data never touch our servers.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-slate-900 mb-8">
              <div className="flex gap-3 items-start">
                <span className="text-2xl">✓</span>
                <div>
                  <p className="font-semibold">Complete data sovereignty</p>
                  <p className="text-sm">Your data never leaves your environment</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <span className="text-2xl">✓</span>
                <div>
                  <p className="font-semibold">Custom pricing</p>
                  <p className="text-sm">Built around your requirements</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <span className="text-2xl">✓</span>
                <div>
                  <p className="font-semibold">10+ agent packages</p>
                  <p className="text-sm">Scale without limits</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <span className="text-2xl">✓</span>
                <div>
                  <p className="font-semibold">Regulated industries welcome</p>
                  <p className="text-sm">HIPAA, SOC2, and more</p>
                </div>
              </div>
            </div>

            <button onClick={() => router.push("/survey")} className="px-8 py-3 bg-slate-900 text-amber-400 rounded-lg font-semibold hover:bg-slate-800 transition">
              Start a Trial →
            </button>
          </div>
        </div>
      </section>

      {/* UNDERSTANDING USAGE */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 sm:py-28 max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-serif font-light text-center text-slate-900 mb-4">
          What counts as a <span className="italic text-amber-600">query</span>?
        </h2>
        <p className="text-center text-slate-600 mb-12">
          No hidden multipliers. No token confusion. Just simple maths.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-slate-900 text-white rounded-3xl p-8 sm:p-12 mb-12">
          <div>
            <h3 className="font-serif text-2xl font-light mb-6">How queries add up</h3>
            <div className="space-y-4">
              <div>
                <p className="text-amber-400 font-semibold">1 visitor, 1 question</p>
                <p className="text-gray-300">= 1 query</p>
              </div>
              <div>
                <p className="text-amber-400 font-semibold">1 visitor, 10 questions</p>
                <p className="text-gray-300">= 10 queries</p>
              </div>
              <div>
                <p className="text-amber-400 font-semibold">100 visitors, 3 questions each</p>
                <p className="text-gray-300">= 300 queries</p>
              </div>
            </div>
          </div>

          <div className="bg-white bg-opacity-10 rounded-2xl p-6">
            <h4 className="font-semibold mb-4">Your dashboard shows</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2">
                <span className="text-amber-400">→</span>
                <span>Queries used this month</span>
              </li>
              <li className="flex gap-2">
                <span className="text-amber-400">→</span>
                <span>Queries remaining</span>
              </li>
              <li className="flex gap-2">
                <span className="text-amber-400">→</span>
                <span>Conversations started</span>
              </li>
              <li className="flex gap-2">
                <span className="text-amber-400">→</span>
                <span>Alert at 80% usage</span>
              </li>
            </ul>
            <p className="text-gray-300 text-xs mt-6">
              Mini plan serves roughly 166 visitors/mo (at 3 queries average per visitor)
            </p>
          </div>
        </div>
      </section>

      {/* WHAT HAPPENS ON DAY 15 */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 sm:py-28 max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-serif font-light text-center text-slate-900 mb-4">
          What happens on <span className="italic text-amber-600">day 15</span>?
        </h2>

        <div className="bg-amber-100 border-2 border-amber-300 rounded-3xl p-8 sm:p-12 mt-12">
          <p className="text-slate-900 mb-8 leading-relaxed">
            No hidden multipliers. No token confusion. Just simple maths.
          </p>

          <h3 className="text-2xl font-serif font-semibold text-slate-900 mb-8">
            Your Agent Stays Live
          </h3>

          <p className="text-slate-800 mb-8 leading-relaxed">
            On day 15, your package moves to a free tier: <span className="font-semibold">100 queries/month</span>, agent stays live. Your visitors continue getting answers. Your dashboard shows a banner to restore full capacity when you're ready. No disruption to your website, no unhappy visitors.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg">
              <p className="font-semibold text-amber-600 mb-2">✓</p>
              <p className="text-slate-900 font-semibold text-sm">Agent remains live</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <p className="font-semibold text-amber-600 mb-2">✓</p>
              <p className="text-slate-900 font-semibold text-sm">Visitors unaffected</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <p className="font-semibold text-amber-600 mb-2">✓</p>
              <p className="text-slate-900 font-semibold text-sm">Upgrade restores full capacity instantly</p>
            </div>
          </div>
        </div>
      </section>

      {/* ROI CALCULATOR */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 sm:py-28 max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-serif font-light text-center text-slate-900 mb-4">
          Estimate your <span className="italic text-amber-600">monthly queries</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {/* Input Section */}
          <div className="space-y-8">
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Visitors per day
              </label>
              <input
                type="range"
                min="10"
                max="500"
                value={estimatedVisitors}
                onChange={(e) => setEstimatedVisitors(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between mt-2">
                <span className="text-sm text-slate-600">10</span>
                <span className="text-2xl font-serif font-light text-slate-900">{estimatedVisitors}</span>
                <span className="text-sm text-slate-600">500</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Questions per visitor (avg)
              </label>
              <input
                type="number"
                value={questionsPerVisitor}
                onChange={(e) => setQuestionsPerVisitor(Number(e.target.value))}
                className="w-full px-4 py-2 border border-amber-100 rounded-lg focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="bg-amber-50 p-6 rounded-2xl border border-amber-200">
              <p className="text-sm text-slate-600 mb-2">Estimated Monthly Queries</p>
              <p className="text-4xl font-serif font-light text-slate-900">
                {estimatedQueries.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Recommendation Section */}
          <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-3xl p-8 text-white flex flex-col justify-between">
            <div>
              <p className="text-sm opacity-90 mb-2">Based on your numbers, we recommend:</p>
              <h3 className="text-3xl font-serif font-light mb-2">{recommendation.plan}</h3>
              <p className="text-4xl font-serif font-light mb-6">
                ${recommendation.price}
                <span className="text-lg">/month</span>
              </p>
            </div>

            <div className="bg-white bg-opacity-20 rounded-xl p-4 mb-6">
              <p className="text-sm">
                Your {recommendation.queries.toLocaleString()} query allowance gives comfortable headroom.
              </p>
            </div>

            <button onClick={() => router.push("/survey")} className="w-full px-6 py-3 bg-white text-slate-900 rounded-lg font-semibold hover:bg-gray-100 transition">
              Get Started
            </button>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 sm:py-28 max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-serif font-light text-center text-slate-900 mb-4">
          Pricing questions
        </h2>
        <p className="text-center text-slate-600 mb-12">
          Before you commit.
        </p>

        <div className="space-y-4">
          {faqItems.map((item, i) => (
            <details
              key={i}
              className="group bg-white border border-amber-100 rounded-2xl p-6 hover:shadow-lg transition cursor-pointer"
            >
              <summary className="flex justify-between items-center font-semibold text-slate-900">
                {item.q}
                <span className="text-amber-500 group-open:rotate-180 transition">▼</span>
              </summary>
              <p className="text-slate-600 mt-4 leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 sm:py-28 bg-amber-100 border-t-4 border-amber-400">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-serif font-light text-slate-900 mb-4">
            Start Free. <span className="italic text-amber-600">Pay when you see value</span>
          </h2>
          <p className="text-slate-700 mb-8 leading-relaxed">
            14-day trial on any plan. No credit card. Your agent live in 10 minutes. Cancel anytime.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => router.push("/survey")} className="px-8 py-3 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition">
              Discover My Agent
            </button>
            <button className="px-8 py-3 border-2 border-slate-900 text-slate-900 rounded-lg font-semibold hover:bg-slate-900 hover:text-white transition">
              Contact Sales
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
                <li><Link href="/pricing" className="hover:text-white transition">Pricing</Link></li>
                <li><Link href="#" className="hover:text-white transition">Use Cases</Link></li>
                <li><Link href="#" className="hover:text-white transition">How It Works</Link></li>
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
