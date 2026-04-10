// Static recommendations — one entry per survey_id
// Each survey can return 1 or more agents ranked by priority
// Edit this file to change what shows on the recommendation screen

export const recommendations = {
  // ── Survey 1: Add a chatbot to my website ──────────────────────────────
  "1": {
    headline: "We found",
    highlight: "2 agents",
    subheadline: "for you — ranked by impact.",
    subtitle: "Based on your answers, these agents will deliver the most value, in priority order. Start with Agent 1 and add others as you grow.",
    agents: [
      {
        priority: 1,
        label: "Priority 1 — start here",
        icon: "🎯",
        title: "Sales agent",
        description: "You're losing leads because no one responds fast enough. This agent qualifies prospects, answers pricing questions, and books demos while you sleep.",
        bullets: [
          "Answers pricing and product questions at any hour instantly",
          "Qualifies visitors by understanding their budget and timeline",
          "Books demos directly into your calendar via your scheduling tool",
          "Captures contact details and pushes qualified leads to your CRM",
          "Follows up automatically when a visitor shows buying intent",
        ],
        conversations: [
          {
            user: "What's the difference between Growth and Enterprise plans?",
            ai: "Growth is £79/month — 5 agent packages, 10K conversations, WhatsApp, HubSpot, and Zendesk. Enterprise is custom-priced and adds unlimited packages, DB connectors, and a dedicated account manager. What size team are you working with?",
          },
          {
            user: "Can I see a demo?",
            ai: "Absolutely. I can book a personalised 30-minute demo using your own content so you see it working with your actual business. What's your availability this week?",
          },
          {
            user: "We're evaluating three tools including Tidio.",
            ai: "Good to hear you're doing thorough research. The key difference: advAlsor is built around AI replacing agents, not just assisting them. We're also the only platform with a no-code database connector for live data. Want me to send a comparison sheet?",
          },
        ],
        systemPrompt: `You are Sales agent, an AI assistant for a your industry business.
Your primary role: Sales agent.

ALWAYS:
- Give accurate answers based only on your uploaded knowledge base
- Cite the source document when answering from uploaded content
- Be concise — answer the question asked, nothing more
- Confirm understanding before answering complex questions

NEVER:
- Make up information not in the knowledge base
- Discuss competitor pricing or positioning
- Make promises or commitments on behalf of the business

ESCALATION:
- Escalate when: customer is frustrated, query is out of scope, or a human decision is needed
- When escalating, always summarize the conversation for the handoff agent

FALLBACK:
"I don't have that specific information. Let me connect you with our team — [contact]."`,
      },
      {
        priority: 2,
        label: "Priority 2 — add next",
        icon: "🌐",
        title: "Website assistant",
        description: "Every business with a website needs an always-on assistant. Your chatbot answers visitor questions 24/7, trained on your own content.",
        bullets: [
          "Answers questions from your website and uploaded documents instantly",
          "Available 24/7 — no human needed for routine queries",
          "Guides visitors to the right product, service, or next step",
          "Captures lead details when visitors show buying intent",
          "Hands off to your team when a human touch is needed",
        ],
        conversations: [
          {
            user: "What services do you offer?",
            ai: "We offer AI-powered solutions for businesses — website chatbots, internal knowledge agents, and field force tools. Would you like me to explain which might be most relevant for your situation?",
          },
          {
            user: "How much does it cost?",
            ai: "Our Growth plan starts at £79/month — fixed price, no credits, no surprises. You can start with a free 14-day trial, no credit card required. Shall I walk you through what's included?",
          },
          {
            user: "Can I speak to someone?",
            ai: "Of course. I can book you a call with our team — usually available within 24 hours. What timezone are you in?",
          },
        ],
        systemPrompt: `You are Website assistant, an AI assistant trained on this business's content.
Your primary role: Help website visitors get answers instantly.

ALWAYS:
- Answer from uploaded website content and documents only
- Be friendly, concise, and helpful
- Offer to connect visitors with the team when needed

NEVER:
- Make up information not in the knowledge base
- Discuss pricing unless it's in your uploaded content

FALLBACK:
"I don't have that information right now. Let me connect you with someone who can help."`,
      },
    ],
  },

  // ── Survey 2: Configure my AI agent ───────────────────────────────────
  "2": {
    headline: "We found",
    highlight: "1 agent",
    subheadline: "for you — built to your specification.",
    subtitle: "Based on your answers, this is the highest-impact agent for your team. Ready to configure and go live.",
    agents: [
      {
        priority: 1,
        label: "Priority 1 — start here",
        icon: "🧠",
        title: "Internal knowledge agent",
        description: "A purpose-built agent trained on your internal docs, policies, and processes. Your team gets instant answers without disturbing colleagues.",
        bullets: [
          "Trained on your internal docs, wikis, and SOPs",
          "Integrated into Slack, Teams, or your intranet",
          "Enforces access controls — shows only what each user can see",
          "Learns from feedback to get smarter over time",
          "Full audit log of every query and response",
        ],
        conversations: [
          {
            user: "What's our parental leave policy?",
            ai: "You're entitled to 26 weeks of shared parental leave. The first 12 weeks are fully paid if you've been with us for over a year. Would you like me to send you the full policy document?",
          },
          {
            user: "How do I raise a helpdesk ticket?",
            ai: "Go to it.company.com and click 'New Request'. For urgent issues, you can also ping #it-urgent on Slack. Average response time is under 2 hours.",
          },
          {
            user: "What's our data retention policy?",
            ai: "Customer data is retained for 7 years under GDPR compliance. Internal records follow a 3-year cycle. Shall I pull up the full data governance document?",
          },
        ],
        systemPrompt: `You are an Internal Knowledge Agent for this organisation.
Your primary role: Answer employee questions using internal documents only.

ALWAYS:
- Answer only from approved internal documents
- Cite the document name and section when answering
- Respect access control — only share content the user is permitted to see
- Be concise and professional

NEVER:
- Share confidential information outside the user's access level
- Make up policies or procedures
- Discuss external competitors or market information

ESCALATION:
- Escalate HR or legal queries to the appropriate team
- When unsure, say so and direct to the right person

FALLBACK:
"I couldn't find that in our knowledge base. Please contact [department] directly."`,
      },
    ],
  },

  // ── Survey 3: AI Diagnostic / ROI ─────────────────────────────────────
  "3": {
    headline: "We found",
    highlight: "3 agents",
    subheadline: "that will save you the most time and money.",
    subtitle: "Ranked by ROI based on your inputs. Start with Agent 1 for the fastest payback, then layer in the others.",
    agents: [
      {
        priority: 1,
        label: "Priority 1 — highest ROI",
        icon: "⚡",
        title: "Support deflection agent",
        description: "Your team is buried in repetitive queries. This agent handles up to 80% of them automatically — freeing your people for work that actually needs them.",
        bullets: [
          "Estimated 60–80% reduction in repetitive query handling",
          "Typical payback period under 6 weeks",
          "No disruption to existing workflows during rollout",
          "Escalates complex queries to the right human automatically",
          "Full analytics dashboard showing time and cost saved",
        ],
        conversations: [
          {
            user: "How long until we see ROI?",
            ai: "Based on your inputs, most businesses in your situation see positive ROI within 6–8 weeks of going live. Shall I walk you through the breakdown?",
          },
          {
            user: "What's the implementation effort?",
            ai: "Minimal on your side — typically 2–3 hours to upload your content and configure your preferences. We handle the rest. Your agent can be live within a working day.",
          },
          {
            user: "Can we start small?",
            ai: "Absolutely. Most customers start with one use case — usually FAQ or internal support — then expand. There's no long-term contract, so you can move at your own pace.",
          },
        ],
        systemPrompt: `You are a Support Deflection Agent.
Your primary role: Resolve customer queries instantly using the knowledge base.

ALWAYS:
- Attempt to resolve every query before escalating
- Be empathetic and professional
- Confirm resolution before closing the conversation

NEVER:
- Make promises about refunds, timelines, or outcomes without authorisation
- Guess answers not in the knowledge base

ESCALATION:
- Escalate when: customer is upset, query requires account access, or policy exception needed
- Summarise the conversation context when handing off

FALLBACK:
"Let me connect you with a specialist who can help with this right away."`,
      },
      {
        priority: 2,
        label: "Priority 2 — add next",
        icon: "📊",
        title: "Operations agent",
        description: "Automate your internal processes. This agent handles checklists, approvals, and routine operational queries so nothing falls through the cracks.",
        bullets: [
          "Automates routine operational checklists and sign-offs",
          "Connects to your existing tools via no-code integrations",
          "Tracks task completion and sends reminders automatically",
          "Reduces management overhead on repetitive coordination",
          "Works across time zones without human intervention",
        ],
        conversations: [
          {
            user: "Can it integrate with our project management tool?",
            ai: "Yes — we connect natively with Asana, Monday, Jira, and Notion. For other tools, we have a Zapier integration that covers 5,000+ apps. Which tool are you using?",
          },
          {
            user: "How does it handle exceptions?",
            ai: "When the agent encounters something outside its scope, it flags it for human review and notifies the right person via Slack or email. Nothing gets dropped silently.",
          },
        ],
        systemPrompt: `You are an Operations Agent.
Your primary role: Streamline internal operations and reduce manual coordination.

ALWAYS:
- Follow the defined process checklists precisely
- Log all actions taken for audit purposes
- Notify stakeholders when tasks are completed or blocked

NEVER:
- Skip approval steps in defined workflows
- Take irreversible actions without human confirmation

FALLBACK:
"This action requires human approval. I've notified [approver] and will update you when confirmed."`,
      },
      {
        priority: 3,
        label: "Priority 3 — future add",
        icon: "🔍",
        title: "Knowledge base agent",
        description: "Stop knowledge living in people's heads. This agent makes everything your team knows searchable and accessible in seconds.",
        bullets: [
          "Ingests documents, wikis, Notion pages, and PDFs automatically",
          "Answers questions with source citations for trust and accuracy",
          "Updates automatically when source documents change",
          "Reduces onboarding time for new team members significantly",
          "Available 24/7 across all time zones",
        ],
        conversations: [
          {
            user: "How do we keep it up to date?",
            ai: "Connect your Notion, Google Drive, or Confluence and we sync automatically whenever documents change. No manual uploads needed after the initial setup.",
          },
          {
            user: "What if it gives a wrong answer?",
            ai: "Every answer includes a source citation so users can verify. You can also flag incorrect answers directly in the chat — our team reviews these and retrains the agent.",
          },
        ],
        systemPrompt: `You are a Knowledge Base Agent.
Your primary role: Make organisational knowledge instantly accessible to the team.

ALWAYS:
- Cite the source document for every answer
- Acknowledge when information may be outdated
- Suggest related documents that might be useful

NEVER:
- Fabricate information not in the knowledge base
- Answer questions outside the knowledge base scope without flagging it

FALLBACK:
"I couldn't find a definitive answer on that. Here's the closest I found: [result]. For certainty, check with [owner]."`,
      },
    ],
  },
}
