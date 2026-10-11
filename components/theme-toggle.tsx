"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Monitor, Moon, Sun } from "lucide-react";

const OPTIONS = [
  { value: "light", label: "Light", Icon: Sun },
  { value: "dark", label: "Dark", Icon: Moon },
  { value: "system", label: "System", Icon: Monitor },
] as const;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  return (
    <div
      className="theme-bar border-line bg-panel flex gap-0.5 rounded-full border p-[3px]"
      role="group"
      aria-label="Theme"
    >
      {OPTIONS.map(({ value, label, Icon }) => (
        <button
          key={value}
          type="button"
          title={label}
          aria-pressed={mounted && theme === value}
          onClick={() => setTheme(value)}
          className="text-dim hover:text-accent aria-pressed:bg-brand grid h-7 w-[30px] place-items-center rounded-full transition-colors aria-pressed:text-white aria-pressed:hover:text-white"
        >
          <Icon size={14} strokeWidth={2} />
        </button>
      ))}
    </div>
  );
}
