import React from 'react';
import { X, Keyboard } from 'lucide-react';
import { sound } from '../../utils/sound';

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KeyboardShortcutsModal: React.FC<KeyboardShortcutsModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const shortcuts = [
    { key: '→ or Space', action: 'Advance to next slide' },
    { key: '←', action: 'Return to previous slide' },
    { key: 'Home / End', action: 'Jump to first / last slide' },
    { key: 'O', action: 'Toggle Slide Overview Grid' },
    { key: 'F', action: 'Toggle Fullscreen Mode' },
    { key: 'P', action: 'Toggle Presenter Notes drawer' },
    { key: 'M', action: 'Toggle Audio sound effects (Mute)' },
    { key: 'C', action: 'Open Formula Cheat Sheet' },
    { key: '1 - 9, 0', action: 'Direct jump to Slide #1 through #10' },
    { key: 'Esc', action: 'Close any active overlay or modal' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="glass-panel w-full max-w-lg rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Keyboard className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Keyboard Navigation</h2>
              <p className="text-xs text-slate-400">Deck controls for fluid live presenting</p>
            </div>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-6 divide-y divide-white/5 space-y-2 max-h-[60vh] overflow-y-auto">
          {shortcuts.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between pt-2">
              <span className="text-sm text-slate-300">{item.action}</span>
              <kbd className="px-2.5 py-1 rounded bg-slate-800/80 border border-white/10 font-mono text-xs text-cyan-300 shadow-inner">
                {item.key}
              </kbd>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-900/40 border-t border-white/5 text-center text-xs text-slate-400">
          Tip: You can also use swipe gestures on touchscreen devices.
        </div>
      </div>
    </div>
  );
};
