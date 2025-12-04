"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Calendar,
  FileText,
  DollarSign,
  UserCog,
  Settings,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

export default function Sidebar({ isOpen, setIsOpen }) {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState(["youth-services"]);

  const menuItems = [
    {
      id: "dashboard",
      icon: LayoutDashboard,
      label: "Dashboard",
      href: "/app",
    },
    {
      id: "youth-services",
      icon: Users,
      label: "Youth Services",
      href: "/app/youth-services",
      subItems: [
        {
          id: "youths-enrolled",
          icon: UserCheck,
          label: "Youths Enrolled",
          href: "/app/youths-enrolled",
        },
        {
          id: "events",
          icon: Calendar,
          label: "Events",
          href: "/app/events",
        },
      ],
    },
    {
      id: "reports",
      icon: FileText,
      label: "Reports",
      href: "/app/reports",
    },
    {
      id: "budget",
      icon: DollarSign,
      label: "Budget",
      href: "/app/budget",
    },
    {
      id: "admin",
      icon: UserCog,
      label: "Admin",
      href: "/app/admin",
    },
    {
      id: "settings",
      icon: Settings,
      label: "Settings",
      href: "/app/settings",
    },
  ];

  const toggleExpand = (itemId) => {
    setExpandedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const isPathActive = (href) => {
    if (href === "/app") {
      return pathname === "/app";
    }
    return pathname.startsWith(href);
  };

  const renderMenuItem = (item, index, isSubItem = false) => {
    const Icon = item.icon;
    const isActive = isPathActive(item.href);
    const isExpanded = expandedItems.includes(item.id);
    const hasSubItems = item.subItems && item.subItems.length > 0;
    const showDivider = !isSubItem && (index === 1 || index === 3);

    return (
      <React.Fragment key={item.id}>
        {showDivider && <div className="my-2 border-t border-gray-200"></div>}
        <div>
          {hasSubItems ? (
            <button
              onClick={() => toggleExpand(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 mb-1 ${
                isActive
                  ? "bg-orange-100 text-orange-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon
                  size={20}
                  className={isActive ? "text-orange-600" : "text-gray-500"}
                />
                <span className="font-medium text-sm">{item.label}</span>
              </div>
              {isExpanded ? (
                <ChevronDown size={18} />
              ) : (
                <ChevronRight size={18} />
              )}
            </button>
          ) : (
            <Link
              href={item.href}
              onClick={() => {
                if (window.innerWidth < 768) {
                  setIsOpen(false);
                }
              }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 mb-1 ${
                isSubItem ? "pl-12" : ""
              } ${
                isActive
                  ? "bg-orange-100 text-orange-700 shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon
                  size={20}
                  className={isActive ? "text-orange-600" : "text-gray-500"}
                />
                <span className="font-medium text-sm">{item.label}</span>
              </div>
            </Link>
          )}

          {hasSubItems && isExpanded && (
            <div className="ml-2">
              {item.subItems.map((subItem, subIndex) =>
                renderMenuItem(subItem, subIndex, true)
              )}
            </div>
          )}
        </div>
      </React.Fragment>
    );
  };

  return (
    <div
      className={`
      fixed md:static inset-y-0 left-0 z-40
      w-72 bg-white md:rounded-2xl shadow-xl overflow-y-auto
      transform transition-transform duration-300 ease-in-out
      md:transform-none md:m-4 md:h-[calc(100vh-2rem)]
      ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
    `}
    >
      {/* Logo Section */}
      <div className="p-6 bg-linear-to-r from-orange-500 to-orange-600 sticky top-0 z-10">
        <div className="flex items-center justify-center space-x-2">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
            <span className="text-orange-600 font-bold text-xl">YM</span>
          </div>
          <div className="text-white">
            <div className="font-semibold text-lg">YouthMetrics</div>
            <div className="text-xs text-orange-100">Hub</div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="p-4">
        {menuItems.map((item, index) => renderMenuItem(item, index))}
      </nav>

      {/* User Profile Section */}
      <div className="p-4 border-t border-gray-200 sticky bottom-0 bg-white">
        <div className="flex items-center space-x-3 p-2 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors">
          <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-sm font-bold text-white">
            VE
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">Vem User</p>
            <p className="text-xs text-gray-500">Administrator</p>
          </div>
        </div>
      </div>
    </div>
  );
}