import { LandingPage } from './pages/landingpage';
import { Booking } from './pages/booking';
import { Inbox } from './pages/inbox';
import { Dashboard } from './pages/dashboard';
import { BrowserRouter,Route,Routes } from 'react-router';
import { Toaster } from 'react-hot-toast';
import './App.css'

function App() {
  

  return ( 
    <BrowserRouter>
    <Toaster
        position="bottom-center"          
        containerStyle={{
       
          top: 80,                       
        }}
        toastOptions={{
        
          className: `!rounded-xl !border-2 !shadow-2xl !min-w-[340px] !max-w-md`,
          style: {
            borderColor: 'var(--tertiary)',
            backgroundColor: 'hsl(var(--shade) / 0.92)',
            color: 'var(--foreground)',
            backdropFilter: 'blur(8px)',
            padding: '20px 24px',
           },

        
          duration: 5000,

       
          success: {
            className: `
              border-accent/60 bg-shade/95
              text-foreground
            `,
            iconTheme: {
              primary: 'var(--accent)',    
              secondary: 'white',
            },
          },

       
          error: {
            className: 'border-red-500/60 bg-shade/95',
          },

          // Style the message content area
          
        }}
      />
      <Routes>
        <Route path='/' element={<LandingPage/>}></Route>
         <Route path='/Dashboard' element={<Dashboard/>}></Route>
          <Route path='/Inbox' element={<Inbox/>}></Route>
           <Route path='/Booking' element={<Booking/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
