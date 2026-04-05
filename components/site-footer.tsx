export function SiteFooter({
  className = "w-full bg-gray-100 mt-auto",
}: {
  className?: string;
}) {
  return (
    <footer className={`${className} bg-white border-t border-slate-200`}>
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-col gap-3 text-sm text-slate-700">
            <a href="#" className="hover:underline">
              Contact Us
            </a>
            <a href="#" className="hover:underline">
              Feedback
            </a>
            <a href="#" className="hover:underline">
              Protect Yourself From Website Fraud
            </a>
          </div>

          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-end">
            <img
              src="/alight_worklife__logo_black_2x.png"
              alt="alight worklife"
              className="h-10 w-auto"
            />
            <div className="flex flex-wrap gap-3">
              <a href="#" className="block">
                <img
                  src="/app-store-badge.png"
                  alt="Download on the App Store"
                  className="h-10"
                />
              </a>
              <a href="#" className="block">
                <img
                  src="/google-play-badge.png"
                  alt="Get it on Google Play"
                  className="h-10"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-6">
          <div className="flex flex-col gap-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-4">
              <a href="#" className="hover:underline">
                Privacy Policy
              </a>
              <a href="#" className="hover:underline">
                Terms Of Use
              </a>
              <a href="#" className="hover:underline">
                Cookie Notice
              </a>
              <a href="#" className="hover:underline">
                Cookie Settings [Do Not Sell or Share My Personal Information]
              </a>
            </div>
            <p>©2026 Alight Solutions. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
