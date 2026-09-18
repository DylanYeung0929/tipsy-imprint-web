import { cn } from "../lib/cn";
import oldFashioned from "../assets/generated/cocktails/old-fashioned.png";
import negroni from "../assets/generated/cocktails/negroni.png";
import martini from "../assets/generated/cocktails/martini.png";
import mojito from "../assets/generated/cocktails/mojito.png";
import margarita from "../assets/generated/cocktails/margarita.png";
import whiskeySour from "../assets/generated/cocktails/whiskey-sour.png";
import daiquiri from "../assets/generated/cocktails/daiquiri.png";
import manhattan from "../assets/generated/cocktails/manhattan.png";
import tomCollins from "../assets/generated/cocktails/tom-collins.png";
import espressoMartini from "../assets/generated/cocktails/espresso-martini.png";
import ginTonic from "../assets/generated/cocktails/gin-tonic.png";
import maiTai from "../assets/generated/cocktails/mai-tai.png";

const cocktails = [oldFashioned, negroni, martini, mojito, margarita, whiskeySour, daiquiri, manhattan, tomCollins, espressoMartini, ginTonic, maiTai];

export function CocktailVisual({ index, className, alt = "已选鸡尾酒" }: { index: number; className?: string; alt?: string }) {
  const src = cocktails[Math.max(0, index) % cocktails.length];
  return <div className={cn("relative overflow-hidden",className)}><img src={src} alt={alt} className="size-full object-contain p-1"/></div>;
}
