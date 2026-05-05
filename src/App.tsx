/**
 * @license 
 * 
 * 
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import logo from './TRYQ.webp';
import mentorPhoto from './mentor.webp';
import {
  Zap,
  Cpu,
  Briefcase,
  CheckCircle2,
  MapPin,
  Calendar,
  Users,
  Timer,
  ExternalLink,
  ChevronRight,
  BadgeCheck,
  X,
  ChevronDown,
  Trophy,
  Crown,
  Sparkles
} from 'lucide-react';

// --- Constants & Types ---
const LIVE_URL = import.meta.env.VITE_LIVE_URL || "https://meet.google.com/abc-defg-hij";
const TARGET_DATE = new Date(import.meta.env.VITE_EVENT_DATE || "2026-05-10T11:00:00+05:30").getTime();

const NAMES = ["Aditya", "Sneha", "Rohan", "Pratiksha", "Ishaan", "Anjali", "Sameer", "Tanvi", "Rahul", "Mansi", "Vedant", "Shreya", "Kartik", "Pooja", "Niraj", "Amruta", "Omkar", "Neha", "Varun", "Riya", "Yash", "Sakshi", "Siddharth", "Kalyani", "Gaurav", "Tanmayi", "Harsh", "Madhura", "Kunal", "Nikita"];
const LOCATIONS = ["FC Road", "Katraj", "Karve Nagar", "Wakad", "Chinchwad", "Kandivali", "Dhule", "Kolhapur", "Kothrud", "Viman Nagar", "Baner", "Hadapsar", "Pimpri", "Mumbai", "Nagpur", "Nashik", "Sambhajinagar", "Bavdhan", "Pashan", "Hinjewadi", "Aundh", "Yerwada", "Camp", "Deccan", "Shivaji Nagar", "Swargate", "Bibwewadi", "Kondhwa", "Wagholi", "Dhanori"];

interface TestimonialData {
  name: string;
  location: string;
  role: string;
  text: string;
}

const TESTIMONIALS: TestimonialData[] = [
  { name: "Aditya", location: "Kothrud", role: "Editor", text: "I knew the tools, but not the storytelling. Now my Reels get 5x more views!" },
  { name: "Sneha", location: "Viman Nagar", role: "UI/UX", text: "Connecting design to psychology changed everything. Built a pro case study in 1 day!" },
  { name: "Rohan", location: "Pimpri", role: "AI", text: "From 6 hours to 45 mins per video. The AI workflow is a cheat code." },
  { name: "Suhani", location: "FC Road", role: "Beginner", text: "I was a complete fresher. TRYQ made it so simple that I finished my first project in hours!" },
  { name: "Omkar", location: "Katraj", role: "Beginner", text: "Thought this was only for pros. I was wrong. Best starting point for any student." }
];

// --- Components ---

const PulseButton = ({ children, className = "", variant = "gold", shimmer = false, isLive = false, onClick }: { children: React.ReactNode; className?: string; variant?: "gold" | "green"; shimmer?: boolean; isLive?: boolean; onClick?: () => void }) => {
  const content = (
    <>
      {shimmer && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent bg-[length:200%_100%] animate-shimmer pointer-events-none" />
      )}
      <span className="relative z-10">{children}</span>
    </>
  );

  const baseClasses = `font-bold py-4 px-8 rounded-full text-sm uppercase tracking-widest transition-transform flex items-center justify-center text-center relative overflow-hidden ${variant === "gold"
    ? "bg-[#D4AF37] text-black animate-gold-pulse"
    : "bg-green-600 text-white animate-green-pulse shadow-lg"
    } ${className}`;

  if (isLive) {
    return (
      <motion.a
        href={LIVE_URL}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        className={baseClasses}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className={baseClasses}
    >
      {content}
    </motion.button>
  );
};

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState<{ d: number; h: number; m: number; s: number; totalMs: number; isLive: boolean }>({
    d: 0, h: 0, m: 0, s: 0, totalMs: Infinity, isLive: false
  });

  useEffect(() => {
    const updateTimer = () => {
      const now = Date.now();
      const distance = TARGET_DATE - now;

      if (distance <= 0) {
        setTimeLeft({ d: 0, h: 0, m: 0, s: 0, totalMs: 0, isLive: true });
        return;
      }

      setTimeLeft({
        d: Math.floor(distance / (1000 * 60 * 60 * 24)),
        h: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        m: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        s: Math.floor((distance % (1000 * 60)) / 1000),
        totalMs: distance,
        isLive: false
      });
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, []);

  const isUrgent = !timeLeft.isLive && timeLeft.totalMs < 24 * 60 * 60 * 1000;

  // Progress calculation: assume a 10-day campaign for visualization
  const campaignDuration = 10 * 24 * 60 * 60 * 1000;
  const progressPercent = Math.min(100, Math.max(0, (timeLeft.totalMs / campaignDuration) * 100));

  const TimeUnit = ({ label, value }: { label: string; value: number }) => (
    <div className="flex flex-col items-center min-w-[3rem]">
      <span
        className={`text-4xl md:text-5xl font-black font-mono tabular-nums tracking-tighter ${isUrgent ? 'text-red-500 animate-red-urgent' : 'text-[#D4AF37]'}`}
        style={{ textShadow: isUrgent ? '' : '0 0 15px rgba(212,175,55,0.4)' }}
      >
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-[8px] sm:text-[9px] font-black tracking-[0.3em] uppercase text-[#D4AF37]/60 mt-2">{label}</span>
    </div>
  );

  if (timeLeft.isLive) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md mx-auto px-4 text-center"
      >
        <motion.a
          href={LIVE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl md:text-3xl font-black text-[#D4AF37] tracking-widest uppercase animate-neon-flicker flex items-center justify-center gap-3 group"
          style={{ textShadow: '0 0 30px rgba(212,175,55,0.6)' }}
        >
          <div className="w-3 h-3 rounded-full bg-red-600 animate-pill" />
          WEBINAR IS LIVE - JOIN NOW!
        </motion.a>
        <p className="text-zinc-500 text-[10px] font-black tracking-[0.2em] mt-4 uppercase">Direct Link: {LIVE_URL}</p>
      </motion.div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4">
      <div className="flex items-center justify-center gap-3 sm:gap-6 mb-10">
        <TimeUnit label="DAYS" value={timeLeft.d} />
        <span className="text-2xl font-bold text-[#D4AF37]/20 self-start mt-2">:</span>
        <TimeUnit label="HRS" value={timeLeft.h} />
        <span className="text-2xl font-bold text-[#D4AF37]/20 self-start mt-2">:</span>
        <TimeUnit label="MINS" value={timeLeft.m} />
        <span className="text-2xl font-bold text-[#D4AF37]/20 self-start mt-2">:</span>
        <TimeUnit label="SECS" value={timeLeft.s} />
      </div>

      <div className="w-full h-[1px] bg-zinc-900 rounded-full overflow-hidden relative">
        <motion.div
          initial={{ width: "100%" }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 1 }}
          className={`absolute inset-y-0 left-0 ${isUrgent ? 'bg-red-500 shadow-[0_0_10px_#ef4444]' : 'bg-[#D4AF37] shadow-[0_0_10px_#D4AF37]'}`}
        />
      </div>
    </div>
  );
};

const LiveNotifier = () => {
  const [notification, setNotification] = useState<{ content: React.ReactNode; isUrgent: boolean } | null>(null);
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const triggerNext = () => {
      const delay = Math.floor(Math.random() * (15000 - 7000 + 1)) + 7000;

      setTimeout(() => {
        setCount(prev => {
          const nextCount = prev + 1;
          if (nextCount % 5 === 0) {
            setNotification({
              content: "Only 4 seats left for the May 10th Batch!",
              isUrgent: true
            });
          } else {
            const randomName = NAMES[Math.floor(Math.random() * NAMES.length)];
            const randomLocation = LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];
            setNotification({
              content: (
                <>
                  <span className="text-[#D4AF37] font-black">{randomName}</span> from <span className="text-white font-bold">{randomLocation}</span> just grabbed a seat at the Creative Masterclass!
                </>
              ),
              isUrgent: false
            });
          }
          return nextCount;
        });

        setVisible(true);
        // Auto-hide after 5 seconds if not closed
        setTimeout(() => setVisible(false), 5000);

        triggerNext();
      }, delay);
    };

    triggerNext();
  }, []);

  return (
    <AnimatePresence>
      {visible && notification && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="fixed bottom-6 left-6 right-6 md:right-auto md:w-96 z-50 bg-black/95 border border-zinc-800 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl p-4 rounded-2xl flex items-center gap-4 group"
        >
          <div className="shrink-0">
            {notification.isUrgent ? (
              <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                <Timer className="text-red-500" size={20} />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                <BadgeCheck className="text-green-500" size={20} />
              </div>
            )}
          </div>

          <div className="flex-1">
            <div className={`text-sm font-medium leading-snug ${notification.isUrgent ? 'text-red-400' : 'text-zinc-200'}`}>
              {notification.content}
            </div>
          </div>

          <button
            onClick={() => setVisible(false)}
            className="p-1 text-zinc-600 hover:text-white transition-colors"
          >
            <X size={16} />
          </button>

          <div className="absolute bottom-0 left-0 h-1 bg-[#D4AF37]/20 w-full overflow-hidden rounded-b-2xl">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 5, ease: "linear" }}
              className="h-full bg-[#D4AF37]"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const SVGGapVisualization = () => (
  <div className="w-full bg-zinc-900/30 p-8 rounded-2xl border border-zinc-800">
    <svg viewBox="0 0 400 220" className="w-full overflow-visible">
      <line x1="40" y1="20" x2="40" y2="180" stroke="#333" strokeWidth="1" />
      <line x1="40" y1="180" x2="380" y2="180" stroke="#333" strokeWidth="1" />

      <motion.rect
        initial={{ height: 0, y: 180 }}
        whileInView={{ height: 30, y: 150 }}
        transition={{ duration: 1, delay: 0.5 }}
        x="60" width="80" fill="#D4AF37" rx="4"
      />
      <text x="100" y="200" textAnchor="middle" fill="#888" fontSize="12" className="uppercase tracking-tighter">Supply</text>
      <text x="100" y="140" textAnchor="middle" fill="#D4AF37" fontSize="14" fontWeight="bold">Small</text>

      <motion.rect
        initial={{ height: 0, y: 180 }}
        whileInView={{ height: 140, y: 40 }}
        transition={{ duration: 1.2, delay: 0.7 }}
        x="260" width="80" fill="#3b82f6" rx="4"
      />
      <text x="300" y="200" textAnchor="middle" fill="#888" fontSize="12" className="uppercase tracking-tighter">DEMAND</text>
      <text x="300" y="30" textAnchor="middle" fill="#3b82f6" fontSize="14" fontWeight="bold">
        Huge Demand
      </text>
    </svg>
    <p className="mt-4 text-center text-zinc-400 text-sm font-light italic">
      "There are 23,000+ openings but only <span className="text-[#D4AF37] font-bold">10%</span> have the right skills. Don't be average."
    </p>
  </div>
);

interface BenefitCardProps {
  title: string;
  text: string;
  badge: string;
  illustration: React.ReactNode;
  className?: string;
}

const BenefitCard: React.FC<BenefitCardProps> = ({ title, text, badge, illustration, className = "" }) => {
  const [showBadge, setShowBadge] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotateX((y - centerY) / 20);
    setRotateY((centerX - x) / 20);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => {
        setShowBadge(true);
        setTimeout(() => setShowBadge(false), 2000);
      }}
      style={{
        perspective: "1000px",
        rotateX: rotateX,
        rotateY: rotateY,
      }}
      className={`group relative bg-zinc-950 border border-zinc-900 rounded-[32px] cursor-pointer hover:border-[#D4AF37]/40 transition-all duration-300 ease-out active:scale-[0.97] flex flex-col justify-between overflow-hidden p-8 ${className}`}
    >
      <div className="relative z-10">
        <h3 className="text-sm font-black tracking-[0.2em] mb-2 text-[#D4AF37]/80 uppercase">{title}</h3>
        <p className="text-zinc-400 text-lg md:text-xl font-light leading-tight mb-6 max-w-[200px]">{text}</p>
      </div>

      <div className="relative w-full h-48 mt-auto flex items-end justify-center pointer-events-none opacity-90 group-hover:opacity-100 transition-opacity">
        {illustration}
      </div>

      <AnimatePresence>
        {showBadge && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute top-6 right-6 bg-[#D4AF37] text-black text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-[0_0_20px_rgba(212,175,55,0.4)] z-20"
          >
            {badge}
          </motion.div>
        )}
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-tr from-charcoal via-transparent to-transparent opacity-50 pointer-events-none" />
    </motion.div>
  );
};

const StorytellerSVG = () => (
  <svg viewBox="0 0 200 120" className="w-full h-full">
    <path className="animate-draw" d="M10 90 L190 90" stroke="#333" strokeWidth="1" />
    {[20, 50, 80, 110, 140, 170].map(x => (
      <rect key={x} x={x} y={70} width="20" height="20" fill="#222" stroke="#444" strokeWidth="0.5" />
    ))}
    <motion.path
      initial={{ scale: 0 }}
      whileInView={{ scale: 1.2 }}
      transition={{ delay: 0.5, type: 'spring' }}
      d="M100 50 C100 45 90 40 85 45 C80 50 85 60 100 70 C115 60 120 50 115 45 C110 40 100 45 100 50 Z"
      fill="#D4AF37"
      className="shadow-[0_0_20px_#D4AF37]"
    />
    <motion.circle
      animate={{ r: [2, 5, 2] }}
      transition={{ duration: 2, repeat: Infinity }}
      cx="100" cy="55" r="3" fill="#D4AF37" opacity="0.6"
    />
  </svg>
);

const ArchitectSVG = () => (
  <svg viewBox="0 0 200 120" className="w-full h-full">
    <motion.path
      className="animate-draw"
      d="M20 30 Q60 10 100 50 T180 90"
      stroke="#D4AF37"
      strokeWidth="1.5"
      fill="none"
      strokeDasharray="5 5"
    />
    <rect x="70" y="40" width="60" height="100" rx="10" fill="#111" stroke="#333" strokeWidth="1" />
    <motion.rect
      animate={{ opacity: [0.3, 0.7, 0.3] }}
      transition={{ duration: 3, repeat: Infinity }}
      x="75" y="45" width="50" height="80" rx="6" fill="#D4AF37" opacity="0.1"
    />
  </svg>
);

const CoPilotSVG = () => (
  <svg viewBox="0 0 200 120" className="w-full h-full">
    {/* Human Hand Outline */}
    <path className="animate-draw" d="M40 100 Q40 60 60 40 L70 30 L80 40" stroke="#888" strokeWidth="1.5" fill="none" />
    {/* Robot Hand Outline */}
    <path className="animate-draw" d="M160 100 Q160 60 140 40 L130 30 L120 40" stroke="#D4AF37" strokeWidth="1.5" fill="none" />
    <motion.circle
      initial={{ scale: 0 }}
      whileInView={{ scale: 1.5 }}
      transition={{ delay: 0.5 }}
      cx="100" cy="30" r="8" fill="#D4AF37"
      className="blur-[8px] opacity-60"
    />
    <path d="M90 30 L110 30 M100 20 L100 40" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-zinc-900/50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex items-center justify-between text-left group"
      >
        <span className="text-base md:text-lg font-bold text-zinc-400 group-hover:text-[#D4AF37] transition-colors">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="text-zinc-600 group-hover:text-[#D4AF37]"
        >
          <ChevronDown size={20} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "circOut" }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-zinc-500 text-sm md:text-base leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const TestimonialCard: React.FC<TestimonialData> = ({ name, location, role, text }) => (
  <div className="flex-shrink-0 w-[320px] md:w-[450px] p-8 bg-zinc-900/40 backdrop-blur-xl border border-[#D4AF37]/10 rounded-[32px] group hover:border-[#D4AF37]/30 transition-all duration-500 shadow-2xl relative overflow-hidden min-h-[220px] flex flex-col justify-between">
    <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 blur-3xl -z-10 group-hover:bg-[#D4AF37]/10 transition-colors" />
    <div>
      <div className="flex items-start justify-between mb-6">
        <div className="flex flex-col">
          <span className="text-white font-bold text-xl tracking-tight">{name}</span>
          <span className="text-zinc-500 text-[10px] uppercase font-black tracking-widest mt-1">{location} • {role}</span>
        </div>
        <div className="bg-green-500/10 border border-green-500/20 px-3 py-1 rounded-full flex items-center gap-1.5 shrink-0">
          <BadgeCheck className="text-green-500" size={14} />
          <span className="text-green-500 text-[9px] font-black uppercase tracking-wider">Verified</span>
        </div>
      </div>
      <p className="text-zinc-300 text-base italic leading-relaxed whitespace-normal">"{text}"</p>
    </div>
  </div>
);

const FreelancerSVG = () => {
  const symbols = [
    { char: '₹', x: 20, delay: 0, size: 16 },
    { char: '$', x: 50, delay: 0.2, size: 22 },
    { char: '₹', x: 80, delay: 0.4, size: 14 },
    { char: '$', x: 110, delay: 0.6, size: 20 },
    { char: '₹', x: 140, delay: 0.8, size: 16 },
    { char: '$', x: 170, delay: 1, size: 18 },
    { char: '₹', x: 35, delay: 0.3, size: 12 },
    { char: '$', x: 65, delay: 0.5, size: 24 },
    { char: '₹', x: 95, delay: 0.7, size: 16 },
    { char: '$', x: 125, delay: 0.9, size: 18 },
    { char: '₹', x: 155, delay: 0.1, size: 22 },
    { char: '$', x: 185, delay: 1.2, size: 14 },
    { char: '₹', x: 10, delay: 0.4, size: 12 },
    { char: '$', x: 40, delay: 0.6, size: 16 },
    { char: '₹', x: 130, delay: 0.8, size: 20 },
    { char: '$', x: 160, delay: 0.2, size: 16 },
  ];

  return (
    <svg viewBox="0 0 200 120" className="w-full h-full overflow-visible">
      {/* Confetti Sparks (Background) */}
      {[...Array(15)].map((_, i) => (
        <motion.circle
          key={`spark-${i}`}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{
            opacity: [0, 1, 0],
            scale: [0, 1.2, 0],
            x: [100, 100 + (Math.random() - 0.5) * 200],
            y: [85, 85 + (Math.random() - 0.5) * 150]
          }}
          transition={{
            duration: 1.5,
            delay: Math.random() * 2,
            repeat: Infinity,
            repeatDelay: 0.2
          }}
          r={Math.random() * 1.5 + 0.5}
          fill={i % 3 === 0 ? "#D4AF37" : (i % 3 === 1 ? "#FFF" : "#F3D17B")}
        />
      ))}

      {/* Floating Currency Cloud */}
      {symbols.map((s, i) => (
        <motion.g
          key={i}
          initial={{ opacity: 0, y: 85, x: 100, scale: 0 }}
          whileInView={{
            opacity: [0, 1, 0.9, 0],
            y: [85, -40],
            x: [100, s.x],
            scale: [0.2, 1.2, 1],
            rotate: [0, (Math.random() - 0.5) * 180]
          }}
          transition={{
            duration: 2.5 + Math.random() * 1.5,
            delay: s.delay + 1, // Start after trunk opens
            repeat: Infinity,
            repeatDelay: Math.random() * 0.5
          }}
        >
          <text
            x={0}
            y={0}
            fontSize={s.size}
            fill="#D4AF37"
            className="font-black"
            style={{
              filter: 'drop-shadow(0 0 8px rgba(212,175,55,0.4))',
              opacity: 0.8
            }}
          >
            {s.char}
          </text>
        </motion.g>
      ))}

      {/* Trunk Base */}
      <rect x="70" y="85" width="60" height="25" rx="2" fill="#1A1A1A" stroke="#333" strokeWidth="1" />
      <rect x="85" y="92" width="30" height="2" fill="#333" />

      {/* Trunk Lid (Opening Animation) */}
      <motion.g
        initial={{ rotateX: 0 }}
        whileInView={{ rotateX: -110 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
        style={{ transformOrigin: "100px 85px", transformStyle: "preserve-3d" }}
      >
        <path
          d="M70 85 Q70 65 100 65 Q130 65 130 85 L70 85"
          fill="#262626"
          stroke="#444"
          strokeWidth="1"
        />
        {/* Lid Clasp */}
        <rect x="95" y="78" width="10" height="4" rx="1" fill="#D4AF37" />
      </motion.g>

      {/* Golden Glow from within */}
      <motion.ellipse
        cx="100"
        cy="85"
        rx="20"
        ry="10"
        fill="#D4AF37"
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: [0, 0.4, 0.2], scale: [0, 1.5, 1.2] }}
        transition={{ duration: 1.5, delay: 0.8, repeat: Infinity }}
        style={{ filter: 'blur(10px)' }}
      />
    </svg>
  );
};

const INDIA_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana",
  "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
  "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];

const STATE_CITIES: Record<string, string[]> = {
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Thane", "Nashik", "Kalyan-Dombivli", "Vasai-Virar", "Aurangabad", "Navi Mumbai", "Solapur", "Mira-Bhayandar", "Bhiwandi", "Amravati", "Nanded", "Kolhapur", "Akola", "Panvel", "Ulhasnagar", "Sangli-Miraj & Kupwad", "Malegaon", "Jalgaon", "Latur", "Dhule", "Ahmednagar", "Chandrapur", "Parbhani", "Ichalkaranji", "Jalna", "Ambarnath", "Bhusawal", "Ratnagiri", "Beed"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Gandhinagar", "Junagadh", "Gandhidham", "Anand"],
  "Karnataka": ["Bengaluru", "Mysore", "Hubli-Dharwad", "Mangaluru", "Belagavi", "Davangere", "Ballari", "Vijayapura", "Shivamogga", "Tumakuru"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", "Tiruppur", "Ranipet", "Nagercoil", "Thanjavur"],
  "Delhi": ["New Delhi", "North Delhi", "South Delhi", "East Delhi", "West Delhi"],
};

const LiveVisitorCount = () => {
  const [count, setCount] = useState(Math.floor(Math.random() * (65 - 35 + 1)) + 35);

  useEffect(() => {
    const triggerUpdate = () => {
      const delay = Math.floor(Math.random() * (10000 - 5000 + 1)) + 5000;
      setTimeout(() => {
        setCount(prev => {
          const change = Math.random() > 0.5 ? 1 : -1;
          const delta = Math.random() > 0.8 ? 2 : 1;
          const next = prev + (change * delta);
          if (next < 30) return 30;
          if (next > 85) return 85;
          return next;
        });
        triggerUpdate();
      }, delay);
    };
    triggerUpdate();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-24 right-4 sm:right-6 z-40 bg-black/40 backdrop-blur-md border border-[#D4AF37]/30 px-3 py-1.5 rounded-full flex items-center gap-2 shadow-xl ring-1 ring-white/5"
    >
      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
      <span className="text-[9px] sm:text-[10px] font-medium text-zinc-100 uppercase tracking-wider">
        <span className="font-black text-[#D4AF37]">{count}</span> viewing now
      </span>
    </motion.div>
  );
};

const RegistrationModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [formData, setFormData] = useState({ name: '', mobile: '', email: '', state: '', city: '', status: '', qualification: '' });
  const [errors, setErrors] = useState({ name: '', mobile: '', email: '', state: '', city: '', status: '', qualification: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    let newErrors = { name: '', mobile: '', email: '', state: '', city: '', status: '', qualification: '' };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Full Name is required';
      isValid = false;
    }

    if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = 'Enter a valid 10-digit mobile number';
      isValid = false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
      isValid = false;
    }

    if (!formData.state) {
      newErrors.state = 'State is required';
      isValid = false;
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
      isValid = false;
    }

    if (!formData.status) {
      newErrors.status = 'Status is required';
      isValid = false;
    }

    if (!formData.qualification) {
      newErrors.qualification = 'Qualification is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);

      // Send data to Google Sheets via Apps Script
      const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || '';

      fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
        .then(() => {
          console.log('Registration data sent to Google Sheets');
        })
        .catch((err) => {
          console.error('Google Sheets error, saving to localStorage fallback:', err);
          // Fallback: save locally so no data is lost
          const existing = JSON.parse(localStorage.getItem('tryq_registrations') || '[]');
          localStorage.setItem('tryq_registrations', JSON.stringify([
            ...existing,
            { ...formData, timestamp: new Date().toISOString() }
          ]));
        })
        .finally(() => {
          setIsSubmitting(false);
          setIsSuccess(true);
        });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-zinc-950 border border-[#D4AF37]/30 p-8 rounded-[32px] shadow-[0_0_50px_rgba(212,175,55,0.2)] overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 blur-3xl -z-10" />

            <button onClick={onClose} className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors">
              <X size={24} />
            </button>

            {isSuccess ? (
              <div className="text-center py-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-20 h-20 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-yellow-500/20"
                >
                  <Timer className="text-[#D4AF37] animate-pulse" size={40} />
                </motion.div>
                <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tighter">Wait! One Last Step</h3>
                <p className="text-red-500 font-bold text-sm mb-8 uppercase tracking-widest animate-pulse">
                  Your seat is NOT confirmed yet!
                </p>

                <div className="bg-zinc-900/80 border border-zinc-800 p-8 rounded-3xl relative overflow-hidden group">
                  <div className="absolute inset-0 bg-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  <p className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.3em] mb-4">Mandatory Step</p>
                  <h4 className="text-zinc-200 text-sm leading-relaxed mb-8">
                    For further updates, you <span className="text-white font-bold underline">must join</span> our official WhatsApp community below.
                  </h4>

                  <a
                    href={import.meta.env.VITE_WHATSAPP_URL || "https://chat.whatsapp.com/your-community-link"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative z-10 inline-flex items-center gap-3 bg-[#25D366] text-white font-black px-10 py-5 rounded-2xl uppercase tracking-widest hover:scale-105 transition-transform shadow-[0_20px_40px_rgba(37,211,102,0.3)] group"
                  >
                    <Users size={20} />
                    Join the Community
                  </a>

                  <p className="text-zinc-500 text-[9px] mt-6 uppercase font-bold tracking-widest opacity-60">
                    Registration will expire in 5 minutes if not joined
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <h3 className="text-3xl font-black text-white tracking-tighter mb-2 uppercase">Reserve Your Spot</h3>
                  <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.3em]">Step 1 of 2: Details</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-black text-[#D4AF37] uppercase tracking-widest mb-2">Full Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
                      placeholder="Enter your name"
                      required
                    />
                    {errors.name && <p className="text-red-500 text-[10px] mt-1 uppercase font-bold">{errors.name}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-black text-[#D4AF37] uppercase tracking-widest mb-2">Mobile Number</label>
                      <input
                        type="tel"
                        value={formData.mobile}
                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                        className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
                        placeholder="10-digit number"
                        required
                      />
                      {errors.mobile && <p className="text-red-500 text-[10px] mt-1 uppercase font-bold">{errors.mobile}</p>}
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-[#D4AF37] uppercase tracking-widest mb-2">Email Address</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
                        placeholder="your@email.com"
                        required
                      />
                      {errors.email && <p className="text-red-500 text-[10px] mt-1 uppercase font-bold">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-black text-[#D4AF37] uppercase tracking-widest mb-2">State</label>
                      <div className="relative">
                        <select
                          value={formData.state}
                          onChange={(e) => setFormData({ ...formData, state: e.target.value, city: '' })}
                          className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]/50 transition-colors appearance-none"
                          required
                        >
                          <option value="" disabled>Select State</option>
                          {INDIA_STATES.map(state => <option key={state} value={state}>{state}</option>)}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" size={16} />
                      </div>
                      {errors.state && <p className="text-red-500 text-[10px] mt-1 uppercase font-bold">{errors.state}</p>}
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-[#D4AF37] uppercase tracking-widest mb-2">City</label>
                      <input
                        type="text"
                        list="cities"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
                        placeholder="Select or type city"
                        required
                      />
                      <datalist id="cities">
                        {formData.state && STATE_CITIES[formData.state] && STATE_CITIES[formData.state].map(city => (
                          <option key={city} value={city} />
                        ))}
                      </datalist>
                      {errors.city && <p className="text-red-500 text-[10px] mt-1 uppercase font-bold">{errors.city}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-black text-[#D4AF37] uppercase tracking-widest mb-2">Current Status</label>
                      <div className="relative">
                        <select
                          value={formData.status}
                          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                          className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]/50 transition-colors appearance-none"
                          required
                        >
                          <option value="" disabled>Select Status</option>
                          <option value="Student">Student</option>
                          <option value="Employed">Employed</option>
                          <option value="Self-Employed">Self-Employed</option>
                          <option value="Seeking Employment">Seeking Employment</option>
                          <option value="Intern">Intern</option>
                          <option value="Freelancer">Freelancer</option>
                          <option value="Other">Other</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" size={16} />
                      </div>
                      {errors.status && <p className="text-red-500 text-[10px] mt-1 uppercase font-bold">{errors.status}</p>}
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-[#D4AF37] uppercase tracking-widest mb-2">Select Qualification</label>
                      <div className="relative">
                        <select
                          value={formData.qualification}
                          onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                          className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]/50 transition-colors appearance-none"
                          required
                        >
                          <option value="" disabled>Select Qualification</option>
                          <option value="10th Pass">10th Pass</option>
                          <option value="12th Pass">12th Pass</option>
                          <option value="Diploma">Diploma</option>
                          <option value="Undergraduate (Pursuing)">Undergraduate (Pursuing)</option>
                          <option value="Undergraduate (Completed)">Undergraduate (Completed)</option>
                          <option value="Postgraduate (Pursuing)">Postgraduate (Pursuing)</option>
                          <option value="Postgraduate (Completed)">Postgraduate (Completed)</option>
                          <option value="Doctorate (PhD)">Doctorate (PhD)</option>
                          <option value="Other">Other</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" size={16} />
                      </div>
                      {errors.qualification && <p className="text-red-500 text-[10px] mt-1 uppercase font-bold">{errors.qualification}</p>}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#D4AF37] text-black font-black py-4 rounded-xl uppercase tracking-[0.2em] hover:bg-[#F3D17B] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Next Step</span>
                        <ChevronRight size={18} />
                      </>
                    )}
                  </button>
                  <p className="text-center text-zinc-600 text-[9px] uppercase font-bold tracking-tighter">Your data is secured with end-to-end encryption</p>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  const [isLive, setIsLive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const updateStatus = () => {
      const now = Date.now();
      setIsLive(now >= TARGET_DATE);
    };
    updateStatus();
    const interval = setInterval(updateStatus, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-[#D4AF37] selection:text-black">
      <LiveNotifier />
      <LiveVisitorCount />

      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-black/80 border-b border-zinc-800 shadow-xl">
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-14 h-14 bg-white/5 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.2)] overflow-hidden">
              <img
                src={logo}
                alt="TRYQ Logo"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  // Fallback if image not found
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = '<span class="font-black text-[#D4AF37] text-xl italic tracking-tighter">TQ</span>';
                }}
              />
            </div>
            <span className="font-bold text-lg tracking-widest hidden sm:block uppercase">TRYQ</span>
          </div>
          <PulseButton
            onClick={openModal}
            isLive={isLive}
            className="text-xs font-black px-5 py-2.5 rounded-full uppercase tracking-widest animate-gold-pulse shadow-lg"
          >
            {isLive ? "JOIN LIVE" : "Reserve My Seat"}
          </PulseButton>
        </div>
      </header>

      <main>
        <section className="relative px-6 pt-20 pb-16 overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[120px] -z-10 -translate-x-1/2 translate-y-1/2" />

          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.2em] mb-6 shadow-[0_0_15px_rgba(212,175,55,0.1)]">
                Pune Exclusive Masterclass
              </span>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-zinc-500 leading-[1.1]">
                Master Creative Storytelling + AI
              </h1>
              <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                The industry has 100 tools but <span className="text-white font-medium italic">0 storytellers</span>. Bridge the gap and start building your portfolio in Video editing, UI/UX & AI.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <PulseButton className="w-full sm:w-auto" isLive={isLive} onClick={openModal}>
                  {isLive ? "JOIN WEBINAR NOW" : "RESERVE MY SEAT"}
                </PulseButton>
                <div className="flex items-center gap-2 text-zinc-500 text-sm">
                  <MapPin size={16} className="text-red-500" />
                  <span>Exclusive Pune Workshop</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 text-center sm:text-left">
              <h2 className="text-3xl font-bold mb-2 flex items-center justify-center sm:justify-start gap-2">
                <Zap size={24} className="text-blue-500" />
                Current Market For Video editor
              </h2>
              <p className="text-zinc-500 text-sm uppercase tracking-widest leading-loose">Demand vs Supply</p>
            </div>
            <SVGGapVisualization />
          </div>
        </section>

        {/* Why Attend Section */}
        <section className="px-6 py-24 bg-black relative">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold mb-4 tracking-tighter">Why You Must Attend This Seminar</h2>
              <p className="text-zinc-500 uppercase tracking-[0.4em] text-[10px] font-black">The bridge between tools and talent.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 min-h-[800px]">
              <BenefitCard
                className="md:col-span-8 md:row-span-1"
                title="THE STORYTELLER (Video)"
                text="Master the art of storytelling, not just the software. Move viewers emotionally."
                badge="High Demand Skill"
                illustration={<StorytellerSVG />}
              />
              <BenefitCard
                className="md:col-span-4 md:row-span-2"
                title="THE ARCHITECT (UI/UX)"
                text="Create Experiences. Design Impact. Learn why users click. From journey to glow."
                badge="Top Choice 2026"
                illustration={<ArchitectSVG />}
              />
              <BenefitCard
                className="md:col-span-4 md:row-span-1"
                title="THE CO-PILOT (AI)"
                text="Work Smarter, Not Harder. Use AI to automate the boring stuff. 10x your output."
                badge="Future-Ready"
                illustration={<CoPilotSVG />}
              />
              <BenefitCard
                className="md:col-span-4 md:row-span-1"
                title="THE FREELANCER (Career)"
                text="Learn. Build. Earn. Start your freelance journey from anywhere. Global payments."
                badge="Get Certified"
                illustration={<FreelancerSVG />}
              />
            </div>

            <div className="mt-16 text-center">
              <PulseButton variant="gold" className="w-full sm:w-auto px-16 py-6 text-lg shadow-[0_0_50px_rgba(212,175,55,0.15)] font-black" isLive={isLive} onClick={openModal}>
                {isLive ? "JOIN LIVE WEBINAR" : "I WANT THESE SKILLS"}
              </PulseButton>
            </div>
          </div>
        </section>

        <section className="px-6 py-20 bg-zinc-900/20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Seminar Curriculum</h2>
              <div className="h-1 w-20 bg-[#D4AF37] mx-auto rounded-full" />
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Zap className="text-blue-500" />,
                  title: "Viral Hook Discovery",
                  desc: "Learn the psychology of attention. How to grab human attention in under 3 seconds using the 'Inverted Curiosity' framework."
                },
                {
                  icon: <Cpu className="text-[#D4AF37]" />,
                  title: "AI-Assisted Workflow",
                  desc: "Editing 5x faster without losing soul. Master the prompts that make AI your creative partner, not a robotic replacement."
                },
                {
                  icon: <Briefcase className="text-green-500" />,
                  title: "The Portfolio Blueprint",
                  desc: "Start 3 specific projects during the session that will actually land you high-ticket clients or Pune's top agency roles."
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5 }}
                  className="bg-black/40 border border-zinc-800 p-8 rounded-2xl hover:border-[#D4AF37]/50 transition-all group"
                >
                  <div className="mb-6 p-4 rounded-xl bg-zinc-900 inline-block group-hover:shadow-[0_0_15px_rgba(212,175,55,0.1)] transition-all">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-24 bg-black relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[100px] -z-10" />

          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 px-4">
              <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter text-white">Is this really Free?</h2>
              <div className="h-1.5 w-24 bg-red-500 mx-auto rounded-full mb-4" />
              <p className="text-zinc-500 uppercase tracking-[0.3em] text-[10px] sm:text-xs font-black">Let's look at the math</p>
            </div>

            <div className="flex flex-col lg:flex-row items-stretch justify-center gap-6 mb-16 px-4">
              {/* Card 1: What it's worth */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="bg-zinc-950/50 border border-zinc-900 p-8 rounded-[32px] relative group w-full lg:w-1/2 max-w-sm flex flex-col"
              >
                <h3 className="text-xl font-bold mb-8 text-zinc-300 uppercase tracking-tight flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-zinc-700" />
                  What it’s worth
                </h3>

                <div className="space-y-6 mb-10 flex-grow">
                  {[
                    { label: "Master Storytelling (Video)", val: "₹5,000" },
                    { label: "UI/UX Design Impact", val: "₹4,000" },
                    { label: "AI Skills (Work 10x Faster)", val: "₹6,000" }
                  ].map((skill, i) => (
                    <div key={i} className="flex justify-between items-center group/item">
                      <span className="text-zinc-500 font-medium group-hover/item:text-zinc-300 transition-colors">{skill.label}</span>
                      <span className="text-zinc-400 font-mono italic">{skill.val}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-zinc-900 relative mt-auto">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-zinc-400 uppercase tracking-widest">Total Value</span>
                    <div className="relative">
                      <span className="text-3xl font-black text-zinc-600 font-mono">₹15,000</span>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "110%" }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="absolute top-[55%] left-[-5%] h-[2px] bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Card 2: Your Special Price */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-br from-zinc-950 to-zinc-900 border border-[#D4AF37]/30 p-8 rounded-[32px] relative shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden w-full lg:w-1/2 max-w-sm flex flex-col"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 blur-3xl -z-10" />

                <h3 className="text-xl font-bold mb-8 text-[#D4AF37] uppercase tracking-tight flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                  What you pay
                </h3>

                <div className="flex flex-col items-center justify-center py-6 flex-grow">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    className="relative"
                  >
                    <span className="text-8xl font-black text-white font-mono leading-none tracking-tighter shadow-glow" style={{ textShadow: '0 0 40px rgba(212,175,55,0.4)' }}>
                      ₹0
                    </span>
                    <motion.div
                      animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute -inset-4 bg-[#D4AF37]/5 blur-2xl rounded-full -z-10"
                    />
                  </motion.div>
                  <p className="mt-8 text-zinc-400 font-bold uppercase tracking-widest text-xs text-center border-y border-zinc-800 py-3 w-full">
                    Sponsored for the TRYQ Pune Batch
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-3 bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800">
                  <Users className="text-[#D4AF37]" size={20} />
                  <span className="text-[10px] sm:text-xs text-zinc-400 font-medium leading-tight">
                    This batch is fully funded to build a community of high-impact specialists in Pune.
                  </span>
                </div>
              </motion.div>
            </div>

            <div className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-[24px] mb-12 text-center relative">
              <p className="text-lg md:text-xl text-zinc-300 font-light italic leading-relaxed">
                "Why? Because Pune needs <span className="font-black animate-shimmer bg-gradient-to-r from-[#D4AF37] via-white to-[#D4AF37] bg-[length:200%_auto] bg-clip-text text-transparent">Video Editor and Ui / Ux Specialist</span>, not just degree holders. We’re helping you bridge the gap and start your journey with zero financial barriers."
              </p>
            </div>

            <div className="text-center px-4">
              <PulseButton variant="gold" shimmer className="w-full max-w-md mx-auto py-5 text-lg font-black shadow-[0_20px_50px_rgba(212,175,55,0.25)] rounded-2xl" onClick={openModal}>
                CLAIM MY FREE ₹15,000 SEAT
              </PulseButton>
              <p className="mt-4 text-xs text-zinc-500 flex items-center justify-center gap-2">
                <Timer size={14} className="animate-pulse text-red-500" />
                Only 6 seats remain at this sponsorship value.
              </p>
            </div>
          </div>
        </section>

        <section className="px-6 py-20">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-8 italic">Future-Proof Your Legacy.</h2>
              <div className="space-y-6">
                {[
                  "Freelance in USD while living in Pune",
                  "Work with top Pune Agencies directly",
                  "Future-proof your career against generic AI",
                  "Access to the private TRYQ Elite community"
                ].map((text, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <CheckCircle2 className="text-[#D4AF37] shrink-0 mt-1" size={20} />
                    <p className="text-zinc-300 font-medium">{text}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="p-8 bg-zinc-900/50 rounded-3xl border border-zinc-800 relative group overflow-hidden">
              <div className="absolute inset-0 bg-blue-500/5 group-hover:bg-blue-500/10 transition-colors" />
              <div className="relative z-10 text-center">
                <Users className="mx-auto mb-6 text-zinc-500" size={48} />
                <h3 className="text-2xl font-bold mb-2">Limited to 40 Seats</h3>
                <p className="text-zinc-500 text-sm mb-8">Personalized attention for every participant.</p>
                <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: "0%" }}
                    whileInView={{ width: "85%" }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-gradient-to-r from-[#D4AF37] to-yellow-200"
                  />
                </div>
                <div className="flex justify-between mt-2 text-[10px] uppercase font-black text-zinc-500">
                  <span>34 Seats Taken</span>
                  <span>6 Left</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-24 mb-20">
          <div className="max-w-4xl mx-auto text-center bg-zinc-950 border border-[#D4AF37]/20 p-12 rounded-[40px] shadow-[0_0_50px_rgba(0,0,0,1)] relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

            <Calendar className="mx-auto mb-8 text-[#D4AF37]" size={40} />
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tighter text-white">May 10th @ 11:00 AM</h2>
            <p className="text-zinc-400 mb-12 uppercase tracking-[0.3em] text-sm">Doors Close In:</p>

            <div className="mb-14">
              <CountdownTimer />
            </div>

            <PulseButton variant="green" className="w-full sm:w-auto px-10 sm:px-14 py-5 text-base sm:text-lg" onClick={openModal}>
              RESERVE MY SEAT NOW
            </PulseButton>

            <p className="mt-8 text-zinc-600 text-xs flex items-center justify-center gap-2">
              <CheckCircle2 size={12} /> Secure Checkout via Google Forms
            </p>
          </div>
        </section>

        <section className="relative px-6 py-24 bg-zinc-950 overflow-hidden" id="mentor">
          {/* Background Text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none -z-0">
            <span className="text-[200px] md:text-[400px] font-black text-outline opacity-20 select-none">
              SKP
            </span>
          </div>

          <div className="max-w-6xl mx-auto relative z-10">
            {/* Playful Mentor Title */}
            <motion.div
              initial={{ y: 20, opacity: 0, rotate: -2 }}
              whileInView={{ y: 0, opacity: 1, rotate: 2 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.1
              }}
              className="text-center mb-16"
            >
              <h2 className="inline-block px-10 py-4 bg-zinc-900/50 border border-white/5 rounded-3xl shadow-[0_0_30px_rgba(212,175,55,0.05)] relative overflow-hidden group">
                <div className="absolute inset-0 bg-[#D4AF37]/5 animate-pulse" />
                <span className="relative z-10 text-[#D4AF37] font-black text-2xl md:text-4xl tracking-[0.2em] uppercase italic bg-clip-text">
                  Who is your mentor?
                </span>
                <motion.div
                  className="absolute -right-2 -top-2 text-[#D4AF37]"
                  animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Sparkles size={32} />
                </motion.div>
              </h2>
            </motion.div>

            <div className="flex flex-col lg:flex-row items-center gap-12 md:gap-20">
              {/* Character Visual / Photo Placeholder */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="relative shrink-0"
              >
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-[40px] bg-gradient-to-br from-zinc-800 to-zinc-900 border border-[#D4AF37]/20 relative group overflow-hidden shadow-2xl">
                  {/* Neon Glow behind character */}
                  <div className="absolute inset-0 bg-[#D4AF37]/5 group-hover:bg-[#D4AF37]/10 transition-colors" />
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#D4AF37]/20 blur-[60px] rounded-full" />

                  {/* Mentor Photo */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      src={mentorPhoto}
                      alt="Sahil Pawar"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md border border-white/5 p-3 rounded-2xl">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#D4AF37]">Active Mentor</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Bio / Loadout Content */}
              <div className="flex-1 text-center lg:text-left">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <h3 className="text-[#D4AF37] font-black text-4xl md:text-6xl mb-2 tracking-tighter">Sahil Pawar</h3>
                  <p className="text-white font-mono text-xs md:text-sm uppercase tracking-[0.2em] mb-12 opacity-80">
                    Creative Director @ Digiwork <span className="text-zinc-700 mx-2">|</span> Creative Business Consultant
                  </p>
                </motion.div>

                {/* Achievement Points (Loadout) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-6 mb-12 max-w-xl mx-auto lg:mx-0">
                  {[
                    { icon: <Trophy className="text-[#D4AF37]" size={20} />, title: "EXPERIENCE", text: "6+ Years in Creative Industry" },
                    { icon: <Crown className="text-[#D4AF37]" size={20} />, title: "LEADERSHIP", text: "Founder of TRYQ" },
                    { icon: <Users className="text-[#D4AF37]" size={20} />, title: "IMPACT", text: "Trained 500+ Aspiring Creators" }
                  ].map((point, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-5 p-4 bg-zinc-900/40 border border-white/5 rounded-2xl hover:bg-zinc-900/60 hover:border-[#D4AF37]/20 transition-all group"
                    >
                      <div className="p-3 rounded-xl bg-black border border-zinc-800 group-hover:border-[#D4AF37]/40 transition-colors">
                        {point.icon}
                      </div>
                      <div className="text-left">
                        <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{point.title}</h4>
                        <p className="text-white text-sm font-medium">{point.text}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Portfolio Button */}
                <motion.a
                  href={import.meta.env.VITE_MENTOR_URL || "https://sk-cyan.vercel.app/"}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-3 px-10 py-5 bg-black border border-[#D4AF37]/50 rounded-2xl text-[#D4AF37] font-black uppercase tracking-[0.3em] text-sm shadow-[0_0_30px_rgba(212,175,55,0.1)] hover:shadow-[0_0_40px_rgba(212,175,55,0.3)] transition-all animate-neon-flicker"
                >
                  <Sparkles size={18} />
                  About me
                </motion.a>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-zinc-950 overflow-hidden relative">
          <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
            <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter text-white">Wall of Love</h2>
            <p className="text-zinc-500 uppercase tracking-[0.4em] text-[10px] font-black italic">Straight from the Pune creative engine.</p>
          </div>

          <div className="flex w-full overflow-hidden mask-fade-x">
            <div className="flex gap-6 animate-marquee whitespace-nowrap py-10 w-max">
              {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
                <TestimonialCard
                  key={i}
                  name={t.name}
                  location={t.location}
                  role={t.role}
                  text={t.text}
                />
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-6 mt-16 text-center">
            <p className="text-zinc-400 font-medium mb-8">
              Join <span className="text-white font-black">250+ students</span> who have already transformed their careers.
            </p>
            <PulseButton variant="gold" shimmer className="w-full max-w-sm mx-auto h-16 text-md font-black shadow-[0_20px_60px_rgba(212,175,55,0.2)]" onClick={openModal}>
              I WANT THESE RESULTS
            </PulseButton>
          </div>
        </section>

        <section className="px-6 py-24 bg-zinc-950/30">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tighter text-white">Any Questions ..?</h2>
              <p className="text-zinc-500 uppercase tracking-widest text-[10px] font-black italic">Your questions, answered truthfully.</p>
            </div>

            <div className="bg-zinc-900/20 border border-zinc-900/50 rounded-[32px] p-6 md:p-10">
              <FAQItem
                question="Is this really for beginners?"
                answer="Yes. We assume you know nothing. But we also assume you have the hunger to learn fast. The workflow we teach (AI + Human Creativity) is designed to let beginners compete with veterans in weeks, not years."
              />
              <FAQItem
                question="What if I miss the specific date?"
                answer="High-value sessions are rare. If you miss this batch, you'll be placed on a waitlist for the next one. However, sponsorship is only guaranteed for this first Pune batch. Priority always goes to those who show up live."
              />
              <FAQItem
                question="What are the prerequisites?"
                answer="A laptop (any kind), a stable internet connection, and 3 hours of focused attention. No expensive software needed—we'll show you the industry's best free and AI-powered alternatives."
              />
              <FAQItem
                question="Will I get a certificate?"
                answer="Yes, but don't care about the paper. Care about the portfolio pieces you'll build. A TRYQ certificate means you can survive a real-world creative brief, which is worth more to a client than a degree."
              />
            </div>
          </div>
        </section>

      </main>

      <footer className="px-6 py-16 border-t border-zinc-900 text-center text-zinc-600 text-sm">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-6">
          <div className="w-20 h-20 bg-white/5 rounded-xl flex items-center justify-center p-3 border border-zinc-800">
            <img
              src={logo}
              alt="TRYQ Logo"
              className="w-full h-full object-contain opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <p>&copy; 2026 TRYQ Creative School. All Rights Reserved.</p>
            <p className="mt-2 flex items-center justify-center gap-4 text-xs">
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Support</a>
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Action Button for Mobile */}
      <AnimatePresence>
        {!isModalOpen && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="fixed bottom-28 right-6 z-[9999] md:hidden"
          >
            <motion.button
              onClick={openModal}
              whileTap={{ scale: 0.95 }}
              className="h-12 px-6 bg-gradient-to-r from-[#D4AF37] via-[#F3D17B] to-[#D4AF37] rounded-full shadow-[0_10px_30px_rgba(212,175,55,0.6)] flex items-center justify-center gap-2 text-black font-black text-xs tracking-tighter animate-gold-pulse active:shadow-none border border-white/20 whitespace-nowrap"
            >
              <Calendar size={16} />
              RESERVE SEAT
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
      <RegistrationModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}
