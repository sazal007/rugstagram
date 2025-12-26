"use client";

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

export const FAQItem: React.FC<FAQItemProps> = ({
  question,
  answer,
  isOpen,
  onToggle,
}) => {
  return (
    <div className="overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full py-6 flex justify-between items-center group text-left outline-none"
      >
        <span className={`text-lg md:text-xl font-light transition-all duration-300 ${
          isOpen ? "text-[#c7a17a]" : "text-[#1c1c1c]/80 group-hover:text-[#1c1c1c]"
        }`}>
          {question}
        </span>
        <div className={`transition-transform duration-500 transform ${isOpen ? 'rotate-180' : ''}`}>
          <svg className="w-5 h-5 text-[#1c1c1c]/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      
      {/* Smooth Height Transition */}
      <div 
        className={`grid transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isOpen ? "grid-rows-[1fr] opacity-100 pb-6" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="text-base text-black/50 leading-relaxed font-light max-w-4xl">
            {answer}
          </div>
        </div>
      </div>
    </div>
  );
};

