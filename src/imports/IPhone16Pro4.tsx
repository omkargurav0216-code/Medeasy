import { useState } from 'react';
import svgPaths from "./svg-0ge70bbpho";
import imgEllipse5 from "figma:asset/650144b997838019e10a442fd9e42c0bcf90ae02.png";
import imgRectangle15 from "figma:asset/292e7b64f1b430714de9bbaa45d6c0264ca675d6.png";
import imgEllipse6 from "figma:asset/001dd59e9eb7b62db9dfdd28a9c0865798a7f909.png";
import imgEllipse8 from "figma:asset/fd23acf281401a8c95c6e3d7eda4f7038f984529.png";
import imgEllipse9 from "figma:asset/1fe7d920ebfafc7dc16b54e6cc002630c843b107.png";
import imgEllipse10 from "figma:asset/fa037aeb22e93d4eb8e4384cd72d6a3b257485f3.png";
import imgEllipse11 from "figma:asset/05d1ac37d7d239eff9354ce905add110ddcf781d.png";
import imgRectangle29 from "figma:asset/eaeb088dcb2bf40e3c53938ebf9ca77c4d82ad4e.png";
import imgRectangle30 from "figma:asset/1e4e593d278cc8753a1d1401b0c53bc56398dfa5.png";
import imgRectangle31 from "figma:asset/5734456079688c1be8c67efb3082f3ec5100245d.png";
import imgRectangle45 from "figma:asset/433e6796324e5bca598694d22b6050168ada16b3.png";
import { NotificationButton } from '../components/NotificationButton';
import { HospitalSearch } from '../components/HospitalSearch';
import { HealthTipsSheet } from '../components/HealthTipsSheet';
import { useAuth } from '../components/AuthProvider';
import { Search, Mic } from 'lucide-react';
import { appDataService } from '../components/app-data-service';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

function IPhone16Pro({ className, onNavigate }: { className?: string } & DashboardProps) {
  const { user } = useAuth();
  const [hospitalSearchOpen, setHospitalSearchOpen] = useState(false);
  const [healthTipsOpen, setHealthTipsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const cartCount = appDataService.getCart().length;

  const handleMedicineSearch = () => {
    onNavigate('medicines');
  };

  return (
    <div className={`bg-white size-full md:rounded-[20px] overflow-hidden relative ${className}`} data-name="iPhone 16 Pro - 4">
      <p className="absolute font-['Instrument_Sans:Bold',sans-serif] font-bold leading-[normal] left-[26px] text-[#05045c] text-[28px] text-nowrap top-[67px] tracking-[-0.476px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Hi, {user?.username || 'Friend'} !
      </p>
      <p className="absolute font-['Instrument_Sans:Regular',sans-serif] font-normal leading-[normal] left-[26px] text-[#05045c] text-[20px] text-nowrap top-[109px] tracking-[-0.34px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        How are you feeling today
      </p>
      
      {/* Hero Banner */}
      <div className="absolute bg-[#05045c] h-[107px] left-[21px] rounded-[20px] top-[154px] w-[358px]" />
      <div className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[52px] not-italic text-[26px] text-nowrap text-white top-[177px] tracking-[-0.442px] whitespace-pre">
        <p className="mb-0">Search.Manage.</p>
        <p> Order.Simple</p>
      </div>

      {/* Search Medicine Bar */}
      <div className="absolute h-[43px] left-[21px] top-[284px] w-[302px]">
        <button
          onClick={handleMedicineSearch}
          className="w-full h-full bg-white rounded-[20px] shadow-[0px_4px_4px_0px_inset_rgba(0,0,0,0.25)] flex items-center px-4 hover:shadow-lg transition-all cursor-pointer"
        >
          <Search className="w-5 h-5 text-gray-400 mr-3" />
          <span className="font-['Instrument_Sans:Regular',sans-serif] text-[20px] text-black tracking-[-0.34px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            Search medicine
          </span>
        </button>
      </div>

      {/* Search Icon */}
      <button
        onClick={handleMedicineSearch}
        className="absolute left-[336px] rounded-[20px] size-[41px] top-[285px] hover:scale-110 transition-all overflow-hidden"
      >
        <img alt="Search" className="absolute inset-0 max-w-none object-50%-50% object-cover size-full" src={imgRectangle15} />
        <div className="absolute inset-0 shadow-[0px_4px_4px_0px_inset_rgba(0,0,0,0.25)] rounded-[20px]" />
      </button>

      {/* Our Services Title */}
      <p className="absolute font-['Instrument_Sans:Bold',sans-serif] font-bold leading-[normal] left-[21px] text-[#05045c] text-[28px] text-nowrap top-[380px] tracking-[-0.476px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Our Services
      </p>

      {/* Services Container */}
      <div className="absolute bg-[#05045c] h-[160px] left-[23px] rounded-[20px] top-[427px] w-[358px]" />
      
      {/* Service Buttons */}
      <button
        onClick={() => setHospitalSearchOpen(true)}
        className="absolute left-[30px] size-[78px] top-[448px] hover:scale-110 transition-all"
      >
        <img alt="Hospitals" className="block max-w-none size-full" height="78" src={imgEllipse10} width="78" />
      </button>
      
      <button
        onClick={() => onNavigate('medicines')}
        className="absolute left-[116px] size-[78px] top-[447px] hover:scale-110 transition-all"
      >
        <img alt="Medicines" className="block max-w-none size-full" height="78" src={imgEllipse8} width="78" />
      </button>
      
      <button
        onClick={() => onNavigate('history')}
        className="absolute left-[203px] size-[78px] top-[447px] hover:scale-110 transition-all"
      >
        <img alt="Medical History" className="block max-w-none size-full" height="78" src={imgEllipse9} width="78" />
      </button>
      
      <button
        onClick={() => onNavigate('cart')}
        className="absolute left-[291px] size-[78px] top-[447px] hover:scale-110 transition-all"
      >
        <img alt="My Cart" className="block max-w-none size-full" height="78" src={imgEllipse11} width="78" />
        {cartCount > 0 && (
          <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
            {cartCount}
          </div>
        )}
      </button>

      {/* Service Labels */}
      <div className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[68px] not-italic text-[12px] text-center text-nowrap text-white top-[532px] translate-x-[-50%] whitespace-pre">
        <p className="mb-0">Hospitals</p>
        <p>&nbsp;</p>
      </div>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[154.5px] not-italic text-[12px] text-center text-nowrap text-white top-[532px] translate-x-[-50%] whitespace-pre">Medicines</p>
      <div className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[241.5px] not-italic text-[12px] text-center text-nowrap text-white top-[532px] translate-x-[-50%] whitespace-pre">
        <p className="mb-0">Your Medical </p>
        <p>History</p>
      </div>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[333.5px] not-italic text-[12px] text-center text-nowrap text-white top-[532px] translate-x-[-50%] whitespace-pre">My Cart </p>

      {/* Motivational Quote */}
      <div className="absolute h-[151px] left-[21px] pointer-events-none rounded-[20px] top-[605px] w-[360px]">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover rounded-[20px] size-full" src={imgRectangle45} />
        <div aria-hidden="true" className="absolute border-4 border-[#05045c] border-solid inset-0 rounded-[20px]" />
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bg-[#05045c] h-[82px] left-[22px] rounded-[20px] top-[779px] w-[357px] z-50" />
      
      <button className="absolute left-[171px] rounded-[20px] size-[60px] top-[790px] z-[60]">
        <img alt="Home" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[20px] size-full" src={imgRectangle29} />
      </button>
      
      <button
        onClick={() => onNavigate('account')}
        className="absolute left-[303px] rounded-[20px] size-[60px] top-[790px] z-[60] hover:scale-110 transition-all"
      >
        <img alt="Account" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[20px] size-full" src={imgRectangle30} />
      </button>
      
      <button
        onClick={() => setHealthTipsOpen(true)}
        className="absolute left-[37px] rounded-[20px] size-[60px] top-[790px] z-[60] hover:scale-110 transition-all"
      >
        <img alt="Health Tips" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[20px] size-full" src={imgRectangle31} />
      </button>

      {/* Notification Button */}
      <div className="absolute right-[24px] top-[71px]">
        <NotificationButton />
      </div>

      {/* Hospital Search Dialog */}
      <HospitalSearch open={hospitalSearchOpen} onOpenChange={setHospitalSearchOpen} />

      {/* Health Tips Sheet */}
      <HealthTipsSheet open={healthTipsOpen} onOpenChange={setHealthTipsOpen} />
    </div>
  );
}

export default function IPhone16Pro4(props: DashboardProps) {
  return <IPhone16Pro className="bg-white overflow-clip relative rounded-[20px] size-full" {...props} />;
}
