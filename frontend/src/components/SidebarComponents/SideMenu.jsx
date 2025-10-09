import React, { useEffect } from "react";
import {
  Home,
  Search,
  Compass,
  SquareStack,
  Send,
  Heart,
  Plus,
  User,
  Menu,
  LayoutGrid,
} from "lucide-react";
import { NavLink as RouterNavLink, useLocation, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { logoutUserApi } from "../../features/actions/AuthActions";

const navLinks = [
  { label: "Home", icon: Home, to: "/home" },
  { label: "Search", icon: Search, to: "/home/search" },
  { label: "Explore", icon: Compass, to: "/home/explore" },
  { label: "Reels", icon: SquareStack, to: "/reels" },
  { label: "Messages", icon: Send, to: "/home/messages" },
  { label: "Notifications", icon: Heart, to: "/notifications" },
  { label: "Create", icon: Plus, to: "/create" },
  { label: "Profile", icon: User, to: "/profile" },
];

export default function SideMenu() {
  const location = useLocation();
  const [loggedOut, setloggedOut] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutUser = () => {
    try {
      dispatch(logoutUserApi());
      console.log("User Logged Out");
    } catch (error) {
      console.log("error in logout ", error);
    }
  };

  useEffect(() => {
    if (loggedOut) {
      navigate("/");
      logoutUser();
    }
  }, [loggedOut]);

  // Only show these in mobile bottom nav
  const mobileNavLinks = [
    "Home",
    "Search",
    "Reels",
    "Messages",
    "Profile",
    "Notifications",
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col gap-2 p-4 bg-black h-screen">
        <div className="mb-8 mt-4">
          <h1 className="text-white text-xl font-bold">Instagram</h1>
        </div>
        <div className="overflow-y-scroll scroll-auto hide-scrollbar flex-1">
          {navLinks.map(({ label, icon: Icon, to }, idx) => (
            <RouterNavLink
              key={label}
              to={to}
              className={`group flex text-sm items-center gap-4 px-4 py-3 rounded-lg transition-all text-left w-full ${
                to === location.pathname
                  ? "font-bold text-white"
                  : "text-zinc-200 font-medium hover:bg-zinc-800 hover:text-white"
              }`}
            >
              <Icon
                size={22}
                strokeWidth={2}
                className={`transition-colors ${
                  to === location.pathname
                    ? "text-white"
                    : "text-zinc-400 group-hover:text-white"
                }`}
              />
              <span
                className={`transition-colors text-base ${
                  to === location.pathname
                    ? "text-white"
                    : "text-zinc-400 group-hover:text-white"
                }`}
              >
                {label}
              </span>
              {label === "Notifications" && (
                <span className="ml-auto h-2 w-2 rounded-full bg-pink-500" />
              )}
            </RouterNavLink>
          ))}
          <button 
          onClick={() => setloggedOut(true)}
          className="text-red-500 text-lg"
          >Logout</button>
        </div>
        <div className="border-t border-zinc-800 pt-4">
          <div className="flex items-center gap-3 px-4 py-2 text-zinc-200 hover:text-white cursor-pointer">
            <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <User size={14} className="text-white" />
            </div>
            <span className="text-sm">Switch accounts</span>
          </div>
        </div>
      </div>

      {/* Mobile Top Bar */}
      <div className="flex md:hidden items-center justify-between px-4 py-2 bg-black border-b border-zinc-800">
        <h1 className="text-white text-xl font-bold">Instagram</h1>
        <RouterNavLink
          to="/create"
          className="p-2 rounded-full hover:bg-zinc-800 transition"
        >
          <Plus size={24} className="text-white" />
        </RouterNavLink>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-black border-t border-zinc-800 flex md:hidden justify-between px-2 py-1">
        {navLinks
          .filter((link) => mobileNavLinks.includes(link.label))
          .map(({ label, icon: Icon, to }) => (
            <RouterNavLink
              key={label}
              to={to}
              className={`flex-1 flex flex-col items-center justify-center py-2 ${
                to === location.pathname
                  ? "text-white"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Icon size={24} />
              {/* No label on mobile */}
            </RouterNavLink>
          ))}

        <button 
          onClick={() => setloggedOut(true)}
          className="text-red-500 text-lg"
          >Logout</button>
      </nav>
    </>
  );
}


