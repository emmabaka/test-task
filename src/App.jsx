import Header from "./components/Header/Header";
import HeroSection from "./components/HeroSection/HeroSection";
import UserSection from "./components/UserSection/UsersSection";
import SingUpSection from "./components/SignUpSection/SignUpSection";
import { useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  return (
    <>
      <Header />
      <HeroSection />
      <UserSection users={users} setUsers={setUsers} />
      <SingUpSection setUsers={setUsers} />
    </>
  );
}

export default App;
