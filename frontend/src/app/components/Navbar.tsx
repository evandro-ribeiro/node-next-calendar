import LogoutButton from "./LogoutButton";

export default function Navbar() {
  return (
    <nav className="bg-cyan-500 w-full flex justify-evenly items-center">
      <span>Meu Calendário</span>
      <LogoutButton />
    </nav>
  );
}
