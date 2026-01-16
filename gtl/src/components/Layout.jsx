import { Outlet } from 'react-router-dom';
import Header from './Header';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen transition-all duration-300">
      <Header />
      <Navbar />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;

