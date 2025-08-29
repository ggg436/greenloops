"use client";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { TriangleAlert, X } from "lucide-react";

function AlertNotification({ children }: { children?: React.ReactNode }) {
  return (
    <Alert
      layout="row"
      isNotification
      icon={<TriangleAlert className="text-amber-500" size={16} strokeWidth={2} />}
      action={
        <Button
          variant="ghost"
          className="group -my-1.5 -me-2 size-8 p-0 hover:bg-transparent"
          aria-label="Close notification"
        >
          <X size={16} strokeWidth={2} className="opacity-60 transition-opacity group-hover:opacity-100" />
        </Button>
      }
    >
      <p className="text-sm">{children ?? 'Some information is missing!'}</p>
    </Alert>
  );
}

export { AlertNotification } 