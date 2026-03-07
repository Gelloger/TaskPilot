import { Outlet } from 'react-router-dom';
import SideNav from './SideNav';

export default function Layout() {
  return (
    <div className="flex min-h-screen">
      <SideNav />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
