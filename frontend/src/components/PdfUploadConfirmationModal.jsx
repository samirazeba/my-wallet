import React from "react";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";

export default function PdfUploadConfirmationModal({ open, filename, onAdd, onDiscard, loading }) {
  return (
    <Dialog open={open} onClose={onDiscard} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />
      <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <DialogPanel className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md">
            <div className="bg-white px-6 pt-6 pb-4">
              <DialogTitle as="h3" className="text-lg font-semibold text-[#3b4a6b] mb-2">
                PDF Uploaded
              </DialogTitle>
              <div className="mb-4">
                <span className="font-semibold">{filename}</span> uploaded.<br />
                Do you want to add transactions from this file?
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onDiscard}
                  className="rounded-md bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-300"
                  disabled={loading}
                >
                  Discard
                </button>
                <button
                  type="button"
                  onClick={onAdd}
                  className="rounded-md bg-[#b3c7e6] px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-[#9bb6db]"
                  disabled={loading}
                >
                  {loading ? "Adding..." : "Add transactions"}
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}