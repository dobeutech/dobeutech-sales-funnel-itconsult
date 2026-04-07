import { useAuthData } from '@neondatabase/neon-js/auth/react';
import { Link } from 'react-router-dom';

export function Home() {
  // @ts-expect-error - Mismatched types from neon-js alpha
  const { user, isLoading } = useAuthData({});

  if (isLoading) return <p>Loading...</p>;

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Dobeu Tech — Sales Funnel</h1>
      {user ? (
        <div>
          <p>Welcome, {(user as any).email}</p>
          <nav style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/dashboard">Prospect Dashboard</Link>
            <Link to="/weekly">Weekly Report</Link>
            <Link to="/account/profile">Account Settings</Link>
          </nav>
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
