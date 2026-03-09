import { useNeonAuth } from '@neondatabase/neon-js/auth/react';
import { Link } from 'react-router-dom';

export function Home() {
  const { user, isLoading } = useNeonAuth();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Dobeu Tech — Sales Funnel</h1>
      {user ? (
        <div>
          <p>Welcome, {user.email}</p>
          <Link to="/account/profile">Account Settings</Link>
        </div>
      ) : (
        <div>
          <p>Sign in to manage prospects and outreach.</p>
          <Link to="/auth/sign-in">Sign In</Link>
        </div>
      )}
    </div>
  );
}
