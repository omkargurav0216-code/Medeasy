import imgImage10 from "figma:asset/49cb6548c73095935e1995f0e2ea0e2aa0aa03b0.png";
import imgEllipse8 from "figma:asset/c5b0f08d9be2d4b3db9bef5500901578c9c9ee10.png";
import imgRectangle29 from "figma:asset/eaeb088dcb2bf40e3c53938ebf9ca77c4d82ad4e.png";
import imgRectangle30 from "figma:asset/1e4e593d278cc8753a1d1401b0c53bc56398dfa5.png";
import imgRectangle31 from "figma:asset/5734456079688c1be8c67efb3082f3ec5100245d.png";

function IPhone16Pro({ className }: { className?: string }) {
  return (
    <div className={className} data-name="iPhone 16 Pro - 34">
      <div className="absolute font-['Instrument_Sans:Bold',sans-serif] font-bold leading-[normal] left-[201.5px] text-[30px] text-center text-nowrap text-white top-[147px] tracking-[-0.51px] translate-x-[-50%] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="mb-0"> Ordered Placed</p>
        <p>Successfully </p>
      </div>
      <div className="absolute left-[24px] pointer-events-none rounded-[50px] size-[354px] top-[260px]" data-name="image 10">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover rounded-[50px] size-full" src={imgImage10} />
        <div className="absolute inset-0 shadow-[0px_4px_4px_0px_inset_rgba(0,0,0,0.25)]" />
      </div>
      <p className="absolute font-['Instrument_Sans:Bold',sans-serif] font-bold leading-[normal] left-[120px] text-[#05045c] text-[33px] text-nowrap top-[636px] tracking-[-0.561px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Thank You
      </p>
      <p className="absolute font-['Baloo_Bhaijaan:Regular',sans-serif] leading-[normal] left-[120px] not-italic text-[#05045c] text-[42px] text-nowrap top-[52px] tracking-[-0.714px] whitespace-pre">MedEasy</p>
      <div className="absolute left-[312px] size-[75px] top-[49px]">
        <img alt="" className="block max-w-none size-full" height="75" src={imgEllipse8} width="75" />
      </div>
      <div className="absolute bg-[#05045c] h-[82px] left-[21px] rounded-[20px] top-[779px] w-[357px]" />
      <div className="absolute left-[170px] rounded-[20px] size-[60px] top-[790px]">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[20px] size-full" src={imgRectangle29} />
      </div>
      <div className="absolute left-[302px] rounded-[20px] size-[60px] top-[790px]">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[20px] size-full" src={imgRectangle30} />
      </div>
      <div className="absolute left-[36px] rounded-[20px] size-[60px] top-[790px]">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[20px] size-full" src={imgRectangle31} />
      </div>
    </div>
  );
}

export default function IPhone16Pro1() {
  return <IPhone16Pro className="bg-[#7c86e4] overflow-clip relative rounded-[20px] size-full" />;
}