import axios from 'axios';
import { AppProps } from 'next/app';
import Router from 'next/router';
import { useEffect } from 'react';

const AdminApp = ({ Component, pageProps }: AppProps): React.ReactElement => {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      Router.push('/admin/login');
    } else {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);

  return <Component {...pageProps} />;
};

export default AdminApp;
