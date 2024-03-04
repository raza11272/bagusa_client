import { Mail } from "lucide-react";

const CheckMail = () => {
  return (
    <div
      className="flex flex-col m-auto max-w-lg justify-center items-center
    gap-6 sectionpadding text-primary "
    >
      <Mail className="" size={48} />
      <h1 className="inline-flex gap-3 capitalize ">
        
{/*         <Send size={16} /> */}

            <p className="text-center">

          Thank you for your registration <br />
          Wait for an admin approval.
        </p>
      </h1>
    </div>
  );
};

export default CheckMail;
