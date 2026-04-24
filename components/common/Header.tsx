interface HeaderProps {
  /** Placeholder text for the search input */
  searchPlaceholder?: string;
  /** Whether to show the notification dot */
  hasNotifications?: boolean;
}

export default function Header({
  searchPlaceholder = "Search records, houses or residents…",
  hasNotifications = true,
}: HeaderProps) {
  return (
    <header className="dashboard-header">
      {/* Search bar */}
      <div className="header-search">
        <span className="material-symbols-outlined header-search-icon">
          search
        </span>
        <input
          className="header-search-input"
          placeholder={searchPlaceholder}
          type="search"
          aria-label="Search"
        />
      </div>

      {/* Actions */}
      <div className="header-actions">
        <button
          className="header-icon-btn"
          aria-label="Notifications"
          title="Notifications"
        >
          <span className="material-symbols-outlined">notifications</span>
          {hasNotifications && (
            <span className="header-notif-dot" aria-hidden="true" />
          )}
        </button>

        <button
          className="header-icon-btn"
          aria-label="Help"
          title="Help"
        >
          <span className="material-symbols-outlined">help_outline</span>
        </button>

        <div className="header-divider" aria-hidden="true" />

        <button
          className="header-avatar-btn"
          aria-label="User profile"
          title="Profile"
        >
          <span className="material-symbols-outlined text-on-surface-variant">
            account_circle
          </span>
        </button>
      </div>
    </header>
  );
}
