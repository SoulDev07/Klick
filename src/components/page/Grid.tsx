import React, { JSX, useState } from "react";
import { Search, X } from "lucide-react";
import ClickBinary from "../../../registry/new-york/ClickBinary/ClickBinary";
import ClickAgitate from "../../../registry/new-york/ClickAgitate/ClickAgitate";
import ClickAlignment from "../../../registry/new-york/ClickAlignment/ClickAlignment";
import ClickBlackHole from "../../../registry/new-york/ClickBlackHole/ClickBlackHole";
import ClickBlast from "../../../registry/new-york/ClickBlast/ClickBlast";
import ClickBoundingBox from "../../../registry/new-york/ClickBoundingBox/ClickBoundingBox";
import ClickBulletTime from "../../../registry/new-york/ClickBulletTime/ClickBulletTime";
import ClickDiffusion from "../../../registry/new-york/ClickDiffusion/ClickDiffusion";
import ClickDoubleSonar from "../../../registry/new-york/ClickDoubleSonar/ClickDoubleSonar";
import ClickDroplet from "../../../registry/new-york/ClickDroplet/ClickDroplet";
import ClickEmbers from "../../../registry/new-york/ClickEmbers/ClickEmbers";
import ClickFire from "../../../registry/new-york/ClickFire/ClickFire";
import ClickFireTrail from "../../../registry/new-york/ClickFireTrail/ClickFireTrail";
import ClickFirework from "../../../registry/new-york/ClickFirework/ClickFirework";
import ClickFission from "../../../registry/new-york/ClickFission/ClickFission";
import ClickFlame from "../../../registry/new-york/ClickFlame/ClickFlame";
import ClickFloat from "../../../registry/new-york/ClickFloat/ClickFloat";
import ClickFlowField from "../../../registry/new-york/ClickFlowField/ClickFlowField";
import ClickFocus from "../../../registry/new-york/ClickFocus/ClickFocus";
import ClickFusion from "../../../registry/new-york/ClickFusion/ClickFusion";
import ClickGenerative from "../../../registry/new-york/ClickGenerative/ClickGenerative";
import ClickGeo from "../../../registry/new-york/ClickGeo/ClickGeo";
import ClickGhost from "../../../registry/new-york/ClickGhost/ClickGhost";
import ClickHeart from "../../../registry/new-york/ClickHeart/ClickHeart";
import ClickHoloSphere from "../../../registry/new-york/ClickHoloSphere/ClickHoloSphere";
import ClickLoad from "../../../registry/new-york/ClickLoad/ClickLoad";
import ClickMatrixRain from "../../../registry/new-york/ClickMatrixRain/ClickMatrixRain";
import ClickPing from "../../../registry/new-york/ClickPing/ClickPing";
import ClickQuantum from "../../../registry/new-york/ClickQuantum/ClickQuantum";
import ClickRadiate from "../../../registry/new-york/ClickRadiate/ClickRadiate";
import ClickRain from "../../../registry/new-york/ClickRain/ClickRain";
import ClickResonance from "../../../registry/new-york/ClickResonance/ClickResonance";
import ClickRipple from "../../../registry/new-york/ClickRipple/ClickRipple";
import ClickRippleMatrix from "../../../registry/new-york/ClickRippleMatrix/ClickRippleMatrix";
import ClickShatter from "../../../registry/new-york/ClickShatter/ClickShatter";
import ClickSkull from "../../../registry/new-york/ClickSkull/ClickSkull";
import ClickSmoke from "../../../registry/new-york/ClickSmoke/ClickSmoke";
import ClickSonar from "../../../registry/new-york/ClickSonar/ClickSonar";
import ClickSolidRipple from "../../../registry/new-york/ClickSolidRipple/ClickSolidRipple";
import ClickSpark from "../../../registry/new-york/ClickSpark/ClickSpark";
import ClickSpark2 from "../../../registry/new-york/ClickSpark2/ClickSpark2";
import ClickSparkle from "../../../registry/new-york/ClickSparkle/ClickSparkle";
import ClickSplash from "../../../registry/new-york/ClickSplash/ClickSplash";
import ClickSupernova from "../../../registry/new-york/ClickSupernova/ClickSupernova";
import ClickSynapse from "../../../registry/new-york/ClickSynapse/ClickSynapse";
import ClickTesseract from "../../../registry/new-york/ClickTesseract/ClickTesseract";
import ClickWarp from "../../../registry/new-york/ClickWarp/ClickWarp";
import ClickSineWave from "../../../registry/new-york/ClickSineWave/ClickSineWave";
import ClickSpectrum from "../../../registry/new-york/ClickSpectrum/ClickSpectrum";
import ClickInflate from "../../../registry/new-york/ClickInflate/ClickInflate";
import ClickBubble from "../../../registry/new-york/ClickBubble/ClickBubble";
import EffectCard from "../EffectCard";
import ClickPrompt from "../../../registry/new-york/ClickPrompt/ClickPrompt";
import { useTheme } from "../ThemeContext";
import Footer from "../Footer";
import Contributors from "../Contributors";

const SolidRippleGridPreview = ({ color }: { color?: string }) => (
  <ThemeAwareGridPreview type="solid-ripple" color={color} />
);

const ResonanceGridPreview = ({ color }: { color?: string }) => (
  <ThemeAwareGridPreview type="resonance" color={color} />
);

const ThemeAwareGridPreview = ({
  type,
  color,
}: {
  type: "resonance" | "solid-ripple";
  color?: string;
}) => {
  const { theme, contrastColor } = useTheme();
  const [isMobilePreview, setIsMobilePreview] = React.useState(false);
  const isDark = theme === "dark";
  const effectColor = color ?? contrastColor;
  const background = isDark ? "#050505" : "#ffffff";
  const previewSize = isMobilePreview ? 148 : 192;
  const previewClassName =
    "border border-gray-200 dark:border-[#151515] transition-all duration-300 group-hover/effect-card:border-gray-400 dark:group-hover/effect-card:border-[#333]";

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 639px)");
    const handleChange = () => setIsMobilePreview(mediaQuery.matches);

    handleChange();
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  if (type === "resonance") {
    return (
      <ClickResonance
        className={previewClassName}
        width={previewSize}
        height={previewSize}
        color={effectColor}
        background={background}
      />
    );
  }

  return (
    <ClickSolidRipple
      className={previewClassName}
      width={previewSize}
      height={previewSize}
      color={effectColor}
      background={background}
    />
  );
};

type EffectEntry = {
  title: string;
  Wrapper: React.ComponentType<any>;
  to: string;
};

const EFFECTS: EffectEntry[] = [
  { title: "Agitate", Wrapper: ClickAgitate, to: "/Agitate" },
  { title: "Alignment", Wrapper: ClickAlignment, to: "/Alignment" },
  { title: "Binary", Wrapper: ClickBinary, to: "/Binary" },
  { title: "Black Hole", Wrapper: ClickBlackHole, to: "/BlackHole" },
  { title: "Blast", Wrapper: ClickBlast, to: "/Blast" },
  { title: "Bounding Box", Wrapper: ClickBoundingBox, to: "/BoundingBox" },
  { title: "Bullet Time", Wrapper: ClickBulletTime, to: "/BulletTime" },
  { title: "Diffusion", Wrapper: ClickDiffusion, to: "/Diffusion" },
  { title: "Double Sonar", Wrapper: ClickDoubleSonar, to: "/DoubleSonar" },
  { title: "Droplet", Wrapper: ClickDroplet, to: "/Droplet" },
  { title: "Embers", Wrapper: ClickEmbers, to: "/Embers" },
  { title: "Fire", Wrapper: ClickFire, to: "/Fire" },
  { title: "Fire Trail", Wrapper: ClickFireTrail, to: "/FireTrail" },
  { title: "Firework", Wrapper: ClickFirework, to: "/Firework" },
  { title: "Fission", Wrapper: ClickFission, to: "/Fission" },
  { title: "Flame", Wrapper: ClickFlame, to: "/Flame" },
  { title: "Float", Wrapper: ClickFloat, to: "/Float" },
  { title: "Flow Field", Wrapper: ClickFlowField, to: "/FlowField" },
  { title: "Focus", Wrapper: ClickFocus, to: "/Focus" },
  { title: "Fusion", Wrapper: ClickFusion, to: "/Fusion" },
  { title: "Generative", Wrapper: ClickGenerative, to: "/Generative" },
  { title: "Geo", Wrapper: ClickGeo, to: "/Geo" },
  { title: "Ghost", Wrapper: ClickGhost, to: "/Ghost" },
  { title: "Heart", Wrapper: ClickHeart, to: "/Heart" },
  { title: "Holo Sphere", Wrapper: ClickHoloSphere, to: "/HoloSphere" },
  { title: "Load", Wrapper: ClickLoad, to: "/Load" },
  { title: "Matrix Rain", Wrapper: ClickMatrixRain, to: "/MatrixRain" },
  { title: "Ping", Wrapper: ClickPing, to: "/Ping" },
  { title: "Quantum", Wrapper: ClickQuantum, to: "/Quantum" },
  { title: "Radiate", Wrapper: ClickRadiate, to: "/Radiate" },
  { title: "Rain", Wrapper: ClickRain, to: "/Rain" },
  { title: "Resonance", Wrapper: ResonanceGridPreview, to: "/Resonance" },
  { title: "Ripple", Wrapper: ClickRipple, to: "/Ripple" },
  { title: "Ripple Matrix", Wrapper: ClickRippleMatrix, to: "/RippleMatrix" },
  { title: "Shatter", Wrapper: ClickShatter, to: "/Shatter" },
  { title: "Skull", Wrapper: ClickSkull, to: "/Skull" },
  { title: "Smoke", Wrapper: ClickSmoke, to: "/Smoke" },
  { title: "Sonar", Wrapper: ClickSonar, to: "/Sonar" },
  { title: "Solid Ripple", Wrapper: SolidRippleGridPreview, to: "/SolidRipple" },
  { title: "Spark", Wrapper: ClickSpark, to: "/Spark" },
  { title: "Spark2", Wrapper: ClickSpark2, to: "/Spark2" },
  { title: "Sparkle", Wrapper: ClickSparkle, to: "/Sparkle" },
  { title: "Splash", Wrapper: ClickSplash, to: "/Splash" },
  { title: "Supernova", Wrapper: ClickSupernova, to: "/Supernova" },
  { title: "Synapse", Wrapper: ClickSynapse, to: "/Synapse" },
  { title: "Prompt", Wrapper: ClickPrompt, to: "/Prompt" },
  { title: "Tesseract", Wrapper: ClickTesseract, to: "/Tesseract" },
  { title: "Warp", Wrapper: ClickWarp, to: "/Warp" },
  { title: "Sine Wave", Wrapper: ClickSineWave, to: "/SineWave" },
  { title: "Spectrum", Wrapper: ClickSpectrum, to: "/Spectrum" },
  { title: "Inflate", Wrapper: ClickInflate, to: "/Inflate" },
  { title: "Bubble", Wrapper: ClickBubble, to: "/Bubble" },
];

const Grid = (): JSX.Element => {
  const [query, setQuery] = useState("");
  const [shortcutLabel] = useState(() =>
    typeof navigator !== "undefined" &&
    /Mac|iPhone|iPad|iPod/.test(navigator.userAgent)
      ? "⌘ K"
      : "Ctrl K",
  );
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const normalizedQuery = query.trim().toLowerCase();
  const filteredEffects = normalizedQuery
    ? EFFECTS.filter((effect) =>
        effect.title.toLowerCase().includes(normalizedQuery),
      )
    : EFFECTS;

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchInputRef.current?.focus();
        searchInputRef.current?.select();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div
      id="effects-grid"
      className="relative scroll-mt-16 overflow-hidden bg-transparent text-black dark:text-white"
    >
      <div className="relative z-10 w-full border-b border-black/20 dark:border-white/20">
        <div className="flex justify-center px-6 pt-8 sm:px-6 md:px-10 xl:px-14">
          <div className="relative w-full max-w-md">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-[#555]"
              aria-hidden="true"
            />
            <input
              ref={searchInputRef}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search effects..."
              aria-label="Search effects"
              aria-keyshortcuts="Control+K Meta+K"
              className="h-10 w-full border border-black/20 bg-transparent pl-9 pr-9 font-sans text-small tracking-wider text-black placeholder:text-gray-500 focus:border-black/40 focus:outline-none dark:border-white/20 dark:text-white dark:placeholder:text-[#555] dark:focus:border-white/40 sm:pr-20 [&::-webkit-search-cancel-button]:appearance-none"
            />
            {!normalizedQuery && (
              <kbd
                aria-hidden="true"
                className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 items-center border border-black/15 px-1.5 py-0.5 font-sans text-[10px] tracking-wide text-gray-500 dark:border-white/15 dark:text-[#555] sm:inline-flex"
              >
                {shortcutLabel}
              </kbd>
            )}
            {normalizedQuery && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center transition-colors hover:text-black dark:text-[#555] dark:hover:text-white hover:cursor-pointer "
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
        <div className="grid w-full grid-cols-2 justify-items-center gap-x-1 gap-y-8 px-0 pb-16 pt-8 min-[390px]:gap-x-3 sm:gap-x-10 sm:gap-y-12 sm:px-6 sm:pb-24 md:px-10 lg:grid-cols-3 lg:pb-28 xl:grid-cols-4 xl:px-14">
          {filteredEffects.map(({ title, Wrapper, to }) => (
            <EffectCard key={to} title={title} Wrapper={Wrapper} to={to} />
          ))}
        </div>
        {filteredEffects.length === 0 && (
          <p className="-mt-8 pb-16 text-center font-sans text-[13px] tracking-[0.1em] uppercase text-gray-500 dark:text-[#555] sm:pb-24">
            No effects found for &quot;<span className="bg-accent ">{query}</span>&quot; :(
          </p>
        )}
      </div>
      <Footer />
      <Contributors />
    </div>
  );
};

export default Grid;
