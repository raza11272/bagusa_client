
type HeadingProps = {
  title?: String;
  subtitle?: String;
};
const SectionHeading = ({ title, subtitle }: HeadingProps) => {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="heading border-primary  border-l-4 pl-2 ">{title}</h3>
      <h1 className="title text-secondary-foreground">{subtitle}</h1>
    </div>
  );
};

export default SectionHeading;
