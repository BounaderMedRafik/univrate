"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Loader, University } from "lucide-react";
import Link from "next/link";
import {
  RedirectToSignIn,
  RedirectToSignUp,
  SignInButton,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const Navigation = () => {
  const router = useRouter();
  const user = useUser();
  const [loaded, setLoaded] = useState(true);

  if (!user.isSignedIn && user.isLoaded) {
    router.push("/");
    setLoaded(false);
  }

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
            {loaded ? (
              <div>
                <MyUserButton />
              </div>
            ) : (
              <div>
                <Loader className=" animate-spin" size={15} />
              </div>
            )}
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
          <div className="text-sm ">
            Hello{" "}
            <span className="font-semibold text-blue-500">
              {user.user?.firstName}
            </span>
          </div>
          <UserButton />
        </div>
      ) : (
        <div>
          <SignInButton mode="modal">
            <Button size={"lg"}>Start Now</Button>
          </SignInButton>
        </div>
      )}
    </div>
  );
};

export default Navigation;
