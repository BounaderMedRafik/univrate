"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@clerk/nextjs";

import { ArrowRight, ChevronDown, Loader, Star, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import supabase from "../supabase/supabaseClient";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

const page = () => {
  const [universities, setUniversities] = useState([{}]);
  const [loading, setLoading] = useState(true); // add loading state

  useEffect(() => {
    const fetchUnivs = async () => {
      setLoading(true); // set loading to true when fetching
      const { data, error } = await supabase.from("universities").select("*");

      if (data) {
        setUniversities(data);
      } else {
        console.log("haha mknch");
      }
      if (error) {
        console.log(error);
      }
      setLoading(false); // set loading to false when done
    };

    fetchUnivs();
  }, []);

  return (
    <div className="wrapper">
      <div className="py-5 flex items-center  justify-between">
        <div className="flex items-center gap-3 text-xl font-semibold">
          <div>
            <ArrowRight size={15} />
          </div>
          Universities
        </div>
        <div>
          <Button size={"sm"} variant={"ghost"}>
            <div className="flex items-center gap-2">
              sort by{" "}
              <div>
                <ChevronDown size={12} />
              </div>
            </div>
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-[50vh]">
          <Loader size={30} className=" animate-spin opacity-75" />
        </div>
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-5">
          {universities.map((item, i) => (
            <div key={i}>
              <UnivItem
                //@ts-ignore
                rating={item.Rating}
                //@ts-ignore
                name={item.Name}
                //@ts-ignore
                adress={`${item.Name} - ${item.Adress}`}
                //@ts-ignore
                pic={item.Pic}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const UnivItem = ({
  rating,
  name,
  adress,
  pic,
}: {
  rating: number;
  name: string;
  adress: string;
  pic: string;
}) => {
  return (
    <div className=" w-full h-96 relative overflow-hidden border-slate-50/20 border rounded-lg">
      <div className="h-full w-full overflow-hidden ">
        <img className=" w-full h-full object-cover object-center" src={pic} />
      </div>
      <div className=" bg-gradient-to-t w-full h-full from-neutral-900 to-transparent absolute top-0 left-0 "></div>
      <div className="absolute top-0 left-0 z-20 w-full h-full ">
        <div className="p-4 flex flex-col items- h-full justify-between">
          <div className="px-4 py-1 bg-neutral-800 w-fit flex items-center gap-4 rounded-lg text-xl font-black">
            <div>
              <Star className=" fill-blue-500" size={21} />
            </div>
            <div>{rating}/10</div>
          </div>
          <div>
            <div>
              <div className=" text-3xl font-black">{name}</div>
              <div className="text-sm font-semibold opacity-75">{adress}</div>
            </div>
            <div className="flex items-center justify-end">
              <Dialog>
                <DialogTrigger>
                  <Button variant={"link"}>vérifier l'évaluation ↗</Button>
                </DialogTrigger>
                <DialogContent>
                  <CheckEval
                    rating={rating}
                    name={name}
                    adress={adress}
                    pic={pic}
                  />
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size={"sm"}>Evaluation</Button>
                </DialogTrigger>
                <DialogContent>
                  <UnivDialog
                    rating={rating}
                    name={name}
                    adress={adress}
                    pic={pic}
                  />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const UnivDialog = ({
  rating,
  name,
  adress,
  pic,
}: {
  rating: number;
  name: string;
  adress: string;
  pic: string;
}) => {
  const { user } = useUser();
  const [success, setSuccess] = useState(false);
  const [rate, setRate] = useState(0);
  const [comment, setComment] = useState("");
  const [userName, setUserName] = useState(user?.fullName);
  const [loading, setLoading] = useState(false);

  const insertEval = async () => {
    setLoading(true);
    console.log(userName, rate, comment, name);
    const { data, error } = await supabase.from("evaluations").insert({
      Name: userName,
      Rating: rate,
      Comment: comment,
      university: name,
    });
    setLoading(false);
    setSuccess(true);
  };

  return (
    <div>
      {success ? (
        <div>
          <SuccessPage />
        </div>
      ) : (
        <div>
          <div className="py-5">
            <div className="w-full h-64 overflow-hidden rounded-lg ">
              <img className=" h-full w-full object-cover" src={pic} />
            </div>
            <div className="text-4xl font-Jet font-black mt-4">{name}</div>
            <div className="font-normal opacity-75 mt-2 ">{adress}</div>
            <div className="mt-4 flex items-center gap-2">
              <div className="px-4 py-1 bg-neutral-800  bg-slate-50/5 border-slate-50/20 border w-fit flex items-center gap-4 rounded-lg text-xl font-black">
                <div>
                  <Star className=" fill-blue-500" size={21} />
                </div>
                <div>{rating}/10</div>
              </div>
              <div>
                <Button variant={"link"}>1523 evaluation ↗</Button>
              </div>
            </div>
            <div className="mt-4 flex flex-col">
              <Label>Évaluez l'université</Label>
              <Input
                className="mt-1"
                min={0}
                max={10}
                value={rate}
                //@ts-ignore
                onChange={(e) => setRate(e.target.value)}
                type="number"
                placeholder="0"
              />
            </div>
            <div className="mt-4">
              <Label>laissez un commentaire</Label>
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="mt-2"
              />
            </div>
            <div className="mt-5">
              <Button
                disabled={loading}
                onClick={() => {
                  insertEval();
                }}
                className="w-full"
                size={"lg"}
              >
                <div>
                  {loading ? (
                    <div>
                      <Loader className=" animate-spin" size={13} />
                    </div>
                  ) : (
                    "Soumettre une évaluation"
                  )}
                </div>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const SuccessPage = () => {
  const user = useUser();
  return (
    <div>
      <div className=" max-w-lg mx-auto flex items-center justify-center">
        <img src="/Appreciation.svg" />
      </div>
      <div className="font-jet text-5xl text-center mt-4">
        Merci!{" "}
        <span className="font-black font-Jet text-blue-500 ">
          {user.user?.firstName}
        </span>
      </div>
      <div className="text-center text-sm mt-2 opacity-75 font-light max-w-md">
        Merci pour votre avis!,Votre avis sera examiné par un modérateur avant
        d'être publié.Votre avis aidera les autres étudiants à faire des choix
        éclairés.
      </div>
      <div className="mt-4 flex justify-center items-center">
        <Button size={"lg"}>Vérifiez votre evaluation</Button>
      </div>
    </div>
  );
};

const CheckEval = ({
  rating,
  name,
  adress,
  pic,
}: {
  rating: number;
  name: string;
  adress: string;
  pic: string;
}) => {
  return (
    <div>
      <div className="text-xl mt-5 text-center font-black font-Jet">
        Check Evaluations of{" "}
        <span className="italic text-blue-500">{name}</span>
      </div>
      <div className="mt-5">
        <ScrollArea className="h-[500px] w-full border border-slate-50/20 p-5 rounded-lg">
          <RateTemplate name={"rafik"} comment={"i love you mom!"} rating={5} />
        </ScrollArea>
      </div>
      <div className="mt-2">
        <DialogClose asChild>
          <Button variant={"ghost"}>Close</Button>
        </DialogClose>
      </div>
    </div>
  );
};

const RateTemplate = ({
  name,
  comment,
  rating,
}: {
  name: string;
  comment: string;
  rating: number;
}) => {
  return (
    <div className="p-2 border-b border-b-slate-50/20">
      <div className="flex items-center justify-between">
        <div className="text-xl font-Jet font-bold flex items-center gap-2">
          <div>
            <User size={20} />
          </div>
          <div>{name}</div>
        </div>
        <div
          className={buttonVariants({
            variant: "ghost",
            size: "sm",
          })}
        >
          {rating}/10
        </div>
      </div>
      <div className="text-sm font-light opacity-75 p-5 py-2">{comment}</div>
    </div>
  );
};

export default page;
