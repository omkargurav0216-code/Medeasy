import svgPaths from "./svg-sm1ab6jhh9";
import imgRectangle2 from "figma:asset/aa31ebde099495e59102b7dbdae867a2e45b46a5.png";

interface StartPageProps {
  onStart: () => void;
}

export default function IPhone16Pro({ onStart }: StartPageProps) {
  return (
    <div className="bg-[#05045c] overflow-clip relative md:rounded-[20px] size-full flex flex-col" data-name="iPhone 16 Pro - 1">
      <div className="absolute h-[491px] left-[-121px] top-[-48px] w-[484px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 484 491">
          <ellipse cx="242" cy="245.5" fill="var(--fill-0, white)" id="Ellipse 1" rx="242" ry="245.5" />
        </svg>
      </div>
      <div className="absolute left-[287px] size-[100px] top-[392.5px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 100 100">
          <path d={svgPaths.p11a63550} fill="var(--fill-0, white)" id="Ellipse 2" stroke="var(--stroke-0, black)" />
        </svg>
      </div>
      
      {/* Logo Image - Adjusted for smaller screens */}
      <div className="absolute h-[140px] sm:h-[157px] left-1/2 -translate-x-1/2 top-[80px] sm:top-[100px] md:top-[132px] w-[177px] sm:w-[198px]">
        <img alt="MedEasy Logo" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgRectangle2} />
      </div>
      
      {/* App Name - Adjusted positioning and size for smaller screens */}
      <p className="absolute font-['Baloo_Bhaijaan:Regular',sans-serif] leading-[normal] left-1/2 -translate-x-1/2 not-italic text-[#05045c] text-[42px] sm:text-[49px] text-nowrap top-[220px] sm:top-[250px] md:top-[280px] tracking-[-0.833px] whitespace-pre">MedEasy</p>
      
      {/* Tagline - Increased spacing to prevent overlap */}
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-1/2 -translate-x-1/2 not-italic text-[17px] sm:text-[21px] text-white bottom-[220px] sm:bottom-[230px] md:bottom-[268px] tracking-[-0.357px] text-center w-full px-4">Life gets easy with MedEasy</p>
      
      {/* Let's Start Button - Light blue theme with perfect centering */}
      <button 
        onClick={onStart}
        className="absolute bg-[#60a5fa] h-[65px] sm:h-[80px] left-1/2 -translate-x-1/2 bottom-[120px] sm:bottom-[120px] md:bottom-[173px] rounded-[25px] shadow-[0px_5px_5px_0px_rgba(96,165,250,0.3)] w-[210px] sm:w-[234px] cursor-pointer transition-all duration-300 hover:bg-[#93c5fd] hover:shadow-[0px_8px_8px_0px_rgba(147,197,253,0.4)] hover:scale-105 active:scale-95 flex items-center justify-center"
      >
        <span className="font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic text-[22px] sm:text-[26px] text-white tracking-[-0.442px]">Let's Start →</span>
      </button>
    </div>
  );
}
