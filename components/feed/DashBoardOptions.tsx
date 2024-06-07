"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ChevronDown, Crown, Loader, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import supabase from "@/app/supabase/supabaseClient";
import { useEdgeStore } from "@/lib/edgestore";
import { SingleImageDropzone } from "../ui/EdgeStoreUploader";
import toast from "react-hot-toast";

const DashBoardOptions = () => {
  const { user } = useUser();
  const [admins, setAdmins] = useState([{}]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchAdmins = async () => {
      const { data, error } = await supabase.from("admins").select("*");

      if (data) {
        data.map((person) => {
          if (
            person.email == user?.emailAddresses[0].emailAddress ||
            person.username == user?.username
          ) {
            setIsAdmin(true);
          }
        });
      }
    };

    fetchAdmins();
  }, []);

  return (
    <div>
      {isAdmin ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"} size={"sm"}>
              <div className="flex items-center gap-2">
                <div>Admin Options</div>
                <div>
                  <ChevronDown size={15} />
                </div>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <MyDropContentLol />
          </DropdownMenuContent>
        </DropdownMenu>
      ) : null}
    </div>
  );
};

const MyDropContentLol = () => {
  return (
    <div className="flex flex-col ">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"link"} size={"sm"}>
            <div className="flex items-center gap-2">
              <div>Add university</div>
              <div>
                <Plus size={12} />
              </div>
            </div>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <AddUniv />
        </DialogContent>
      </Dialog>
      <div className="w-full h-px bg-slate-50/20 my-1"></div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"link"} size={"sm"}>
            <div className="flex items-center gap-2">
              <div>Add Admin</div>
              <div>
                <Crown size={12} />
              </div>
            </div>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <ChangeOwnerShip />
        </DialogContent>
      </Dialog>
    </div>
  );
};

const ChangeOwnerShip = () => {
  const [admin, setAdmin] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const insertAdmin = async () => {
    if (!admin || !username) {
      setError(true);
      return;
    } else {
      setError(false);
      setLoading(true);
      const { data, error } = await supabase.from("admins").insert({
        email: admin,
        username: username,
      });

      setLoading(false);
      toast.success(`You Have Added ${username} as admin`);
    }
  };

  return (
    <div className="py-5">
      <div className="text-3xl font-black font-Jet text-center">Add Admin</div>
      <div className="mt-4">
        <Label>Write down the next Admin email</Label>
        <Input
          className="mt-1"
          type="email"
          placeholder="example@example.com"
          value={admin}
          onChange={(e) => setAdmin(e.target.value)}
        />
      </div>
      <div className="mt-3">
        <Label>Write down the next Admin username</Label>
        <Input
          className="mt-1"
          type="text"
          placeholder="exampleusername"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="mt-1">
        <div className="text-sm text-red-500 ">
          {error ? "Please fill in all fields" : ""}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <DialogClose asChild>
          <Button variant={"danger"}>Close</Button>
        </DialogClose>
        <Button onClick={insertAdmin} disabled={loading}>
          {loading ? (
            <div>
              <Loader className=" animate-spin" size={13} />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div>Add</div>
              <div>
                <Plus size={13} />
              </div>
            </div>
          )}
        </Button>
      </div>
    </div>
  );
};

const AddUniv = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [file, setFile] = useState<File>();
  const { edgestore } = useEdgeStore();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const insertUniv = async () => {
    if (!name || !location || !file) {
      setError(true);
    } else {
      setLoading(true);

      const res = await edgestore.publicFiles.upload({
        file,
      });

      console.log(res);

      const { data, error } = await supabase.from("universities").insert({
        Name: name,
        Adress: location,
        Pic: res.url,
      });

      setLoading(false);
      toast.success(`You have added a new university ${name}`);
    }
  };

  return (
    <div>
      <div className="text-3xl font-black font-Jet text-center">
        Add University
      </div>
      <div className="mt-3">
        <Label>university name</Label>
        <Input
          className="mt-1"
          type="text"
          placeholder="Badji Mokhtar"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mt-3">
        <Label>university Location</Label>
        <Input
          className="mt-1"
          type="text"
          placeholder="Annaba"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <div className="mt-3">
        <Label>university picture</Label>
        <div>
          <SingleImageDropzone
            className="mt-1"
            //@ts-ignore
            width={"100%"}
            height={200}
            value={file}
            onChange={(file) => {
              setFile(file);
            }}
          />
        </div>
      </div>
      <div>
        <div className="text-sm text-red-500">
          {error ? "Please fill all fields" : ""}
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <DialogClose asChild>
          <Button variant={"danger"}>Cancel</Button>
        </DialogClose>
        <Button
          onClick={() => {
            setError(false);
            insertUniv();
          }}
          disabled={loading}
        >
          {loading ? (
            <div>
              <Loader className=" animate-spin" size={13} />
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2">
                <div>Add</div>
                <div>
                  <Plus size={13} />
                </div>
              </div>
            </div>
          )}
        </Button>
      </div>
    </div>
  );
};

export default DashBoardOptions;
