import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  X, 
  Send, 
  Sparkles, 
  Bot, 
  ArrowRight, 
  GripHorizontal,
  Move
} from 'lucide-react';

const STARTER_PROMPTS = [
  { text: '📊 How does the 5-Pillar Audit work?', query: 'How does the 5-Pillar Funnel Audit work?' },
  { text: '💸 Calculate my revenue leak', query: 'Can you calculate how much revenue I might be losing as a high-ticket coach?' },
  { text: '🎯 Generate an outreach script for IG', query: 'Generate an Instagram DM outreach script using the 4-part framework.' },
  { text: '🚀 Explain the 90-day roadmap & pricing', query: 'What is included in the 90-day roadmap and what are the pricing tiers?' }
];

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  // Draggable state for the Floating Icon
  const [position, setPosition] = useState(() => {
    // Default to bottom right
    const initialX = typeof window !== 'undefined' ? window.innerWidth - 80 : 800;
    const initialY = typeof window !== 'undefined' ? window.innerHeight - 84 : 700;
    return { x: Math.max(16, initialX), y: Math.max(16, initialY) };
  });

  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef({ startX: 0, startY: 0, initialX: 0, initialY: 0, hasMoved: false });

  // Update default position on window resize
  useEffect(() => {
    const handleResize = () => {
      setPosition((prev) => ({
        x: Math.min(window.innerWidth - 76, Math.max(16, prev.x)),
        y: Math.min(window.innerHeight - 76, Math.max(16, prev.y))
      }));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'ai',
      text: `👋 Hey there! I am **NexLeads AI**, your high-ticket client acquisition strategist.\n\nI can diagnose your funnel leaks, generate 4-part outreach scripts, calculate your unit economics, or guide you through our **90-Day Acquisition Operating System**.\n\n*(Tip: You can click and drag this chat icon anywhere on your screen!)*\n\nHow can I help scale your coaching business today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestions: STARTER_PROMPTS
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Handle Dragging
  const handleMouseDown = (e) => {
    // Ignore if clicked on a button or link
    if (e.target.closest('a')) return;
    
    setIsDragging(true);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialX: position.x,
      initialY: position.y,
      hasMoved: false
    };

    const handleMouseMove = (moveEvent) => {
      const deltaX = moveEvent.clientX - dragRef.current.startX;
      const deltaY = moveEvent.clientY - dragRef.current.startY;

      if (Math.abs(deltaX) > 4 || Math.abs(deltaY) > 4) {
        dragRef.current.hasMoved = true;
      }

      const nextX = Math.min(window.innerWidth - 72, Math.max(16, dragRef.current.initialX + deltaX));
      const nextY = Math.min(window.innerHeight - 72, Math.max(16, dragRef.current.initialY + deltaY));

      setPosition({ x: nextX, y: nextY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      
      // If user barely moved cursor, treat as a click to open/close
      if (!dragRef.current.hasMoved) {
        setIsOpen((prev) => !prev);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  // Touch Support for Mobile Dragging
  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    setIsDragging(true);
    dragRef.current = {
      startX: touch.clientX,
      startY: touch.clientY,
      initialX: position.x,
      initialY: position.y,
      hasMoved: false
    };

    const handleTouchMove = (moveEvent) => {
      const moveTouch = moveEvent.touches[0];
      const deltaX = moveTouch.clientX - dragRef.current.startX;
      const deltaY = moveTouch.clientY - dragRef.current.startY;

      if (Math.abs(deltaX) > 4 || Math.abs(deltaY) > 4) {
        dragRef.current.hasMoved = true;
      }

      const nextX = Math.min(window.innerWidth - 72, Math.max(16, dragRef.current.initialX + deltaX));
      const nextY = Math.min(window.innerHeight - 72, Math.max(16, dragRef.current.initialY + deltaY));

      setPosition({ x: nextX, y: nextY });
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);

      if (!dragRef.current.hasMoved) {
        setIsOpen((prev) => !prev);
      }
    };

    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);
  };

  const generateAIResponse = (userQuery) => {
    const q = userQuery.toLowerCase();

    if (q.includes('audit') || q.includes('score') || q.includes('how does')) {
      return {
        text: `Our **5-Pillar Funnel Diagnostic** evaluates your coaching business across:\n\n1. **Traffic & Quality** (Source & attention volume)\n2. **Lead Capture** (Scorecard/quiz vs messy DMs)\n3. **Nurturing Automation** (Day 0–7 indoctrination)\n4. **Frictionless Booking** (2-step qualification calendar)\n5. **Follow-Up Cadence** (No-show & post-call recovery)\n\nIt calculates your exact health score (0–100%) and monthly revenue leak in under 2 minutes.`,
        action: { label: 'Take Free 5-Pillar Audit', path: '/audit', icon: 'flame' }
      };
    }

    if (q.includes('calculate') || q.includes('leak') || q.includes('lost revenue') || q.includes('economics')) {
      return {
        text: `Let's look at unit economics (Section 13):\n\n• If your coaching package is **$4,000**\n• And you receive **40 inquiries/month**\n• Without an automated nurture sequence, ~**75% of leads bounce and disappear** in DMs.\n\nRecovering just **3 extra clients per month** equals **+$12,000/mo** (+$144,000/year) in additional gross revenue.`,
        action: { label: 'Try Interactive Calculator', path: '/', icon: 'calc' }
      };
    }

    if (q.includes('outreach') || q.includes('script') || q.includes('instagram') || q.includes('linkedin')) {
      return {
        text: `Here is a custom **4-Part Outreach Script** (Section 17):\n\n**1. Observation:** *"Hey [Name], came across your high-ticket coaching page and noticed you're sending traffic directly to DMs without an automated quiz."*\n**2. Problem:** *"Without a nurture funnel, 70%+ of interested prospects drop off before booking."*\n**3. Opportunity:** *"We built a 2-min video showing how to turn followers into $3k-$10k clients on autopilot."*\n**4. CTA:** *"Want me to send the video breakdown over?"*`,
        action: { label: 'Open Outreach Studio', path: '/outreach', icon: 'send' }
      };
    }

    if (q.includes('pricing') || q.includes('tier') || q.includes('roadmap') || q.includes('cost') || q.includes('package')) {
      return {
        text: `**NexLeads Offer Architecture (Section 14):**\n\n• **Foundation ($3,500):** Core 2-Step Quiz Funnel + Calendar + Day 0 Confirmation.\n• **Growth ($6,500 - Most Popular):** Full DFY System + Kanban CRM + Day 0-7 Email/SMS Sequences + Sales Playbook.\n• **Scale ($10,000):** Complete System + Retargeting + Setter Training + Ongoing Optimization.`,
        action: { label: 'View 90-Day Solutions', path: '/solutions', icon: 'layers' }
      };
    }

    if (q.includes('book') || q.includes('call') || q.includes('strategy') || q.includes('schedule')) {
      return {
        text: `Ready to map out your custom **Client Acquisition Architecture**? You can book a 45-minute 1-on-1 strategy session with our architects directly on our live calendar.`,
        action: { label: 'Book Strategy Session', path: '/book', icon: 'calendar' }
      };
    }

    if (q.includes('crm') || q.includes('pipeline') || q.includes('leads')) {
      return {
        text: `Our built-in **Agency CRM Pipeline** tracks prospects across 8 stages: *Researched → Outreach Sent → Audit Done → Call Booked → Proposal Sent → Closed Won*. You can test the Kanban board right now!`,
        action: { label: 'Open CRM Pipeline', path: '/crm', icon: 'crm' }
      };
    }

    return {
      text: `NexLeads builds complete client acquisition infrastructure for coaches charging **$1,000–$10,000+**.\n\nWe replace chaotic manual messaging with automated diagnostic funnels, multi-channel SMS reminders (88.5% show-up rate), and Day 0–7 nurture sequences.\n\nWould you like to take our free Funnel Audit or review the 90-day roadmap?`,
      action: { label: 'Start Free Audit', path: '/audit', icon: 'flame' }
    };
  };

  const handleSend = (textToSend) => {
    const messageContent = textToSend || input;
    if (!messageContent.trim()) return;

    const userMessage = {
      id: `msg_${Date.now()}`,
      sender: 'user',
      text: messageContent.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiReplyData = generateAIResponse(messageContent);
      const aiMessage = {
        id: `ai_${Date.now()}`,
        sender: 'ai',
        text: aiReplyData.text,
        action: aiReplyData.action,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 600);
  };

  // Determine smart placement for chat box window based on icon coordinates
  const isNearRight = position.x > (typeof window !== 'undefined' ? window.innerWidth / 2 : 400);
  const isNearBottom = position.y > (typeof window !== 'undefined' ? window.innerHeight / 2 : 400);

  return (
    <>
      {/* Draggable Floating Launcher Button */}
      <div 
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`,
          touchAction: 'none'
        }}
        className={`fixed z-50 select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} transition-transform duration-75`}
      >
        <div className="relative flex items-center group">
          
          {/* Tooltip hint when not dragging */}
          {!isOpen && !isDragging && (
            <div 
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#070b14]/90 backdrop-blur-md border border-emerald-500/30 text-slate-200 text-[11px] font-semibold shadow-xl pointer-events-none absolute ${
                isNearRight ? 'right-16 mr-1' : 'left-16 ml-1'
              } whitespace-nowrap opacity-90 group-hover:opacity-100 transition-opacity`}
            >
              <Move className="w-3 h-3 text-emerald-400" />
              <span>Drag to move • NexLeads AI</span>
            </div>
          )}

          {/* Draggable Circle Icon */}
          <div
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            className={`w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-400 p-0.5 shadow-2xl shadow-emerald-500/40 hover:shadow-emerald-500/60 transition-all duration-200 flex items-center justify-center ${
              isDragging ? 'scale-110 ring-4 ring-emerald-400/40' : 'hover:scale-105 active:scale-95'
            }`}
          >
            <div className="w-full h-full bg-[#070b14] rounded-full flex items-center justify-center">
              {isOpen ? (
                <X className="w-6 h-6 text-emerald-400" />
              ) : (
                <Sparkles className="w-6 h-6 text-emerald-400 animate-pulse" />
              )}
            </div>

            {/* Live Indicator Dot */}
            <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-emerald-400 border-2 border-[#070b14] rounded-full" />
          </div>
        </div>
      </div>

      {/* Expandable Chat Window */}
      {isOpen && (
        <div 
          style={{
            bottom: isNearBottom ? '90px' : 'auto',
            top: !isNearBottom ? '90px' : 'auto',
            right: isNearRight ? '20px' : 'auto',
            left: !isNearRight ? '20px' : 'auto',
          }}
          className="fixed z-50 w-[calc(100vw-32px)] sm:w-[410px] h-[560px] max-h-[80vh] rounded-3xl glass-panel bg-[#070b14]/95 backdrop-blur-2xl border border-emerald-500/30 shadow-2xl flex flex-col overflow-hidden animate-fadeIn"
        >
          
          {/* Chat Header */}
          <div className="p-4 bg-gradient-to-r from-slate-900 via-[#0b0f19] to-slate-900 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-emerald-400 to-cyan-400 p-[1.5px]">
                  <div className="w-full h-full bg-[#070b14] rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5 text-emerald-400" />
                  </div>
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#070b14]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-sm font-bold text-white">NexLeads AI</h4>
                  <span className="text-[9px] uppercase font-extrabold bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded-full border border-emerald-500/30">
                    Strategist
                  </span>
                </div>
                <p className="text-[10px] text-slate-400">High-Ticket Client Acquisition Assistant</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-full hover:bg-white/5 transition-colors"
                title="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                )}

                <div className={`max-w-[82%] space-y-2`}>
                  <div
                    className={`p-3.5 rounded-2xl leading-relaxed whitespace-pre-line ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-navy-950 font-semibold rounded-tr-none'
                        : 'bg-slate-900/90 text-slate-200 border border-slate-800 rounded-tl-none shadow-sm'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Optional Action Button */}
                  {msg.action && (
                    <button
                      onClick={() => {
                        navigate(msg.action.path);
                        setIsOpen(false);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold hover:bg-emerald-500/25 transition-all text-[11px]"
                    >
                      <span>{msg.action.label}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}

                  {/* Starter Suggestions for Welcome message */}
                  {msg.suggestions && (
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">
                        Quick Questions:
                      </span>
                      <div className="flex flex-col gap-1.5">
                        {msg.suggestions.map((s, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSend(s.query)}
                            className="text-left px-3 py-2 rounded-xl bg-slate-950/80 hover:bg-slate-900 border border-slate-800/90 hover:border-emerald-500/40 text-[11px] text-slate-300 transition-colors flex items-center justify-between"
                          >
                            <span>{s.text}</span>
                            <ArrowRight className="w-3 h-3 text-slate-500" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className={`text-[9px] text-slate-500 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-slate-400 text-xs">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Sparkles className="w-3.5 h-3.5 animate-spin" />
                </div>
                <div className="bg-slate-900 px-3 py-2 rounded-xl border border-slate-800 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-slate-950/90 border-t border-white/10 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask NexLeads AI about funnels, pricing, CRM..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-3.5 py-2.5 rounded-full bg-slate-900 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="w-9 h-9 rounded-full bg-emerald-500 text-navy-950 flex items-center justify-center font-bold hover:bg-emerald-400 disabled:opacity-40 transition-colors shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
}
