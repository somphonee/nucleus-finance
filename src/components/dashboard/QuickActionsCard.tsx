import { useState } from "react";
import { Plus, Download, Upload, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddTransactionDialog } from "@/components/dialogs/AddTransactionDialog";
import { AddMemberDialog } from "@/components/dialogs/AddMemberDialog";

export function QuickActionsCard() {
  const [isTransactionDialogOpen, setIsTransactionDialogOpen] = useState(false);
  const [isMemberDialogOpen, setIsMemberDialogOpen] = useState(false);

  const actions = [
    {
      label: "Add Transaction",
      icon: <Plus className="w-4 h-4" />,
      action: () => setIsTransactionDialogOpen(true),
      variant: "default" as const,
    },
    {
      label: "New Member",
      icon: <Plus className="w-4 h-4" />,
      action: () => setIsMemberDialogOpen(true),
      variant: "outline" as const,
    },
    {
      label: "Export Data",
      icon: <Download className="w-4 h-4" />,
      action: () => console.log("Export data"),
      variant: "outline" as const,
    },
    {
      label: "Import Excel",
      icon: <Upload className="w-4 h-4" />,
      action: () => console.log("Import Excel"),
      variant: "outline" as const,
    },
    {
      label: "Generate Report",
      icon: <FileText className="w-4 h-4" />,
      action: () => console.log("Generate report"),
      variant: "outline" as const,
    },
  ];

  return (
    <>
      <div className="financial-card">
        <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant}
              onClick={action.action}
              className="justify-start space-x-2 h-auto py-3 hover:scale-105 transition-transform"
            >
              {action.icon}
              <span>{action.label}</span>
            </Button>
          ))}
        </div>
      </div>

      <AddTransactionDialog 
        open={isTransactionDialogOpen} 
        onOpenChange={setIsTransactionDialogOpen} 
      />
      <AddMemberDialog 
        open={isMemberDialogOpen} 
        onOpenChange={setIsMemberDialogOpen} 
      />
    </>
  );
}