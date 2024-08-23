
import { ThemeProvider } from "./components/ui/theme-provider";
import { Home } from "./pages/Home/Home";
import { Login } from "./pages/Login/Login";
import { Navbar } from "./pages/Navbar/Navbar";

import { Route, Routes} from "react-router-dom"
import ShowTask from "./pages/Task/ShowTask";



const App = () => {
  return (
    <ThemeProvider>
      <Navbar/>
      <div className="grid h-screen place-items-center" >
        <Routes>
          < Route path="/" element={<Home/>}  />
          < Route path="/login" element={<Login/>}  />
          < Route path="/task" element={<ShowTask/>} />
        </Routes>
      </div>
    </ThemeProvider>
  )
}

export default App