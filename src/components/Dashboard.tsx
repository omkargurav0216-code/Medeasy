import { useAuth } from './AuthProvider';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { User, LogOut, Shield, Clock } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function Dashboard() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#05045c] to-[#0808a0] flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-[#05045c] p-4 rounded-full">
              <User className="w-12 h-12 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl text-[#05045c]">Welcome to MedEasy Dashboard</CardTitle>
          <CardDescription>You're successfully logged in!</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-lg space-y-4">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-[#05045c]" />
              <div>
                <p className="text-sm text-gray-500">Username</p>
                <p className="font-medium">{user?.username}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-[#05045c]" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{user?.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-[#05045c]" />
              <div>
                <p className="text-sm text-gray-500">Account Created</p>
                <p className="font-medium">
                  {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Quick Access</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-gray-600">View your medical records and appointments</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Health Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-gray-600">Get personalized health recommendations</p>
              </CardContent>
            </Card>
          </div>

          <Button
            onClick={handleLogout}
            className="w-full bg-[#f36d6d] hover:bg-[#ff7e7e]"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
