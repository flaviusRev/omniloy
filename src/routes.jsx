import {
    HomeIcon,
    UserCircleIcon,
    ArrowRightOnRectangleIcon,
    ArrowLeftOnRectangleIcon,
    UserPlusIcon,
} from "@heroicons/react/24/solid";
import { Dashboard, Profile, SignIn, SignUp, ResetPassword, Members, MembersFilters } from "./pages"
import { Products } from "./pages/products";
import { Transactions } from "./pages/transactions";
import { Campaigns } from "./pages/campaigns";
import CampaignCreator from "./pages/campaignCreator";
export const routes = [
    {
        icon: HomeIcon,
        name: "Dashboard",
        path: "/dashboard",
        element: <Dashboard />,
    },
    {
        icon: HomeIcon,
        name: "Members",
        path: "/members",
        element: <Members />,
    },
    {
        icon: HomeIcon,
        name: "Members Filters",
        path: "/members-filters",
        element: <MembersFilters />,
    },
    {
        icon: HomeIcon,
        name: "Products",
        path: "/products",
        element: <Products />,
    },
    {
        icon: HomeIcon,
        name: "Transactions",
        path: "/transactions",
        element: <Transactions />,
    },
    {
        icon: HomeIcon,
        name: "Campaigns",
        path: "/campaigns",
        element: <Campaigns />,
    },
    {
        icon: HomeIcon,
        name: "Campaigns Creator",
        path: "/campaign-creator",
        element: <CampaignCreator />,
    },
    {
        icon: UserCircleIcon,
        name: "Profile",
        path: "/profile",
        element: <Profile />,
    },
    {
        icon: ArrowRightOnRectangleIcon,
        name: "Sign In",
        path: "/sign-in",
        element: <SignIn />,
    },
    {
        icon: UserPlusIcon,
        name: "Sign Up",
        path: "/sign-up",
        element: <SignUp />,
    },
    {
        icon: ArrowLeftOnRectangleIcon,
        name: "Logout",
        path: "/logout",
        element: <></>,
    },
    {
        icon: null,
        name: "",
        path: "/update-password",
        element: <ResetPassword />,
    },
];

export default routes;
