import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login, loading } = useAuth(); // Get the login function from context

  const onChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // Call the login function from context
      await login(formData.email, formData.password);
      // The context will handle navigation to '/' on success
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/40">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome Back!</CardTitle>
          <CardDescription>Enter your credentials to log in.</CardDescription>
        </CardHeader>
        <CardContent>
          {error && <p className="mb-4 text-center text-red-500 bg-red-100 p-2 rounded-md">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={formData.email} onChange={onChange} required />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={formData.password} onChange={onChange} required />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Logging In...' : 'Log In'}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Don't have an account?{' '}
            <Link to="/register" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;