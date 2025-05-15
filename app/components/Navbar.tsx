// Navbar.js
"use client"; // This is a client component 👈🏽
import { useRouter } from "next/navigation";
import React from "react";
import { MdModeStandby } from "react-icons/md";
import { useAuth } from "../utils/AuthContext";
import Link from "next/link"; // Import Link from Next.js

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();
  const router = useRouter();
  
  const handleLogout = async () => {
    await logout(); // Handle logout
    router.push("/"); // Redirect to home after logout
  };
  
  const menu = isLoggedIn
    ? [
        { name: "Home", url: "/" },
        { name: "My profile", url: "/profile" },
        { name: "Inventory", url: "/attachments" },
        { name: "Suits", url: "/getsuits" },
        { name: "Astronauts", url: "/astronauts" },
        { name: "Live", url: "/live" },
        { name: "Logout", url: "/logout" },
      ]
    : [
        { name: "Home", url: "#home" },
        { name: "Login", url: "/signin" },
        { name: "Register", url: "/signup" },
      ];
  return (
    <nav className="bg-blue-600 p-4">
      <ul className="list-disc flex flex-col gap-3 fixed left-0 top-0 bottom-0 justify-center sm:m-10 m-1 ">
        {menu.map((x, index) => (
          <li key={index} className="flex items-left flex-row group">
            {x.name === "Logout" ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full text-left"
              >
                <MdModeStandby className="sm:text-4xl text-2xl text-primary group-hover:text-accent transition-all ease-in-out duration-700 sm:ml-2 flex-shrink-0" />
                <p className="opacity-1 group-hover:opacity-100 transition duration-700 text-2xl mr-3 font-bold uppercase">
                  {x.name}
                </p>
              </button>
            ) : (
              <Link
                href={x.url}>
                <div className="flex items-center gap-2 w-full text-left">
                  <MdModeStandby className="sm:text-4xl text-2xl text-primary group-hover:text-accent transition-all ease-in-out duration-700 sm:ml-2 flex-shrink-0" />
                  <p className="opacity-1 group-hover:opacity-100 transition duration-700 text-2xl mr-3 font-bold uppercase">
                    {x.name}
                  </p>
                </div>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
