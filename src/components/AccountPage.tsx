import { useState } from 'react';
import { useAuth } from './AuthProvider';
import { appDataService } from './app-data-service';
import { toast } from 'sonner@2.0.3';
import { ChevronLeft, User, Mail, Calendar, LogOut, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';
import imgEllipse8 from "figma:asset/c5b0f08d9be2d4b3db9bef5500901578c9c9ee10.png";
import imgRectangle29 from "figma:asset/eaeb088dcb2bf40e3c53938ebf9ca77c4d82ad4e.png";
import imgRectangle30 from "figma:asset/1e4e593d278cc8753a1d1401b0c53bc56398dfa5.png";
import imgRectangle31 from "figma:asset/5734456079688c1be8c67efb3082f3ec5100245d.png";
import { HealthTipsSheet } from './HealthTipsSheet';

interface AccountPageProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
}

export function AccountPage({ onBack, onNavigate }: AccountPageProps) {
  const { user, logout } = useAuth();
  const [healthTipsOpen, setHealthTipsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
  };

  const handleRefreshMedicines = () => {
    appDataService.clearMedicineCache();
    appDataService.initializeData();
    const count = appDataService.getMedicineCount();
    toast.success('Medicine database refreshed!', {
      description: `${count} medicines loaded successfully`,
    });
  };

  return (
    <div className="bg-[#7c86e4] overflow-clip relative md:rounded-[20px] size-full">
      {/* Main Content Area - reduced height to prevent overlap */}
      <div className="absolute bg-white h-[670px] left-1/2 rounded-[40px] top-[80px] translate-x-[-50%] w-[370px]" />

      {/* Header */}
      <p className="absolute font-['Instrument_Sans:Bold',sans-serif] font-bold leading-[normal] left-[201px] text-[#05045c] text-[42px] text-center text-nowrap top-[110px] tracking-[-0.714px] translate-x-[-50%] whitespace-pre z-10" style={{ fontVariationSettings: "'wdth' 100" }}>
        Account
      </p>

      {/* Back Button */}
      <button
        onClick={onBack}
        className="absolute left-[310px] size-[70px] top-[90px] z-20 hover:scale-110 transition-all"
      >
        <img alt="" className="block max-w-none size-full rounded-full" height="70" src={imgEllipse8} width="70" />
        <ChevronLeft className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-[#05045c]" />
      </button>

      {/* Profile Avatar */}
      <motion.div
        className="absolute left-[151px] top-[190px] z-10"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        <div className="bg-[#05045c] rounded-full w-[100px] h-[100px] flex items-center justify-center">
          <User className="w-16 h-16 text-white" />
        </div>
      </motion.div>

      {/* User Details Card - added max height and scroll */}
      <motion.div
        className="absolute left-[40px] top-[320px] w-[322px] max-h-[420px] overflow-y-auto z-10 space-y-4 pb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {/* Username */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-5 rounded-[20px] border-2 border-blue-200">
          <div className="flex items-center gap-4">
            <div className="bg-[#05045c] p-3 rounded-full">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-gray-600">
                Username
              </p>
              <p className="font-['Instrument_Sans:Bold',sans-serif] font-bold text-[20px] text-[#05045c]">
                {user?.username}
              </p>
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-5 rounded-[20px] border-2 border-purple-200">
          <div className="flex items-center gap-4">
            <div className="bg-[#05045c] p-3 rounded-full">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-gray-600">
                Email
              </p>
              <p className="font-['Instrument_Sans:Bold',sans-serif] font-bold text-[18px] text-[#05045c] truncate">
                {user?.email}
              </p>
            </div>
          </div>
        </div>

        {/* Account Created */}
        <div className="bg-gradient-to-r from-green-50 to-green-100 p-5 rounded-[20px] border-2 border-green-200">
          <div className="flex items-center gap-4">
            <div className="bg-[#05045c] p-3 rounded-full">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-gray-600">
                Member Since
              </p>
              <p className="font-['Instrument_Sans:Bold',sans-serif] font-bold text-[18px] text-[#05045c]">
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                }) : 'N/A'}
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mt-6">
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-[15px] border border-orange-200 text-center">
            <p className="font-['Instrument_Sans:Bold',sans-serif] font-bold text-[24px] text-[#05045c]">
              {Math.floor(Math.random() * 20) + 5}
            </p>
            <p className="font-['Instrument_Sans:Regular',sans-serif] text-[12px] text-gray-600">
              Orders Placed
            </p>
          </div>
          <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-4 rounded-[15px] border border-pink-200 text-center">
            <p className="font-['Instrument_Sans:Bold',sans-serif] font-bold text-[24px] text-[#05045c]">
              {Math.floor(Math.random() * 10) + 2}
            </p>
            <p className="font-['Instrument_Sans:Regular',sans-serif] text-[12px] text-gray-600">
              Favorites
            </p>
          </div>
        </div>

        {/* Refresh Medicine Database Button */}
        <motion.button
          onClick={handleRefreshMedicines}
          className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-[20px] flex items-center justify-center gap-3 mt-4"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <RefreshCw className="w-5 h-5" />
          <p className="font-['Instrument_Sans:Bold',sans-serif] font-bold text-[18px]">
            Refresh Medicines
          </p>
        </motion.button>

        {/* Logout Button */}
        <motion.button
          onClick={handleLogout}
          className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white p-4 rounded-[20px] flex items-center justify-center gap-3 mt-4"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <LogOut className="w-5 h-5" />
          <p className="font-['Instrument_Sans:Bold',sans-serif] font-bold text-[18px]">
            Logout
          </p>
        </motion.button>
      </motion.div>

      {/* Bottom Navigation - increased z-index to stay on top */}
      <div className="absolute bg-[#05045c] h-[82px] left-[22px] rounded-[20px] top-[792px] w-[357px] z-50" />
      
      <button
        onClick={() => onNavigate('dashboard')}
        className="absolute left-[171px] rounded-[20px] size-[60px] top-[803px] z-[60] hover:scale-110 transition-all"
      >
        <img alt="Home" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[20px] size-full" src={imgRectangle29} />
      </button>
      
      <button className="absolute left-[303px] rounded-[20px] size-[60px] top-[803px] z-[60]">
        <img alt="Account" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[20px] size-full" src={imgRectangle30} />
        <div className="absolute inset-0 bg-white/20 rounded-[20px]" />
      </button>
      
      <button
        onClick={() => setHealthTipsOpen(true)}
        className="absolute left-[37px] rounded-[20px] size-[60px] top-[803px] z-[60] hover:scale-110 transition-all"
      >
        <img alt="Health Tips" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[20px] size-full" src={imgRectangle31} />
      </button>

      {/* Health Tips Sheet */}
      <HealthTipsSheet open={healthTipsOpen} onOpenChange={setHealthTipsOpen} />
    </div>
  );
}
