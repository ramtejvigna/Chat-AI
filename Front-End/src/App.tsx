import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Header from "./components/Header"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import Chat from "./pages/Chat"
import NotFound from "./pages/NotFound"

function App() {

  return (
    <main>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/signup" element={<SignUp />}/>
          <Route path="/chats" element={<Chat />}/>
          <Route path="*" element={<NotFound />}/>
        </Routes>
    </main>
  );
}

export default App
