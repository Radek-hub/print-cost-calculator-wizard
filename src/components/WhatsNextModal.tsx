import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Rocket, Folder, Database } from "lucide-react";

export function WhatsNextModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors underline-offset-4 hover:underline">
          The workshop is evolving: see what’s next
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-2 text-indigo-900">
            The workshop is evolving
          </DialogTitle>
        </DialogHeader>
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
        <DialogFooter className="sm:justify-center pt-2">
          <DialogClose asChild>
            <Button className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-6 px-8 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all">
              Got it, can't wait!
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
