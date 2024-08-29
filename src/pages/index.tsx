/* eslint-disable @next/next/no-img-element */
import { GetStaticProps } from "next";
import { client } from "../../libs/client.js";
import Link from "next/link.js";
import React, { ReactNode } from 'react';
import BasicSlider from '../components/BasicSlider';
import AnimatedText from '@/components/AnimatedText';
import NavLinks from "./NavLinks";
import Hamburger from "./Hamburger";
import AnimatedTextNew from '@/components/AnimatedTextNew';
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/outline";





// ブログデータの型を定義
interface Blog {
  item_image: any;
  id: string;
  title: string;
  item_name: string;
  item_price_tax: number;
}

// カテゴリーデータの型を定義
interface Category {
  name: ReactNode;
  id: string;
  title: string;
}

interface Event {
  id: string;
  title: string;
  item_image: {
    url: string;
    width: number;
    height: number;
  };

}


// コンポーネントのプロパティの型を定義
interface HomeProps {
  blog: Blog[];
  categories: Category[];
  event: Event[];
  isLoggedIn: boolean[];

}

// SSG
// 静的pageはSSG,動的なページはSSRで作成
export const getStaticProps: GetStaticProps = async () => {
  const categoryData = await client.get({ endpoint: "categories" });
  // console.log(categoryData);
  const blogData = await client.get({ endpoint: "blog" });
  console.log(blogData);
  const eventData = await client.get({ endpoint: "event" });
  // console.log(eventData)



  return {
    props: {
      blog: blogData.contents,
      categories: categoryData.contents,
      event: eventData.contents,


    },
  };
};

const Home: React.FC<HomeProps> = ({ blog, categories, event }) => {



  return (
    <div className="p-2 w-220">
      <div >
        <BasicSlider />
      </div>
      <section className="flex items-center justify-center mt-">
        <h4 className="flex items-center justify-center m-0 mx-auto text-xl p-5 ">
          <AnimatedText />
        </h4>
      </section>

      {/* カテゴリボタン */}
      <div className="flex items-center justify-center flex-wrap">
        <article className="flex items-center justify-center md:flex-row flex-wrap text-gray-500">
          {categories.map((category) => (
            <button
              type="button"
              className="m-2 mt-2 rounded-full border-2  px-10 pb-1 pt-2 text-xs font-medium uppercase leading-normal text-primary-700 shadow-lg transition duration-150 ease-in-out hover:border-[#00c9e8] hover:text-[#00c9e8] focus:border-[#00c9e8] focus:text-[#00c9e8] "
              key={category.id}
            >
              <Link href={`category/${category.id}`}>
                <p>{category.name}</p>
              </Link>
            </button>
          ))}
        </article>
      </div>

      <div className="">
        <h4 className="flex items-center justify-center mt-5 text-xl">   <AnimatedTextNew />
        </h4>

        <div className="max-w-7xl m-1 items-center">
          <main className="p-1">
            <article className="flex flex-wrap justify-center gap-1">
              {blog.map((blog: any) => (
                <div key={blog.id} className="w-full md:w-1/5 lg:w-1/6 xl:w-1/6 p-4">
                  <div className="text-center shadow-lg border rounded-xl bg-white">
                    <Link href={`blog/${blog.id}`}>
                      <img
                        src={blog.item_image.url}
                        alt={blog.title}
                        width={blog.item_image.width}
                        height={blog.item_image.height}
                        className="p-3 mt-2 w-full h-28 object-cover rounded-t-xl"
                      />
                    </Link>
                    <div className="">
                      <div className="flex justify-center items-center mb-1">
                        <span className=" text-[#00c9e8] py-1 rounded border-[#203744]"><MagnifyingGlassCircleIcon className="w-7 h-7 hover:text-blue-500 transition-colors duration-300" />
                        </span>
                      </div>
                      <h3 className="text-ms font-semibold mb-1">{blog.item_name}</h3>
                      <div className="mb-5">
                        <p className="text-ms mb-1">{blog.item_price_tax} 円(税込)</p>

                      </div>

                      <div className="mt-4 flex justify-center">

                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </article>
          </main>

        </div>




        <div className="w-4/5 mx-auto">
          <h4 className="flex items-center justify-center m-10 text-xl">EVENT</h4>

          <article className="flex flex-wrap justify-center">
            {event.map((event: any) => (
              <div key={event.id} className="p-3.2 md:w-1/2 lg:w-1/4 flex justify-center items-center">

                <div className="text-center m-10">


                  <Link href={`event/${event.id}`}>
                    <img
                      src={event.eyecatch_event.url}
                      alt={event.eyecatch_event}
                      width={100}
                      height={100}
                      className="w-[235px] h-[235px] mx-auto object-cover shadow-lg border-2 border-gray-300 rounded-xl"
                    />
                  </Link>

                  <h4 className="m-6 inline-block size-100">{event.title_event}</h4>



                </div>

              </div>
            ))}
          </article>
        </div>


      </div>
    </div>
  );
};



export default Home;