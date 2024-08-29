import Link from "next/link";
import { client } from "../../../libs/client";
import Button from "@/components/Button";

export default function CategoryId({ blog }: { blog: any }) {
  // カテゴリーに紐付いたコンテンツがない場合に表示
  if (blog.length === 0) {
    return <div>コンテンツがありません。</div>;
  }
  return (
    <div className="mt-20">
      <main className="flex items-center justify-center m-4 sm:m-6 md:m-8 lg:m-10 xl:m-12 2xl:m-16">
        <article className="flex flex-wrap items-center justify-center">
          {blog.map((blog: any) => (
            <div key={blog.id} className="w-full md:w-1/2 lg:w-1/2 p-4">
              <h3 className="text-xl font-semibold mb-4">{blog.item_name}</h3>

              {/* md 以上のサイズで横並びに、md 未満では縦並びに */}
              <div className="text-center shadow-lg bg-white flex flex-col md:flex-row justify-center items-center">
                <Link href={`blog/${blog.id}`}>
                  <img
                    src={blog.item_image.url}
                    alt={blog.title}
                    className="w-full h-auto max-w-xs"
                  />
                </Link>

                <div className="p-4">
                  <p className="text-sm text-gray-600 object-cover p-3">
                    {blog.item_description}
                  </p>
                  <div className="my-5">
                    <div className="flex items-left justify-center">
                      <p className="text-[25px] font-semibold mb-1">
                        {blog.item_price_tax}
                      </p>
                      <p className="text-xs ml-1 pt-4">円(税込)</p>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-center">
                    <Button onClick={() => { /* カートに入れる処理 */ }}>
                      more→
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </article>
      </main>
    </div>
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