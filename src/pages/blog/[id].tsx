import { HeartIcon } from "@heroicons/react/24/outline";
import React from 'react';
import { client } from "../../../libs/client";
import Button from "@/components/Button";

export const getStaticProps = async (context: any) => {
  const id = context.params.id;
  console.log(context);
  const data = await client.get({ endpoint: "blog", contentId: id });

  return {
    props: {
      blog: data,
    },
  };
};

export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "blog" });

  const paths = data.contents.map((content: any) => `/blog/${content.id}`);

  return {
    paths,
    fallback: false,
  };
};

type BlogProps = {

  blog: {
    item_price_tax: number;
    title: string;
    id: string;
    item_name: string;
    item_description: string;
    item_size: string;
    until_shipping: string;
    item_material: string;



    sub_image: { url: string }[];

    item_image: {
      url: string;
      width: number;
      height: number;


    };


    // 他の必要なフィールドもここで定義できます
  };
};

export default function BlogId({ blog }: BlogProps) {
  return (
    <main className="flex flex-col lg:flex-row mx-auto my-10 items-center justify-center h-auto lg:h-screen max-w-screen-lg">
      <div className="">
        <div className="p-10 lg:w-full flex justify-center "> {/* 左 1枚配置 */}
          <img
            src={blog.item_image.url}
            alt={blog.item_name}
            width={blog.item_image.width}
            height={blog.item_image.height}
            className=" object-cover"
          />
        </div>



      </div>
      <div className="t-4 mx-10 lg:w-1/2 flex flex-col items-center justify-center lg:justify-start">  {/* 右 */}


        <div className="mt-4 m-0 w-full">
          <h2 className="text-2xl font-bold">{blog.item_name}</h2>

          <div >
            <div className="flex justify-end px-5">
              <p className="text-[24px] font-semibold mb-1">{blog.item_price_tax} </p>
              <p className=" px-2 text-xs pt-4 mb-5">円(税込)</p>
            </div>

            <p className="mb-1">SIZE {blog.item_size}</p>

            <p>材質: {blog.item_material}</p>
            <p>発送まで: {blog.until_shipping}</p>
            <p className="mt-5">{blog.item_description}</p>


          </div>

          <div className=" mt-8 flex mb-5 justify-center items-center ">
            <Button onClick={() => { /* カートに入れる処理 */ }}>
              カートに入れる
            </Button>
            <div className="flex justify-center items-center mb-1 px-3">
              <span className=" text-[#4682b4] py-0 rounded border-[#203744]">
                <HeartIcon className="w-7 h-7 hover:text-yellow-500 transition-colors duration-300" />
              </span>
            </div>
          </div>

        </div>


        <div className=""> {/* 画像3枚配置 */}
          {/* サブ画像 */}
          <div className="grid grid-cols-3 gap-2 mt-15  items-center justify-center ">
            {blog.sub_image.map((item, index) => (
              <img
                key={index}
                src={item.url}
                alt={`${blog.title} サブ画像${index + 1}`}
                className="object-cover"
              />
            ))}
          </div>
        </div>


      </div>

    </main>
  );
}
