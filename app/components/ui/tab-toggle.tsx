"use client";

type TabToggleTab = {
  id: string;
  label: string;
};

type TabToggleProps = {
  tabs: TabToggleTab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  ariaLabel: string;
  className?: string;
};

export default function TabToggle({
  tabs,
  activeTab,
  onTabChange,
  ariaLabel,
  className = "",
}: TabToggleProps) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={`inline-flex items-center gap-1 rounded-lg bg-talora-dark-blue/50 p-1 ${className}`}>
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;

        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls={`panel-${tab.id}`}
            id={`tab-${tab.id}`}
            onClick={() => onTabChange(tab.id)}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition md:text-sm ${
              isActive
                ? "bg-talora-red text-talora-white shadow-sm"
                : "text-talora-white/60 hover:text-talora-white/80"
            }`}>
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
