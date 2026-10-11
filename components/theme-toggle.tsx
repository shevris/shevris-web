"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Monitor, Moon, Sun } from "lucide-react";

const OPTIONS = [
  { value: "light", label: "Light", Icon: Sun },
  { value: "dark", label: "Dark", Icon: Moon },
  { value: "system", label: "System", Icon: Monitor },
] as const;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <div
      className="theme-bar flex gap-0.5 rounded-full border border-line bg-panel p-[3px]"
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
          className="grid h-7 w-[30px] place-items-center rounded-full text-dim transition-colors hover:text-accent aria-pressed:bg-brand aria-pressed:text-white aria-pressed:hover:text-white"
        >
          <Icon size={14} strokeWidth={2} />
        </button>
      ))}
    </div>
  );
}
