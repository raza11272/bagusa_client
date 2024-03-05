// Import Swiper React components

// Import Swiper styles

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
// import TeamMember from "../About/TeamMember";
// import DoWantMember from "../Membarship/DoWantMember";
import Testimonials from "./Testimonials";
// import React from 'react'
import ReactPlayer from 'react-player/youtube'
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay,Pagination,FreeMode } from "swiper/modules";
import { useQuery, gql } from "@apollo/client";
import LoaderSpin from "@/lib/components/LoaderSpin";
import SectionHeading from "@/lib/components/Heading/SectionHeading";
 import SingleTeamCard from "@/lib/components/SingleTeamCard";

const Home = () => {
  const GET_HOME_ALL = gql`
    query {
      heroSections {
        data {
          attributes {
            heading
            paragraph
            bgimage {
              data {
                attributes {
                  url
                }
              }
            }
          }
        }
      }
    }
  `;

  const GET_ABOUT_DATA = gql`
    query Aboutus {
      aboutus {
        data {
          id
          attributes {
            title
            description
            image {
              data {
                attributes {
                  url
                }
              }
            }
          }
        }
      }
    }
  `;

  const GET_ALL_EXCMMITTE = gql`
    query ExecutiveCommittees {
      executiveCommittees(pagination: { limit: 100 }) {
        data {
          attributes {
            title
            name
            image {
              data {
                attributes {
                  url
                }
              }
            }
          }
        }
      }
    }
  `;

  const GET_TESTOMONIAL = gql`
    query Advertisements {
      advertisements {
        data {
          attributes {
            url
            image {
              data {
                attributes {
                  url
                }
              }
            }
          }
        }
      }
    }
  `;

   const GET_VIDEO_LINKS = gql`
    query Testimonials {
      testimonials {
        data {
          attributes {
            authroname
          }
        }
      }
    }
  `;

   const GET_PHOTOGALLERYS = gql`
    query PhotoGallerys {
      photoGalleries(sort: "publishedAt:desc") {
        data {
          attributes {
            title
            image(pagination: { limit: 100 }){
              data {
                attributes {
                  url
                }
              }
            }
          }
        }
      }
    }
  `;

  const { loading: imageloading, data: imagedata } = useQuery(GET_PHOTOGALLERYS);

 
  const { loading, error, data } = useQuery(GET_HOME_ALL);
  const { loading: aboutloading, data: aboutdata } = useQuery(GET_ABOUT_DATA);
  const { loading: excloading, data: excdata } = useQuery(GET_ALL_EXCMMITTE);
  const { loading: testoloading, data: testodata } = useQuery(GET_TESTOMONIAL);
   const { loading: videoloading, data: videodata } = useQuery(GET_VIDEO_LINKS);

  //@ts-ignore
  if ((loading, aboutloading, excloading, testoloading,videoloading,imageloading)) return <LoaderSpin />;
  if (error) return <p>Error : {error.message}</p>;

  // console.log(testodata.testimonials.data);

  return (
    <div>
      {/* hero section  */}
      <section className="h-[100vh]">
        <Swiper
          navigation={true}
          centeredSlides={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
      
          modules={[Navigation, Autoplay]}
          className="mySwiper"
        >
          {data &&
            //@ts-ignore
            data.heroSections.data.map((item, index) => (
              <SwiperSlide key={index}>
                <HeroSection
                  title={item.attributes.heading}
                  dec={item.attributes.paragraph}
                  img={item.attributes.bgimage.data.attributes.url}
                />
              </SwiperSlide>
            ))}
        </Swiper>
      </section>
      {/* about us section */}

      <section className="bg-[#0080002c] grid gap-8 lg:gap-12 sectionpadding lg:grid-cols-2">
        <div className="rounded-md overflow-hidden">
          {aboutdata && (
            <img
              className="w-full h-full"
              src={aboutdata.aboutus.data.attributes.image.data.attributes.url}
              alt="img"
            />
          )}
        </div>


        <div className="flex  p-4  group relative ease-in duration-500 rounded-md  cursor-pointer  gap-10 lg:gap-12  flex-col">
          <div className="absolute h-full w-full duration-300 rounded-full scale-0 group-hover:scale-100 group-hover:rounded-md top-0 left-0 bg-popover"></div>
          <div className="flex flex-col gap-4 z-30">
            <h3 className="heading border-primary  border-l-4 pl-2">About us</h3>

            <h1 className="title text-secondary-foreground">
              {aboutdata && aboutdata.aboutus.data.attributes.title}
            </h1>
            <p className="dec text-secondary-foreground">
              {aboutdata && aboutdata.aboutus.data.attributes.description}
            </p>
          </div>
          <Link to={"/aboutbag"} className="z-30">
            <Button size={"lg"}>Learn more</Button>
          </Link>
        </div>
      </section>

  <div className="sectionpadding bg-[#00800015]">
     
      <div className="titlemb">
        <SectionHeading
          title={"Executive Committee"}
        // subtitle={"Community advertisement"}
        />
      </div>
      <Swiper
          breakpoints={{
            425: {
              width: 426,
              slidesPerView: 1,
            },
            768: {
              width: 768,
              slidesPerView: 3,
            },
            1024: {
              width: 1024,
              slidesPerView: 3,
            },
          }}
          spaceBetween={30}
          freeMode={true}
             pagination={{
          clickable: true,
        }}        
          // centeredSlides={true}
          autoplay={{
            delay: 3000,
            // disableOnInteraction: false,
          }}
         
          modules={[FreeMode, Autoplay, Pagination]}
        className="mySwiper"
      >

        {/* @ts-ignore */}
        <div className="  grid gap-8  md:grid-cols-3 lg:grid-cols-4">
          {excdata &&
            //@ts-ignore
            excdata.executiveCommittees.data.map((item, index) => (
              <SwiperSlide key={index}>
                <SingleTeamCard
                  //@ts-ignore
                  // key={index}
                  //@ts-ignore
                  // type={teamtype}
                  //@ts-ignore
                  title={item.attributes.title}
                  //@ts-ignore
                  name={item.attributes.name}
                  //@ts-ignore
                  img={item.attributes.image.data.attributes.url}
                />
              </SwiperSlide>
            ))}
        </div>


      </Swiper>
</div>
{/*       {excdata && (
        <TeamMember
          title={"Executive Committee"}
          teamtype="team"
          data={excdata.executiveCommittees.data}
          heading={"Meet our Executive Committee"}
        />
      )} */}


      <section className="sectionpadding bg-[#00800009] ">
        <div className="titlemb">
          <SectionHeading
            title={"Event News"}
          // subtitle={"Community advertisement"}
          />
        </div>
        <Swiper
          breakpoints={{
            425: {
              width: 426,
              slidesPerView: 1,
            },
            768: {
              width: 768,
              slidesPerView: 3,
            },
            1024: {
              width: 1024,
              slidesPerView: 3,
            },
          }}
          spaceBetween={30}
          freeMode={true}

          // centeredSlides={true}
          autoplay={{
            delay: 3000,
            // disableOnInteraction: false,
          }}

          modules={[FreeMode, Autoplay, Pagination]}
          className="mySwiper"
        >
          {/* //@ts-ignore */}
          {imagedata && 
            //@ts-ignore
            imagedata.photoGalleries.data.map((item, index) => {
              {/* console.log(item.attributes.image.data.attributes.url) */ }
              return (
                <SwiperSlide key={index}>
                 <Link to="/photogallery"  >
                  {/* @ts-ignore */}
                  <div className="p-8 h-[40vh] w-full  border border-primary rounded-2xl hover:shadow-xl hover:shadow-indigo-50 flex flex-col items-start"
                  >
                    <div className="h-[20vh] w-full">
                      <img src={item.attributes.image.data[0].attributes.url} className="shadow rounded-lg w-full h-full  object-cover overflow-hidden border" />
                    </div>
                    <div className="mt-8">
                      <h4 className="font-bold line-clamp-2 w-full text-start text-xl">{item.attributes.title}</h4>
                    </div>
                  </div>
                  </Link> 
                </SwiperSlide>
              )
            })}
        </Swiper>
{/*    <div className="mt-16 w-full flex justify-center items-center">
          <Link to="/photogallery" >
            <Button>View more</Button>
          </Link>
        </div> */}
      </section>


     
      {/* <DoWantMember /> */}
      {testodata && <Testimonials data={testodata.advertisements.data} />}
      <div className="sectionpadding bg-white">

        <div className="mb-10">
         <SectionHeading
           title={'Advertisement videos'}
           />
           </div>
      <Swiper
          breakpoints={{
            425: {
              width: 426,
              slidesPerView: 1,
            },
            768: {
              width: 768,
              slidesPerView: 2,
            },
            1024: {
              width: 1024,
              slidesPerView: 2,
            },
          }}
          spaceBetween={30}
          freeMode={true}
        
          // centeredSlides={true}
          autoplay={{
            delay: 4000,
            // disableOnInteraction: false,
          }}
          modules={[FreeMode, Autoplay, Pagination]}
          className="mySwiper"
        >
          {/* @ts-ignore */}
          {videodata &&
           //@ts-ignore
            videodata.testimonials.data.map((item, index) => (
          
              <SwiperSlide key={index}>
                <ReactPlayer
                  // width="100%"
                 controls={true}
                  volume={0}
                  url={item.attributes.authroname}
                />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Home;

type herosectionProps = {
  img: String;
  title: String;
  dec: String;
};

const HeroSection = ({ img, title, dec }: herosectionProps) => {
  return (
    <div className="h-full w-full ">
      <div className="w-full h-full  relative">
        {/* @ts-ignore */}
        <img src={img} className="bg-contain" alt={title} />
      </div>
      <div className="absolute  top-0 left-0 z-30 bg-[#00000094] flex flex-col justify-center text-start items-start  gap-4 md:gap-8 h-full w-full px-4 md:px-16 py-24 ">
        <h1 className="text-white font-bold capitalize text-5xl lg:text-6xl md:w-[60%] ">
          {title}
        </h1>
        <p className="text-muted lg:w-[60%]  text-lg">{dec}</p>
        <Link to="/aboutbag">
          <Button size={"lg"}>Learn More</Button>
        </Link>
      </div>
    </div>
  );
};
