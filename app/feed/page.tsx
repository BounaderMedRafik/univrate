"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
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

import { ArrowRight, ChevronDown, Star } from "lucide-react";
import React, { useState } from "react";

const page = () => {
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

      <div className=" grid sm:grid-cols-1 md:grid-cols-2 gap-5">
        <UnivItem
          rating={7}
          name={"Chadli ben djedid"}
          adress={"Chadli ben djedid - El taref 36"}
          pic={
            "https://elmaghrebelawsat.dz/wp-content/uploads/2021/12/56393145_2262382347146083_3903177905357717504_n.jpg"
          }
        />
        <UnivItem
          rating={9}
          name={"USTHB"}
          adress={"USTHB - Algeir"}
          pic={
            "https://fgc.usthb.dz/wp-content/uploads/2023/11/DEPIXLISED-INSTITUT-WITHOUT-TRASH-1024x473.jpg"
          }
        />
        {/* this one should be repetean from database  */}
      </div>
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
              <Button variant={"link"}>vérifier l'évaluation ↗</Button>
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
  const [success, setSuccess] = useState(false);

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
            <div className="mt-4">
              <Label>Évaluez l'université</Label>
              <Select>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="1/10" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1/10</SelectItem>
                  <SelectItem value="2">2/10</SelectItem>
                  <SelectItem value="3">3/10</SelectItem>
                  <SelectItem value="4">4/10</SelectItem>
                  <SelectItem value="5">5/10</SelectItem>
                  <SelectItem value="6">6/10</SelectItem>
                  <SelectItem value="7">7/10</SelectItem>
                  <SelectItem value="8">8/10</SelectItem>
                  <SelectItem value="9">9/10</SelectItem>
                  <SelectItem value="10">10/10</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="mt-4">
              <Label>laissez un commentaire</Label>
              <Textarea className="mt-2" />
            </div>
            <div className="mt-5">
              <Button
                onClick={() => setSuccess(true)}
                className="w-full"
                size={"lg"}
              >
                Soumettre une évaluation
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

export default page;
