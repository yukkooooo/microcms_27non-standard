import Link from "next/link"
import { client } from "../../../libs/client";
import Button from "@/components/Button";
import { HeartIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/16/solid";




export default function CategoryId({ blog }: { blog: any }) {
  // カテゴリーに紐付いたコンテンツがない場合に表示
  if (blog.length === 0) {
    return <div>コンテンツがありません。</div>;
  }
  return (







    <div className="max-w-7xl m-5">
      <main className="p-5">
        <article className="flex flex-wrap justify-center gap-6">
          {blog.map((blog: any) => (
            <div key={blog.id} className="w-full md:w-1/3 lg:w-1/4 xl:w-1/4 p-4">
              <div className="text-center shadow-lg border border-gray-300 rounded-xl bg-white">
                <Link href={`blog/${blog.id}`}>
                  <img
                    src={blog.item_image.url}
                    alt={blog.title}
                    width={150}
                    height={150}
                    className="p-6 mt-6 w-full h-48 object-cover rounded-t-xl"
                  />
                </Link>
                <div className="p-4">
                  <div className="flex justify-center items-center mb-2">
                    <span className=" text-[#00c9e8] py-2 rounded border-[#203744]mt-1"><MagnifyingGlassCircleIcon className="w-7 h-7 hover:text-blue-500 transition-colors duration-300" />
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{blog.item_name}</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    家具調仏壇は、現代のインテリアに調和するデザインで、収納も兼ねたお仏壇です。<br />
                  </p>
                  <div className="mb-5">
                    <p className="text-[23px] font-semibold mb-2">{blog.item_price_tax} 円（税込）</p>
                    <p className="text-sm text-gray-600 ml-2">{blog.item_price} 円（税抜）</p>
                  </div>
                  <p className="text-[12px] mb-5">SIZE {blog.item_size}</p>
                  <p className="text-[12px] ">材質: {blog.item_material}</p>
                  <p className="text-[12px] ">発送まで: {blog.until_shipping}</p>
                  <div className="mt-4 flex justify-center">
                    <Button onClick={() => { /* カートに入れる処理 */ }}>
                      カートに入れる
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

