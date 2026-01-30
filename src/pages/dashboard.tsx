import { Header } from "../components/header"
import { useNavigate } from 'react-router-dom';
import { motion } from "motion/react";
import { format } from 'date-fns';
import { usePersistedUser } from '../hooks/usePersistentUser'
import { usePersistedMessages } from '../hooks/usePersistentMessage'; 
import { CiCalendar } from "react-icons/ci";
import { useEffect, useState } from "react";
import { Footer } from "../components/footer";

type SessionType = {
  id: string;
  title: string;
  duration: string;
  price: string;
};

const sessionOptions: SessionType[] = [
  { id: "free-consultation", title: "Free Consultation", duration: "30 mins", price: "Free" },
  { id: "small-piece",       title: "Small Piece",       duration: "1-2 hours", price: "Ksh.5,000 – Ksh.10,000" },
  { id: "medium-piece",      title: "Medium Piece",      duration: "3-4 hours", price: "Ksh.20,000 – Ksh.40,000" },
  { id: "large-piece",       title: "Large Piece",       duration: "5+ hours",  price: "Ksh.50,000+" },
  { id: "touch-up",          title: "Touch Up",          duration: "30–60 mins",price: "Ksh.5,000 – Ksh.10,000" },
];


export const Dashboard = () => {
  const navigate = useNavigate();
  const { profile, updateProfile } = usePersistedUser();
  const { messages } = usePersistedMessages();
  const [sessionTitle, setSessionTitle] = useState<string | null>(null);
  const [hasBooking, setHasBooking] = useState(false);
  const [bookingDateTime, setBookingDateTime] = useState<string | null>(null);
  


  const unreadCount = messages.filter(
    m => m.sender === 'artist' && !m.isRead
  ).length;

 useEffect(() => {
    // Option 1: Use the simple formatted string (most reliable right now)
    const savedDateTime = localStorage.getItem("bookingDateTime");
    if (savedDateTime) {
      setBookingDateTime(savedDateTime);
    }

    // Option 2: Use the structured object (better for future extension)
    const savedInfo = localStorage.getItem("bookingInfo");
    if (savedInfo) {
      try {
        const info = JSON.parse(savedInfo);
        const foundSession = sessionOptions.find(s => s.id === info.sessionId);
        setSessionTitle(foundSession?.title || info.sessionTitle || null);
        setBookingDateTime(info.dateTime || null);
      } catch (err) {
        console.error("Failed to parse bookingInfo", err);
      }
    }

    // Fallback: use selectedSessionType if no full bookingInfo exists yet
    if (!savedInfo && !savedDateTime) {
      const savedId = localStorage.getItem("selectedSessionType");
      if (savedId) {
        const found = sessionOptions.find(s => s.id === savedId);
        setSessionTitle(found?.title || null);
      }
    }

    setHasBooking(!!savedDateTime || !!savedInfo);
  }, []);


  const handleBookAnother = () => {
    // Optional: clear previous if you want to force re-booking
    // localStorage.removeItem("selectedSessionType");
    // localStorage.removeItem("bookingDateTime");
    window.location.href = "/booking"; 
  }
  return (
    <div className="flex-col">
      <div>
        <Header></Header>
      </div>
      <div className="min-h-screen bg-background text-gray-100 p-4 md:p-8 mt-18">
      {/* Header / Welcome */}
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-semibold font-serif text-foreground">
          Welcome back!
        </h1>
        <p className="text-gray-400 mt-2">
          {format(new Date(), "EEEE, MMMM d, yyyy")} • Nairobi
        </p>
      </header>

    
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
       
        <motion.div className="col-span-1 lg:col-span-2 bg-linear-to-br from-blue-900 to-indigo-950 rounded-xl p-6 shadow-lg" initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{duration:1.5, ease:"easeOut"}}>
          <h3 className="text-xl font-semibold mb-4">Next Session</h3>
          {hasBooking ? (
                <div className="mt-4 space-y-3 text-white/90">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-white/10 p-2">
                      <CiCalendar size={24} />
                    </div>
                      <div>
                          <p className="text-xl font-medium">
                            {sessionTitle || "Confirmed Session"}
                          </p>
                          {bookingDateTime ? (
                            <p className="text-base text-white/80 mt-1">
                              {bookingDateTime}
                            </p>
                          ) : (
                            <p className="text-sm text-white/60 italic mt-1">
                              Date & time confirmed
                            </p>
                          )}
                    </div>
                  </div>
                </div>
              ) : (
                <p className="mt-3 text-lg text-white/70">
                  No upcoming sessions
                </p>
              )}
              <button
                onClick={handleBookAnother}
                className="mt-6 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium"
              >
                {hasBooking ? "Book Another Session" : "Book a Session"}
              </button>
        </motion.div>
       

        {/* Unread Messages */}
        <motion.div className="bg-gray-800 rounded-xl p-6 flex flex-col justify-center items-center text-center" initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} transition={{duration:1.5, ease:"easeOut"}}>
          <div className="text-5xl font-bold mb-2">
            {unreadCount}
            {unreadCount > 0 && <span className="text-red-400 animate-pulse">!</span>}
          </div>
          <p className="text-xl">Unread Messages</p>
          <button
            onClick={() => navigate('/inbox')}
            className="mt-4 text-blue-400 hover:text-blue-300 underline"
          >
            Open Inbox
          </button>
        </motion.div>

        
        <motion.div className="bg-gray-800 rounded-xl p-6" initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:1.5, ease:"easeOut"}}>
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button onClick={() => navigate('/Booking')} className="w-full text-left bg-gray-700 hover:bg-gray-600 px-4 py-3 rounded-lg">
              → Book New Session
            </button>
            <button disabled onClick={() => navigate('/portfolio')} className="w-full text-left bg-gray-700 hover:bg-gray-600 px-4 py-3 rounded-lg">
              → View Portfolio
            </button>
            <button onClick={() => navigate('/Inbox')} className="w-full text-left bg-gray-700 hover:bg-gray-600 px-4 py-3 rounded-lg">
              → Inbox
            </button>
            <button disabled onClick={() => navigate('/profile')} className="w-full text-left bg-gray-700 hover:bg-gray-600 px-4 py-3 rounded-lg">
              → Edit Profile
            </button>
          </div>
        </motion.div>
      </div>



  <section className="bg-shade border-2 shadow-2xl rounded-xl p-6">
  <h2 className="text-xl font-semibold  mb-6 text-foreground font-serif">Your Profile</h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 
    <div>
      <label className="block text-sm text-gray-400 mb-1.5">Full Name</label>
      <input
        type="text"
        value={profile.name || ""}
        onChange={e => updateProfile({ name: e.target.value })}
        className="w-full rounded-lg border-2 border-tertiary text-gray-800 bg-white px-4 py-3 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30"
        placeholder="Your full name"
      />
    </div>

    <div>
      <label className="block text-sm text-gray-400 mb-1.5">Phone / WhatsApp</label>
      <input
        type="tel"
        value={profile.phone || ""}
        onChange={e => updateProfile({ phone: e.target.value })}
        className="w-full rounded-lg border-2 border-tertiary text-gray-800 bg-white px-4 py-3 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30"
        placeholder="+254 7XX XXX XXX"
      />
    </div>

    <div>
      <label className="block text-sm text-gray-400 mb-1.5">Email</label>
      <input
        type="email"
        value={profile.email || ""}
        onChange={e => updateProfile({ email: e.target.value })}
        className="w-full rounded-lg border-2 border-tertiary text-gray-800 bg-white px-4 py-3 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30"
        placeholder="you@example.com"
      />
    </div>

    <div>
      <label className="block text-sm text-gray-400 mb-1.5">Date of Birth</label>
      <input
        type="date"
        value={profile.dob || ""}
        onChange={e => updateProfile({ dob: e.target.value })}
        className="w-full rounded-lg border-2 border-tertiary text-gray-800 bg-white px-4 py-3 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30"
      />
    </div>
  </div>

 
  <div className="mt-8">
    <label className="block text-sm text-foreground mb-2">Preferred Tattoo Styles</label>
    <div className="flex flex-wrap gap-2">
      {[
        "Realism", "Blackwork", "Neo Traditional", "Traditional", "Japanese",
        "Minimalist", "Geometric", "Watercolor", "Lettering", "Portrait",
        "Cover-up", "Fine Line", "Dotwork"
      ].map(style => (
        <button
          key={style}
          type="button"
          onClick={() => {
            const current = profile.preferredStyles || [];
            const updated = current.includes(style)
              ? current.filter(s => s !== style)
              : [...current, style];
            updateProfile({ preferredStyles: updated });
          }}
          className={`
            px-3 py-1.5 rounded-full text-sm transition-colors
            ${profile.preferredStyles?.includes(style)
              ? "bg-accent text-white"
              : "bg-shade text-foreground hover:bg-gray-600"}
          `}
        >
          {style}
        </button>
      ))}
    </div>
  </div>

  
  <div className="mt-8">
    <label className="block text-sm text-foreground mb-1.5">
      Allergies or Medical Notes <span className="text-xs opacity-70">(optional)</span>
    </label>
    <textarea
      value={profile.medicalNotes || ""}
      onChange={e => updateProfile({ medicalNotes: e.target.value })}
      rows={2}
      className="w-full rounded-lg border-2 border-tertiary text-gray-800 bg-white px-4 py-3 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30 outline-none resize-none"
      placeholder="Keloid scarring, nickel allergy, diabetic, etc."
    />
  </div>

  <div className="mt-8 text-right text-sm text-gray-500">
    Changes are saved automatically
  </div>
</section>
    </div>

    <div>
      <Footer/>
    </div>
      

    </div>
  )
}
