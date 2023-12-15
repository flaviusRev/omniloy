/** @format */

// sidebarOptions.ts
import { ReactComponent as DashboardIcon } from "./../assets/icons/dashboard_icon.svg";
import { ReactComponent as TiersIcon } from "./../assets/icons/tiers_icon.svg";
import { ReactComponent as RewardsIcon } from "./../assets/icons/rewards_icon.svg";
import { ReactComponent as CampaignsIcon } from "./../assets/icons/campaigns_icon.svg";
import { ReactComponent as LoyaltyPassIcon } from "./../assets/icons/loyaltypass_icon.svg";
import { ReactComponent as SettingsIcon } from "./../assets/icons/settings_icon.svg";

interface SidebarDropdownOption {
  label: string;
  path: string;
}

interface SidebarOption {
  label: string;
  Icon: React.ElementType;
  arrowDown?: boolean;
  dropdownOptions?: SidebarDropdownOption[];
  path?: string;
}

export const sidebarOptions: SidebarOption[] = [
  {
    label: "Database",
    Icon: DashboardIcon,
    arrowDown: true,
    dropdownOptions: [
      { label: "Dashboard", path: "/dashboard" },
      { label: "Members", path: "/members" },
      { label: "Member filters", path: "/members-filters" },
      { label: "Products", path: "/products" },
      { label: "Transactions", path: "/transactions" },
      { label: "Campaign suggestions", path: "/campaign-suggestions" },
    ],
  },
  {
    label: "Campaigns",
    Icon: CampaignsIcon,
    arrowDown: true,
    dropdownOptions: [
      { label: "List of campaigns", path: "/campaigns" },
      { label: "Campaign creator", path: "/campaign-creator" },
    ],
  },
  {
    label: "Tiers",
    Icon: TiersIcon,
    arrowDown: true,
    dropdownOptions: [
      { label: "Tier 1", path: "/tier-1" },
      { label: "Tier 2", path: "/tier-2" },
      // Add other tier-related dropdown options here
    ],
  },
  {
    label: "Rewards",
    Icon: RewardsIcon,
    arrowDown: true,
    dropdownOptions: [
      { label: "Reward 1", path: "/reward-1" },
      { label: "Reward 2", path: "/reward-2" },
      // Add other reward-related dropdown options here
    ],
  },
  {
    label: "Loyalty Pass",
    Icon: LoyaltyPassIcon,
    arrowDown: true,
    dropdownOptions: [
      { label: "Pass 1", path: "/pass-1" },
      { label: "Pass 2", path: "/pass-2" },
      // Add other loyalty pass-related dropdown options here
    ],
  },
  {
    label: "Apps & Social media",
    Icon: SettingsIcon,
    arrowDown: true,
    dropdownOptions: [
      { label: "Apps 1", path: "/apps-1" },
      { label: "Apps 2", path: "/apps-2" },
      // Add other loyalty pass-related dropdown options here
    ],
  },
  {
    label: "Emails",
    Icon: SettingsIcon,
    arrowDown: true,
    dropdownOptions: [
      { label: "Email 1", path: "/email-1" },
      { label: "Email 2", path: "/email-2" },
      // Add other loyalty pass-related dropdown options here
    ],
  },
];

export const staticOptions: SidebarOption[] = [
  {
    label: "Settings",
    Icon: SettingsIcon,
    path: "/settings",
  },
  // Add other static options here
];
