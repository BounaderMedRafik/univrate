import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

export default function page() {
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
                className="mt-2"
                type="text"
                placeholder="example jhon sins"
              />
            </div>
            <div className="mt-4">
              <Label>E-mail</Label>
              <Input className="mt-2" type="text" placeholder="xyz@mail.com" />
            </div>
            <div className="mt-4">
              <Label>Universite</Label>
              <Input
                className="mt-2"
                type="text"
                placeholder="Chadli Ben Djedid"
              />
            </div>
            <div className="mt-4">
              <Label>Citation</Label>
              <Input
                className="mt-2"
                type="text"
                placeholder="Bibliography / Works"
              />
            </div>
            <div className="mt-4">
              <Label>Grade</Label>
              <Input className="mt-2" type="text" placeholder="Master 2" />
            </div>
            <div className="mt-5">
              <Button size={"lg"}>Ajouter information</Button>
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
