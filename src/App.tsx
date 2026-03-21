import { Outlet } from 'react-router-dom'
import './App.css'
import { useAppSelector } from './hooks/useAppDispatch'
import CallWindow from './pages/homePage/CallWindow'
import IncomingCall from './pages/homePage/IncomingCall'

function App() {
  const callState = useAppSelector((state) => state.call)

  return (
    <main>
      <Outlet />
      {callState.isInCall && (
        <CallWindow />
      )}

      {callState.callStatus === "ringing" && (
        <IncomingCall />
      )}
    </main>
  )
}

export default App