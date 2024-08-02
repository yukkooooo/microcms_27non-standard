/* eslint-disable @next/next/no-img-element */
import { GetStaticProps } from "next";
import { client } from "../../libs/client.js";
import Link from "next/link.js";
import React, { ReactNode } from 'react';
import BasicSlider from '../components/BasicSlider';
import Button from '../components/Button';


// ブログデータの型を定義
interface Blog {
  item_image: any;
  id: string;
  title: string;
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

      // .contentsを追加
    },
  };
};

const Home: React.FC<HomeProps> = ({ blog, categories, event }) => {

  return (
    <div>
      <div >
        <BasicSlider />
      </div>
      <h4 className="flex items-center justify-center mt-10 text-xl p-10 ">
        CATEGORY
      </h4>
      <div className="flex items-center justify-center flex-wrap ">
        <article className="flex items-center justify-center md:flex-row flex-wrap ">
          {categories.map((category) => (
            <button
              type="button"
              className="flex justify-center items-center flex-wrap md:flex-row m-6 mt-2 rounded-full border-2 border-primary-100 px-10 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary-700 shadow-lg transition duration-150 ease-in-out hover:border-primary-accent-200 hover:bg-secondary-50/50 focus:border-primary-accent-200 focus:bg-secondary-50/50 focus:outline-none focus:ring-0 active:border-primary-accent-200 motion-reduce:transition-none dark:border-primary-400 dark:text-primary-300 dark:hover:bg-blue-950 dark:focus:bg-blue-950"
              key={category.id}
            >
              <Link href={`category/${category.id}`}>
                <p>{category.name}</p>
              </Link>
            </button>
          ))}
        </article>
      </div>

      <div>
        <h4 className="flex items-center justify-center m-5 text-xl">NEW ARRIVALS</h4>

        <div className="flex flex-wrap justify-center">
          <article className="flex flex-wrap justify-center m-5">
            {blog.map((blog) => (
              <div key={blog.id} className="mx-auto text-center ">
                <Link href={`blog/${blog.id}`}>
                  <img
                    src={blog.item_image.url}
                    alt={blog.title}
                    width={blog.item_image.width}
                    height={blog.item_image.height}
                    className="w-[180px] h-[180px] object-cover first-letter:mx-auto  shadow-lg border-1 border-gray-300 rounded-xl mx-5"
                  />
                </Link>
                {/* <h4 className="m-6 inline-block size-100">{blog.item_item_name}{blog.item_price_tax}円</h4> */}

              </div>
            ))}
          </article>


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