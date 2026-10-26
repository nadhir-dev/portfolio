"use client";

import { MessageCircle } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "cn";

export type SupportAvatar = {
  src: string;
  alt: string;
  fallback: string;
  className?: string;
};

export function SupportContactCard({
  supportAvatars,
}: {
  supportAvatars: ReadonlyArray<SupportAvatar>;
}) {
  return (
    <Card className="flex w-full max-w-2xl flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
        <AvatarGroup>
          {supportAvatars.map((avatar) => (
            <Avatar
              key={avatar.alt}
              className={cn("size-10", avatar.className)}
            >
              <AvatarImage src={avatar.src} alt={avatar.alt} />
              <AvatarFallback>{avatar.fallback}</AvatarFallback>
            </Avatar>
          ))}
        </AvatarGroup>
        <div className="text-left">
          <p className="text-sm font-medium">Still have a question?</p>
          <p className="text-sm text-muted-foreground">
            Send me a message and I&apos;ll get back to you.
          </p>
        </div>
      </div>
      <Button
        type="button"
        variant="outline"
        className="w-full gap-2 sm:w-auto"
        onClick={() => {
          window.dispatchEvent(
            new CustomEvent("ask-question", {
              detail: { message: "Hi Nadhir, I have a question about " },
            }),
          );

          document
            .getElementById("contact-form")
            ?.scrollIntoView({ behavior: "smooth", block: "center" });
        }}
      >
        <MessageCircle className="size-4" />
        Ask a question
      </Button>
    </Card>
  );
}
