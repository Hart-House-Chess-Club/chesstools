"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/legacy/image"
import { Menu } from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const Navbar = () => {
  return (
    <nav className="bg-primary p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/chesstools.svg" alt="Chess Tools" width={100} height={50} className="h-auto" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground">
                  Tools
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[200px] gap-3 p-4">
                    <ListItem href="/generator" title="FEN to PNG">
                      Convert FEN notation to PNG images
                    </ListItem>
                    <ListItem href="/board" title="Board">
                      Interactive chess board to generate your own positions
                    </ListItem>
                    <ListItem href="/analysis" title="Analysis">
                      Analyze games with Stockfish
                    </ListItem>
                    <ListItem href="https://gif.chesstools.org/" title="GIF Generator">
                      Generate GIFs from Lichess games
                    </ListItem>
                    <ListItem href="https://api.chesstools.org/docs" title="Ratings API">
                      Retrieve ratings with our API
                    </ListItem>
                    <ListItem href="/estimator" title="Ratings Estimator">
                      Estimate ratings with FIDE and CFC
                    </ListItem>
                    <ListItem href="https://cfc.chesstools.org/" title="CFC Ratings Processor">
                      Process Canadian ratings with latest ratings from the CFC
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/play" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground",
                    )}
                  >
                    Play
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/about" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground",
                    )}
                  >
                    About
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon" className="bg-primary-foreground text-primary">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[250px]">
            <div className="flex flex-col gap-4 mt-8">
              <Link href="/board" className="text-lg font-medium">
                Board
              </Link>
              <Link href="/play" className="text-lg font-medium">
                Play
              </Link>
              <Link href="/analysis" className="text-lg font-medium">
                Analysis
              </Link>
              <Link href="/estimator" className="text-lg font-medium">
                Ratings Estimator
              </Link>
              <Link href="/generator" className="text-lg font-medium">
                Board Generator
              </Link>
              <Link href="https://gif.chesstools.org/" className="text-lg font-medium">
                Chess GIF Generator
              </Link>
              <Link href="https://api.chesstools.org/docs" className="text-lg font-medium">
                Ratings API
              </Link>
              <Link href="/about" className="text-lg font-medium">
                About
              </Link>
              <Link href="https://cfc.chesstools.org/"  className="text-lg font-medium">
                CFC Ratings Processor
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}

const ListItem = ({
  className,
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"a"> & {
  title: string
}) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href || "#"}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-hidden transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}

export default Navbar

