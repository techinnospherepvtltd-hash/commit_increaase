const SectionHeading = ({
  label,
  title,
  description,
}: {
  label?: string;
  title: string;
  description?: string;
}) => (
  <div className="text-center mb-12 sm:mb-16">
    {label && (
      <span className="inline-block gradient-bg text-primary-foreground text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
        {label}
      </span>
    )}
    <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark leading-tight">
      {title}
    </h2>
    {description && (
      <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
        {description}
      </p>
    )}
  </div>
);

export default SectionHeading;
