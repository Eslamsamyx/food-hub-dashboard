"use client";

import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import { dataSources } from "~/lib/mock-data";

interface DataSourceSelectorProps {
  selectedSource: string;
  onSourceChange: (sourceId: string) => void;
}

export function DataSourceSelector({ selectedSource, onSourceChange }: DataSourceSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const currentSource = dataSources.find(source => source.id === selectedSource);

  useEffect(() => {
    const updatePosition = () => {
      if (isOpen && buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setDropdownPosition({
          top: rect.bottom + window.scrollY + 8,
          left: rect.left + window.scrollX
        });
      }
    };

    if (isOpen) {
      updatePosition();
      window.addEventListener('scroll', updatePosition);
      window.addEventListener('resize', updatePosition);
    }

    return () => {
      window.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isOpen]);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 backdrop-blur-md bg-white/10 border border-white/20 rounded-xl shadow-lg hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all duration-200"
      >
        <div className="text-left">
          <div className="font-semibold text-white">{currentSource?.name}</div>
          <div className="text-xs text-slate-300">{currentSource?.description}</div>
        </div>
        <ChevronDownIcon className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div 
          className="fixed z-[9999] w-72 backdrop-blur-md bg-slate-900/95 border border-white/20 rounded-xl shadow-2xl"
          style={{
            top: dropdownPosition.top,
            left: dropdownPosition.left
          }}
        >
          <div className="py-1">
            {dataSources.map((source) => (
              <button
                key={source.id}
                onClick={() => {
                  onSourceChange(source.id);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-3 hover:bg-white/10 transition-all duration-200 first:rounded-t-xl last:rounded-b-xl ${
                  source.id === selectedSource ? 'bg-blue-500/20 border-r-4 border-blue-400' : ''
                }`}
              >
                <div className="font-semibold text-white">{source.name}</div>
                <div className="text-sm text-slate-300">{source.description}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Overlay to close dropdown when clicking outside */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[9998]" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
} 