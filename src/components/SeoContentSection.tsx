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
          Whether you are quoting a client or budgeting a personal project, a dedicated{" "}
          <strong>3d printing cost calculator</strong> turns fuzzy guesses into a repeatable
          estimate. SliceCal focuses on the largest recurring drivers—energy and
          material—so you can compare printers, materials, and print settings before you
          start the job.
        </p>

        <h3 className="text-xl font-semibold text-slate-900">
          How to calculate 3d printing costs from first principles
        </h3>

        <p className="leading-relaxed">
          If you want to understand the math behind the app, think in layers. Start with
          print duration and the printer&apos;s average power draw, then add material from
          the sliced weight, and finally decide whether you want to include depreciation
          or maintenance as a simple surcharge. That workflow is exactly{" "}
          <strong>how to calculate 3d printing costs</strong> in a transparent way: each
          line item has a clear input and a clear formula, so you can sanity-check results
          when something looks off.
        </p>

        <h3 className="text-xl font-semibold text-slate-900">
          Electricity cost 3d printing (power × time × rate)
        </h3>

        <p className="leading-relaxed">
          The electricity portion is usually expressed as:{" "}
          <strong>electricity cost 3d printing</strong> equals average power in kilowatts,
          multiplied by print time in hours, multiplied by your price per kilowatt-hour.
          In formula form, that is{" "}
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
          Filament cost per gram from spool price
        </h3>

        <p className="leading-relaxed">
          Material cost scales linearly with the grams your slicer predicts. The usual rule
          is: divide the price of a full spool by the net weight on the label (often 1 kg)
          to get <strong>filament cost per gram</strong>, then multiply by the estimated
          print weight. For example, if a 1 kg spool costs 25 in your currency, each gram is
          0.025 before waste. Many operators add a few percent for failed prints, purge
          lines, and multi-material waste; you can fold that into the weight you enter or
          bump the per-gram rate slightly so quotes stay conservative.
        </p>

        <h3 className="text-xl font-semibold text-slate-900">
          Wear, tear, and machine time (optional but useful)
        </h3>

        <p className="leading-relaxed">
          Nozzles, beds, belts, and fans all wear with hours on the machine. Some shops add
          a flat hourly machine fee on top of power and filament; others amortize the
          printer purchase over an expected lifetime hour count and convert that into a
          cents-per-hour adder. You do not need perfect accounting—consistency matters
          more than precision. Pick a policy, document it, and apply the same rules across
          jobs so your <strong>3d printing cost calculator</strong> outputs stay comparable
          week to week.
        </p>

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
