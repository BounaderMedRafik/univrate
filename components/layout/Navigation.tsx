"use client";
import React from "react";
import { Button, buttonVariants } from "../ui/button";
import { ArrowRight, Home, University } from "lucide-react";
import Link from "next/link";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import DashBoardOptions from "../feed/DashBoardOptions";

const Navigation = () => {
  return (
    <>
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
            <div>
              <MyUserButton />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const MyUserButton = () => {
  const user = useUser();
  return (
    <div>
      {user.isSignedIn ? (
        <div className="flex items-center gap-2">
          <div>
            <DashBoardOptions />
          </div>
          <div>
            <Link
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
              })}
              href={"/feed"}
            >
              <div className="flex items-center gap-2">
                <div>accueil</div>
                <div>
                  <Home size={12} />
                </div>
              </div>
            </Link>
          </div>
          <div>
            <Link
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
              })}
              href={"/add-information"}
            >
              <div className="flex items-center gap-2">
                <div>Ajouter des informations</div>
                <div>
                  <ArrowRight size={12} />
                </div>
              </div>
            </Link>
          </div>

          <div className="text-sm ">
            Bonjour{" "}
            <span className="font-semibold text-blue-500">
              {user.user?.firstName}
            </span>
          </div>

          <UserButton />
        </div>
      ) : (
        <div>
          <SignInButton mode="modal">
            <Button size={"lg"}>Commencez maintenant</Button>
          </SignInButton>
        </div>
      )}
    </div>
  );
};

export default Navigation;
