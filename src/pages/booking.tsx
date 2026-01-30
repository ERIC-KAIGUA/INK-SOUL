import { useState, useEffect } from "react";
import { Header } from "../components/header";
import { CiClock2 } from "react-icons/ci";
import DatePicker from "react-datepicker";
import toast, { Toaster } from 'react-hot-toast';
import { useRef } from "react";
import { motion } from "motion/react";
import "react-datepicker/dist/react-datepicker.css"; 
import { format, isToday, isSameDay, startOfMonth, endOfMonth, eachDayOfInterval, addMonths, subMonths } from "date-fns";
import { useNavigate } from "react-router";
import { Footer } from "../components/footer";

type SessionType = {
  id: string;
  title: string;
  duration: string;
  price: string;
};

const sessionOptions: SessionType[] = [
  { id: "free-consultation", title: "Free Consultation", duration: "30 mins", price: "Free" },
  { id: "small-piece", title: "Small Piece", duration: "1-2 hours", price: "Ksh.5,000 – Ksh.10,000" },
  { id: "medium-piece", title: "Medium Piece", duration: "3-4 hours", price: "Ksh.20,000 – Ksh.40,000" },
  { id: "large-piece", title: "Large Piece", duration: "5+ hours", price: "Ksh.50,000+" },
  { id: "touch-up", title: "Touch Up", duration: "30–60 mins", price: "Ksh.5,000 – Ksh.10,000" },
];



// Mock available time slots 
const availableTimeSlots = [
  "10:00 AM", "11:00 AM", "12:00 PM",
  "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM",
];

export const Booking = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const [showDetails, setShowDetails] = useState(false);
  const [name, setName]     = useState("");
  const [email, setEmail]   = useState("");
  const [phone, setPhone]   = useState("");
  const calendarSectionRef = useRef<HTMLDivElement>(null);
  const detailsSectionRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate()

  // Persist session choice
  useEffect(() => {
  setShowCalendar(false);
  setSelectedId(null);
  localStorage.removeItem("bookingStep");
}, []);

  
 
  const handleSessionSelect = (id: string) => {
    setSelectedId(id);
    localStorage.setItem("selectedSessionType", id);
    // Reset when changing session
    setShowCalendar(false);
    setSelectedDate(null);
    setSelectedTime(null);
    localStorage.setItem("bookingStep", "session");
  };

  const handleContinue = () => {
    if (selectedId) {
      setShowCalendar(true);
      localStorage.setItem("bookingStep", "calendar");
    }
  };

  // const handleTimeSelect = (time: string) => {
  //   setSelectedTime(time);
  //   if (selectedDate) {
  //     localStorage.setItem(
  //       "selectedDateTime",
  //       `${format(selectedDate, "yyyy-MM-dd")} ${time}`
  //     );
  //   }
  // };

 
  const isFormValid = name.trim() !== "" && 
                      email.trim() !== "" && 
                      phone.trim() !== "";

  const selectedSession = sessionOptions.find((s) => s.id === selectedId);

  const isSelected = (id: string) => selectedId === id;

 const handleConfirmBooking = () => {
  if (!selectedId || !selectedDate || !selectedTime) {
    toast.error("Something went wrong — missing date or time");
    return;
  }

  
  const datePart = selectedDate.toLocaleDateString("en-KE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const timePart = selectedTime; 

  const displayDateTime = `${datePart} at ${timePart}`;

  // ── Save everything I need 
  localStorage.setItem("selectedSessionType", selectedId);

  localStorage.setItem("bookingDateTime", displayDateTime);

 
  localStorage.setItem(
    "bookingInfo",
    JSON.stringify({
      sessionId: selectedId,
      sessionTitle: sessionOptions.find(s => s.id === selectedId)?.title || "",
      dateTime: displayDateTime,
      rawDate: selectedDate.toISOString().split("T")[0], 
      rawTime: selectedTime,
      bookedAt: new Date().toISOString(),
    })
  );

  toast.success(
    <div className="flex flex-col gap-1">
      <p className="font-semibold text-lg">Booking Request Sent!</p>
      <p className="text-sm text-tertiary">
        {selectedSession?.title} — {displayDateTime}
      </p>
    </div>,
    { duration: 6000 }
  );

  
  localStorage.removeItem("bookingStep");


  setTimeout(() => {
    navigate("/dashboard");   
  }, 1800);
};

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="mt-22 flex flex-1 flex-col items-center px-4 pb-12">
        <h1 className="font-serif text-foreground text-center text-2xl font-medium tracking-tight">
          Choose Your Session Type
        </h1>

        <motion.div className="mt-10 w-full max-w-2xl flex flex-col gap-4" initial={{opacity:0, z:-10}} animate={{opacity:1, z:0}} transition={{duration:1.5, ease:"easeOut"}}>
          {sessionOptions.map((session) => (
            <div
              key={session.id}
              onClick={() => handleSessionSelect(session.id)}
              className={`
                flex cursor-pointer items-center justify-between gap-6 
                rounded-xl border-2 p-5 shadow-sm transition-all
                ${isSelected(session.id)
                  ? "border-accent bg-accent/5 shadow-md"
                  : "border-tertiary bg-shade hover:border-accent/70 hover:shadow"}
              `}
            >
              <div className="flex flex-col gap-1">
                <p className="text-lg font-medium text-foreground">{session.title}</p>
                <div className="flex items-center gap-2 text-tertiary">
                  <CiClock2 className="text-xl" />
                  <span className="text-sm">{session.duration}</span>
                </div>
              </div>
              <div className="text-right">
                {session.price.includes("Free") ? (
                  <p className="text-xl font-bold text-green-500">Free</p>
                ) : (
                  <p className="text-lg font-semibold text-accent">{session.price}</p>
                )}
              </div>
            </div>
          ))}

          <button
            onClick={() => {
                handleContinue();           
                setTimeout(() => {
                  calendarSectionRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",           
                  });
                }, 100);                     
              }}
            disabled={!selectedId}
            className={`mt-6 w-full rounded-md py-3.5 text-lg font-semibold transition ${
              selectedId
                ? "bg-accent text-white hover:bg-accent/90 active:bg-accent/80"
                : "cursor-not-allowed bg-gray-600/40 text-gray-400"
            }`}
          >
            Continue
          </button>
        </motion.div>

       
       {showCalendar && selectedSession && (
      <motion.div ref={calendarSectionRef} className="mt-16 w-full max-w-4xl rounded-2xl border-2 border-tertiary bg-shade/50 p-8 shadow-xl" initial={{opacity:0,z:50}} animate={{opacity:1,z:0}} transition={{duration:2,ease:"easeOut"}}>
        <h2 className="font-serif text-foreground text-center text-2xl font-medium tracking-tight mb-6 font-spacing-2">
          Select Date & Time for your {selectedSession.title}
        </h2>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* ── Beautiful Inline Calendar ── */}
          <div className="flex flex-col items-center">
            <div className="w-full max-w-sm rounded-xl bg-shade p-6 shadow-lg border border-tertiary">
              {/* Month Header */}
              <div className="mb-4 flex items-center justify-between">
                <button
                  onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                  className="rounded-lg p-2 hover:bg-accent/10 transition"
                >
                  ←
                </button>
                <h3 className="text-lg font-semibold text-foreground">
                  {format(currentMonth, "MMMM yyyy")}
                </h3>
                <button
                  onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                  className="rounded-lg p-2 hover:bg-accent/10 transition"
                >
                  →
                </button>
              </div>

              {/* Weekdays */}
              <div className="grid grid-cols-7 text-center text-sm font-medium text-tertiary mb-3">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                  <div key={day}>{day}</div>
                ))}
              </div>

              {/* Days Grid */}
           <div className="grid grid-cols-7 gap-2 text-center">
                       
                        {(() => {
                          const firstDayWeekday = monthStart.getDay(); 
                          const emptyCells = firstDayWeekday; 

                          return Array.from({ length: emptyCells }).map((_, i) => (
                            <div key={`empty-start-${i}`} className="h-12 w-12" />
                          ));
                        })()}

                        {/*  render the actual days */}
                        {monthDays.map((day, idx) => {
                          const isPast = day < new Date().setHours(0, 0, 0, 0);
                          const isSelected = selectedDate && isSameDay(day, selectedDate);

                          return (
                            <button
                              key={idx}
                              disabled={isPast}
                              onClick={() => !isPast && setSelectedDate(day)}
                              className={`
                                relative h-12 w-12 rounded-full text-sm font-medium transition-all
                                ${isPast 
                                  ? "text-gray-400 cursor-not-allowed line-through" 
                                  : "cursor-pointer hover:bg-accent/10"
                                }
                                ${isToday(day) ? "font-bold text-accent " : "text-foreground"}
                                ${isSelected ? "bg-accent text-foreground shadow-lg scale-105" : ""}
                              `}
                            >
                              {format(day, "d")}
                            </button>
                          );
                        })}
                      </div>
            </div>

            {/* Selected Date Display */}
            {selectedDate && (
              <p className="mt-6 text-lg font-medium text-foreground">
                Selected: <span className="text-accent">{format(selectedDate, "EEEE, MMMM d, yyyy")}</span>
              </p>
            )}
          </div>

          {/* ── Time Slots ── */}
          <div className="flex flex-col justify-center">
            {selectedDate ? (
              <>
                <h3 className="mb-6 text-center text-xl font-medium text-foreground">
                  Available Times
                </h3>

                <div className="grid grid-cols-3 gap-4 sm:grid-cols-4">
                  {availableTimeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`
                        rounded-xl border-2 py-4 text-sm font-semibold transition-all
                        ${selectedTime === time
                          ? "border-accent bg-accent text-white shadow-md"
                          : "border-tertiary bg-white hover:border-accent hover:shadow"}
                      `}
                    >
                      {time}
                    </button>
                  ))}
                </div>

                <button
                  disabled={!selectedTime}
                  onClick={() => {
                    setShowDetails(true);
                     setTimeout(() => {
                      detailsSectionRef.current?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }, 100);
                  }}
                  className={`
                    mt-10 w-full rounded-xl py-4 text-lg font-bold transition-all
                    ${selectedTime
                      ? "bg-accent text-white hover:bg-accent/90 shadow-lg"
                      : "bg-gray-400 text-gray-600 cursor-not-allowed"}
                  `}
                >
                 Continue
                </button>
              </>
            ) : (
              <div className="text-center text-tertiary text-lg">
                ← Please select a date first
              </div>
            )}
          </div>
        </div>
      </motion.div>
    )}

    {showDetails && selectedSession && selectedDate && selectedTime && (
  <div ref={detailsSectionRef} className="mt-16 w-full max-w-4xl rounded-2xl border-2 border-tertiary bg-shade/50 p-8 shadow-xl">
    <h2 className="mb-8 text-center text-2xl font-medium tracking-tight text-foreground font-serif">
      Your Booking Details
    </h2>

    <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">

      {/* ── Form Fields ── */}
      <div className="flex flex-col gap-6">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            Full Name *
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            className="w-full rounded-lg border-2 border-tertiary bg-white px-4 py-3 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30"
            required
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            Email Address *
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-lg border-2 border-tertiary bg-white px-4 py-3 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30"
            required
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            Phone / WhatsApp *
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+254 7XX XXX XXX"
            className="w-full rounded-lg border-2 border-tertiary bg-white px-4 py-3 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30"
            required
          />
        </div>
      </div>

      {/* ── Booking Summary ── */}
      <div className="rounded-xl bg-shade/10 p-6 border border-tertiary shadow-sm h-fit">
        <h3 className="mb-5 text-lg font-semibold text-foreground border-b border-tertiary/40 pb-2">
          Booking Summary
        </h3>

        <dl className="space-y-3 text-sm">
          <div className="flex justify-between">
            <dt className="text-tertiary">Session</dt>
            <dd className="font-medium text-foreground">{selectedSession.title}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-tertiary">Duration</dt>
            <dd className="font-medium text-foreground">{selectedSession.duration}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-tertiary">Price</dt>
            <dd className="font-semibold text-accent">{selectedSession.price}</dd>
          </div>
          <div className="flex justify-between pt-3 border-t border-tertiary/30">
            <dt className="text-tertiary">Date</dt>
            <dd className="font-medium text-foreground">
              {format(selectedDate, "EEEE, MMMM d, yyyy")}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-tertiary">Time</dt>
            <dd className="font-medium text-foreground">{selectedTime}</dd>
          </div>
        </dl>
      </div>
    </div>

    {/* ── Final Confirm Button ── */}
    <div className="mt-10">
      <button
        disabled={!isFormValid}
        onClick={() => {
          handleConfirmBooking();
          // Here you can do the following when the project is upgraded to production:
          // 1. Send data to backend (POST request)
          // 2. Show success message / modal
          // 3. Or redirect to payment / thank-you page


          // Optional: reset form / go to thank you page
          // setName(""); setEmail(""); setPhone(""); etc.
        }}

        className={`
          w-full rounded-xl py-4 text-lg font-bold transition-all
          ${isFormValid
            ? "bg-accent text-white hover:bg-accent/90 shadow-lg active:bg-accent/80"
            : "bg-gray-500/40 text-gray-400 cursor-not-allowed"}
        `}
      >
        Confirm Booking
      </button>
       <Toaster/>
      <p className="mt-3 text-center text-xs text-tertiary">
        You will receive a confirmation via WhatsApp/email shortly.
      </p>
    </div>
  </div>
)}
     </main>

     <div>
      <Footer />
     </div>
    </div>
  );
};

