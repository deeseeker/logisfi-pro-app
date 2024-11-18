import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { SquarePenIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import VectorSvg from "@/public/vector.svg";
import ProfileForm from "../forms/edit-profile";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { ProfileShimmer } from "../skeleton/profile";

function AdminProfile() {
  const { profile } = useAuth();
  console.log("Profile in context:", profile);

  return (
    <>
      {profile ? (
        <div className="space-y-4">
          <Card className="relative flex items-center bg-gradient-to-r from-[#205BBB] to-[#06337C]">
            <Image
              alt="vector"
              src="/vector.svg"
              width={227}
              height={259}
              className="absolute mix-blend-screen -top-10 left-[859px]"
            />
            <Image
              alt="radius-vector"
              src="/radius-vector.svg"
              width={190}
              height={190}
              className="absolute right-32 opacity-75 mix-blend-overlay rotate-45 top-[67px]"
            />
            <CardHeader>
              <Image
                src="/block.svg"
                className="absolute mix-blend-overlay opacity-30 left-0 bottom-0"
                width={134}
                height={134}
                alt="block"
              />
              <div className="border rounded-full p-1 border-[#A2DAFE]">
                <Avatar className="h-20 w-20 bg-[#DBEAFF] p-3">
                  <AvatarImage
                    src="/profile.png"
                    className="invert"
                    alt="profile picture"
                  />
                  <AvatarFallback></AvatarFallback>
                </Avatar>
              </div>
            </CardHeader>
            <div>
              <CardTitle className="text-white font-normal">
                {profile?.firstName} {profile?.lastName}
              </CardTitle>
            </div>
          </Card>{" "}
          <Card>
            <CardHeader>
              <CardTitle>Profile Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-y-12 justify-between">
                <div>
                  <h3>First Name</h3>
                  <CardDescription>{profile?.firstName}</CardDescription>
                </div>
                <div>
                  <h3>Last Name</h3>
                  <CardDescription>{profile?.lastName}</CardDescription>
                </div>
                <div>
                  <h3>Email Address</h3>
                  <CardDescription>{profile?.email}</CardDescription>
                </div>
                <div>
                  <h3>Phone Number</h3>
                  <CardDescription>{profile?.phoneNumber}</CardDescription>
                </div>
                <div>
                  <h3>Position</h3>
                  <CardDescription>{profile?.position}</CardDescription>
                </div>
                <div>
                  <h3>Gender</h3>
                  <CardDescription>{profile?.gender}</CardDescription>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex justify-end">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-customblue">
                    <SquarePenIcon className="mr-2 h-4 w-4" /> Edit
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                      Make changes to your profile here. Click save when .
                    </DialogDescription>
                  </DialogHeader>
                  <ProfileForm />
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        </div>
      ) : (
        <ProfileShimmer />
      )}
    </>
  );
}

export default AdminProfile;
