import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  Brain, 
  BarChart3, 
  Users, 
  Target, 
  CheckCircle, 
  Lightbulb,
  Award,
  Zap,
  Moon,
  Sun,
  ChevronRight
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    setIsDarkMode(shouldBeDark);
  }, []);

  useEffect(() => {
    // Apply theme to document
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLaunchDemo = () => {
    // Navigate to login page
    window.location.href = '/login';
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' 
        : 'bg-gradient-to-br from-slate-50 to-slate-100'
    }`}>
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Navigation */}
      <nav className={`${
        isDarkMode 
          ? 'bg-slate-900/80 backdrop-blur-md border-slate-700' 
          : 'bg-white/80 backdrop-blur-md border-slate-200'
      } border-b sticky top-0 z-50 transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <span className={`text-xl font-bold transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-slate-800'
              }`}>Accenture</span>
              <ChevronRight className="h-6 w-6 text-purple-600 font-bold" />
            </div>
            <div className="flex items-center space-x-4">
              <Button
                onClick={toggleTheme}
                variant="ghost"
                size="sm"
                className="p-2"
              >
                {isDarkMode ? (
                  <Sun className="h-5 w-5 text-yellow-500" />
                ) : (
                  <Moon className="h-5 w-5 text-slate-600" />
                )}
              </Button>
              <div className="hidden md:flex items-center space-x-8">
                <a href="#problem" className={`transition-colors duration-300 ${
                  isDarkMode 
                    ? 'text-slate-300 hover:text-white' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}>Problem</a>
                <a href="#solution" className={`transition-colors duration-300 ${
                  isDarkMode 
                    ? 'text-slate-300 hover:text-white' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}>Solution</a>
                <a href="#team" className={`transition-colors duration-300 ${
                  isDarkMode 
                    ? 'text-slate-300 hover:text-white' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}>Team</a>
                <Button onClick={handleLaunchDemo} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  Launch Demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        {/* Animated Background for Title */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <Badge className={`mb-6 transition-colors duration-300 ${
              isDarkMode 
                ? 'bg-gradient-to-r from-purple-900/50 to-pink-900/50 text-purple-200 border-purple-700' 
                : 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border-purple-200'
            }`}>
              <Zap className="w-4 h-4 mr-2 animate-pulse" />
              AI-Powered Waste Classification
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 relative">
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent animate-pulse">
                Acuvera
              </span>
              {/* Floating particles around title */}
              <div className="absolute -top-4 -left-4 w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-100"></div>
              <div className="absolute -top-2 -right-8 w-1 h-1 bg-pink-500 rounded-full animate-bounce delay-300"></div>
              <div className="absolute -bottom-2 -left-6 w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce delay-500"></div>
              <div className="absolute -bottom-4 -right-4 w-1 h-1 bg-purple-400 rounded-full animate-bounce delay-700"></div>
            </h1>
            <p className={`text-xl mb-8 max-w-3xl mx-auto leading-relaxed transition-colors duration-300 ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Revolutionizing waste management through intelligent classification, 
              real-time analytics, and continuous learning for a sustainable future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={handleLaunchDemo}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg px-8 py-6 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Launch Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className={`text-lg px-8 py-6 transform hover:scale-105 transition-all duration-300 ${
                  isDarkMode 
                    ? 'border-slate-600 hover:bg-slate-800 text-slate-300 hover:text-white' 
                    : 'border-slate-300 hover:bg-slate-100 text-slate-700 hover:text-slate-900 hover:border-slate-400'
                }`}
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section id="problem" className={`py-20 transition-colors duration-300 ${
        isDarkMode ? 'bg-slate-800' : 'bg-white'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold mb-4 transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>The Challenge</h2>
            <p className={`text-xl max-w-3xl mx-auto transition-colors duration-300 ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Traditional waste management systems face significant challenges in accurate classification and efficient processing
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className={`hover:shadow-lg transition-all duration-300 transform hover:scale-105 ${
              isDarkMode 
                ? 'border-slate-700 bg-slate-800/50 hover:bg-slate-800' 
                : 'border-slate-200 bg-white hover:bg-slate-50'
            }`}>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="h-8 w-8 text-red-600 dark:text-red-400" />
                </div>
                <h3 className={`text-xl font-semibold mb-4 transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>Low Accuracy</h3>
                <p className={`transition-colors duration-300 ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  Manual waste classification leads to 30-40% misclassification rates, 
                  causing contamination and reducing recycling efficiency.
                </p>
              </CardContent>
            </Card>

            <Card className={`hover:shadow-lg transition-all duration-300 transform hover:scale-105 ${
              isDarkMode 
                ? 'border-slate-700 bg-slate-800/50 hover:bg-slate-800' 
                : 'border-slate-200 bg-white hover:bg-slate-50'
            }`}>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BarChart3 className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className={`text-xl font-semibold mb-4 transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>No Analytics</h3>
                <p className={`transition-colors duration-300 ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  Lack of real-time data and insights prevents optimization of 
                  waste processing workflows and resource allocation.
                </p>
              </CardContent>
            </Card>

            <Card className={`hover:shadow-lg transition-all duration-300 transform hover:scale-105 ${
              isDarkMode 
                ? 'border-slate-700 bg-slate-800/50 hover:bg-slate-800' 
                : 'border-slate-200 bg-white hover:bg-slate-50'
            }`}>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
                </div>
                <h3 className={`text-xl font-semibold mb-4 transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>Training Gaps</h3>
                <p className={`transition-colors duration-300 ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  Staff require extensive training for proper waste classification, 
                  leading to inconsistent results and high operational costs.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section id="solution" className={`py-20 transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' 
          : 'bg-gradient-to-br from-slate-50 to-slate-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold mb-4 transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>Our Solution</h2>
            <p className={`text-xl max-w-3xl mx-auto transition-colors duration-300 ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Acuvera leverages cutting-edge AI to deliver intelligent waste classification with real-time analytics
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-purple-900/50 to-pink-900/50' 
                    : 'bg-gradient-to-r from-purple-100 to-pink-100'
                }`}>
                  <Brain className={`h-6 w-6 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                </div>
                <div>
                  <h3 className={`text-xl font-semibold mb-2 transition-colors duration-300 ${
                    isDarkMode ? 'text-white' : 'text-slate-900'
                  }`}>AI-Powered Classification</h3>
                  <p className={`transition-colors duration-300 ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    Advanced computer vision models achieve 95%+ accuracy in waste classification, 
                    supporting 13+ waste categories with real-time processing.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-blue-900/50 to-cyan-900/50' 
                    : 'bg-gradient-to-r from-blue-100 to-cyan-100'
                }`}>
                  <BarChart3 className={`h-6 w-6 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                </div>
                <div>
                  <h3 className={`text-xl font-semibold mb-2 transition-colors duration-300 ${
                    isDarkMode ? 'text-white' : 'text-slate-900'
                  }`}>Real-Time Analytics</h3>
                  <p className={`transition-colors duration-300 ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    Comprehensive dashboard provides insights into classification accuracy, 
                    waste distribution, and performance metrics for continuous improvement.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-green-900/50 to-emerald-900/50' 
                    : 'bg-gradient-to-r from-green-100 to-emerald-100'
                }`}>
                  <CheckCircle className={`h-6 w-6 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
                </div>
                <div>
                  <h3 className={`text-xl font-semibold mb-2 transition-colors duration-300 ${
                    isDarkMode ? 'text-white' : 'text-slate-900'
                  }`}>Continuous Learning</h3>
                  <p className={`transition-colors duration-300 ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    User corrections feed back into the system, enabling continuous 
                    model improvement and adaptation to specific waste streams.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <Card className={`p-8 backdrop-blur-sm transition-colors duration-300 ${
                isDarkMode 
                  ? 'bg-slate-800/80 border-slate-700' 
                  : 'bg-white/80 border-slate-200'
              }`}>
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Lightbulb className="h-10 w-10 text-white" />
                    </div>
                    <h4 className={`text-lg font-semibold transition-colors duration-300 ${
                      isDarkMode ? 'text-white' : 'text-slate-900'
                    }`}>Key Benefits</h4>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className={`transition-colors duration-300 ${
                        isDarkMode ? 'text-slate-300' : 'text-slate-700'
                      }`}>95%+ Classification Accuracy</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className={`transition-colors duration-300 ${
                        isDarkMode ? 'text-slate-300' : 'text-slate-700'
                      }`}>Real-Time Processing</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className={`transition-colors duration-300 ${
                        isDarkMode ? 'text-slate-300' : 'text-slate-700'
                      }`}>Mobile-First Design</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className={`transition-colors duration-300 ${
                        isDarkMode ? 'text-slate-300' : 'text-slate-700'
                      }`}>13+ Waste Categories</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className={`transition-colors duration-300 ${
                        isDarkMode ? 'text-slate-300' : 'text-slate-700'
                      }`}>Continuous Learning</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className={`py-20 transition-colors duration-300 ${
        isDarkMode ? 'bg-slate-800' : 'bg-white'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold mb-4 transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>Meet Our Team</h2>
            <p className={`text-xl max-w-3xl mx-auto transition-colors duration-300 ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Experienced professionals from leading organizations, bringing together 
              expertise in technology, finance, and energy sectors.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className={`hover:shadow-lg transition-all duration-300 transform hover:scale-105 ${
              isDarkMode 
                ? 'border-slate-700 bg-slate-800/50 hover:bg-slate-800' 
                : 'border-slate-200 bg-white hover:bg-slate-50'
            }`}>
              <CardContent className="p-8 text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">SA</span>
                </div>
                <h3 className={`text-xl font-semibold mb-2 transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>Saleh Alhadlaq</h3>
                <div className="space-y-2 mb-4">
                  <Badge variant="secondary" className={`${
                    isDarkMode 
                      ? 'bg-blue-900/50 text-blue-200 border-blue-700' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    <Award className="w-3 h-3 mr-1" />
                    Ex-PwC
                  </Badge>
                  <Badge variant="secondary" className={`${
                    isDarkMode 
                      ? 'bg-blue-900/50 text-blue-200 border-blue-700' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    <Award className="w-3 h-3 mr-1" />
                    Ex-Microsoft
                  </Badge>
                </div>
                <p className={`transition-colors duration-300 ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  Technology leader with extensive experience in enterprise solutions 
                  and digital transformation across consulting and tech giants.
                </p>
              </CardContent>
            </Card>

            <Card className={`hover:shadow-lg transition-all duration-300 transform hover:scale-105 ${
              isDarkMode 
                ? 'border-slate-700 bg-slate-800/50 hover:bg-slate-800' 
                : 'border-slate-200 bg-white hover:bg-slate-50'
            }`}>
              <CardContent className="p-8 text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">NA</span>
                </div>
                <h3 className={`text-xl font-semibold mb-2 transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>Nawwaf Alrumaih</h3>
                <div className="space-y-2 mb-4">
                  <Badge variant="secondary" className={`${
                    isDarkMode 
                      ? 'bg-green-900/50 text-green-200 border-green-700' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    <Award className="w-3 h-3 mr-1" />
                    Ex-Alinma Capital
                  </Badge>
                </div>
                <p className={`transition-colors duration-300 ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  Financial services expert with deep knowledge of capital markets 
                  and investment strategies in the Middle East region.
                </p>
              </CardContent>
            </Card>

            <Card className={`hover:shadow-lg transition-all duration-300 transform hover:scale-105 ${
              isDarkMode 
                ? 'border-slate-700 bg-slate-800/50 hover:bg-slate-800' 
                : 'border-slate-200 bg-white hover:bg-slate-50'
            }`}>
              <CardContent className="p-8 text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">RA</span>
                </div>
                <h3 className={`text-xl font-semibold mb-2 transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>Raghad Almalki</h3>
                <div className="space-y-2 mb-4">
                  <Badge variant="secondary" className={`${
                    isDarkMode 
                      ? 'bg-purple-900/50 text-purple-200 border-purple-700' 
                      : 'bg-purple-100 text-purple-800'
                  }`}>
                    <Award className="w-3 h-3 mr-1" />
                    Ex-Aramco
                  </Badge>
                </div>
                <p className={`transition-colors duration-300 ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  Energy sector specialist with proven track record in large-scale 
                  industrial operations and sustainability initiatives.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-600/90 to-pink-600/90"></div>
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full animate-pulse delay-500"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Waste Management?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Experience the future of intelligent waste classification with our live demo
          </p>
          <Button 
            onClick={handleLaunchDemo}
            size="lg"
            className="bg-white text-purple-600 hover:bg-purple-50 text-lg px-8 py-6 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Launch Demo Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 transition-colors duration-300 ${
        isDarkMode ? 'bg-slate-900' : 'bg-slate-900'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <span className="text-xl font-bold text-white">Accenture</span>
              <ChevronRight className="h-6 w-6 text-purple-400 font-bold" />
            </div>
            <p className="text-slate-400">
              © 2024 Accenture. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

