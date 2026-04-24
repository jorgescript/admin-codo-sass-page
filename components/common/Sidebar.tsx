"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/dashboard", icon: "dashboard", label: "Panel de administración" },
  { href: "/houses", icon: "home_work", label: "Casas" },
  { href: "/payments", icon: "payments", label: "Pagos" },
  { href: "/settings", icon: "settings", label: "Ajustes" },
];

interface SidebarProps {
  /** Name shown in the user card */
  userName?: string;
  /** Role label shown below the name */
  userRole?: string;
  /** Avatar image URL */
  userAvatar?: string;
}

export default function Sidebar({
  userName = "Carlos Méndez",
  userRole = "Super Admin",
  userAvatar =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDvGJqh20jEWTIG9Ldu38-JkVrSvPvUFeAGyN56AXCWyXdCGYO0HTjGawLEBh0VnQb77vzEhJwX0-CSPdoScNkgT1J3NSVS4SdaU721dSx8MucbMzbLcEB410DPdqI-HCsVK9b_RLmBVkc_vEcMQwcTSlhMi3onP10xNlkddufZ4bO5XCweNidSW-6p3fIvjLQRJEbQWe7NfYCtNhfXRBJ8djeSlwL4xgOYDul52QkP4bcYq79MBpj6DLP3PWNOhzG_T30kzWvCh6Jn",
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      {/* Brand */}
      <div className="sidebar-brand">
        <h1 className="sidebar-brand-name">PropManage</h1>
        <p className="sidebar-brand-sub">Admin Terminal</p>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav" aria-label="Main navigation">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={isActive ? "nav-link nav-link--active" : "nav-link"}
              aria-current={isActive ? "page" : undefined}
            >
              <span className="material-symbols-outlined nav-link-icon">
                {link.icon}
              </span>
              <span className="text-body-md">{link.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User card */}
      <div className="sidebar-user">
        <div className="sidebar-user-inner">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={userAvatar}
            alt={`${userName} avatar`}
            className="sidebar-user-avatar"
          />
          <div>
            <p className="text-body-sm font-bold text-on-surface">{userName}</p>
            <p className="text-label-sm text-on-surface-variant">{userRole}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
