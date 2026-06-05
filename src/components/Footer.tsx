export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-[960px] text-center text-sm text-gray-500 space-y-2">
        <p>© 2026 SliceCal. All rights reserved.</p>
        <p>
          Electricity rates are approximate and updated periodically.{" "}
          <a
            href="https://forms.gle/D6G4vWLwT6mRch5D8"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:text-indigo-700 font-semibold underline"
          >
            Send feedback
          </a>
        </p>
      </div>
    </footer>
  );
}
