import React from "react";
import UI_IMG from "../../assets/images/auth-img.png";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-neutral-50 dark:bg-dark-bg">
      {/* Left Side - Form */}
      <div className="w-screen h-screen md:w-[60vw] px-8 md:px-12 pt-8 pb-12 flex flex-col justify-center relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-accent-500"></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary-200 dark:bg-primary-800 rounded-full opacity-20 animate-float"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-accent-200 dark:bg-accent-800 rounded-full opacity-20 animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 right-10 w-16 h-16 bg-warning-200 dark:bg-warning-800 rounded-full opacity-20 animate-float" style={{animationDelay: '2s'}}></div>

        <div className="relative z-10">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-accent-500 rounded-xl flex items-center justify-center shadow-soft">
              <span className="text-white font-bold text-lg">TM</span>
            </div>
            <h2 className="text-2xl font-bold gradient-text">Task Manager</h2>
          </div>

          {/* Content */}
          <div className="max-w-md">
            {children}
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden md:flex w-[40vw] h-screen items-center justify-center relative overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600"></div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/bg-img.png')] bg-cover bg-no-repeat bg-center"></div>
        </div>

        {/* Floating Shapes */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/20 rounded-full animate-float"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-white/20 rounded-full animate-float" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute top-1/3 right-20 w-12 h-12 bg-white/20 rounded-full animate-float" style={{animationDelay: '3s'}}></div>

        {/* Main Image */}
        <div className="relative z-10 text-center">
          <img 
            src={UI_IMG} 
            className="w-80 lg:w-96 animate-bounce-in" 
            alt="Task Management Illustration"
          />
          <div className="mt-8 text-white/90">
            <h3 className="text-2xl font-semibold mb-2">Streamline Your Workflow</h3>
            <p className="text-lg opacity-80">Manage tasks efficiently with our modern task management system</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
