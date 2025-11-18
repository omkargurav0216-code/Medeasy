import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from './ui/sheet';
import { Heart, Brain, Activity, Wind, HeartPulse, Pill, AlertTriangle, ChevronLeft, ChevronRight } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

interface HealthTipsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function HealthTipsSheet({ open, onOpenChange }: HealthTipsSheetProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  const categories = [
    {
      id: 'cardio',
      name: 'Cardiovascular Health',
      icon: <Heart className="w-8 h-8" />,
      color: 'from-red-500 to-pink-500',
      tips: [
        'Exercise regularly for at least 30 minutes, 5 days a week',
        'Maintain a healthy diet low in saturated fats and cholesterol',
        'Keep blood pressure under control (below 120/80 mmHg)',
        'Monitor cholesterol levels regularly',
        'Avoid smoking and limit alcohol consumption',
        'Manage stress through meditation or yoga',
        'Get 7-8 hours of quality sleep each night',
        'Maintain a healthy weight (BMI 18.5-24.9)',
      ]
    },
    {
      id: 'brain',
      name: 'Brain & Mental Health',
      icon: <Brain className="w-8 h-8" />,
      color: 'from-purple-500 to-indigo-500',
      tips: [
        'Stay mentally active with puzzles, reading, or learning new skills',
        'Practice mindfulness and meditation daily',
        'Get adequate sleep (7-9 hours) for memory consolidation',
        'Exercise regularly to improve blood flow to the brain',
        'Maintain social connections and relationships',
        'Limit screen time, especially before bed',
        'Eat a balanced diet rich in omega-3 fatty acids',
        'Stay hydrated - drink 8-10 glasses of water daily',
      ]
    },
    {
      id: 'pain',
      name: 'Pain Relief & Management',
      icon: <Activity className="w-8 h-8" />,
      color: 'from-orange-500 to-red-500',
      tips: [
        'Apply ice for acute injuries (first 48 hours)',
        'Use heat therapy for chronic pain and muscle stiffness',
        'Practice gentle stretching and yoga',
        'Maintain good posture while sitting and standing',
        'Stay active but avoid overexertion',
        'Try relaxation techniques like deep breathing',
        'Keep a healthy weight to reduce joint stress',
        'Consult a doctor if pain persists for more than a week',
      ]
    },
    {
      id: 'respiratory',
      name: 'Respiratory & Cough',
      icon: <Wind className="w-8 h-8" />,
      color: 'from-cyan-500 to-blue-500',
      tips: [
        'Stay hydrated to keep mucus thin',
        'Use a humidifier to add moisture to the air',
        'Avoid irritants like smoke, pollution, and strong odors',
        'Practice breathing exercises daily',
        'Gargle with warm salt water for sore throat',
        'Drink warm liquids like herbal tea or soup',
        'Get adequate rest to help your body recover',
        'Avoid lying flat - use pillows to elevate your head',
      ]
    },
    {
      id: 'headache',
      name: 'Headache & Migraine',
      icon: <HeartPulse className="w-8 h-8" />,
      color: 'from-yellow-500 to-orange-500',
      tips: [
        'Stay hydrated - dehydration can trigger headaches',
        'Maintain a regular sleep schedule',
        'Identify and avoid trigger foods (caffeine, alcohol, MSG)',
        'Practice stress management techniques',
        'Take regular breaks from screens (20-20-20 rule)',
        'Apply cold or warm compress to head/neck',
        'Exercise regularly but avoid overexertion',
        'Keep a headache diary to identify patterns',
      ]
    },
    {
      id: 'general',
      name: 'General Wellness',
      icon: <Pill className="w-8 h-8" />,
      color: 'from-green-500 to-teal-500',
      tips: [
        'Eat a balanced diet with plenty of fruits and vegetables',
        'Stay physically active - aim for 150 minutes/week',
        'Drink plenty of water throughout the day',
        'Get regular health check-ups and screenings',
        'Practice good hygiene - wash hands frequently',
        'Limit processed foods and added sugars',
        'Manage stress through relaxation techniques',
        'Maintain a healthy sleep schedule',
      ]
    }
  ];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[60vh] max-h-[500px] bg-white rounded-t-[20px] sm:rounded-t-[30px] p-3 sm:p-6">
        <SheetHeader className="pb-2">
          <div className="flex items-center justify-between pr-8">
            <SheetTitle className="text-[#05045c] flex items-center gap-2 text-base sm:text-xl">
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 fill-red-500" />
              Health Tips
            </SheetTitle>
          </div>
          <SheetDescription className="text-[10px] sm:text-xs text-orange-600 font-semibold">
            ✕ Tap X (top-right) or outside to close and access bottom buttons
          </SheetDescription>
        </SheetHeader>

        <div className="h-[calc(60vh-80px)] max-h-[420px] flex flex-col overflow-hidden">
          {!selectedCategory ? (
            <ScrollArea className="flex-1 pr-2">
              <div className="grid grid-cols-2 gap-2 mt-1">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setSelectedCategory(category.id);
                      setCurrentTipIndex(0);
                    }}
                    className={`bg-gradient-to-br ${category.color} p-3 rounded-[12px] text-white hover:scale-105 active:scale-95 transition-all shadow-lg`}
                  >
                    <div className="flex flex-col items-center gap-1.5">
                      <div className="[&>svg]:w-5 [&>svg]:h-5">
                        {category.icon}
                      </div>
                      <p className="font-['Instrument_Sans:Bold',sans-serif] font-bold text-center text-[10px] leading-tight">
                        {category.name}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="flex flex-col h-full">
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setCurrentTipIndex(0);
                }}
                className="text-[#05045c] font-['Instrument_Sans:Bold',sans-serif] font-bold hover:underline text-sm sm:text-base mb-3"
              >
                ← Back to Categories
              </button>

              {categories.find(c => c.id === selectedCategory) && (() => {
                const category = categories.find(c => c.id === selectedCategory)!;
                const totalTips = category.tips.length;
                
                return (
                  <>
                    {/* Category Header */}
                    <div className={`bg-gradient-to-br ${category.color} p-4 sm:p-5 rounded-[15px] sm:rounded-[20px] text-white mb-4`}>
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="[&>svg]:w-6 [&>svg]:h-6 sm:[&>svg]:w-8 sm:[&>svg]:h-8">
                          {category.icon}
                        </div>
                        <h3 className="font-['Instrument_Sans:Bold',sans-serif] font-bold text-lg sm:text-xl">
                          {category.name}
                        </h3>
                      </div>
                    </div>

                    {/* Carousel Container */}
                    <div className="flex-1 relative overflow-hidden min-h-0">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentTipIndex}
                          initial={{ opacity: 0, x: 100 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -100 }}
                          transition={{ duration: 0.3 }}
                          className="h-full"
                        >
                          <ScrollArea className="h-full pr-2">
                            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-3 sm:p-5 rounded-[10px] sm:rounded-[15px] border-l-4 border-[#05045c] min-h-[150px] sm:min-h-[180px]">
                              <div className="flex gap-2 sm:gap-3">
                                <div className="bg-[#05045c] text-white rounded-full w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center flex-shrink-0 font-bold text-xs sm:text-sm">
                                  {currentTipIndex + 1}
                                </div>
                                <p className="font-['Instrument_Sans:Regular',sans-serif] text-[13px] sm:text-[15px] text-gray-800 flex-1 leading-relaxed">
                                  {category.tips[currentTipIndex]}
                                </p>
                              </div>
                            </div>
                          </ScrollArea>
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* Navigation Controls */}
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentTipIndex(prev => Math.max(0, prev - 1))}
                        disabled={currentTipIndex === 0}
                        className="flex items-center gap-1"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Previous
                      </Button>
                      
                      <div className="flex items-center gap-2">
                        {Array.from({ length: totalTips }).map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentTipIndex(index)}
                            className={`w-2 h-2 rounded-full transition-all ${
                              index === currentTipIndex 
                                ? 'bg-[#05045c] w-6' 
                                : 'bg-gray-300 hover:bg-gray-400'
                            }`}
                          />
                        ))}
                      </div>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentTipIndex(prev => Math.min(totalTips - 1, prev + 1))}
                        disabled={currentTipIndex === totalTips - 1}
                        className="flex items-center gap-1"
                      >
                        Next
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </>
                );
              })()}
            </div>
          )}

          {/* Disclaimer - Always Visible */}
          <div className="mt-2 mb-1 bg-orange-100 p-2 rounded-lg border-2 border-orange-400 flex-shrink-0">
            <div className="flex gap-1.5 items-center">
              <AlertTriangle className="w-4 h-4 text-orange-700 flex-shrink-0" />
              <p className="text-[11px] text-orange-900 leading-tight font-semibold">
                ⚠️ IMPORTANT: General wellness only. NOT medical advice. Consult your doctor!
              </p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
