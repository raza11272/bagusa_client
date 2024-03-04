// import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

//@ts-ignore
export const SinglePost = ({ title,  id, image }) => {
  return (
    <Link to={`/communitydashboard/${id}`} className="cursor-pointer ">
      <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
        <img
          className="h-[30vh] w-full object-cover object-center"
          src={image && image}
          alt="blog"
        />
        <div className="p-6 flex flex-col h-full">
          <div className="flex flex-col gap-4">
            <h1 className="title-font text-2xl capitalize font-medium text-secondary-foreground mb-3">
              {title}
            </h1>


          </div>


        </div>
      </div>
    </Link>
  );
};
