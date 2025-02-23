import {
    AudioWaveform,
    BookOpen,
    Bot,
    Command,
    FolderSearch,
    Frame,
    FrameIcon,
    GalleryVerticalEnd,
    Map,
    MoveRight,
    PieChart,
    Settings2,
    Star,
    Trophy,
    User,
    LucideIcon,
    Palette,
    BriefcaseBusiness,
    Plug,
    Truck,
    Briefcase,
    Info,
    ScrollText,
    Users,
    TvMinimalPlay
} from "lucide-react"


export const products: { title: string; href: string; description: string; icon: LucideIcon }[] = [
    {
        title: "HUB Themes",
        href: "/products/themes",
        description:
            "Discover themes from our curated collection & start with the one perfect for your business.",
        icon: Palette
    },
    {
        title: "Business tools",
        href: "/docs/primitives/hover-card",
        description:
            "Free tools to help take your business to the next level.",
        icon: BriefcaseBusiness
    },
    {
        title: "HUB plugins",
        href: "/docs/primitives/progress",
        description:
            "Add extra functionality, features, and customization with the help of plugins.",
        icon: Plug
    },
    {
        title: "HUB Delivery",
        href: "/docs/primitives/scroll-area",
        description: "Your pan India hastle-free shipping partner.",
        icon: Truck
    },
]

export const solutions: { title: string; href: string; description: string; icon: LucideIcon }[] = [
    {
        title: "HUB Themes",
        href: "/docs/primitives/alert-dialog",
        description:
            "Discover themes from our curated collection & start with the one perfect for your business.",
        icon: Palette
    },
    {
        title: "Business tools",
        href: "/docs/primitives/hover-card",
        description:
            "Free tools to help take your business to the next level.",
        icon: BriefcaseBusiness
    },
    {
        title: "HUB plugins",
        href: "/docs/primitives/progress",
        description:
            "Add extra functionality, features, and customization with the help of plugins.",
        icon: Plug
    },
    {
        title: "HUB Delivery",
        href: "/docs/primitives/scroll-area",
        description: "Your pan India hastle-free shipping partner.",
        icon: Truck
    },
]

export const company: { title: string; href: string; description: string; icon: LucideIcon }[] = [
    {
        title: "Careers",
        href: "/docs/primitives/alert-dialog",
        description:
            "Join the team and be a part of rocketship.",
        icon: Briefcase
    },
    {
        title: "About",
        href: "/docs/primitives/hover-card",
        description:
            "The who, what and why of ZERO | HUB",
        icon: Info
    },
]

export const resources: { title: string; href: string; description: string; icon: LucideIcon }[] = [
    {
        title: "Blog",
        href: "/docs/primitives/alert-dialog",
        description:
            "Get useful tips on how to start & grow your online business.",
        icon: ScrollText
    },
    {
        title: "Community",
        href: "/docs/primitives/hover-card",
        description:
            "Become a part of our exclusive ZERO | HUB VIP Facebook group with over 50k+ members.",
        icon: Users
    },
    {
        title: "Videos",
        href: "/docs/primitives/hover-card",
        description:
            "Acquire skills to setup and run your online store from our videos and tutorials.",
        icon: TvMinimalPlay
    },
    {
        title: "Help Center",
        href: "/docs/primitives/hover-card",
        description:
            "Advice and answers from the ZERO | HUB Team.",
        icon: TvMinimalPlay
    },
]

export const items = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    teams: [
        {
            name: "Acme Inc",
            logo: GalleryVerticalEnd,
            plan: "Enterprise",
        },
        {
            name: "Acme Corp.",
            logo: AudioWaveform,
            plan: "Startup",
        },
        {
            name: "Evil Corp.",
            logo: Command,
            plan: "Free",
        },
    ],
    navMain: [
        {
            title: "Introduction",
            url: "#",
            icon: BookOpen,
            isActive: true,
            items: [
                {
                    title: "Overview",
                    url: "/docs/introduction/overview",
                    icon: FolderSearch
                },
                {
                    title: "Key Features",
                    url: "/docs/introduction/key-features",
                    icon: Star
                },
                {
                    title: "Who Can Use This Platform?",
                    url: "/introduction/docs/who-can-use-this-platform",
                    icon: User
                },
                {
                    title: "Benefits of Using This Platform",
                    url: "/docs/introduction/benefits",
                    icon: Trophy
                },
            ],
        },
        {
            title: "Getting Started",
            url: "#",
            icon: BookOpen,
            isActive: true,
            items: [
                {
                    title: "Start your store",
                    url: "/docs/getting-started/start-your-store",
                    icon: MoveRight
                },
                {
                    title: "Choose your template",
                    url: "/docs/getting-started/choose-template",
                    icon: MoveRight
                },
                {
                    title: "Collaborate",
                    url: "#",
                    icon: MoveRight
                },
                {
                    title: "Next Steps",
                    url: "#",
                    icon: MoveRight
                },
            ],
        },
        {
            title: "Models",
            url: "#",
            icon: Bot,
            items: [
                {
                    title: "Genesis",
                    url: "#",
                    icon: FrameIcon
                },
                {
                    title: "Explorer",
                    url: "#",
                    icon: FrameIcon
                },
                {
                    title: "Quantum",
                    url: "#",
                    icon: FrameIcon
                },
            ],
        },
        {
            title: "Documentation",
            url: "/docs",
            icon: BookOpen,
            items: [
                {
                    title: "Introduction",
                    url: "/docs/introduction",
                    icon: FrameIcon
                },
                {
                    title: "Get Started",
                    url: "#",
                    icon: FrameIcon
                },
                {
                    title: "Tutorials",
                    url: "#",
                    icon: FrameIcon
                },
                {
                    title: "Changelog",
                    url: "#",
                    icon: FrameIcon
                },
            ],
        },
        {
            title: "Settings",
            url: "#",
            icon: Settings2,
            items: [
                {
                    title: "General",
                    url: "#",
                    icon: FrameIcon
                },
                {
                    title: "Team",
                    url: "#",
                    icon: FrameIcon
                },
                {
                    title: "Billing",
                    url: "#",
                    icon: FrameIcon
                },
                {
                    title: "Limits",
                    url: "#",
                    icon: FrameIcon
                },
            ],
        },
    ],
    projects: [
        {
            name: "Design Engineering",
            url: "#",
            icon: Frame,
        },
        {
            name: "Sales & Marketing",
            url: "#",
            icon: PieChart,
        },
        {
            name: "Travel",
            url: "#",
            icon: Map,
        },
    ],
}