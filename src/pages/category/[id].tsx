import Link from "next/link"
import { client } from "../../../libs/client";




export default function CategoryId({ blog }: { blog: any }) {
  // カテゴリーに紐付いたコンテンツがない場合に表示
  if (blog.length === 0) {
    return <div>コンテンツがありません。</div>;
  }
  return (

    <div>
      <ul>

        <article className="flex flex-wrap justify-center m-5">
          {blog.map((blog: any) => (
            <div key={blog.id} className="m-10 text-center shadow-lg border-1 border-gray-300 rounded-xl  ">
              <Link href={`blog/${blog.id}`}>
                <img
                  src={blog.item_image.url}
                  alt={blog.title}
                  width={blog.item_image.width}
                  height={blog.item_image.height}
                  className="w-[180px] h-[180px] object-cover first-letter:mx-auto p-5 "
                />
              </Link>
              <h4 className="m-6 inline-block size-100">{blog.item_name}</h4>
              <p className="m-6 inline-block size-100">{blog.item_price_tax}円</p>

            </div>
          ))}
        </article>

      </ul>
    </div >
  );

}
// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "categories" });

  const paths = data.contents.map((content: any) => `/category/${content.id}`);
  return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context: any) => {
  const id = context.params.id;
  const data = await client.get({ endpoint: "blog", queries: { filters: `category[equals]${id}` } });

  return {
    props: {
      blog: data.contents,
    },
  };
};

