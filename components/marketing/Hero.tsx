import React from "react";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";

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
              <p className="inline-block text-sm bg-slate-50/50 border border-slate-50/20 px-10 py-2 rounded-full  bg-clip-text bg-gradient-to-l text-slate-50 font-bold text-transparent">
                Vote for you favourite university
              </p>

              <div className="mt-5 max-w-2xl">
                <h1 className="block  text-slate-100 font-mono font-black text-4xl md:text-5xl lg:text-6xl">
                  UnivRate is your raing platform
                </h1>
              </div>

              <div className="mt-5 max-w-3xl">
                <p className=" text-gray-50/50">
                  Show drafts volume_up UnivRate is your one-stop shop for
                  campus ratings! From professors and classes to dorms and
                  dining halls, leave your reviews and discover the best (or
                  worst) that your university has to offer.
                </p>
              </div>

              <div className="mt-8 gap-3 flex justify-center">
                <Button>
                  <div className="flex items-center gap-2">
                    <div>Start Now</div>
                    <div>
                      <ChevronRight size={15} />
                    </div>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
