"use client";
import React from "react";
import { Button, buttonVariants } from "../ui/button";
import { ArrowRight, ChevronRight } from "lucide-react";
import { SignUpButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

const Hero = () => {
  return (
    <div>
      <div className="relative overflow-hidden min-h-[80vh] flex items-center justify-center">
        <div
          aria-hidden="true"
          className="flex absolute -top-96 start-1/2 transform -translate-x-1/2"
        >
          <div className="bg-gradient-to-r from-violet-800/50 to-purple-900 blur-3xl w-[25rem] h-[44rem] rotate-[-60deg] transform -translate-x-[10rem]"></div>
          <div className="bg-gradient-to-tl from-blue-800 via-blue-900 to-blue-700 blur-3xl w-[90rem] h-[50rem] rounded-fulls origin-top-left -rotate-12 -translate-x-[15rem]"></div>
        </div>

        <div className="relative z-10">
          <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
            <div className="max-w-2xl text-center mx-auto">
              <p className="inline-block text-sm bg-slate-50/50 border border-slate-50/20 px-10 py-2 rounded-full  bg-clip-text bg-gradient-to-l text-slate-50  font-light">
                Votez pour votre université préférée
              </p>

              <div className="mt-5 max-w-2xl">
                <h1 className="block  text-slate-100 font-Jet font-black text-4xl md:text-5xl lg:text-6xl">
                  UnivRate est votre plateforme de notation
                </h1>
              </div>

              <div className="mt-5 max-w-3xl">
                <p className=" text-gray-50/50">
                  UnivRate est votre guichet unique pour les évaluations des
                  campus! Depuis professeurs et classes aux dortoirs et aux
                  réfectoires, laissez votre critiques et découvrez le meilleur
                  (ou le pire) que votre université a à offrir.
                </p>
              </div>

              <div className="mt-8 gap-3 flex justify-center">
                <MyFeedToButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MyFeedToButton = () => {
  const user = useUser();
  return (
    <div>
      {user.isSignedIn ? (
        <div>
          <Link
            href={"/feed"}
            className={buttonVariants({
              variant: "link",
            })}
          >
            <div className="flex items-center gap-2">
              Allez vérifier les universités <ArrowRight size={15} />
            </div>
          </Link>
        </div>
      ) : (
        <div>
          <SignUpButton mode="modal">
            <Button>
              <div className="flex items-center gap-2">
                <div>Commencez maintenant</div>
                <div>
                  <ChevronRight size={15} />
                </div>
              </div>
            </Button>
          </SignUpButton>
        </div>
      )}
    </div>
  );
};

export default Hero;
