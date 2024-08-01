/* eslint-disable @next/next/no-img-element */
import { GetStaticProps } from "next";
import { client } from "../../libs/client.js";
import Link from "next/link.js";
import React, { ReactNode } from 'react';
import BasicSlider from '../components/BasicSlider';
import Button from '../components/Button';
import Image from 'next/image';

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
  // console.log(blogData);
  const eventData = await client.get({ endpoint: "event" });
  console.log(eventData)



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
      <div>
        <BasicSlider />
      </div>
      <h4 className="flex items-center justify-center mt-10 mb-6 text-xl ">
        CATEGORY
      </h4>
      <div className="flex items-center justify-center md:flex-row">
        <article className="flex items-center justify-center md:flex-row">
          {categories.map((category) => (
            <button
              type="button"
              className="m-6 mt-2 inline-block rounded-full border-2 border-primary-100 px-10 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary-700 shadow-lg transition duration-150 ease-in-out hover:border-primary-accent-200 hover:bg-secondary-50/50 focus:border-primary-accent-200 focus:bg-secondary-50/50 focus:outline-none focus:ring-0 active:border-primary-accent-200 motion-reduce:transition-none dark:border-primary-400 dark:text-primary-300 dark:hover:bg-blue-950 dark:focus:bg-blue-950"
              key={category.id}
            >
              <Link href={`/category/${categories.id}`}>
                <p>{category.name}</p>
              </Link>
            </button>
          ))}
        </article>
      </div>

      <div>
        <h4 className="flex items-center justify-center m-10 text-xl">NEW ARRIVALS</h4>
        <div>
          <article className="flex flex-wrap justify-center">
            {blog.map((blog) => (
              <div key={blog.id} className="flex justify-center items-center flex-wrap md:flex-row">
                <Link href={`blog/${blog.id}`}>
                  <Image
                    src={blog.item_image.url}
                    alt={blog.title}
                    width={blog.item_image.width}
                    height={blog.item_image.height}
                    className="object-cover md:w-[70%] lg:w-[40%] mx-auto"
                  />
                </Link>
              </div>
            ))}
          </article>
        </div>

        <div className="flex items-center justify-center m-10">
          <Button onClick={() => SubmitEvent}>MORE</Button>
        </div>
        <div>
          <h4 className="flex items-center justify-center m-10 text-xl">EVENT</h4>

          <article className="flex flex-wrap justify-center m-4.2">
            {event.map((event: any) => (
              <div key={event.id} className="p-6.2 md:w-1/2 lg:w-1/4 flex justify-center items-center">

                <div className="text-center">


                  <Link href={`event/${event.id}`}>
                    <Image
                      src={event.eyecatch_event.url}
                      alt={event.eyecatch_event}
                      width={150}
                      height={150}
                      className="w-[300px] h-[300px] mx-auto object-cover shadow-lg border-2 border-gray-300 rounded-xl"
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