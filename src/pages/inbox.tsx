import { Header } from "../components/header"
import { LuMessageSquareDot } from "react-icons/lu";
import { motion } from "motion/react"
import ChatSection from "../components/chat";
import { Footer } from "../components/footer";
import { usePersistedMessages } from "../hooks/usePersistentMessage";

export const Inbox = () => {
   const { clearMessages } = usePersistedMessages()
  return (
    <div className="flex-col">
      <div>
        <Header></Header>
      </div>

      <div className="mt-22 text-center md:text-left ml-5">
          <p className="text-foreground text-center font-serif text-3xl">Check your messages here.</p>     
      </div>

      <div>
        <ChatSection></ChatSection>
      </div>

      <div className="mt-6 flex items-center justify-center">
              <button className="relative px-4 py-2 rounded-lg text-foreground font-medium border border-white/10 shadow-md shadow-black/20 transition-all duration-300 hover:shadow-lg hover:shadow-black/60 active:translate-y-px active:shadow-sm" onClick={clearMessages}>
               <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.25),transparent_60%)] hover:bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.35),transparent_60%)]"/>
               <motion.span className="relative z-10 flex flex-row gap-2 items-center justify-center" whileHover={{scale:1.1}} whileTap={{scale:0.95}}>
                  Refresh Chats <LuMessageSquareDot />
               </motion.span>
               </button>
          </div>

      <div>
        <Footer />
      </div>
    </div>
  )
}

