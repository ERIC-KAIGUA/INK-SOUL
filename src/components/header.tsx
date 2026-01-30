import { useEffect, useState } from "react";
import { IoSunnyOutline } from "react-icons/io5";
import { FaRegMoon } from "react-icons/fa"
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import { AnimatePresence, motion } from "motion/react"
import { useNavigate } from "react-router";


export const Header = () => {
   const [darkMode, setDarkMode] = useState(() => {
  return localStorage.getItem("theme") === "dark"
})

    const [ sideNavOpen, setSideNavOpen] = useState(false)
    const navigate = useNavigate()
// enabling darkmode switch
    useEffect(()=>{
        if(darkMode){
            document.documentElement.classList.add('dark')
            localStorage.setItem("theme", "dark")
        } else {
            document.documentElement.classList.remove('dark')
            localStorage.setItem("theme", "light")
        }
    }, [darkMode])

    const changeTheme = () =>{
        setDarkMode(!darkMode)
    }

//changing button text when in dark and light mode
    const toggleText = darkMode ? < IoSunnyOutline className="text-xl" /> : <FaRegMoon className="text-xl"/>

// Toggling sidenav on small screens
    const toggleSideNav = () => {
        setSideNavOpen(!sideNavOpen)
    }
     const handleNavigation = () =>{
        navigate("/Dashboard")
     }
     const homeNavigation = () =>{
        navigate("/")
     }
     const inboxNavigation = () => {
        navigate("/Inbox")
     }
     const bookingNavigation = () => {
        navigate("/Booking")
     }

  return (
   <header className="fixed top-0 left-0 w-full z-50 bg-black/20 backdrop-blur-lg border-b border-white/10  ring-1 ring-white/5 shadow-lg shadow-black/40 rounded-b-2xl">
      <nav className=" md:mx-auto max-w-7xl px-6 py-4 flex items-center justify-between text-foreground">
        <div className="font-playfair text-3xl text-foreground font-bold">INK & SOUL</div>
        <ul className=" hidden md:flex gap-6">
          <li className="cursor-pointer text-foreground hover:text-accent transition-all duration-150 font-sans" onClick={homeNavigation}>Home</li>
          <li className="cursor-pointer text-foreground hover:text-accent transition-all duration-150 font-sans" onClick={handleNavigation}>Dashboard</li>
          <li className="cursor-pointer text-foreground hover:text-accent transition-all duration-150 font-sans" onClick={inboxNavigation}>Inbox</li>
          <li className="cursor-pointer text-foreground hover:text-accent transition-all duration-150 font-sans" onClick={bookingNavigation}>Bookings</li>
        </ul>

     <div className="flex items-center gap-4">
       <button className="relative px-4 py-2 rounded-lg text-white font-medium border border-white/10 shadow-md shadow-black/20 transition-all duration-300 hover:shadow-lg hover:shadow-black/60 active:translate-y-px active:shadow-sm" onClick={changeTheme} >
        <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.25),transparent_60%)] hover:bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.35),transparent_60%)]"/>
        <span className="relative z-10">
           {toggleText}
        </span>
        </button>

        <button className="md:hidden text-foreground hover:text-accent transition-all duration-150" onClick={toggleSideNav}>
          {sideNavOpen ?  <IoCloseSharp  className="text-3xl"/> : <GiHamburgerMenu className="text-3xl"/> }
        </button>
         <AnimatePresence>
        {sideNavOpen && (
            <motion.div className="md:hidden absolute top-full left-0 w-full bg-shade rounded-md border-b border-white/10 shadow-lg shadow-black/40 px-6 py-4" initial={{opacity:0, y: -5}} animate={{opacity:1, y: 0}} transition={{duration:1, ease:"easeInOut"}} exit={{opacity:0, y:-5}}>
                 <ul className="flex flex-col gap-4">
                    <li className="cursor-pointer text-foreground hover:text-accent transition-all duration-150 font-sans" onClick={homeNavigation}>Home</li>
                    <li className="cursor-pointer text-foreground hover:text-accent transition-all duration-150 font-sans" onClick={handleNavigation}>Dashboard</li>
                    <li className="cursor-pointer text-foreground hover:text-accent transition-all duration-150 font-sans" onClick={inboxNavigation}>Inbox</li>
                    <li className="cursor-pointer text-foreground hover:text-accent transition-all duration-150 font-sans" onClick={bookingNavigation}>Bookings</li>
                  </ul>
            </motion.div>
        )}
        </AnimatePresence>
      </div> 
      </nav>
    
    </header>
  )
}
