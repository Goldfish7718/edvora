"use client";

import type React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "usehooks-ts";
import { useState } from "react";

interface UnenrollDialogTriggerProps {
  children: React.ReactNode;
  onConfirm: () => void;
}

export default function UnenrollDialogTrigger({
  children,
  onConfirm,
}: UnenrollDialogTriggerProps) {
  const matches = useMediaQuery("(min-width: 768px)");
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    await onConfirm();
    setIsLoading(false);
    setOpen(false);
  };

  const content = (
    <div className="space-y-4">
      <p className="text-foreground">
        Are you sure you want to unenroll from this course? You will lose access
        to all course materials.
      </p>
      <div className="flex gap-3 justify-end">
        <Button
          variant="outline"
          onClick={() => setOpen(false)}
          disabled={isLoading}>
          Cancel
        </Button>
        <Button
          variant="destructive"
          onClick={handleConfirm}
          disabled={isLoading}>
          {isLoading ? "Unenrolling..." : "Yes, Unenroll"}
        </Button>
      </div>
    </div>
  );

  if (matches) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Unenroll from Course?</DialogTitle>
          </DialogHeader>
          {content}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Unenroll from Course?</DrawerTitle>
        </DrawerHeader>
        <div className="p-4">{content}</div>
      </DrawerContent>
    </Drawer>
  );
}
