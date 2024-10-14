'use client'
import React from 'react'; // 确保导入 React
import { useState, useEffect } from 'react'
import { Link, usePathname }from "@/lib/i18n";
import { Github, MenuIcon } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import IconImage from "../../public/favicon.svg";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { ThemeModeButton } from "@/components/ThemeModeButton";
import { LocaleButton } from "@/components/LocaleButton";
import {useTranslations} from 'next-intl';
type categoriesType = {
  name: string,
  src: string,
  description: string,
  link: string
}

type navigationProp = {
  categories: categoriesType[]
}


export const Navigation = ({ categories }: navigationProp ) => {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = useTranslations('navigation');

  const menuItems: {
    label: string;
    href: string;
  }[] = [
    {
      label: t('homeBtn'),
      href: "/",
    },
    {
      label: t('categoryBtn'),
      href: "/category",
    },
    {
      label: t('articleBtn'),
      href: "/article",
    },
    {
      label: t('changelogBtn'),
      href: "/changelog",
    },
  ];
  const isMenuItemActive = (href: string) => {
    // console.log(pathname, href);
    return pathname === href;
  };

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  
  const size = 30;
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
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    )
  })
  ListItem.displayName = "ListItem"
  return (

    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src={IconImage}
              className="block"
              width={size}
              height={size}
              alt="DomainScore"
            />
            <span className="inline-block font-bold">AiNavList</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href="/" legacyBehavior passHref>
                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), 'font-medium', '/' === pathname && "font-extrabold")}>
                      {t('homeBtn')}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className={cn('font-medium', '/category' === pathname && "font-extrabold")}>{t('categoryBtn')}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-3 lg:w-[600px] ">
                      {categories.map((category) => (
                        <ListItem
                          key={category.name}
                          title={category.name}
                          href={`/category/${category.link}`}
                          className='capitalize'
                        >
                          {category.description}
                        </ListItem>
                      ))}
                      <ListItem
                        title={t('moreCategoryBtn')}
                        href={'/category'}
                        className='capitalize border border-muted  bg-gradient-to-b  from-muted/50 to-muted/20'
                      >
                        {t('moreCategoryDescription')}
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className={cn('font-medium', '/article' === pathname && "font-extrabold")}>
                    {t('articleBtn')}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                            href="/"
                          >
                            <div className="mb-2 mt-4 text-lg font-medium">
                              AiNavList
                            </div>
                            <p className="text-xs leading-tight text-muted-foreground">
                              {t('articleDescription')}
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <ListItem href={"https://github.com/zhugezifang/ai-nav-list"} target="_blank"  title="Add Tools">
                        {t('article1Title')}
                      </ListItem>
                      <ListItem href="/article" title={t('moreArticleBtn')} className='border border-muted  bg-gradient-to-b  from-muted/50 to-muted/20'>
                        {t('moreArticleDescription')}
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/changelog" legacyBehavior passHref>
                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), 'font-medium', '/changelog' === pathname && "font-extrabold")}>
                      {t('changelogBtn')}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <Link href={"https://github.com/zhugezifang/ai-nav-list"}
            target="_blank" className='hidden md:block'>
            <Button variant="outline" className='text-sm tracking-tight'>{t('submitToolBtn')}</Button>
          </Link>
          <div className="flex items-center gap-1">
            <ThemeModeButton />
            <LocaleButton />
            
          </div>
          <Link
            href={"https://ko-fi.com/zhugezifang"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground ml-1"
          >
            <svg fill="red" viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true"><path d="M20.216 6.415l-.132-.666c-.119-.598-.388-1.163-1.001-1.379-.197-.069-.42-.098-.57-.241-.152-.143-.196-.366-.231-.572-.065-.378-.125-.756-.192-1.133-.057-.325-.102-.69-.25-.987-.195-.4-.597-.634-.996-.788a5.723 5.723 0 00-.626-.194c-1-.263-2.05-.36-3.077-.416a25.834 25.834 0 00-3.7.062c-.915.083-1.88.184-2.75.5-.318.116-.646.256-.888.501-.297.302-.393.77-.177 1.146.154.267.415.456.692.58.36.162.737.284 1.123.366 1.075.238 2.189.331 3.287.37 1.218.05 2.437.01 3.65-.118.299-.033.598-.073.896-.119.352-.054.578-.513.474-.834-.124-.383-.457-.531-.834-.473-.466.074-.96.108-1.382.146-1.177.08-2.358.082-3.536.006a22.228 22.228 0 01-1.157-.107c-.086-.01-.18-.025-.258-.036-.243-.036-.484-.08-.724-.13-.111-.027-.111-.185 0-.212h.005c.277-.06.557-.108.838-.147h.002c.131-.009.263-.032.394-.048a25.076 25.076 0 013.426-.12c.674.019 1.347.067 2.017.144l.228.031c.267.04.533.088.798.145.392.085.895.113 1.07.542.055.137.08.288.111.431l.319 1.484a.237.237 0 01-.199.284h-.003c-.037.006-.075.01-.112.015a36.704 36.704 0 01-4.743.295 37.059 37.059 0 01-4.699-.304c-.14-.017-.293-.042-.417-.06-.326-.048-.649-.108-.973-.161-.393-.065-.768-.032-1.123.161-.29.16-.527.404-.675.701-.154.316-.199.66-.267 1-.069.34-.176.707-.135 1.056.087.753.613 1.365 1.37 1.502a39.69 39.69 0 0011.343.376.483.483 0 01.535.53l-.071.697-1.018 9.907c-.041.41-.047.832-.125 1.237-.122.637-.553 1.028-1.182 1.171-.577.131-1.165.2-1.756.205-.656.004-1.31-.025-1.966-.022-.699.004-1.556-.06-2.095-.58-.475-.458-.54-1.174-.605-1.793l-.731-7.013-.322-3.094c-.037-.351-.286-.695-.678-.678-.336.015-.718.3-.678.679l.228 2.185.949 9.112c.147 1.344 1.174 2.068 2.446 2.272.742.12 1.503.144 2.257.156.966.016 1.942.053 2.892-.122 1.408-.258 2.465-1.198 2.616-2.657.34-3.332.683-6.663 1.024-9.995l.215-2.087a.484.484 0 01.39-.426c.402-.078.787-.212 1.074-.518.455-.488.546-1.124.385-1.766zm-1.478.772c-.145.137-.363.201-.578.233-2.416.359-4.866.54-7.308.46-1.748-.06-3.477-.254-5.207-.498-.17-.024-.353-.055-.47-.18-.22-.236-.111-.71-.054-.995.052-.26.152-.609.463-.646.484-.057 1.046.148 1.526.22.577.088 1.156.159 1.737.212 2.48.226 5.002.19 7.472-.14.45-.06.899-.13 1.345-.21.399-.072.84-.206 1.08.206.166.281.188.657.162.974a.544.544 0 01-.169.364zm-6.159 3.9c-.862.37-1.84.788-3.109.788a5.884 5.884 0 01-1.569-.217l.877 9.004c.065.78.717 1.38 1.5 1.38 0 0 1.243.065 1.658.065.447 0 1.786-.065 1.786-.065.783 0 1.434-.6 1.499-1.38l.94-9.95a3.996 3.996 0 00-1.322-.238c-.826 0-1.491.284-2.26.613z"></path></svg>
            <span className="sr-only">Sponsor</span>
          </Link>
          <Sheet
              open={mobileMenuOpen}
              onOpenChange={(open) => setMobileMenuOpen(open)}
            >
              <SheetTrigger asChild>
                <Button
                  className="md:hidden"
                  size="icon"
                  variant="outline"
                  aria-label="Menu"
                >
                  <MenuIcon className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[250px]" side="right">
                <div className="flex flex-col items-start justify-center">
                  {menuItems.map((menuItem) => (
                    <Link
                      key={menuItem.href}
                      href={menuItem.href}
                      className={cn(
                        "block px-3 py-2 text-lg",
                        isMenuItemActive(menuItem.href) ? "font-bold" : "",
                      )}
                    >
                      {menuItem.label}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
        </div>
      </div>
    </header>
  )
}