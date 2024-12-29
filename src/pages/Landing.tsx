import { useState } from "react";
    import { useNavigate } from "react-router-dom";
    import { Button } from "@/components/ui/button";
    import { Input } from "@/components/ui/input";
    import { useToast } from "@/components/ui/use-toast";
    import { useTheme } from "next-themes";
    import { Moon, Sun } from "lucide-react";
    
    const Landing = () => {
      const [pin, setPin] = useState("");
      const navigate = useNavigate();
      const { toast } = useToast();
      const { setTheme, theme } = useTheme();
    
      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const storedPin = localStorage.getItem('reportcraft-login-pin') || '0609603747';
        
        if (pin === storedPin) {
          navigate('/dashboard');
        } else {
          toast({
            title: "Invalid PIN",
            description: "Please enter the correct PIN to continue.",
            variant: "destructive",
          });
        }
      };
    
      const handleThemeChange = () => {
        setTheme(theme === "dark" ? "light" : "dark");
      };
    
      return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-red-50">
          <header className="w-full p-4 text-white flex justify-center items-center relative">
            <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-red-500">ReportCraft</h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleThemeChange}
              className="absolute right-4 top-4 text-foreground hover:text-foreground/80"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </header>
          <div className="text-center space-y-8 flex-1 flex flex-col justify-center items-center">
            <div className="space-y-4">
              <p className="text-gray-600">Enter PIN to continue</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="password"
                placeholder="Enter PIN"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-64 text-center"
                maxLength={10}
              />
              <Button type="submit" className="w-64">
                Enter
              </Button>
            </form>
          </div>
        </div>
      );
    };
    
    export default Landing;
