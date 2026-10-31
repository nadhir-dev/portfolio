import { NavbarIsland } from "./navbar-island";

export default function Navbar() {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] flex justify-center">
      <div className="pointer-events-auto">
        <NavbarIsland />
      </div>
    </div>
  );
}
