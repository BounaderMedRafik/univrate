import React from "react";
import { Button } from "../ui/button";
import { University } from "lucide-react";
import Link from "next/link";

const Navigation = () => {
  return (
    <div className="border-b border-white/10">
      <div className=" wrapper flex items-center justify-between">
        <Link className="hover:opacity-75 transition-all" href={"/"}>
          <div className="flex items-center gap-2">
            <div>
              <University size={20} />
            </div>
            <div className="mt-1 text-xl font-black">UnivRate</div>
          </div>
        </Link>
        <div>
          <Button size={"lg"}>Start Now</Button>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
