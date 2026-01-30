import { Header } from "../components/header"
import { motion } from "motion/react"
import Artist from "../assets/images/jassir-jonis-mzSNt6wX-cg-unsplash.jpg";
import FirstTattoo from "../assets/images/andres-medina-4CS0wnRyDXs-unsplash.jpg";
import SecondTattoo from "../assets/images/ethan-rougon-UJSFe5VoNFs-unsplash.jpg";
import ThirdTattoo from "../assets/images/pexels-curayagjovan-7203283.jpg";
import FourthTattoo from "../assets/images/viklundvisuals-V9-FQmAsE8I-unsplash.jpg";
import { TestimonialCard } from "../components/testimonialcard";
import { Footer } from "../components/footer";

export const LandingPage = () => {
   const testimonials = [
  {
    quote:
      '"The detail is incredible. I came in with a rough idea, and they turned it into a masterpiece."',
    author: 'Sarah J.',
  },
  {
    quote:
      '"A true professional. The environment was super clean and professional."',
    author: 'Marcus T.',
  },
  {
    quote:
      '"Perfect placement. It feels like it was always meant to be there."',
    author: 'Elena R.',
  },
  {
    quote:
      '"Color that pops. The saturation is perfect and still vibrant."',
    author: 'David L.',
  },
  {
    quote:
      '"Patient and collaborative. I never felt rushed."',
    author: 'Jordan M.',
  },
  {
    quote:
      '"The best healing experience. The lines stayed perfectly sharp."',
    author: 'Chloe W.',
  },
  {
    quote:
      '"Master of the craft. The shading and depth are phenomenal."',
    author: 'Anthony.',
  },
];
  return (
    <div className="flex-col">
      <div>
        <Header></Header>
      </div>
       

       <div className="flex flex-col mt-24 ml-6 md:flex-row gap-2 ">
        <motion.p className="text-foreground md:text-wrap w-2/3" initial={{opacity:0, x:-30}} animate={{opacity:1, x:0}} transition={{duration:3, ease:"easeOut"}}>"Hello, My name is Jassir. To me, a tattoo is more than just ink—it’s a collaborative process and a permanent extension of your identity. I take pride in providing a professional, inclusive, and thoughtful experience for every person who sits in my chair. My Work I specialize in fine-line detail and minimalist blackwork. My goal is to create pieces that feel effortless and intentional, focusing on delicate linework and soft shading. I design every tattoo to complement the natural flow of the body, ensuring the art ages as gracefully as you do."</motion.p>
         
          <motion.div className="relative inline-block w-2/3 mx-auto mt-3" initial={{opacity:0,x:50}} animate={{opacity:1,x:0}} transition={{duration:3, ease:"easeInOut"}}>
            {/* foreground for an image */}
            <div className="absolute -inset-0.5 rounded-3xl bg-linear-to-br from-indigo-500/30 via-purple-500/20 to-transparent mx-auto md:w-3/4"/>
               <img src={Artist} className="relative rounded-xl w-50 mx-auto p-2 md:"/>
          </motion.div>
       </div>

       <div className=" flex flex-col mt-40">
        <h2 className="font-serif text-center text-2xl font-semibold mb-5 text-foreground">My Work</h2>

            <div className="flex flex-col gap-5 items-center justify-center md:flex-row ">
              <div className="w-1/2 bg-shade  rounded-lg overflow-hidden shadow-lg md:w-60">
                <div className="relative bg-main-white group">
                  <img src={FirstTattoo} className="w-full h-1/2 object-cover rounded-md md:h-1/3 shadow-xl"></img>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 rounded-md flex items-end justify-start p-4">
                    <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <p className="font-serif text-lg font-bold mb-1">Goddess</p>
                      <div className="flex gap-2 text-sm font-medium">
                        <p>Ksh.10,000</p>
                        <p>• 3-5 hrs</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-3 items-center justify-center m-2">
                    <h2 className="font-serif text-foreground text-xl">Goddess</h2>
                    <h4 className="font-san text-tertiary text-sm">Neo Traditional Style</h4>
                </div>   
              </div>

              <div className="w-1/2 bg-shade  rounded-lg overflow-hidden shadow-lg md:w-60">
                <div className="relative bg-main-white group">
                  <img src={SecondTattoo} className="w-full h-1/2 object-cover rounded-md shadow-xl"></img>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 rounded-md flex items-end justify-start p-4">
                    <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <p className="font-serif text-lg font-bold mb-1">Butterfly</p>
                      <div className="flex gap-2 text-sm font-medium">
                        <p>Ksh.10,000</p>
                        <p>• 3-4 hrs</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 items-center justify-center m-2">
                    <h2 className="font-serif text-foreground text-xl">Butterfly</h2>
                    <h4 className="font-san text-tertiary text-sm">Negative Space Tattoo Style</h4>
                </div>   
              </div>

              <div className="w-1/2 bg-shade  rounded-lg overflow-hidden shadow-lg md:w-60">
                <div className="relative bg-main-white group">
                  <img src={ThirdTattoo} className="w-full h-1/2 object-cover rounded-md md:h-1/3 shadow-xl"></img>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 rounded-md flex items-end justify-start p-4">
                    <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <p className="font-serif text-lg font-bold mb-1">Sleeve</p>
                      <div className="flex gap-2 text-sm font-medium">
                        <p>Ksh.50,000</p>
                        <p>• 4-6 hrs</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 items-center justify-center m-2">
                    <h2 className="font-serif text-foreground text-xl">Sleeve</h2>
                    <h4 className="font-san text-tertiary text-sm">Blackwork Tattoo Style</h4>
                </div>   
              </div>

              <div className="w-1/2 bg-shade  rounded-lg overflow-hidden shadow-lg md:w-60">
                <div className="relative bg-main-white group">
                  <img src={FourthTattoo} className="w-full h-1/2 object-cover rounded-md md:h-1/3 shadow-xl"></img>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 rounded-md flex items-end justify-start p-4">
                    <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <p className="font-serif text-lg font-bold mb-1">Portrait</p>
                      <div className="flex gap-2 text-sm font-medium">
                        <p>Ksh.70,000</p>
                        <p>• 5-6 hrs</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 items-center justify-center m-2">
                    <h2 className="font-serif text-foreground text-xl">Portrait</h2>
                    <h4 className="font-san text-tertiary text-sm">Realism Tattoo Style</h4>
                </div>   
              </div>
            </div>     
       </div>

    <div className="mt-22 overflow-hidden">
        <h2 className="font-serif text-foreground text-3xl mb-6 text-center">
          Testimonials
        </h2>

        <div className="relative w-full overflow-hidden">

          {/* LEFT FADE */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-40 z-10"
            style={{
              background:
                "linear-gradient(to right, var(--background) 0%, var(--background) 20%, transparent 100%)",
            }}
        />

          {/* RIGHT FADE */}
          <div className="pointer-events-none absolute inset-y-0 right-0 w-40 z-10"
              style={{
                background:
                  "linear-gradient(to left, var(--background) 0%, var(--background) 20%, transparent 100%)",
              }}
          />

              <div className="flex gap-6 animate-marquee whitespace-nowrap relative z-0 backdrop-blur-[1px] m-5">
                {/* ORIGINAL */}
                {testimonials.map((t, i) => (
                  <TestimonialCard key={`a-${i}`} {...t} />
                ))}

                {/* DUPLICATE */}
                {testimonials.map((t, i) => (
                  <TestimonialCard key={`b-${i}`} {...t} />
                ))}
              </div>
            </div>
          </div>

          <div>
            <Footer></Footer>
          </div>

    </div>
  )
}
