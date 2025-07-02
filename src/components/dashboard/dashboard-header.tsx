"use client";

import {
    BellIcon,
    Cog6ToothIcon,
    MagnifyingGlassIcon,
    UserCircleIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function DashboardHeader() {
  const pathname = usePathname();
  return (
    <header className="backdrop-blur-md bg-white/10 border-b border-white/20 shadow-xl sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Navigation */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Executive Dashboard
              </h1>
            </div>
            <nav className="ml-10 hidden md:block">
              <div className="flex space-x-8">
                <Link
                  href="/"
                  className={`text-sm font-medium transition-colors duration-200 ${
                    pathname === '/' 
                      ? 'text-white bg-white/10 px-3 py-2 rounded-lg border border-white/20' 
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  href="/analytics"
                  className={`text-sm font-medium transition-colors duration-200 ${
                    pathname === '/analytics' 
                      ? 'text-white bg-white/10 px-3 py-2 rounded-lg border border-white/20' 
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Analytics
                </Link>
                <Link
                  href="/reports"
                  className={`text-sm font-medium transition-colors duration-200 ${
                    pathname === '/reports' 
                      ? 'text-white bg-white/10 px-3 py-2 rounded-lg border border-white/20' 
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Reports
                </Link>
                <Link
                  href="/exports"
                  className={`text-sm font-medium transition-colors duration-200 ${
                    pathname === '/exports' 
                      ? 'text-white bg-white/10 px-3 py-2 rounded-lg border border-white/20' 
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Exports
                </Link>
              </div>
            </nav>
          </div>

          {/* Search and Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative hidden lg:block">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search companies..."
                className="block w-64 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md py-2 pl-10 pr-3 text-sm placeholder-slate-400 text-white focus:border-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-400/30"
              />
            </div>

            {/* Time Range Selector */}
            <div className="relative">
              <button className="flex items-center rounded-xl border border-white/20 bg-white/10 backdrop-blur-md px-3 py-2 text-sm font-medium text-white hover:bg-white/20 transition-all duration-200">
                Q4 2024
                <ChevronDownIcon className="ml-2 h-4 w-4" />
              </button>
            </div>

            {/* Notifications */}
            <button className="relative rounded-full p-2 text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-200">
              <BellIcon className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-xs text-white flex items-center justify-center font-medium">
                5
              </span>
            </button>

            {/* Settings */}
            <button className="rounded-full p-2 text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-200">
              <Cog6ToothIcon className="h-6 w-6" />
            </button>

            {/* User Menu */}
            <div className="relative">
              <button className="flex items-center rounded-full bg-white/10 backdrop-blur-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/50 hover:bg-white/20 transition-all duration-200 p-1">
                <UserCircleIcon className="h-8 w-8 text-slate-300" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
} 