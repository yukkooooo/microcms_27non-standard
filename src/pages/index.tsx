/* eslint-disable @next/next/no-img-element */
import { GetStaticProps } from "next";
import { client } from "../../libs/client.js";
import Link from "next/link.js";
import React from 'react';
import BasicSlider from '../components/BasicSlider';
import Button from '../components/Button';




// ブログデータの型を定義
interface Blog {
  item_image: any;
  id: string;
  title: string;
}

// コンポーネントのプロパティの型を定義
interface HomeProps {
  blog: Blog[];
}

// SSG
// 静的pageはSSG,動的なページはSSRで作成
export const getStaticProps: GetStaticProps = async () => {
  const data = await client.get({ endpoint: "blog", });
  console.log(data);

  return {
    props: {
      blog: data.contents,  // dataの構造に応じて修正
    },
  }
};




const Home: React.FC<HomeProps> = ({ blog }) => {
  return (
    <div>
      <div>
        <BasicSlider />
      </div>
      <h4 className="flex items-center justify-center mt-10 mb-6">
        CATEGORY</h4>
      <div className="flex items-center justify-center md:flex-row   ">

        <article className="flex items-center justify-center md:flex-row  ">
          {blog.map((blog) => (
            <button type="button" className="m-6 mt-2 inline-block rounded-full border-2 border-primary-100 px-10 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary-700 shadow-lg transition duration-150 ease-in-out hover:border-primary-accent-200 hover:bg-secondary-50/50 focus:border-primary-accent-200 focus:bg-secondary-50/50 focus:outline-none focus:ring-0 active:border-primary-accent-200 motion-reduce:transition-none dark:border-primary-400 dark:text-primary-300 dark:hover:bg-blue-950 dark:focus:bg-blue-950" key={blog.id}>
              <Link href={`blog/${blog.id}`}><p className="">{blog.title}</p></Link>

            </button>
          ))}
        </article>
      </div>


      <div >
        <h4 className="flex items-center justify-center m-10 ">NEW ARRIVALS</h4>
        <div >
          <article className="flex flex-wrap justify-center">
            {blog.map((blog) => (
              <div key={blog.id} className="flex justify-center items-center flex-wrap md:flex-row ">

                <Link href={`blog/${blog.id}`}>

                  <img

                    src={blog.item_image.url}
                    alt={blog.title}
                    width={blog.item_image.width}
                    height={blog.item_image.height}

                    className="object-cover  md:w-[70%] lg:w-[40%] mx-auto"
                  />

                </Link>

              </div>
            ))}
          </article>
        </div>

        <div className="flex items-center justify-center m-10">
          <Button onClick={() => SubmitEvent}>MORE</Button>
        </div>

        <h4 className="flex items-center justify-center m-10 ">EVENT</h4>



      </div>
    </div>



  );
}



export default Home;