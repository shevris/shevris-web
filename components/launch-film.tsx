import { SHOW_LAUNCH_FILM } from "@/lib/flags";
import { container } from "./ui";

/**
 * Product-in-motion hero slot — the Stripe pattern: real app footage above
 * the fold. Launch-gated: no film exists until the product ships, and a
 * mocked video would be a promise the product might not keep.
 * Wire a real capture at launch: <video autoplay muted loop playsInline>.
 */
export function LaunchFilm() {
  if (!SHOW_LAUNCH_FILM) return null;
  return (
    <div className={container}>
      <div className="border-line bg-panel aspect-video w-full overflow-hidden rounded-2xl border">
        {/* <video src="/launch-film.mp4" autoPlay muted loop playsInline /> */}
      </div>
    </div>
  );
}
