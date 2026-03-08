export default function Home() {
  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto] items-center justify-items-center p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="py-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Dobeu Tech Solutions
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Automated Customer Sourcing &amp; Prospecting Platform
        </p>
      </header>

      <main className="flex flex-col items-center gap-8 max-w-2xl">
        <section className="text-center">
          <h2 className="text-2xl font-semibold mb-4">
            IT Consulting Sales Funnel
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Streamline your customer acquisition pipeline with automated invoicing
            and deliverables management. From prospecting to closing, manage every
            stage of your sales funnel in one platform.
          </p>
        </section>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
          <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6 text-center hover:shadow-lg transition-shadow">
            <h3 className="font-semibold text-lg mb-2">Source</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Automated lead generation and customer sourcing
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6 text-center hover:shadow-lg transition-shadow">
            <h3 className="font-semibold text-lg mb-2">Prospect</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Intelligent prospecting with automated outreach
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6 text-center hover:shadow-lg transition-shadow">
            <h3 className="font-semibold text-lg mb-2">Convert</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Invoicing and deliverables to close deals
            </p>
          </div>
        </div>
      </main>

      <footer className="py-8 text-center text-sm text-gray-500">
        <p>&copy; 2026 Dobeu Tech Solutions. All rights reserved.</p>
      </footer>
    </div>
  );
}
