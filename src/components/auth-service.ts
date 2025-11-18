// Local storage-based authentication service (simulating a database)

export interface User {
  id: string;
  username: string;
  email: string;
  password: string; // In real app, this would be hashed
  createdAt: string;
  authProvider?: 'local' | 'google'; // Track authentication provider
}

export interface AuthSession {
  userId: string;
  username: string;
  rememberMe: boolean;
  loginTime: string;
}

const USERS_KEY = 'medeasy_users';
const SESSION_KEY = 'medeasy_session';

class AuthService {
  // Get all users from localStorage
  private getUsers(): User[] {
    const usersJson = localStorage.getItem(USERS_KEY);
    return usersJson ? JSON.parse(usersJson) : [];
  }

  // Save users to localStorage
  private saveUsers(users: User[]): void {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  // Sign up a new user
  signUp(username: string, email: string, password: string): { success: boolean; message: string } {
    try {
      // Validate inputs
      if (!username || !email || !password) {
        return { success: false, message: 'All fields are required' };
      }

      if (username.length < 3) {
        return { success: false, message: 'Username must be at least 3 characters' };
      }

      if (password.length < 6) {
        return { success: false, message: 'Password must be at least 6 characters' };
      }

      const users = this.getUsers();
      
      // Check if username already exists (case insensitive)
      if (users.some(u => u.username.toLowerCase() === username.toLowerCase())) {
        return { success: false, message: 'Username already exists' };
      }

      // Check if email already exists (case insensitive)
      if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
        return { success: false, message: 'Email already exists' };
      }

      // Create new user
      const newUser: User = {
        id: crypto.randomUUID(),
        username,
        email,
        password, // In production, hash this!
        createdAt: new Date().toISOString(),
        authProvider: 'local',
      };

      users.push(newUser);
      this.saveUsers(users);

      return { success: true, message: 'Account created successfully!' };
    } catch (error) {
      console.error('Error in signUp:', error);
      return { success: false, message: 'An error occurred during sign up' };
    }
  }

  // Login user
  login(username: string, password: string, rememberMe: boolean): { success: boolean; message: string; user?: User } {
    const users = this.getUsers();
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
      return { success: false, message: 'Invalid username or password' };
    }

    // Create session
    const session: AuthSession = {
      userId: user.id,
      username: user.username,
      rememberMe,
      loginTime: new Date().toISOString(),
    };

    if (rememberMe) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    } else {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    }

    return { success: true, message: 'Login successful!', user };
  }

  // Get current session
  getSession(): AuthSession | null {
    // Check localStorage first (for remembered sessions)
    const localSession = localStorage.getItem(SESSION_KEY);
    if (localSession) {
      return JSON.parse(localSession);
    }

    // Check sessionStorage (for non-remembered sessions)
    const sessionSession = sessionStorage.getItem(SESSION_KEY);
    if (sessionSession) {
      return JSON.parse(sessionSession);
    }

    return null;
  }

  // Logout
  logout(): void {
    localStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(SESSION_KEY);
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return this.getSession() !== null;
  }

  // Get current user
  getCurrentUser(): User | null {
    const session = this.getSession();
    if (!session) return null;

    const users = this.getUsers();
    return users.find(u => u.id === session.userId) || null;
  }

  // Mock Google Login - simulates OAuth flow
  // Returns a promise to support async dialog workflow
  async googleLogin(rememberMe: boolean = true): Promise<{ success: boolean; message: string; user?: User; requiresEmail?: boolean }> {
    try {
      // In a real app, this would trigger OAuth flow
      // Return a flag to indicate email is needed
      return { 
        success: false, 
        message: 'Email required', 
        requiresEmail: true 
      };
    } catch (error) {
      console.error('Error in googleLogin:', error);
      return { success: false, message: 'An error occurred during Google sign-in' };
    }
  }

  // Complete Google login with provided email
  completeGoogleLogin(googleEmail: string, rememberMe: boolean = true): { success: boolean; message: string; user?: User } {
    try {
      if (!googleEmail) {
        return { success: false, message: 'Google sign-in cancelled' };
      }

      // Check if email is valid
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      if (!emailRegex.test(googleEmail)) {
        return { success: false, message: 'Invalid email address' };
      }

      const users = this.getUsers();
      
      // Check if user exists with this Google email
      let user = users.find(u => u.email.toLowerCase() === googleEmail.toLowerCase() && u.authProvider === 'google');
      
      if (!user) {
        // Create new user with Google auth
        const username = googleEmail.split('@')[0]; // Use email prefix as username
        const uniqueUsername = this.generateUniqueUsername(username, users);
        
        user = {
          id: crypto.randomUUID(),
          username: uniqueUsername,
          email: googleEmail,
          password: crypto.randomUUID(), // Random password for Google users
          createdAt: new Date().toISOString(),
          authProvider: 'google',
        };

        users.push(user);
        this.saveUsers(users);
      }

      // Create session
      const session: AuthSession = {
        userId: user.id,
        username: user.username,
        rememberMe,
        loginTime: new Date().toISOString(),
      };

      if (rememberMe) {
        localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      } else {
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
      }

      return { success: true, message: 'Signed in with Google successfully!', user };
    } catch (error) {
      console.error('Error in completeGoogleLogin:', error);
      return { success: false, message: 'An error occurred during Google sign-in' };
    }
  }

  // Helper to generate unique username
  private generateUniqueUsername(baseUsername: string, users: User[]): string {
    let username = baseUsername;
    let counter = 1;
    
    while (users.some(u => u.username.toLowerCase() === username.toLowerCase())) {
      username = `${baseUsername}${counter}`;
      counter++;
    }
    
    return username;
  }
}

export const authService = new AuthService();
