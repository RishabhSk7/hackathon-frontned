// src/components/Sidebar.tsx
import React from "react";
import { Link } from "./RouterLinks";
// Assuming you have an icon library like heroicons
import { ChatBubbleOvalLeftEllipsisIcon, ArrowUpTrayIcon, DocumentDuplicateIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  icon: React.ElementType;
  currentPath: string;
};

const NavLink = ({ href, children, icon: Icon, currentPath }: NavLinkProps) => {
  const isActive = currentPath === href;
  const activeClass = isActive ? 'bg-sky-500/20 text-sky-800' : 'hover:bg-sky-500/10 text-slate-600';

  return (
    <Link href={href} className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${activeClass}`}>
      <Icon className="w-6 h-6 mr-3" />
      <span className="font-medium">{children}</span>
    </Link>
  );
};


export default function Sidebar() {
  // A simple way to get the current path from the hash
  const currentPath = window.location.hash.replace('#', '') || '/';

  return (
    <aside className="w-64 glass-card p-6 hidden md:flex flex-col gap-4">
    <div className="text-3xl font-bold text-slate-800 mb-6 font-serif">
      rasML/AI
    </div>

      <nav className="flex flex-col gap-2">
        <NavLink href="/" icon={ChatBubbleOvalLeftEllipsisIcon} currentPath={currentPath}>Chat</NavLink>
        <NavLink href="/upload" icon={ArrowUpTrayIcon} currentPath={currentPath}>Upload</NavLink>
        <NavLink href="/documents" icon={DocumentDuplicateIcon} currentPath={currentPath}>Documents</NavLink>
        <NavLink href="/admin" icon={Cog6ToothIcon} currentPath={currentPath}>Admin</NavLink>
      </nav>

      <div className="mt-auto text-sm text-white/70">
        Signed in as <strong>User</strong>
      </div>
    </aside>
  );
}