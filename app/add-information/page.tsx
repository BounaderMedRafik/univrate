"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@clerk/nextjs";
import React, { useState } from "react";
import supabase from "../supabase/supabaseClient";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";

export default function page() {
  const { user } = useUser();
  const [name, setName] = useState(user?.fullName);
  const [email, setEmail] = useState(user?.emailAddresses[0].emailAddress);
  const [univ, setUniv] = useState("");
  const [Citation, setCitation] = useState("");
  const [grade, setGrade] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const insertInfo = async () => {
    if (!name || !email || !univ || !Citation || !grade) {
      setError(true);
      setLoading(false);
      return;
    }
    const { data, error } = await supabase.from("informations").insert({
      Name: name,
      Email: email,
      University: univ,
      Citation: Citation,
      Grade: grade,
    });

    if (error) {
      console.log(error);
      toast.error("There is an error");
    } else {
      toast.success("You Have added information successfully");
      setLoading(false);
    }
  };

  return (
    <div className=" min-h-[80vh]  flex  items-center justify-between">
      <div className="flex items-center md:flex-row justify-between mx-auto flex-col">
        <div className="w-full p-5 md:w-1/2">
          <div className="text-4xl font-Jet font-black">
            Ajouter une information
          </div>
          <div className="mt-7">
            <div>
              <Label>nom et prénom</Label>
              <Input
                //@ts-ignore
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2"
                type="text"
                //@ts-ignore
                placeholder={name}
              />
            </div>
            <div className="mt-4">
              <Label>E-mail</Label>
              <Input
                className="mt-2"
                placeholder={email}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
              />
            </div>
            <div className="mt-4">
              <Label>Universite</Label>
              <Input
                value={univ}
                onChange={(e) => setUniv(e.target.value)}
                className="mt-2"
                type="text"
                placeholder="Chadli Ben Djedid"
              />
            </div>
            <div className="mt-4">
              <Label>Citation</Label>
              <Input
                value={Citation}
                onChange={(e) => setCitation(e.target.value)}
                className="mt-2"
                type="text"
                placeholder="Bibliography / Works"
              />
            </div>
            <div className="mt-4">
              <Label>Grade</Label>
              <Input
                className="mt-2"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                type="text"
                placeholder="Master 2"
              />
            </div>
            <div className="text-red-500 font-light mt-2">
              {error ? "please fill out the form correctly" : ""}
            </div>
            <div className="mt-5">
              <Button
                disabled={loading}
                onClick={() => {
                  setError(false);
                  setLoading(true);
                  insertInfo();
                }}
                size={"lg"}
              >
                {loading ? (
                  <div>
                    <Loader className=" animate-spin" size={15} />
                  </div>
                ) : (
                  <div>Ajouter information</div>
                )}
              </Button>
            </div>
          </div>
        </div>
        <div className="">
          <img src="/persondesk.svg" alt="" />
        </div>
      </div>
    </div>
  );
}
