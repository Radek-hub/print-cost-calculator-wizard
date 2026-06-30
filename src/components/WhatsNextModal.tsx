import { useState, type SyntheticEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Rocket, Folder, Database } from "lucide-react";

function WhatsNextTrigger({ onOpen }: { onOpen: () => void }) {
  const handleActivate = (event: SyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();
    onOpen();
  };

  return (
    <button
      type="button"
      onClick={handleActivate}
      onTouchEnd={handleActivate}
      className="relative z-10 w-full touch-manipulation cursor-pointer text-left text-xs sm:text-sm font-medium text-indigo-600 hover:text-indigo-800 active:text-indigo-900 transition-colors underline-offset-4 hover:underline leading-snug py-1"
    >
      <span className="block sm:inline">The workshop is evolving:</span>
      <span className="block sm:inline">
        <span className="hidden sm:inline"> </span>
        see what’s next
      </span>
    </button>
  );
}

const WHATS_NEXT_DESCRIPTION =
  "Preview of upcoming features including G-code import, project management, and filament inventory.";

function WhatsNextItems() {
  return (
    <div className="grid gap-8 py-6">
      <div className="flex gap-5">
        <div className="mt-1 bg-indigo-50 p-3 rounded-xl h-fit shrink-0">
          <Rocket className="w-6 h-6 text-indigo-600" />
        </div>
        <div className="space-y-2">
          <h3 className="font-bold text-lg text-gray-900">Magic import (G-code & STL parser)</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Stop typing, start slicing. Drag and drop your files directly from your favorite slicer (Cura, PrusaSlicer, etc.), and we’ll automatically extract the print time, weight, and filament usage. It’s the fastest way to get an accurate quote.
          </p>
        </div>
      </div>

      <div className="flex gap-5">
        <div className="mt-1 bg-indigo-50 p-3 rounded-xl h-fit shrink-0">
          <Folder className="w-6 h-6 text-indigo-600" />
        </div>
        <div className="space-y-2">
          <h3 className="font-bold text-lg text-gray-900">Your command center (accounts & projects)</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Leave the spreadsheets behind. Create an account to organize your prints into projects, generate dedicated quotes for your clients, and access your calculation history from any device, anywhere.
          </p>
        </div>
      </div>

      <div className="flex gap-5">
        <div className="mt-1 bg-indigo-50 p-3 rounded-xl h-fit shrink-0">
          <Database className="w-6 h-6 text-indigo-600" />
        </div>
        <div className="space-y-2">
          <h3 className="font-bold text-lg text-gray-900">Smart filament inventory</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Add your spools to the app, and the system will automatically deduct the used material after every saved print. We’ll notify you when your filament is running low—never run out of plastic in the middle of the night again!
          </p>
        </div>
      </div>
    </div>
  );
}

function WhatsNextCloseButton({
  CloseComponent,
}: {
  CloseComponent: typeof DialogClose | typeof SheetClose;
}) {
  return (
    <CloseComponent asChild>
      <Button
        size="lg"
        className="w-full sm:w-auto text-white font-semibold text-lg shadow-lg transition-all duration-200 hover:shadow-xl bg-indigo-800 hover:bg-indigo-700"
      >
        Got it, can't wait!
      </Button>
    </CloseComponent>
  );
}

function WhatsNextSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="z-[60] flex max-h-[min(90dvh,90vh)] flex-col overflow-hidden rounded-t-[10px] p-0 pb-[max(1.5rem,env(safe-area-inset-bottom))] [&>button]:right-4 [&>button]:top-4 [&>button]:z-20"
      >
        <div className="mx-auto mt-2 h-2 w-[100px] shrink-0 rounded-full bg-muted" />
        <SheetHeader className="shrink-0 px-6 pb-0 text-center">
          <SheetTitle className="text-2xl font-bold text-indigo-900">
            The workshop is evolving
          </SheetTitle>
          <SheetDescription className="sr-only">{WHATS_NEXT_DESCRIPTION}</SheetDescription>
        </SheetHeader>
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 [-webkit-overflow-scrolling:touch]">
          <WhatsNextItems />
        </div>
        <SheetFooter className="shrink-0 px-6 pt-2">
          <WhatsNextCloseButton CloseComponent={SheetClose} />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

function WhatsNextDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-2 text-indigo-900">
            The workshop is evolving
          </DialogTitle>
          <DialogDescription className="sr-only">{WHATS_NEXT_DESCRIPTION}</DialogDescription>
        </DialogHeader>
        <WhatsNextItems />
        <DialogFooter className="sm:justify-center pt-2">
          <WhatsNextCloseButton CloseComponent={DialogClose} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function WhatsNextModal() {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <>
      <WhatsNextTrigger onOpen={() => setOpen(true)} />
      {isMobile ? (
        <WhatsNextSheet open={open} onOpenChange={setOpen} />
      ) : (
        <WhatsNextDialog open={open} onOpenChange={setOpen} />
      )}
    </>
  );
}
