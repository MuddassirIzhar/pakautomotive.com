"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { DynamicIcon } from "./Navigation";

type AlertDialogProps = {
  triggerText?: string;
  icon?: { library: string; iconName: string ; color: string };
  title: string;
  description: string;
  cancelText?: string;
  actionText: string;
  onAction: () => void;
};

export function DynamicAlertDialog({
  triggerText,
  icon,
  title,
  description,
  cancelText = "Cancel",
  actionText,
  onAction,
}: AlertDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleAction = () => {
    onAction(); // Execute the action
    setIsOpen(false); // Close the dialog
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" className="p-2">
            {icon && (
              <DynamicIcon
                library={icon.library}
                iconName={icon.iconName}
                size={18}
                color={icon.color}
              />
            )}
          {triggerText}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelText}</AlertDialogCancel>
          <AlertDialogAction onClick={handleAction}>
            {actionText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}