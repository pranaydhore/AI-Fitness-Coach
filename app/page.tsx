'use client';

import React, { useState, useEffect } from 'react';
import { Camera, Dumbbell, Utensils, Volume2, Download, Moon, Sun, RefreshCw, Sparkles, Heart, Target, Activity } from 'lucide-react';

interface FormData {
  name: string;
  age: string;
  gender: string;
  height: string;
  weight: string;
  goal: string;
  fitnessLevel: string;
  location: string;
  diet: string;
  medicalHistory: string;
  stressLevel: string;
}

interface WorkoutDay {
  exercises: string[];
  cardio: string;
}

interface WorkoutPlan {
  monday: WorkoutDay;
  wednesday: WorkoutDay;
  friday: WorkoutDay;
}

interface DietPlan {
  breakfast: string;
  lunch: string;
  snack: string;
  dinner: string;
}

interface GeneratedPlan {
  workout: WorkoutPlan;
  diet: DietPlan;
  tips: string[];
  bmi: string;
  goalWeight: string;
}

const FitnessCoachApp: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    age: '',
    gender: 'male',
    height: '',
    weight: '',
    goal: 'weight_loss',
    fitnessLevel: 'beginner',
    location: 'gym',
    diet: 'non_veg',
    medicalHistory: '',
    stressLevel: 'medium'
  });
  const [generatedPlan, setGeneratedPlan] = useState<GeneratedPlan | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [motivation, setMotivation] = useState<string>('');

  useEffect(() => {
    const saved = localStorage.getItem('fitnessData');
    if (saved) {
      const data = JSON.parse(saved);
      if (data.formData) setFormData(data.formData);
      if (data.plan) setGeneratedPlan(data.plan);
    }
    generateMotivation();
  }, []);

  const generateMotivation = (): void => {
    const quotes: string[] = [
      "Your only limit is you. Push harder today! 💪",
      "Success starts with self-discipline. Keep going! 🔥",
      "The body achieves what the mind believes! 🧠",
      "Every workout counts. You're getting stronger! 💯",
      "Champions train, losers complain. Be a champion! 🏆"
    ];
    setMotivation(quotes[Math.floor(Math.random() * quotes.length)]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generatePlan = async (): Promise<void> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const workoutPlan: WorkoutPlan = {
      monday: {
        exercises: formData.location === 'home' 
          ? ['Push-ups (3 sets x 15 reps)', 'Squats (3 sets x 20 reps)', 'Plank (3 sets x 45 sec)', 'Lunges (3 sets x 12 reps)']
          : ['Barbell Bench Press (4 sets x 10 reps)', 'Squats (4 sets x 12 reps)', 'Deadlifts (3 sets x 8 reps)', 'Pull-ups (3 sets x 10 reps)'],
        cardio: '20 min running'
      },
      wednesday: {
        exercises: formData.location === 'home'
          ? ['Mountain Climbers (3 sets x 20 reps)', 'Burpees (3 sets x 10 reps)', 'Bicycle Crunches (3 sets x 20 reps)', 'Wall Sit (3 sets x 30 sec)']
          : ['Dumbbell Shoulder Press (4 sets x 12 reps)', 'Lat Pulldown (4 sets x 12 reps)', 'Leg Press (4 sets x 15 reps)', 'Cable Rows (3 sets x 12 reps)'],
        cardio: '15 min cycling'
      },
      friday: {
        exercises: formData.location === 'home'
          ? ['Diamond Push-ups (3 sets x 12 reps)', 'Jump Squats (3 sets x 15 reps)', 'Russian Twists (3 sets x 20 reps)', 'Glute Bridges (3 sets x 15 reps)']
          : ['Incline Bench Press (4 sets x 10 reps)', 'Romanian Deadlifts (4 sets x 10 reps)', 'Overhead Press (3 sets x 12 reps)', 'Face Pulls (3 sets x 15 reps)'],
        cardio: '25 min swimming'
      }
    };

    const getDietPlan = (): DietPlan => {
      if (formData.diet === 'veg') {
        return {
          breakfast: 'Oatmeal with berries and almonds (350 cal)',
          lunch: 'Quinoa bowl with roasted vegetables and chickpeas (450 cal)',
          snack: 'Greek yogurt with honey and walnuts (200 cal)',
          dinner: 'Lentil curry with brown rice and salad (500 cal)'
        };
      } else if (formData.diet === 'vegan') {
        return {
          breakfast: 'Smoothie bowl with banana, spinach, and chia seeds (300 cal)',
          lunch: 'Buddha bowl with tofu, sweet potato, and tahini (450 cal)',
          snack: 'Hummus with carrot sticks (150 cal)',
          dinner: 'Black bean tacos with avocado and salsa (480 cal)'
        };
      } else if (formData.diet === 'keto') {
        return {
          breakfast: 'Scrambled eggs with avocado and bacon (400 cal)',
          lunch: 'Grilled salmon with asparagus and butter (500 cal)',
          snack: 'Cheese cubes and macadamia nuts (250 cal)',
          dinner: 'Ribeye steak with cauliflower mash (600 cal)'
        };
      } else {
        return {
          breakfast: 'Scrambled eggs with whole wheat toast and turkey (380 cal)',
          lunch: 'Grilled chicken breast with quinoa and vegetables (480 cal)',
          snack: 'Protein shake with banana (220 cal)',
          dinner: 'Baked salmon with sweet potato and broccoli (520 cal)'
        };
      }
    };

    const plan: GeneratedPlan = {
      workout: workoutPlan,
      diet: getDietPlan(),
      tips: [
        `Stay consistent with your ${formData.fitnessLevel} level routine`,
        'Drink at least 3 liters of water daily',
        'Get 7-8 hours of quality sleep',
        'Focus on progressive overload',
        'Maintain proper form to avoid injuries'
      ],
      bmi: (parseFloat(formData.weight) / Math.pow(parseFloat(formData.height) / 100, 2)).toFixed(1),
      goalWeight: formData.goal === 'weight_loss' 
        ? (parseFloat(formData.weight) - 5).toFixed(1)
        : (parseFloat(formData.weight) + 5).toFixed(1)
    };

    setGeneratedPlan(plan);
    localStorage.setItem('fitnessData', JSON.stringify({ formData, plan }));
    setCurrentPage('plan');
    setIsLoading(false);
  };

  const speakPlan = (section: string): void => {
    if (!generatedPlan) return;
    
    let text = '';
    if (section === 'workout') {
      text = 'Your weekly workout plan: Monday - ' + generatedPlan.workout.monday.exercises.join(', ');
    } else {
      text = 'Your daily diet plan: Breakfast - ' + generatedPlan.diet.breakfast + '. Lunch - ' + generatedPlan.diet.lunch;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    speechSynthesis.speak(utterance);
  };

  const generateImage = (item: string): void => {
    setSelectedImage(item);
    setTimeout(() => setSelectedImage(null), 3000);
  };

  const exportPDF = (): void => {
    alert('PDF export feature ready!');
  };

  return (
    <div className={`min-h-screen transition-colors ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <nav className={`shadow-lg sticky top-0 z-40 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentPage('home')}>
            <Dumbbell className="text-purple-500" />
            <span className="font-bold text-xl">AI Fitness Coach</span>
          </div>
          <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-lg bg-purple-500/20 hover:bg-purple-500/30">
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {currentPage === 'home' && (
        <div className="min-h-screen p-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Dumbbell className="w-16 h-16 text-purple-500 mx-auto mb-4" />
              <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                AI Fitness Coach
              </h1>
              <p className="text-xl opacity-80">Your Personal AI-Powered Fitness Journey</p>
              <div className="mt-6 p-4 bg-purple-500/20 rounded-lg inline-block">
                <p className="text-lg font-semibold">{motivation}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className={`p-8 rounded-2xl shadow-xl hover:scale-105 transition-transform cursor-pointer ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
                   onClick={() => setCurrentPage('form')}>
                <Target className="w-12 h-12 text-purple-500 mb-4" />
                <h3 className="text-2xl font-bold mb-2">Create New Plan</h3>
                <p className="opacity-70">Get your personalized workout and diet plan</p>
              </div>
              
              {generatedPlan && (
                <div className={`p-8 rounded-2xl shadow-xl hover:scale-105 transition-transform cursor-pointer ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
                     onClick={() => setCurrentPage('plan')}>
                  <Activity className="w-12 h-12 text-pink-500 mb-4" />
                  <h3 className="text-2xl font-bold mb-2">View My Plan</h3>
                  <p className="opacity-70">Access your saved fitness plan</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {currentPage === 'form' && (
        <div className="min-h-screen p-8">
          <div className="max-w-3xl mx-auto">
            <button onClick={() => setCurrentPage('home')} className="mb-6 px-4 py-2 bg-purple-500 rounded-lg hover:bg-purple-600">
              ← Back to Home
            </button>
            
            <div className={`p-8 rounded-2xl shadow-xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <h2 className="text-3xl font-bold mb-6">Tell Us About Yourself</h2>
              
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 font-semibold">Name</label>
                    <input name="name" value={formData.name} onChange={handleInputChange}
                           className={`w-full p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`} placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block mb-2 font-semibold">Age</label>
                    <input name="age" type="number" value={formData.age} onChange={handleInputChange}
                           className={`w-full p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`} placeholder="Your age" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 font-semibold">Gender</label>
                    <select name="gender" value={formData.gender} onChange={handleInputChange}
                            className={`w-full p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-2 font-semibold">Height (cm)</label>
                    <input name="height" type="number" value={formData.height} onChange={handleInputChange}
                           className={`w-full p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`} placeholder="170" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 font-semibold">Weight (kg)</label>
                    <input name="weight" type="number" value={formData.weight} onChange={handleInputChange}
                           className={`w-full p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`} placeholder="70" />
                  </div>
                  <div>
                    <label className="block mb-2 font-semibold">Fitness Goal</label>
                    <select name="goal" value={formData.goal} onChange={handleInputChange}
                            className={`w-full p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      <option value="weight_loss">Weight Loss</option>
                      <option value="muscle_gain">Muscle Gain</option>
                      <option value="maintenance">Maintenance</option>
                      <option value="endurance">Endurance</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 font-semibold">Fitness Level</label>
                    <select name="fitnessLevel" value={formData.fitnessLevel} onChange={handleInputChange}
                            className={`w-full p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-2 font-semibold">Workout Location</label>
                    <select name="location" value={formData.location} onChange={handleInputChange}
                            className={`w-full p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      <option value="gym">Gym</option>
                      <option value="home">Home</option>
                      <option value="outdoor">Outdoor</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 font-semibold">Diet Preference</label>
                    <select name="diet" value={formData.diet} onChange={handleInputChange}
                            className={`w-full p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      <option value="veg">Vegetarian</option>
                      <option value="non_veg">Non-Vegetarian</option>
                      <option value="vegan">Vegan</option>
                      <option value="keto">Keto</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-2 font-semibold">Stress Level</label>
                    <select name="stressLevel" value={formData.stressLevel} onChange={handleInputChange}
                            className={`w-full p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block mb-2 font-semibold">Medical History (Optional)</label>
                  <textarea name="medicalHistory" value={formData.medicalHistory} onChange={handleInputChange}
                            className={`w-full p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
                            rows={3} placeholder="Any injuries, conditions, or medications..." />
                </div>

                <button onClick={generatePlan}
                        disabled={isLoading || !formData.name || !formData.age || !formData.height || !formData.weight}
                        className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-bold text-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed">
                  {isLoading ? 'Generating Your Plan...' : 'Generate My Fitness Plan 🚀'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {currentPage === 'plan' && generatedPlan && (
        <div className="min-h-screen p-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
              <button onClick={() => setCurrentPage('home')} className="px-4 py-2 bg-purple-500 rounded-lg hover:bg-purple-600">
                ← Back to Home
              </button>
              <div className="flex gap-2">
                <button onClick={() => { setGeneratedPlan(null); setCurrentPage('form'); }}
                        className="px-4 py-2 bg-pink-500 rounded-lg hover:bg-pink-600 flex items-center gap-2">
                  <RefreshCw className="w-4 h-4" /> Regenerate
                </button>
                <button onClick={exportPDF} className="px-4 py-2 bg-green-500 rounded-lg hover:bg-green-600 flex items-center gap-2">
                  <Download className="w-4 h-4" /> Export PDF
                </button>
              </div>
            </div>

            <div className={`p-6 rounded-2xl shadow-xl mb-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <h2 className="text-3xl font-bold mb-4">Welcome, {formData.name}! 👋</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-purple-500/20 rounded-lg">
                  <p className="text-sm opacity-70">Current BMI</p>
                  <p className="text-2xl font-bold">{generatedPlan.bmi}</p>
                </div>
                <div className="p-4 bg-pink-500/20 rounded-lg">
                  <p className="text-sm opacity-70">Goal Weight</p>
                  <p className="text-2xl font-bold">{generatedPlan.goalWeight} kg</p>
                </div>
                <div className="p-4 bg-blue-500/20 rounded-lg">
                  <p className="text-sm opacity-70">Fitness Level</p>
                  <p className="text-2xl font-bold capitalize">{formData.fitnessLevel}</p>
                </div>
                <div className="p-4 bg-green-500/20 rounded-lg">
                  <p className="text-sm opacity-70">Goal</p>
                  <p className="text-2xl font-bold">{formData.goal.replace('_', ' ')}</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className={`p-6 rounded-2xl shadow-xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold flex items-center gap-2">
                    <Dumbbell className="text-purple-500" /> Workout Plan
                  </h3>
                  <button onClick={() => speakPlan('workout')} className="p-2 bg-purple-500 rounded-lg hover:bg-purple-600">
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>
                
                {Object.entries(generatedPlan.workout).map(([day, data]) => (
                  <div key={day} className="mb-4 p-4 bg-purple-500/10 rounded-lg">
                    <h4 className="font-bold text-lg capitalize mb-2">{day}</h4>
                    <ul className="space-y-2">
                      {data.exercises.map((ex: string, i: number) => (
                        <li key={i} className="flex items-start gap-2 cursor-pointer hover:bg-purple-500/20 p-2 rounded"
                            onClick={() => generateImage(ex)}>
                          <span className="text-purple-500">•</span>
                          <span>{ex}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-2 text-sm opacity-70">Cardio: {data.cardio}</p>
                  </div>
                ))}
              </div>

              <div className={`p-6 rounded-2xl shadow-xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold flex items-center gap-2">
                    <Utensils className="text-pink-500" /> Diet Plan
                  </h3>
                  <button onClick={() => speakPlan('diet')} className="p-2 bg-pink-500 rounded-lg hover:bg-pink-600">
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>
                
                {Object.entries(generatedPlan.diet).map(([meal, food]) => (
                  <div key={meal} className="mb-4 p-4 bg-pink-500/10 rounded-lg cursor-pointer hover:bg-pink-500/20"
                       onClick={() => generateImage(food)}>
                    <h4 className="font-bold capitalize mb-1">{meal}</h4>
                    <p>{food}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className={`p-6 rounded-2xl shadow-xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Sparkles className="text-yellow-500" /> AI Tips & Motivation
              </h3>
              <ul className="space-y-2">
                {generatedPlan.tips.map((tip: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 p-3 bg-yellow-500/10 rounded-lg">
                    <Heart className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-1" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {selectedImage && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={() => setSelectedImage(null)}>
              <div className={`p-8 rounded-2xl max-w-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <Camera className="w-16 h-16 text-purple-500 mx-auto mb-4" />
                <p className="text-center font-bold text-lg mb-2">AI Image Generation</p>
                <p className="text-center opacity-70">{selectedImage}</p>
                <p className="text-center text-sm mt-4 opacity-50">Image would be generated here using Replicate API</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FitnessCoachApp;
