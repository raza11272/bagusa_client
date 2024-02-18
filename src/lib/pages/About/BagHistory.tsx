import LoaderSpin from "@/lib/components/LoaderSpin";
import { gql, useQuery } from "@apollo/client";
import SectionHeading from "@/lib/components/Heading/SectionHeading";
import {
  BlocksRenderer,
  type BlocksContent,
} from "@strapi/blocks-react-renderer";

const GET_NOTE = gql`
  query BagHistory {
    bagHistory {
      data {
        attributes {
          title
          content
        }
      }
    }
  }
`;

const BagHistory = () => {
  const { loading, data, error } = useQuery(GET_NOTE);

  if (loading) {
    return <LoaderSpin/>;
  }

  if (error) {
    return (
      <div className="h-[100vh] px-6 justify-center flex items-center flex-wrap ">
        <h1 className="text-xl text-red-500 text-center" >{error.message}</h1>;
      </div>
    );
  }

  if (!data || !data.bagHistory || !data.bagHistory.data) {
    return <h1>No data available</h1>;
  }

  const content: BlocksContent = data.bagHistory.data.attributes.content;

  return (
    <div className="sectionpadding sectiontext">
            <div className="titlemb">
   <SectionHeading title={"BAG History"} subtitle={"History of this association"} />
                 </div>
      <div className="w-full">
        <BlocksRenderer content={content} />
      </div>
    </div>
  );
};

export default BagHistory;
