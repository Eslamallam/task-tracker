"use client";

import Image from "next/image";
import Link from "next/link";
import clsx from 'clsx';
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const menuItems = [
    { name: "All Tasks", path: "/", icon: "fas fa-home" },
    { name: "Important", path: "/important", icon: "fas fa-star" },
    { name: "Completed", path: "/completed", icon: "fas fa-check" },
    { name: "To Do!", path: "/todo", icon: "fas fa-tasks" },
  ];

  const pathname = usePathname();

  return (
    <nav className="flex flex-col justify-between border-2 border-solid border-[#f9f9f914] bg-[#212121] rounded-md p-5 min-w-48 h-full">
      <div className="flex">
        <Image
          className="rounded-full mb-5 hover:scale-110 transition duration-500 ease-in-out"
          src="/profile.png"
          alt="logo"
          width={60}
          height={60}
        />
        <h2 className="text-white text-center content-center mx-3">John Doe</h2>
      </div>
      <ul>
        {menuItems.map((item, index) => (
          <div key={index}>
            <li className={clsx('py-2', {
                'text-slate-100 bg-[#f9f9f914] rounded-md': item.path === pathname,
                'text-slate-500': item.path !== pathname
            })}>
              <i className={`${item.icon} mx-3`}></i>
              <Link href={item.path}>{item.name}</Link>
            </li>
          </div>
        ))}
      </ul>

      <button className="bg-trasnparent text-white rounded-md p-2">
        <i className="fa-solid fa-right-from-bracket mr-2"></i>
        Logout
      </button>
    </nav>
  );
}
