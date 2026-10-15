"use client";

import { useState } from "react";
import { MailPlus, Send } from "lucide-react";

/**
 * On-site updates capture — audience-platform pattern.
 *
 * Posts { email, source } to NEXT_PUBLIC_UPDATES_ENDPOINT, which can be any
 * audience-platform form URL (Loops, Buttondown, Kit) or a form backend
 * (Formspree). Double opt-in, throttling, and unsubscribe compliance are the
 * provider's job; this component only collects honestly:
 *  - honeypot field silently drops bot submissions client-side
 *  - `source` tags where each signup came from, so the same form scales to
 *    future placements without guessing attribution
 * With no endpoint configured it degrades to a prefilled mailto — the field
 * still works on day one without a backend.
 */
const ENDPOINT = process.env.NEXT_PUBLIC_UPDATES_ENDPOINT;

export function EmailCapture({
  compact = false,
  source = "footer",
}: {
  compact?: boolean;
  source?: string;
}) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    // Honeypot: bots fill hidden fields, humans never see it.
    if ((form.elements.namedItem("company") as HTMLInputElement)?.value) return;
    if (!email.includes("@")) return;
    if (!ENDPOINT) {
      window.location.href = `mailto:hello@shevris.com?subject=Keep%20me%20posted&body=Please%20add%20${encodeURIComponent(email)}%20to%20launch%20updates.`;
      return;
    }
    setState("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        body: new URLSearchParams({ email, source }).toString(),
      });
      setState(res.ok ? "done" : "idle");
    } catch {
      setState("idle");
    }
  }

  if (state === "done") {
    return (
      <p className="text-accent flex items-center gap-2 text-sm font-semibold">
        <MailPlus size={16} aria-hidden="true" />
        Check your inbox to confirm — launch updates only, no noise.
      </p>
    );
  }

  return (
    <form
      onSubmit={submit}
      className={compact ? "max-w-[340px]" : "max-w-[420px]"}
    >
      <div className="flex gap-2">
        <label htmlFor="updates-email" className="sr-only">
          Email for launch updates
        </label>
        <input
          id="updates-email"
          name="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="border-line bg-canvas text-ink placeholder:text-dim focus:border-accent min-w-0 flex-1 rounded-[10px] border px-4 py-2.5 text-[14px] transition-colors outline-none"
        />
        {/* honeypot — real users never fill this */}
        <input
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute -left-[5000px] h-px w-px overflow-hidden"
        />
        <button
          type="submit"
          disabled={state === "sending"}
          className="bg-brand inline-flex shrink-0 items-center gap-1.5 rounded-[10px] px-4 py-2.5 text-[13.5px] font-semibold text-white transition-all hover:-translate-y-0.5 active:scale-[0.97] disabled:opacity-60"
        >
          <Send size={13} aria-hidden="true" />
          {state === "sending" ? "Adding…" : "Notify me"}
        </button>
      </div>
      <p className="text-dim mt-2 text-[11.5px] leading-relaxed">
        No spam. Unsubscribe anytime.
      </p>
    </form>
  );
}
