import React, { ReactElement } from "react";
import Navbar from "./Navbar";

interface Props {
  children: ReactElement;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="">
      <Navbar />
      <div className="px-4 mx-auto min-h-screen max-w-screen bg-slate-950">
        {children}
      </div>
    </div>
  );
};

export default Layout;
