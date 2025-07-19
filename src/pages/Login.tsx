import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  PhoneAuthProvider, 
  signInWithPhoneNumber, 
  signInWithCredential,
  RecaptchaVerifier 
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { toast } from 'sonner';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Email password login
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(email, password);
      toast.success('Logged in successfully!');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Failed to login');
    } finally {
      setIsLoading(false);
    }
  };

  // Google login
  const handleGoogleLogin = async () => {
    setIsLoading(true);
    const provider = new GoogleAuthProvider();
    
    // Add scopes to request additional user information
    provider.addScope('profile');
    provider.addScope('email');
    
    // Set custom parameters for the auth request
    provider.setCustomParameters({
      prompt: 'select_account' // Force account selection even if user is already logged in
    });
    
    try {
      const result = await signInWithPopup(auth, provider);
      // You can access additional user info from result.user
      console.log('Google sign-in successful:', result.user);
      toast.success('Logged in with Google successfully!');
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Google sign-in error:', error);
      toast.error(error.message || 'Failed to login with Google');
    } finally {
      setIsLoading(false);
    }
  };

  // Phone login - send verification code
  const handleSendVerificationCode = async () => {
    if (!phoneNumber) {
      toast.error('Please enter a valid phone number');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Initialize reCAPTCHA verifier
      const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'normal',
        callback: () => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
      });
      
      // Send verification code
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
      setVerificationId(confirmationResult.verificationId);
      setIsCodeSent(true);
      toast.success('Verification code sent!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to send verification code');
    } finally {
      setIsLoading(false);
    }
  };

  // Phone login - verify code
  const handleVerifyCode = async () => {
    if (!verificationCode) {
      toast.error('Please enter the verification code');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const credential = PhoneAuthProvider.credential(verificationId, verificationCode);
      await signInWithCredential(auth, credential);
      toast.success('Logged in with phone successfully!');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Invalid verification code');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="m-auto w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-zinc-900">Welcome Back</h1>
          <p className="text-gray-500 mt-2">Sign in to access your dashboard</p>
        </div>
        
        <Tabs defaultValue="email" className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="phone">Phone</TabsTrigger>
            <TabsTrigger value="google">Google</TabsTrigger>
          </TabsList>
          
          {/* Email Password Login */}
          <TabsContent value="email">
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email"
                  type="email" 
                  placeholder="your@email.com" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <a href="#" className="text-sm text-blue-600 hover:underline">Forgot password?</a>
                </div>
                <Input 
                  id="password"
                  type="password" 
                  placeholder="••••••••" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
          </TabsContent>
          
          {/* Phone Login */}
          <TabsContent value="phone">
            <div className="space-y-4">
              {!isCodeSent ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone"
                      type="tel" 
                      placeholder="+1 (555) 000-0000" 
                      required
                      value={phoneNumber}
                      onChange={(e) => {
                        // Basic formatting for phone numbers
                        let value = e.target.value;
                        // Only keep digits and + symbol
                        if (!value.startsWith('+') && value) {
                          value = '+' + value;
                        }
                        setPhoneNumber(value);
                      }}
                    />
                  </div>
                  
                  <div id="recaptcha-container" className="my-4"></div>
                  
                  <Button 
                    type="button" 
                    className="w-full" 
                    onClick={handleSendVerificationCode}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Sending...' : 'Send Verification Code'}
                  </Button>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="code">Verification Code</Label>
                    <Input 
                      id="code"
                      type="text" 
                      placeholder="Enter 6-digit code" 
                      required
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                    />
                  </div>
                  
                  <Button 
                    type="button" 
                    className="w-full" 
                    onClick={handleVerifyCode}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Verifying...' : 'Verify & Sign In'}
                  </Button>
                  
                  <Button 
                    type="button" 
                    variant="link" 
                    className="w-full mt-2" 
                    onClick={() => setIsCodeSent(false)}
                  >
                    Try a different number
                  </Button>
                </>
              )}
            </div>
          </TabsContent>
          
          {/* Google Login */}
          <TabsContent value="google">
            <div className="space-y-4">
              <Button 
                type="button" 
                variant="outline" 
                className="w-full flex items-center justify-center gap-2" 
                onClick={handleGoogleLogin}
                disabled={isLoading}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M8 12h8"/>
                  <path d="M12 8v8"/>
                </svg>
                {isLoading ? 'Signing in...' : 'Sign in with Google'}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login; 