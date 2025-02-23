"use client"
import { SidebarTrigger } from '@/components/ui/sidebar'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import AuthButton from '@/modules/auth/ui/components/auth-button'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from '@/lib/utils'
import { usePathname, useSearchParams } from 'next/navigation'
import { company, products, resources, solutions } from '@/constants'
import { Button } from '@/components/ui/button'


const HomeNavbar = () => {

    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);

    const handleScroll = () => {
        setIsScrolled(window.scrollY > 10);
      };

      useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
      }, []);

    return (
        <nav
      className={cn(
        "fixed top-0 left-0 right-0 h-16 flex items-center px-6 pr-5 z-50 transition-all duration-300 border-b border-dashed",
        isScrolled
          ? "backdrop-blur-lg bg-white/70 dark:bg-black/40 shadow-md"
          : "bg-transparent"
      )}
    >
            <div className='flex items-center gap-4 w-full'>
                <div className='flex items-center flex-shrink-0'>
                    {pathname.includes('/docs') &&
                        <SidebarTrigger />
                    }
                    <Link href='/'>
                        <div className='p-4 flex items-center gap-1'>
                            <p className='text-3xl font-bold tracking-tight'>ZERO | HUB</p>
                        </div>
                    </Link>
                </div>
                <div className='hidden flex-1 md:flex justify-center max-w-[720px] mx-auto'>
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[700px]">
                                        {products.map((product) => (
                                            <div className='flex items-center' key={product.title}>
                                                <div className='border p-2 rounded-xl'>
                                                    {product.icon && <product.icon className='size-6 text-blue-700' />}
                                                </div>
                                                <ListItem
                                                    title={product.title}
                                                    href={product.href}
                                                >
                                                    {product.description}
                                                </ListItem>
                                            </div>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[700px] ">
                                        {solutions.map((solution) => (
                                            <div className='flex items-center' key={solution.title}>
                                                <div className='border p-2 rounded-xl'>
                                                    {solution.icon && <solution.icon className='size-6 text-blue-700' />}
                                                </div>
                                                <ListItem
                                                    title={solution.title}
                                                    href={solution.href}
                                                >
                                                    {solution.description}
                                                </ListItem>
                                            </div>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[700px] ">
                                        {resources.map((resource) => (
                                            <div className='flex items-center' key={resource.title}>
                                                <div className='border p-2 rounded-xl'>
                                                    {resource.icon && <resource.icon className='size-6 text-blue-700' />}
                                                </div>
                                                <ListItem
                                                    title={resource.title}
                                                    href={resource.href}
                                                >
                                                    {resource.description}
                                                </ListItem>
                                            </div>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>Company</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[700px] ">
                                        {company.map((comp) => (
                                            <div className='flex items-center' key={comp.title}>
                                                <div className='border p-2 rounded-xl'>
                                                    {comp.icon && <comp.icon className='size-6 text-blue-700' />}
                                                </div>
                                                <ListItem
                                                    title={comp.title}
                                                    href={comp.href}
                                                >
                                                    {comp.description}
                                                </ListItem>
                                            </div>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Link href="/docs" legacyBehavior passHref>
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                        Documentation
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Link href="/docs" legacyBehavior passHref>
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                        Pricing
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
                <div className='hidden flex-shrink-0 items-center md:flex gap-4'>
                    <Button variant='outline'>
                        Contact
                    </Button>
                </div>
                <div className='hidden flex-shrink-0 items-center md:flex gap-4'>
                    <AuthButton />
                </div>
            </div>
        </nav>
    )
}

export default HomeNavbar

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"