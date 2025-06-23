import React, { useState, useEffect } from 'react';
import { Database, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface DatabaseStatusProps {
  isDark: boolean;
}

const DatabaseStatus: React.FC<DatabaseStatusProps> = ({ isDark }) => {
  const [status, setStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('count')
          .limit(1);
        
        if (error) {
          throw error;
        }
        
        setStatus('connected');
        setError(null);
      } catch (err) {
        setStatus('error');
        setError(err instanceof Error ? err.message : 'Connection failed');
      }
    };

    checkConnection();
  }, []);

  if (status === 'checking') {
    return (
      <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs ${
        isDark ? 'bg-yellow-900/20 text-yellow-400' : 'bg-yellow-100 text-yellow-700'
      }`}>
        <Database className="h-3 w-3 animate-pulse" />
        <span>Connecting...</span>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs ${
        isDark ? 'bg-red-900/20 text-red-400' : 'bg-red-100 text-red-700'
      }`} title={error || 'Database connection failed'}>
        <XCircle className="h-3 w-3" />
        <span>DB Error</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs ${
      isDark ? 'bg-green-900/20 text-green-400' : 'bg-green-100 text-green-700'
    }`}>
      <CheckCircle className="h-3 w-3" />
      <span>DB Connected</span>
    </div>
  );
};

export default DatabaseStatus;