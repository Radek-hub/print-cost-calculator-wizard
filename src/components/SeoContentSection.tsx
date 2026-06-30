import { PrinterData, CountryData } from "@/lib/data";

const RATES_LAST_UPDATED = "April 2026";

const faqs = [
  {
    q: "How much does 3D printing cost?",
    a: (
      <>
        The cost of a 3D print is the <strong>electricity cost</strong> plus the{" "}
        <strong>filament cost</strong>. Electricity cost = (printer watts / 1000) × print
        hours × your price per kWh. Filament cost = (spool price / spool grams) × printed
        grams. For most desktop FDM prints the total is a small fraction of the filament
        spool price.
      </>
    ),
  },
  {
    q: "How do I calculate the electricity cost of a 3D print?",
    a: (
      <>
        Convert the printer&apos;s average power to kilowatts (watts / 1000), multiply by
        the print time in hours to get kWh, then multiply by your local electricity rate.
        Example: a 150 W printer running 10 hours uses 1.5 kWh; at 0.30 per kWh that is
        0.45.
      </>
    ),
  },
  {
    q: "How do I calculate filament cost per gram?",
    a: (
      <>
        Divide the price of a full spool by its net weight in grams (usually 1000 g). A 25
        spool that holds 1 kg costs 0.025 per gram. Multiply the cost per gram by the
        printed weight your slicer reports.
      </>
    ),
  },
  {
    q: "How much electricity does a 3D printer use?",
    a: (
      <>
        Most desktop FDM printers draw roughly 0.1 to 0.45 kW on average, depending on the
        model and how much the heated bed and hotend cycle. Average draw matters more than
        the peak sticker wattage because heaters cycle on and off during a print.
      </>
    ),
  },
  {
    q: "Is SliceCal free to use?",
    a: (
      <>
        Yes. SliceCal is a free, browser-based 3D printing cost calculator with no sign-up
        required.
      </>
    ),
  },
  {
    q: "Should I include printer wear and maintenance in the cost?",
    a: (
      <>
        Optionally. Many shops add a flat hourly machine fee or amortize the printer
        purchase over its expected lifetime hours and convert that into a per-hour
        surcharge on top of electricity and filament. Consistency matters more than
        precision.
      </>
    ),
  },
];

export function SeoContentSection() {
  return (
    <section
      className="mt-16 border-t border-gray-200 pt-12 pb-16"
      aria-labelledby="seo-guide-heading"
    >
      <div className="mx-auto max-w-3xl space-y-8 text-slate-700">
        <h2
          id="seo-guide-heading"
          className="text-2xl font-bold tracking-tight text-slate-900"
        >
          How a 3D printing cost calculator breaks down your job price
        </h2>

        <p className="leading-relaxed">
          <strong>In short:</strong> the cost of a 3D print equals the electricity used by
          the printer plus the filament consumed. A dedicated{" "}
          <strong>3d printing cost calculator</strong> turns fuzzy guesses into a
          repeatable estimate. SliceCal focuses on the two largest recurring drivers—energy
          and material—so you can compare printers, materials, and print settings before
          you start the job.
        </p>

        <h3 className="text-xl font-semibold text-slate-900">
          How do you calculate 3D printing costs?
        </h3>

        <p className="leading-relaxed">
          To <strong>calculate 3d printing costs</strong>, add three line items: electricity,
          filament, and (optionally) machine wear. Start with print duration and the
          printer&apos;s average power draw, then add material from the sliced weight, and
          finally decide whether to include depreciation or maintenance as a simple
          surcharge. Each line item has a clear input and a clear formula, so you can
          sanity-check the result when something looks off.
        </p>

        <h3 className="text-xl font-semibold text-slate-900">
          How do you calculate the electricity cost of a 3D print?
        </h3>

        <p className="leading-relaxed">
          <strong>Electricity cost</strong> equals average power in kilowatts, multiplied
          by print time in hours, multiplied by your price per kilowatt-hour. In formula
          form:{" "}
          <span className="font-mono text-sm text-slate-800">
            kWh = (watts / 1000) × hours
          </span>
          , then{" "}
          <span className="font-mono text-sm text-slate-800">
            cost = kWh × (local rate per kWh)
          </span>
          . Real printers cycle the heated bed, hotend, and fans, so the average draw
          matters more than the peak sticker wattage. If your slicer reports a long
          duration, even a small change in rate per kWh can move the total noticeably.
        </p>

        <h3 className="text-xl font-semibold text-slate-900">
          How do you calculate filament cost per gram?
        </h3>

        <p className="leading-relaxed">
          <strong>Filament cost per gram</strong> is the spool price divided by the spool
          net weight (often 1 kg). Material cost then scales linearly with the grams your
          slicer predicts. For example, if a 1 kg spool costs 25 in your currency, each
          gram is 0.025 before waste. Many operators add a few percent for failed prints,
          purge lines, and multi-material waste; you can fold that into the weight you enter
          or bump the per-gram rate slightly so quotes stay conservative.
        </p>

        <h3 className="text-xl font-semibold text-slate-900">
          Do you need to account for wear, tear, and machine time?
        </h3>

        <p className="leading-relaxed">
          It is optional but useful. Nozzles, beds, belts, and fans all wear with hours on
          the machine. Some shops add a flat hourly machine fee on top of power and
          filament; others amortize the printer purchase over an expected lifetime hour
          count and convert that into a cents-per-hour adder. You do not need perfect
          accounting—consistency matters more than precision. Pick a policy, document it,
          and apply the same rules across jobs so your{" "}
          <strong>3d printing cost calculator</strong> outputs stay comparable week to week.
        </p>

        <h3 className="text-xl font-semibold text-slate-900">
          Typical 3D printer power consumption by model
        </h3>

        <p className="leading-relaxed">
          Average power draw is the single biggest input for the energy portion of a print.
          The table below lists the average power consumption (in kilowatts) used by
          SliceCal for popular FDM and resin printers. Values are typical averages across a
          print; peak wattage during bed heating is higher.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <caption className="sr-only">
              Average power consumption of popular 3D printers in kilowatts
            </caption>
            <thead>
              <tr className="border-b border-gray-300 text-left text-slate-900">
                <th scope="col" className="py-2 pr-4 font-semibold">Brand</th>
                <th scope="col" className="py-2 pr-4 font-semibold">Model</th>
                <th scope="col" className="py-2 font-semibold">Avg. power (kW)</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(PrinterData).flatMap(([brand, { models }]) =>
                models.map((model) => (
                  <tr key={`${brand}-${model.name}`} className="border-b border-gray-100">
                    <td className="py-2 pr-4">{brand}</td>
                    <td className="py-2 pr-4">{model.name}</td>
                    <td className="py-2 font-mono">{model.powerConsumption.toFixed(2)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-semibold text-slate-900">
          Average electricity rates by country
        </h3>

        <p className="leading-relaxed">
          Electricity prices drive how much energy adds to a print&apos;s cost. The
          approximate household rates below (in each country&apos;s local currency per kWh)
          are the defaults SliceCal uses; you can always enter a custom rate from your own
          bill. Rates last updated {RATES_LAST_UPDATED} and are approximate.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <caption className="sr-only">
              Approximate residential electricity rates by country, per kWh
            </caption>
            <thead>
              <tr className="border-b border-gray-300 text-left text-slate-900">
                <th scope="col" className="py-2 pr-4 font-semibold">Country</th>
                <th scope="col" className="py-2 pr-4 font-semibold">Rate per kWh</th>
                <th scope="col" className="py-2 font-semibold">Currency</th>
              </tr>
            </thead>
            <tbody>
              {CountryData.map((country) => (
                <tr key={country.code} className="border-b border-gray-100">
                  <td className="py-2 pr-4">
                    <span aria-hidden="true">{country.flag}</span> {country.name}
                  </td>
                  <td className="py-2 pr-4 font-mono">
                    {country.electricityRate.toFixed(3)}
                  </td>
                  <td className="py-2">{country.currency}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Frequently asked questions
        </h2>

        <dl className="space-y-6">
          {faqs.map((faq) => (
            <div key={faq.q} className="space-y-2">
              <dt className="text-lg font-semibold text-slate-900">{faq.q}</dt>
              <dd className="leading-relaxed">{faq.a}</dd>
            </div>
          ))}
        </dl>

        <p className="leading-relaxed text-sm text-slate-600">
          SliceCal is built to make the energy and material steps fast: choose a printer
          profile for typical power draw, pick a country or enter a custom tariff for{" "}
          <strong>electricity cost 3d printing</strong>, enter spool price and print weight
          for <strong>filament cost per gram</strong>, and combine it with your duration to
          see a total. From there you can layer in your own wear-and-tear policy if you
          need a fully loaded shop rate.
        </p>
      </div>
    </section>
  );
}
