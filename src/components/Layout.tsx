import { Outlet, Link } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <nav className="w-64 bg-gray-800 p-4">
        <h2 className="text-xl font-bold mb-4">MattFX</h2>
        <ul>
          <li><Link to="/" className="block py-2 hover:bg-gray-700">Dashboard</Link></li>
          <li><Link to="/portfolio" className="block py-2 hover:bg-gray-700">Portfolio</Link></li>
          <li><Link to="/analysis" className="block py-2 hover:bg-gray-700">Analysis</Link></li>
          <li><Link to="/tools" className="block py-2 hover:bg-gray-700">Tools</Link></li>
          <li><Link to="/settings" className="block py-2 hover:bg-gray-700">Settings</Link></li>
        </ul>
      </nav>
      {/* Main Content */}
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;