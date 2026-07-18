import { ArrowRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PageRails from "../component-page/PageRails";
import CursorAnimation from "../CursorAnimation";
import GithubIcon from "../icons/GithubIcon";
import VariationCard from "../VariationCard";
import Grid from "./Grid";

const PREFIX = "npx shadcn@latest add devsterxyz/Klick/";
const VARIANTS = [
  "click-supernova",
  "click-firework",
  "click-float",
  "click-flame",
  "click-synapse",
  "click-splash",
  "click-sparkle",
  "click-radiate",
];

const CornerBrackets = ({ muted = false }: { muted?: boolean }) => {
  const c = muted
    ? "border-black/20 dark:border-white/20"
    : "border-black/40 dark:border-white/45";
  return (
    <>
      <span
        className={`pointer-events-none absolute left-0 top-0 h-2 w-2 border-l border-t ${c}`}
      />
      <span
        className={`pointer-events-none absolute right-0 top-0 h-2 w-2 border-r border-t ${c}`}
      />
      <span
        className={`pointer-events-none absolute bottom-0 left-0 h-2 w-2 border-b border-l ${c}`}
      />
      <span
        className={`pointer-events-none absolute bottom-0 right-0 h-2 w-2 border-b border-r ${c}`}
      />
    </>
  );
};

const GhostButton = ({
  href,
  children,
  invert = false,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  invert?: boolean;
  className?: string;
}) => {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={`group relative inline-flex h-9 items-center justify-center gap-2 overflow-hidden border border-dashed px-4 text-[13px] font-medium transition ${
        invert
          ? "border-black bg-black text-white hover:bg-neutral-900 dark:border-white dark:bg-white dark:text-black dark:hover:bg-neutral-200"
          : "border-black/20 text-black hover:border-black/40 hover:bg-black/[0.03] dark:border-white/20 dark:text-white dark:hover:border-white/40 dark:hover:bg-white/[0.03]"
      } ${className}`}
    >
      <CornerBrackets muted={!invert} />
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
    </a>
  );
};

function useTypewriter(words: string[]) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(words[0]);
  const [deleting, setDeleting] = useState(false);
  const current = words[index];

  useEffect(() => {
    if (!deleting && text === current) {
      const t = setTimeout(() => setDeleting(true), 5000);
      return () => clearTimeout(t);
    }
    if (deleting && text.length > 0) {
      const t = setTimeout(() => setText((v) => v.slice(0, -1)), 45);
      return () => clearTimeout(t);
    }
    if (deleting) {
      setIndex((i) => (i + 1) % words.length);
      setDeleting(false);
      return;
    }
    const t = setTimeout(() => setText(current.slice(0, text.length + 1)), 70);
    return () => clearTimeout(t);
  }, [current, deleting, text, words]);

  return text;
}

function useHashScroll() {
  const location = useLocation();
  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.slice(1);
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({
        block: id === "effects-grid" ? "start" : "center",
        behavior: "smooth",
      });
    });
  }, [location.hash]);
}

const Home = () => {
  const [copied, setCopied] = useState(false);
  const [visible, setVisible] = useState(false);
  const typed = useTypewriter(VARIANTS);
  const command = `${PREFIX}${typed}`;
  const copyText = `${PREFIX}${VARIANTS[0]}`;
  useHashScroll();

  useEffect(() => {
    const frame = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(copyText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch (error) {
      console.error("Copy failed", error);
    }
  };

  return (
    <PageRails>
      <div
        className={`relative overflow-hidden bg-transparent text-black transition-all duration-300 ease-out dark:text-white lg:h-[calc(100vh-80px)] ${
          visible
            ? "translate-y-0 opacity-100 blur-0"
            : "translate-y-3 opacity-0 blur-sm"
        }`}
      >
        <div className="relative z-10 flex w-full border-b border-black/20 dark:border-white/20 lg:h-full lg:min-h-0">
          <div className="flex min-w-0 flex-1 flex-col">
            <div className="grid min-h-0 flex-1 lg:grid-cols-[minmax(0,1.06fr)_minmax(0,0.94fr)]">
              <section className="flex border-b border-black/20 dark:border-white/20 lg:min-h-0 lg:border-b-0 lg:border-r">
                <div className="flex flex-1 flex-col px-5 py-7 min-[390px]:py-8 sm:my-14 sm:px-6 sm:py-7 md:px-9 md:py-8 lg:my-32 lg:px-10">
                  <VariationCard title="01. The Original">
                    <div className="inline-flex items-center gap-2.5 border border-dashed border-black/20 dark:border-white/20 px-3 py-1.5 font-sans text-[10px] font-medium group sm:px-3.5 sm:text-[11px]">
                      <span className="h-2 w-2 bg-black dark:bg-white group-hover:bg-green-500 dark:group-hover:bg-green-500" />
                      v1 &middot; Early Preview
                    </div>
                  </VariationCard>

                  <div className="mt-4 w-full max-w-2xl min-[390px]:mt-5 sm:mt-6">
                    <h1 className="max-w-full font-geist-pixel text-[clamp(1.72rem,8.8vw,2.35rem)] leading-[1.04] tracking-normal sm:text-[3.5rem] sm:tracking-wide lg:text-[4rem] xl:text-[4.35rem]">
                      Click effects for sharper interfaces
                    </h1>
                    <p className="mt-3 text-[13px] leading-5 text-black/55 dark:text-white/55 min-[375px]:text-sm min-[390px]:leading-6 sm:mt-5 sm:text-base sm:leading-7">
                      Add responsive click feedback to buttons, cards, and
                      controls with small animation wrappers built for React.
                    </p>
                  </div>

                  <div className="mt-4 hidden min-h-11 w-full max-w-[34rem] items-center justify-between border border-black/10 bg-neutral-100 px-2 dark:border-white/20 dark:bg-[#0b0b0b] min-[390px]:mt-5 min-[390px]:px-3 sm:mt-6 sm:min-h-12 sm:px-4 md:flex">
                    <div className="min-w-0 flex-1 overflow-x-auto font-mono text-[10px] text-black/80 dark:text-white/80 min-[375px]:text-[11px] min-[390px]:text-xs sm:text-sm">
                      <span className="flex w-max items-center gap-1 min-[375px]:gap-1.5 min-[390px]:gap-2 sm:gap-2.5 whitespace-nowrap">
                        <span className="text-black/40 dark:text-white/40">
                          $
                        </span>
                        <code className="whitespace-nowrap">
                          {command}
                          <span className="ml-0.5 inline-block h-4 w-px translate-y-0.5 animate-pulse bg-black/70 dark:bg-white/70" />
                        </code>
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="ml-2 shrink-0 text-[11px] font-medium text-black/60 transition hover:text-black dark:text-white/60 dark:hover:text-white min-[375px]:text-xs sm:ml-0"
                    >
                      {copied ? "Copied" : "Copy"}
                    </button>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2 min-[390px]:mt-5 min-[390px]:gap-2.5 sm:gap-3">
                    <GhostButton href="https://github.com/devsterxyz/Klick">
                      <GithubIcon size={15} className="cursor-default" />
                      Github
                    </GhostButton>
                    <GhostButton
                      href="#effects-grid"
                      invert
                      className="sm:hidden"
                    >
                      Get Started
                      <ArrowRight color="currentColor" size={15} />
                    </GhostButton>
                    <span className="hidden sm:inline-flex">
                      <GhostButton href="#effects-grid" invert>
                        Get Started
                        <ArrowRight color="currentColor" size={15} />
                      </GhostButton>
                    </span>
                  </div>
                </div>
              </section>

              <section
                id="preview-panels"
                className="relative min-h-0 w-full overflow-hidden px-5 py-5 md:px-8 md:py-6"
              >
                <div className="flex h-[28rem] w-full md:h-[34rem] lg:h-full">
                  <div className="relative min-h-0 overflow-hidden border border-dashed border-black/30 dark:border-white/20 bg-transparent p-5 flex flex-1">
                    <CornerBrackets muted />
                    <CursorAnimation className="h-full w-full" />
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
      <Grid />
    </PageRails>
  );
};

export default Home;
