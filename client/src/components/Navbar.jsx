import { Link } from "react-router-dom";

function Navbar() {

  return (

    <nav className="w-full bg-[#111827] border-b border-gray-800 px-8 py-4 flex justify-between items-center">

      <div>

        <h1 className="text-2xl font-bold text-cyan-400">
          CreditAI
        </h1>

      </div>

      <div className="flex gap-8 text-gray-300">

        <Link
          to="/"
          className="hover:text-cyan-400"
        >
          Dashboard
        </Link>

        <Link
          to="/banker"
          className="hover:text-cyan-400"
        >
          Banker Panel
        </Link>

      </div>

    </nav>

  );
}

export default Navbar;