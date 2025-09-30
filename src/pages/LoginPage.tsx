import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Recycle, Eye, EyeOff, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSessionStore } from '@/store/useSessionStore';
import { api } from '@/lib/api';
import { toast } from 'sonner';

const WASTE_BINS = [
  { id: '1', name: 'Bin 1', color: 'bg-gray-500' },
  { id: '2', name: 'Bin 2', color: 'bg-blue-500' },
  { id: '3', name: 'Bin 3', color: 'bg-green-500' },
  { id: '4', name: 'Bin 4', color: 'bg-red-500' },
  { id: '5', name: 'Bin 5', color: 'bg-purple-500' },
  { id: '6', name: 'Bin 6', color: 'bg-pink-500' },
  { id: '7', name: 'Bin 7', color: 'bg-yellow-500' },
  { id: '8', name: 'Bin 8', color: 'bg-cyan-500' }
];

export const LoginPage: React.FC = () => {
  const [selectedBin, setSelectedBin] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setCurrentBin } = useSessionStore();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedBin) {
      toast.error('Please select a waste bin');
      return;
    }
    
    if (!password) {
      toast.error('Please enter a password');
      return;
    }

    setIsLoading(true);
    
    try {
      // Validate password with backend
      const response = await api.validatePassword(password);
      
      if (response.valid) {
        setCurrentBin(selectedBin);
        toast.success(`Logged in to ${WASTE_BINS.find(bin => bin.id === selectedBin)?.name}`);
        navigate('/classify');
      } else {
        toast.error('Invalid password');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Floating waste icons */}
        <div className="absolute top-20 left-10 w-8 h-8 text-slate-600 animate-pulse">
          <Recycle className="w-full h-full" />
        </div>
        <div className="absolute top-40 right-20 w-6 h-6 text-slate-600 animate-bounce">
          <Recycle className="w-full h-full" />
        </div>
        <div className="absolute bottom-32 left-20 w-7 h-7 text-slate-600 animate-pulse delay-1000">
          <Recycle className="w-full h-full" />
        </div>
        <div className="absolute top-60 left-1/4 w-5 h-5 text-slate-600 animate-bounce delay-500">
          <Recycle className="w-full h-full" />
        </div>
        <div className="absolute bottom-20 right-1/3 w-6 h-6 text-slate-600 animate-pulse delay-700">
          <Recycle className="w-full h-full" />
        </div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-slate-900/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 shadow-2xl mb-6 ring-4 ring-emerald-500/20">
              <Recycle className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">Acuvera</h1>
            <p className="text-slate-300 text-lg">Intelligent Waste Classification</p>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto mt-4 rounded-full"></div>
          </div>

          {/* Login Form */}
          <Card className="shadow-2xl border-0 bg-slate-800/90 backdrop-blur-xl">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl text-white">Bin Access</CardTitle>
              <p className="text-slate-300">
                Select your waste bin to access the classification system
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleLogin} className="space-y-6">
                {/* Bin Selection */}
                <div className="space-y-3">
                  <Label htmlFor="bin" className="text-slate-200 font-medium">Waste Bin</Label>
                  <select
                    id="bin"
                    value={selectedBin}
                    onChange={(e) => setSelectedBin(e.target.value)}
                    className="w-full h-12 px-4 py-3 border border-slate-600 bg-slate-700/50 text-slate-200 rounded-lg text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-800"
                    required
                  >
                    <option value="" className="text-slate-400">Select a waste bin...</option>
                    {WASTE_BINS.map((bin) => (
                      <option key={bin.id} value={bin.id} className="text-slate-200">
                        {bin.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Password */}
                <div className="space-y-3">
                  <Label htmlFor="password" className="text-slate-200 font-medium">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      required
                      className="pr-12 h-12 bg-slate-700/50 border-slate-600 text-slate-200 placeholder:text-slate-400 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-slate-600/50 text-slate-400 hover:text-slate-200"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-slate-400">
                    Default password: admin
                  </p>
                </div>

                {/* Login Button */}
                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-medium shadow-lg hover:shadow-emerald-500/25 transition-all duration-200"
                  disabled={isLoading}
                  size="lg"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Accessing Bin...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <LogIn className="h-4 w-4" />
                      Access Bin
                    </div>
                  )}
                </Button>
              </form>

              {/* Bin Preview */}
              {selectedBin && (
                <div className="mt-6 p-4 bg-slate-700/50 rounded-lg border border-slate-600">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full ${WASTE_BINS.find(bin => bin.id === selectedBin)?.color}`}></div>
                    <div>
                      <p className="font-medium text-slate-200">
                        {WASTE_BINS.find(bin => bin.id === selectedBin)?.name}
                      </p>
                      <p className="text-sm text-slate-400">
                        Ready to classify waste materials
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center mt-8 text-sm text-slate-400">
            <p className="font-medium">Acuvera Waste Classification System</p>
            <p className="text-slate-500">Select your bin to start classifying waste materials</p>
          </div>
        </div>
      </div>
    </div>
  );
};
