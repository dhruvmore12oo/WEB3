import React from 'react';
import ComparisonCard from '../components/ComparisonCard';
import { motion } from 'framer-motion';
import { Globe, Globe2, Bitcoin, Coins, Key, Lock, Database, Layers } from 'lucide-react';

const Concepts = () => {
  const comparisons = [
    {
      left: {
        title: "Web2",
        icon: Globe,
        points: [
          "Centralized data storage",
          "Corporations own your data",
          "Requires trust in platforms",
          "Censorship is possible"
        ],
        illustration: Database
      },
      right: {
        title: "Web3",
        icon: Globe2,
        points: [
          "Decentralized networks",
          "Users own their data",
          "Trustless transactions",
          "Censorship resistant"
        ],
        illustration: Layers
      }
    },
    {
      left: {
        title: "Bitcoin",
        icon: Bitcoin,
        points: [
          "Digital gold / store of value",
          "Limited smart contracts",
          "Proof of Work consensus",
          "Slower block times (~10 min)"
        ],
        illustration: Lock
      },
      right: {
        title: "Ethereum",
        icon: Coins,
        points: [
          "World computer for dApps",
          "Turing-complete smart contracts",
          "Proof of Stake consensus",
          "Faster block times (~12 sec)"
        ],
        illustration: Layers
      }
    },
    {
      left: {
        title: "Public Key",
        icon: Globe,
        points: [
          "Like your bank account number",
          "Safe to share with anyone",
          "Used to receive funds",
          "Derived from the private key"
        ],
        illustration: Database
      },
      right: {
        title: "Private Key",
        icon: Key,
        points: [
          "Like your ATM PIN",
          "Must NEVER be shared",
          "Used to authorize transactions",
          "Grants full access to funds"
        ],
        illustration: Lock
      }
    },
    {
      left: {
        title: "Traditional Database",
        icon: Database,
        points: [
          "Controlled by administrators",
          "Can be edited or deleted (CRUD)",
          "Single point of failure",
          "Client-server architecture"
        ],
        illustration: Globe
      },
      right: {
        title: "Blockchain",
        icon: Layers,
        points: [
          "Maintained by a network of nodes",
          "Append-only (Immutable)",
          "No single point of failure",
          "Peer-to-peer architecture"
        ],
        illustration: Network
      }
    }
  ];

  return (
    <div className="min-h-screen pt-40 pb-32">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary mb-6 text-sm font-semibold shadow-sm">
            Knowledge Base
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-secondary tracking-tight">Core <span className="text-primary">Concepts</span></h1>
          <p className="text-xl text-muted max-w-2xl mx-auto font-medium leading-relaxed">
            Understand the foundational differences between traditional technologies and the decentralized Web3 ecosystem.
          </p>
        </motion.div>

        <div className="space-y-20">
          {comparisons.map((comp, idx) => (
            <ComparisonCard key={idx} left={comp.left} right={comp.right} delay={idx * 0.1} />
          ))}
        </div>
      </div>
    </div>
  );
};

// Create a dummy Network icon component since it was missed in the import list for Concepts
const Network = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="16" y="16" width="6" height="6" rx="1" />
    <rect x="2" y="16" width="6" height="6" rx="1" />
    <rect x="9" y="2" width="6" height="6" rx="1" />
    <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3" />
    <path d="M12 12V8" />
  </svg>
);

export default Concepts;
