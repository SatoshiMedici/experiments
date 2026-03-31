/* ============================================
   Aretea AI - Support Chat System
   AI-powered chat with human escalation
   ============================================ */

(function () {
  'use strict';

  // --- Knowledge Base ---
  // The AI bot uses this to answer questions before escalating to a human
  const knowledgeBase = [
    {
      keywords: ['ping', 'health', 'health check', 'healthcheck', 'alive', 'uptime'],
      answer: 'The **Ping** service is a lightweight health-check microservice. Send a GET request to `/ping` and it returns `pong` with a 200 status. It\'s perfect for load balancer health probes, Kubernetes liveness checks, and uptime monitoring.'
    },
    {
      keywords: ['install', 'setup', 'get started', 'start', 'quick start', 'quickstart', 'begin'],
      answer: 'Getting started is easy!\n\n1. `git clone https://github.com/aretea-ai/ping.git`\n2. `cd ping && npm install`\n3. `npm start`\n4. Test it: `curl http://localhost:3000/ping`\n\nThe server will start on port 3000 by default.'
    },
    {
      keywords: ['port', 'config', 'configuration', 'environment', 'env', 'variable'],
      answer: 'You can configure the port via the `PORT` environment variable. For example:\n\n`PORT=8080 npm start`\n\nThe default port is **3000** if no environment variable is set.'
    },
    {
      keywords: ['docker', 'container', 'containerize', 'deploy', 'deployment', 'kubernetes', 'k8s'],
      answer: 'You can deploy the Ping service with Docker:\n\n```\nFROM node:22-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci --production\nCOPY . .\nEXPOSE 3000\nCMD ["npx", "tsx", "src/index.ts"]\n```\n\nFor Kubernetes, use the `/ping` endpoint as your liveness and readiness probe. Check the Documentation section for full examples.'
    },
    {
      keywords: ['api', 'endpoint', 'route', 'routes', 'url', 'path'],
      answer: 'The Ping service has one endpoint:\n\n- **GET /ping** - Returns `pong` (200 OK)\n- All other routes return `Not Found` (404)\n\nIt uses plain text responses with `Content-Type: text/plain`.'
    },
    {
      keywords: ['typescript', 'language', 'tech', 'stack', 'technology', 'node', 'nodejs'],
      answer: 'Aretea AI services are built with **TypeScript** running on **Node.js**. The Ping service uses zero external dependencies - just the native `node:http` module. It runs via `tsx` for TypeScript execution without a build step.'
    },
    {
      keywords: ['price', 'pricing', 'cost', 'plan', 'subscription', 'free', 'pay'],
      answer: 'We offer three tiers:\n\n- **Community (Free)** - Self-hosted, open source, community support\n- **Pro ($29/mo)** - Managed cloud, 99.99% SLA, priority support\n- **Enterprise (Custom)** - Dedicated infra, custom SLA, 24/7 support\n\nScroll to the Pricing section for full details, or say "talk to human" to discuss with our sales team.'
    },
    {
      keywords: ['open source', 'license', 'mit', 'github', 'repo', 'repository', 'source code', 'code'],
      answer: 'Yes! Aretea AI services are open source. You can find the Ping service at:\n\nhttps://github.com/aretea-ai/ping\n\nFeel free to fork, contribute, or use it in your projects.'
    },
    {
      keywords: ['support', 'help', 'contact', 'human', 'agent', 'person', 'talk', 'speak', 'escalate'],
      answer: '__ESCALATE__'
    },
    {
      keywords: ['error', 'bug', 'issue', 'problem', 'not working', 'broken', 'fail', 'crash'],
      answer: 'I\'m sorry to hear you\'re having trouble! Here are some common fixes:\n\n1. Make sure Node.js 18+ is installed\n2. Run `npm install` to ensure dependencies are present\n3. Check if port 3000 is already in use (try `PORT=3001 npm start`)\n4. Verify you\'re hitting the right endpoint: `GET /ping`\n\nIf the issue persists, I can connect you with a human agent. Just say **"talk to human"**.'
    },
    {
      keywords: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'greetings'],
      answer: 'Hello! Welcome to Aretea AI support. How can I help you today? You can ask me about:\n\n- Our services and features\n- Getting started & installation\n- API documentation\n- Deployment & configuration\n- Pricing\n\nOr type **"talk to human"** to connect with a support agent.'
    },
    {
      keywords: ['thanks', 'thank you', 'thx', 'appreciate', 'great', 'awesome', 'perfect'],
      answer: 'You\'re welcome! Is there anything else I can help you with? If not, have a great day!'
    },
    {
      keywords: ['what', 'who', 'aretea', 'about', 'company', 'do you do'],
      answer: 'Aretea AI builds intelligent, lightweight infrastructure services for modern applications. We focus on simplicity, reliability, and developer experience. Our services are open source, built with TypeScript, and designed with zero unnecessary dependencies.'
    }
  ];

  // --- State ---
  let chatOpen = false;
  let messageCount = 0;
  let escalationAttempts = 0;
  let hasEscalated = false;
  let unansweredCount = 0;

  // --- DOM Elements ---
  const chatWidget = document.getElementById('chatWidget');
  const chatToggle = document.getElementById('chatToggle');
  const chatWindow = document.getElementById('chatWindow');
  const chatClose = document.getElementById('chatClose');
  const chatMessages = document.getElementById('chatMessages');
  const chatInput = document.getElementById('chatInput');
  const chatSend = document.getElementById('chatSend');
  const chatIcon = document.getElementById('chatIcon');
  const chatEscalation = document.getElementById('chatEscalation');
  const chatInputArea = document.getElementById('chatInputArea');
  const escalationForm = document.getElementById('escalationForm');

  // --- Chat Toggle ---
  function openChat() {
    chatOpen = true;
    chatWindow.classList.add('open');
    chatIcon.innerHTML = '&#10005;';
    chatInput.focus();

    if (messageCount === 0) {
      addBotMessage("Hi there! I'm Aretea AI's virtual assistant. I can help you with questions about our services, documentation, pricing, and more.");
      setTimeout(() => {
        addQuickActions([
          'Getting Started',
          'API Docs',
          'Pricing',
          'Talk to Human'
        ]);
      }, 400);
    }
  }

  function closeChat() {
    chatOpen = false;
    chatWindow.classList.remove('open');
    chatIcon.innerHTML = '&#128172;';
  }

  // Make openChat globally available for onclick handlers
  window.openChat = openChat;

  chatToggle.addEventListener('click', () => {
    if (chatOpen) {
      closeChat();
    } else {
      openChat();
    }
  });

  chatClose.addEventListener('click', closeChat);

  // --- Message Handling ---
  function addMessage(text, type) {
    messageCount++;
    const msg = document.createElement('div');
    msg.className = `chat-msg ${type}`;

    // Simple markdown-like formatting
    let formatted = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\n/g, '<br>');

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    msg.innerHTML = `${formatted}<div class="msg-time">${time}</div>`;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return msg;
  }

  function addBotMessage(text) {
    return addMessage(text, 'bot');
  }

  function addUserMessage(text) {
    return addMessage(text, 'user');
  }

  function addSystemMessage(text) {
    messageCount++;
    const msg = document.createElement('div');
    msg.className = 'chat-msg system';
    msg.textContent = text;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function addQuickActions(actions) {
    const container = document.createElement('div');
    container.className = 'chat-quick-actions';

    actions.forEach(action => {
      const btn = document.createElement('button');
      btn.className = 'chat-quick-btn';
      btn.textContent = action;
      btn.addEventListener('click', () => {
        container.remove();
        handleUserInput(action);
      });
      container.appendChild(btn);
    });

    chatMessages.appendChild(container);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function showTypingIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'chat-msg bot';
    indicator.id = 'typingIndicator';
    indicator.innerHTML = '<div class="typing-indicator"><span></span><span></span><span></span></div>';
    chatMessages.appendChild(indicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return indicator;
  }

  function removeTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) indicator.remove();
  }

  // --- AI Response Engine ---
  function findAnswer(input) {
    const normalized = input.toLowerCase().trim();

    // Check for escalation triggers first
    const escalationTriggers = ['human', 'agent', 'person', 'real person', 'talk to', 'speak to', 'escalate', 'representative', 'operator'];
    if (escalationTriggers.some(trigger => normalized.includes(trigger))) {
      return '__ESCALATE__';
    }

    // Score each knowledge base entry
    let bestMatch = null;
    let bestScore = 0;

    for (const entry of knowledgeBase) {
      let score = 0;
      for (const keyword of entry.keywords) {
        if (normalized.includes(keyword.toLowerCase())) {
          // Longer keyword matches are worth more
          score += keyword.length;
        }
      }
      // Bonus for exact matches
      if (entry.keywords.some(kw => normalized === kw.toLowerCase())) {
        score += 10;
      }
      if (score > bestScore) {
        bestScore = score;
        bestMatch = entry;
      }
    }

    if (bestScore >= 3 && bestMatch) {
      return bestMatch.answer;
    }

    return null;
  }

  function handleUserInput(input) {
    addUserMessage(input);

    // Remove any existing quick action buttons
    const existingActions = chatMessages.querySelectorAll('.chat-quick-actions');
    existingActions.forEach(el => el.remove());

    const indicator = showTypingIndicator();

    // Simulate AI thinking delay
    const delay = 600 + Math.random() * 800;

    setTimeout(() => {
      removeTypingIndicator();

      const answer = findAnswer(input);

      if (answer === '__ESCALATE__') {
        triggerEscalation();
        return;
      }

      if (answer) {
        unansweredCount = 0;
        addBotMessage(answer);
      } else {
        unansweredCount++;

        if (unansweredCount >= 2) {
          addBotMessage("I'm having trouble understanding your question. Let me connect you with a human agent who can help better.");
          setTimeout(() => triggerEscalation(), 500);
          return;
        }

        addBotMessage("I'm not sure I have the answer to that specific question. Could you try rephrasing, or ask about one of these topics?");
        setTimeout(() => {
          addQuickActions([
            'Ping Service',
            'Installation',
            'Deployment',
            'Pricing',
            'Talk to Human'
          ]);
        }, 300);
      }
    }, delay);
  }

  // --- Escalation to Human ---
  function triggerEscalation() {
    if (hasEscalated) {
      addBotMessage("Your request has already been submitted! A human agent will reach out to you shortly via email. Is there anything else I can help with in the meantime?");
      return;
    }

    escalationAttempts++;
    addSystemMessage('Connecting you with a human agent...');

    setTimeout(() => {
      addBotMessage("I'd love to connect you with a member of our team. Please fill out the form below so we can reach you:");
      chatEscalation.style.display = 'block';
      chatInputArea.style.display = 'none';
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 500);
  }

  // --- Escalation Form Submit ---
  escalationForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('escName').value.trim();
    const email = document.getElementById('escEmail').value.trim();
    const summary = document.getElementById('escSummary').value.trim();

    if (!name || !email || !summary) return;

    hasEscalated = true;
    chatEscalation.style.display = 'none';
    chatInputArea.style.display = 'flex';

    addSystemMessage(`Request submitted for ${name}`);

    // Collect chat transcript
    const transcript = [];
    chatMessages.querySelectorAll('.chat-msg').forEach(msg => {
      if (msg.classList.contains('system')) return;
      const type = msg.classList.contains('user') ? 'User' : 'Bot';
      const text = msg.textContent.replace(/\d{1,2}:\d{2}\s?(AM|PM)?/i, '').trim();
      if (text) transcript.push(`${type}: ${text}`);
    });

    // Store the support ticket (in production, this would POST to an API)
    const ticket = {
      id: `TKT-${Date.now()}`,
      name,
      email,
      summary,
      transcript,
      timestamp: new Date().toISOString(),
      status: 'open'
    };

    // Save to localStorage as demo (production: send to backend)
    const tickets = JSON.parse(localStorage.getItem('aretea_support_tickets') || '[]');
    tickets.push(ticket);
    localStorage.setItem('aretea_support_tickets', JSON.stringify(tickets));

    console.log('Support ticket created:', ticket);

    setTimeout(() => {
      addBotMessage(
        `Thank you, **${name}**! Your support ticket (**${ticket.id}**) has been created. A human agent will contact you at **${email}** within 1 business hour.\n\nIn the meantime, feel free to keep asking me questions!`
      );
    }, 300);

    // Reset form
    escalationForm.reset();
  });

  // --- Input Handling ---
  function sendMessage() {
    const input = chatInput.value.trim();
    if (!input) return;
    chatInput.value = '';
    handleUserInput(input);
  }

  chatSend.addEventListener('click', sendMessage);

  chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });
})();
