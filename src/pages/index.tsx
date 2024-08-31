/* eslint-disable @next/next/no-img-element */
import { GetStaticProps } from "next";
import { client } from "../../libs/client.js";
import Link from "next/link.js";
import React, { ReactNode, useRef, useState } from 'react';
import BasicSlider from '../components/BasicSlider';
import AnimatedText from '@/components/AnimatedText';
import NavLinks from "./NavLinks";
import Hamburger from "./Hamburger";
import AnimatedTextNew from '@/components/AnimatedTextNew';
import Button from '@/components/Button';
import { useRouter } from 'next/router';
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from "@heroicons/react/24/outline";
import AnimatedTextEvent from '@/components/AnimatedTextEvent';





// ブログデータの型を定義
interface Blog {
  item_image: any;
  id: string;
  title: string;
  item_name: string;
  item_price_tax: number;
  item_description: string;
  sub_image: any;
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
  // console.log(blogData);
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
  const [visibleCards, setVisibleCards] = useState(10); // 初期表示するカードの数を3に設定
  const router = useRouter();
  const scrollContainerRef = useRef<HTMLDivElement>(null);




  // スクロールするための関数
  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300; // スクロールする量（ピクセル）
      scrollContainerRef.current.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount, // 左または右にスクロール
        behavior: 'smooth', // スムーズなスクロール
      });
    }
  };


  return (

    <div className="flex flex-col justify-center min-h-screen mx-auto px-4 max-w-[1200px]">


      <div></div>
      <div className="flex w-max-[1200] justify-center ">
        <BasicSlider />
      </div>

      <section className="flex items-center justify-center mt-10 mb-4">
        <h4 className="flex items-center justify-center m-0 mx-auto text-xl p-5">
          <AnimatedText />
        </h4>
      </section>

      {/* カテゴリボタン */}
      <div className="flex justify-center">
        <article className="grid grid-cols-2 md:grid-cols-4 gap-1 items-center justify-center text-gray-500 px-1 w-full">
          {categories.map((category) => (
            <div className="flex items-center justify-center" key={category.id}>
              <Link href={`category/${category.id}`} passHref>
                <button
                  type="button"
                  className="my-4 flex justify-center w-full text-sm md:text-base lg:text-lg rounded-full border-2 text-primary-700 shadow-lg transition duration-150 ease-in-out hover:border-[#4682b4] hover:text-[#4682b4] focus:border-[#4682b4] focus:text-[#4682b4]"
                >
                  <p className="w-[160px] py-1">{category.name}</p>
                </button>
              </Link>
            </div>
          ))}
        </article>
      </div>

      <div>
        <h4 className="flex items-center justify-center mt-10 text-xl mb-10">
          <AnimatedTextNew />
        </h4>

        {/* カード表示セクション */}
        <div className="flex items-center justify-center mx-auto ">
          <div className="relative max-w-full">
            {/* 左スクロールボタン */}
            <button
              className="absolute top-1/2 transform -translate-X-[90%] bg-white bg-opacity-50 rounded-full text-[#4682b4]"
              onClick={() => scroll('left')} // 左にスクロールする
            >
              <ArrowLeftCircleIcon className=" w-11 h-11 " />
            </button>
            {/* スクロール可能なコンテナ */}
            <div
              ref={scrollContainerRef} // スクロールコンテナへの参照
              className="flex overflow-x-auto whitespace-nowrap px-4 ml-2"
              style={{
                padding: '0px 10%', // 横スクロールのためのパディング
                overflowX: 'auto', // 横スクロールを有効にする
                overflowY: 'hidden', // 縦スクロールを無効にする
                scrollbarWidth: 'none', // Firefox 用
                msOverflowStyle: 'none', // Internet Explorer 用
              }}
            >
              {blog.slice(0, 5).map((blog: any) => (
                <div key={blog.id} className=" max-w-full p-2 flex-shrink-0">
                  <h3 className="text-ms my-6">{blog.item_name}</h3>

                  <div className="text-center shadow-lg bg-white p-2 mx-auto">
                    <Link href={`blog/${blog.id}`}>
                      <img
                        src={blog.item_image.url}
                        alt={blog.title}
                        className="w-full h-auto max-w-xs mx-auto"
                      />
                    </Link>

                    <div className="flex flex-col items-center py-0.5">
                      <div className="flex items-left my-2">
                        <div className="flex items-left px-2">
                          <p className="text-[20px] font-semibold mb-1">
                            {blog.item_price_tax}
                          </p>
                          <p className="text-xs ml-1 pt-2.5">円(税込)</p>
                        </div>
                      </div>

                      <div className="my-4 flex justify-center w-full">
                        <Button onClick={() => router.push(`/blog/${blog.id}`)}>
                          more→
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* 右スクロールボタン */}
            <button
              className="absolute right-0 top-1/2 transform -translate-X-[80%]  bg-white-300 bg-opacity-50 rounded-full text-[#4682b4]"
              onClick={() => scroll('right')} // 右にスクロールする
            >
              <ArrowRightCircleIcon className="w-11 h-11" />
            </button>
          </div>
        </div>


        {/* イベントセクション */}
        <div className=" mx-auto">
          <h4 className="flex items-center justify-center mt-20 mx-auto text-xl ">
            <AnimatedTextEvent />
          </h4>

          <article className="flex flex-wrap justify-center">
            {event.map((event: any) => (
              <div key={event.id} className=" md:w-1/2 lg:w-1/3 flex justify-center items-center">
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