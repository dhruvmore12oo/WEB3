import React, { useState, useEffect } from 'react';
import { BookOpen, Globe, Fingerprint, Coins, Database, Server, Link as LinkIcon, Key, Network, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import ConceptDetailCard from '../components/ConceptDetailCard';

const CONCEPTS_DATA = [
  {
    id: "web2-vs-web3",
    title: "Web2 vs Web3",
    intro: "The internet is evolving. While Web2 is defined by user-generated content hosted on centralized platforms, Web3 introduces an internet owned by its builders and users, orchestrated with crypto tokens.",
    left: { 
      name: "Web2", 
      icon: Globe, 
      textClass: "text-blue-500", 
      bgClass: "bg-blue-500", 
      borderClass: "border-blue-500/30" 
    },
    right: { 
      name: "Web3", 
      icon: Network, 
    },
    attributes: [
      { name: "Ownership", left: "Corporate monopolies", right: "Users and builders" },
      { name: "Data Control", left: "Companies monetize your data", right: "You own your personal data" },
      { name: "Authentication", left: "Email & Passwords (OAuth)", right: "Crypto Wallets (e.g., MetaMask)" },
      { name: "Privacy", left: "Highly tracked & targeted", right: "Pseudonymous & private" },
      { name: "Payments", left: "Stripe, PayPal, Banks", right: "Native cryptocurrencies" },
      { name: "Infrastructure", left: "Centralized servers (AWS)", right: "Decentralized nodes" },
      { name: "Transparency", left: "Closed source & proprietary", right: "Open source & transparent" },
      { name: "Security", left: "Vulnerable to central hacks", right: "Secured by cryptography" },
      { name: "Governance", left: "Board of Directors", right: "Community voting (DAOs)" },
      { name: "Monetization", left: "Ad-driven", right: "Token-driven (Ownership economy)" },
      { name: "User Control", left: "Platform can ban or censor you", right: "Censorship-resistant" }
    ],
    examples: {
      left: ["Facebook", "Instagram", "Google", "Amazon"],
      right: ["Uniswap", "OpenSea", "MetaMask", "Arbitrum"]
    },
    keyTakeaways: [
      "Web3 removes the middleman, allowing pure peer-to-peer interactions without extracting value.",
      "Your crypto wallet acts as your universal login across all Web3 apps, replacing hundreds of passwords.",
      "Instead of ad-revenue models, Web3 uses token economics to reward the actual users and creators."
    ],
    didYouKnow: "In Web3, you can log into hundreds of different applications using just one wallet, without ever giving up your name or email address!"
  },
  {
    id: "ethereum-vs-bitcoin",
    title: "Ethereum vs Bitcoin",
    intro: "The two giants of cryptocurrency serve entirely different purposes. Bitcoin was designed to be digital money, while Ethereum was built as a decentralized world computer to run unstoppable applications.",
    left: { 
      name: "Ethereum", 
      icon: Server, 
      textClass: "text-indigo-500", 
      bgClass: "bg-indigo-500", 
      borderClass: "border-indigo-500/30" 
    },
    right: { 
      name: "Bitcoin", 
      icon: Coins, 
    },
    attributes: [
      { name: "Purpose", left: "Decentralized computation platform", right: "Digital store of value / money" },
      { name: "Creator", left: "Vitalik Buterin (2015)", right: "Satoshi Nakamoto (2009)" },
      { name: "Native Coin", left: "Ether (ETH)", right: "Bitcoin (BTC)" },
      { name: "Consensus", left: "Proof of Stake (PoS)", right: "Proof of Work (PoW)" },
      { name: "Smart Contracts", left: "Turing complete (highly programmable)", right: "Very limited scripting" },
      { name: "Supply", left: "Inflationary/Deflationary (Burn mech)", right: "Capped at 21 Million coins" },
      { name: "Block Time", left: "~12 seconds", right: "~10 minutes" },
      { name: "Ecosystem", left: "DeFi, NFTs, DAOs, Layer 2s", right: "Lightning Network, Ordinals" },
      { name: "Gas Fees", left: "Paid in ETH (Variable)", right: "Paid in BTC (Variable)" },
      { name: "Typical Use", left: "Building decentralized apps (dApps)", right: "Long-term holding / Gold alternative" }
    ],
    examples: {
      left: ["DeFi", "NFTs", "DAOs", "Smart Contracts"],
      right: ["Store of Value", "Payments", "Remittances"]
    },
    keyTakeaways: [
      "Bitcoin is like a pocket calculator—excellent at one specific thing (math/money). Ethereum is like a smartphone—you can build any app on it.",
      "Ethereum shifted to Proof of Stake in 2022, reducing its energy consumption by 99.9%.",
      "Ethereum is the foundation for the vast majority of the Web3 ecosystem."
    ],
    didYouKnow: "Ethereum introduced 'Smart Contracts'—programs stored on the blockchain that run automatically when predetermined conditions are met, without human intervention!"
  },
  {
    id: "keys",
    title: "Public Key vs Private Key",
    intro: "Keys are the foundation of blockchain cryptography and ownership. They work together mathematically to ensure that only you can control and authorize the movement of your digital assets.",
    left: { 
      name: "Public Key", 
      icon: Fingerprint, 
      textClass: "text-green-500", 
      bgClass: "bg-green-500", 
      borderClass: "border-green-500/30" 
    },
    right: { 
      name: "Private Key", 
      icon: Key, 
    },
    attributes: [
      { name: "Definition", left: "Your digital address/identity", right: "Your digital signature/password" },
      { name: "Visibility", left: "Visible to anyone on the network", right: "Hidden strictly to you" },
      { name: "Purpose", left: "To receive funds and verify signatures", right: "To authorize transactions and sign data" },
      { name: "Security", left: "Can be freely shared", right: "Must be guarded with your life" },
      { name: "Real-world Analogy", left: "Your bank account number", right: "Your ATM PIN code" },
      { name: "Digital Signature", left: "Used by others to verify your signature", right: "Used by you to create a signature" },
      { name: "Derivation", left: "Derived mathematically from the private key", right: "Generated randomly (often as a seed phrase)" },
      { name: "Wallet Example", left: "0x71C...8976", right: "A 12 to 24-word seed phrase" },
      { name: "Risks", left: "None (safe to post publicly)", right: "If stolen, your funds are permanently lost" },
      { name: "Best Practices", left: "Share for payments or identity", right: "Store offline in a hardware wallet" }
    ],
    examples: {
      left: ["Sharing address to receive ETH", "Verifying NFT ownership"],
      right: ["Signing a smart contract", "Sending funds from wallet"]
    },
    keyTakeaways: [
      "Not your keys, not your crypto. If you hold crypto on an exchange, they own the private key, not you.",
      "The math makes it easy to generate a Public Key from a Private Key, but impossible to reverse it.",
      "Your 'Seed Phrase' is just a human-readable master format of your Private Key."
    ],
    didYouKnow: "A public key can be shared safely with anyone in the world, but a private key must NEVER be shared. Anyone with your private key has absolute control over your assets."
  },
  {
    id: "blockchain-vs-db",
    title: "Blockchain vs Traditional Database",
    intro: "While both store information, they operate on completely different trust models. Databases are built for efficiency under central control, whereas blockchains are built for immutability without central trust.",
    left: { 
      name: "Database", 
      icon: Database, 
      textClass: "text-purple-500", 
      bgClass: "bg-purple-500", 
      borderClass: "border-purple-500/30" 
    },
    right: { 
      name: "Blockchain", 
      icon: LinkIcon, 
    },
    attributes: [
      { name: "Architecture", left: "Client-Server (Centralized)", right: "Peer-to-Peer (Decentralized)" },
      { name: "Ownership", left: "Owned by a single entity (admin)", right: "Shared by a network of nodes" },
      { name: "Trust Model", left: "Requires trust in the administrator", right: "Trustless (secured by math & consensus)" },
      { name: "Speed", left: "Extremely fast (millions of TPS)", right: "Slower (constrained by consensus)" },
      { name: "Scalability", left: "Highly scalable vertically", right: "Harder to scale natively (requires L2s)" },
      { name: "Security", left: "Single point of failure (hacks/leaks)", right: "No single point of failure" },
      { name: "Transparency", left: "Opaque (admins can hide data)", right: "Fully transparent public ledger" },
      { name: "Immutability", left: "Admins can edit/delete history", right: "Append-only (history cannot be changed)" },
      { name: "Cost", left: "Cheap to store massive data", right: "Very expensive to store data" },
      { name: "Fault Tolerance", left: "Requires backup servers", right: "Inherent (thousands of copies exist)" },
      { name: "Best Use Case", left: "High-volume private data processing", right: "Value transfer and verifiable truth" }
    ],
    examples: {
      left: ["Bank Records", "Hospital Systems", "School ERP"],
      right: ["Crypto", "Supply Chain", "Digital Identity"]
    },
    keyTakeaways: [
      "Blockchains are incredibly inefficient compared to databases, but they trade efficiency for censorship resistance.",
      "You don't need a blockchain for everything. If you trust the central authority, a database is vastly superior.",
      "The invention of the blockchain solved the 'Double Spend' problem, allowing digital scarcity for the first time."
    ],
    didYouKnow: "Blockchain records are immutable! Once data is permanently written into a block and confirmed, it is mathematically impossible to alter or erase it without destroying the entire network."
  }
];

const Concepts = () => {
  const [activeSection, setActiveSection] = useState(CONCEPTS_DATA[0].id);

  useEffect(() => {
    const handleScroll = () => {
      const sections = CONCEPTS_DATA.map(c => document.getElementById(c.id));
      let current = CONCEPTS_DATA[0].id;
      
      for (const section of sections) {
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 300) {
            current = section.id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20 bg-background relative overflow-hidden">
      
      {/* Background */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-cyan/5 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-white border border-border shadow-sm text-cyan mb-5">
            <BookOpen className="w-6 h-6" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-5 text-secondary tracking-tight">Core <span className="text-primary">Concepts</span></h1>
          <p className="text-lg text-muted font-medium leading-relaxed">
            Master the foundational technologies of the future. Dive deep into detailed, side-by-side comparisons of the most important Web3 concepts.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 items-start relative">
          
          {/* Sticky Sidebar Navigation */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full lg:w-1/4 lg:sticky lg:top-24 bg-white/50 backdrop-blur-xl border border-border rounded-2xl p-5 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)]"
          >
            <h3 className="text-base font-bold text-secondary mb-3 px-3">Topics Covered</h3>
            <nav className="flex flex-col gap-1.5">
              {CONCEPTS_DATA.map((concept) => (
                <button
                  key={concept.id}
                  onClick={() => scrollToSection(concept.id)}
                  className={`text-left px-4 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center justify-between group ${
                    activeSection === concept.id
                      ? 'bg-primary text-white shadow-sm'
                      : 'hover:bg-gray-100 text-muted hover:text-secondary'
                  }`}
                >
                  {concept.title}
                  <div className={`w-1.5 h-1.5 rounded-full transition-all ${
                    activeSection === concept.id ? 'bg-white' : 'bg-transparent group-hover:bg-border'
                  }`} />
                </button>
              ))}
            </nav>
          </motion.div>

          {/* Content Area */}
          <div className="w-full lg:w-3/4 flex flex-col gap-10">
            {CONCEPTS_DATA.map((concept, index) => (
              <ConceptDetailCard key={concept.id} concept={concept} index={index} />
            ))}
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Concepts;
