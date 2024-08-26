import Button from "@/components/Button";
import { client } from "../../../libs/client";

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

export default function BlogId({ blog }: { blog: any }) {
  return (
    <main className="max-w-[500px] mx-auto p-4 sm:p-6 md:p-8 lg:p-10">
      <div className="grid grid-cols-3 gap-5 justify-center p-4 md:grid-cols-1">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <a href={`https://example.com/article/${blog.id}`}>
            <div className="p-5">
              <img
                src={blog.item_image.url}
                alt={blog.title}
                width={blog.item_image.width}
                height={blog.item_image.height}
                className="w-full object-cover"
              />
              <div className="p-4">
                <div className="text-right mb-2">
                  <span className="bg-[#203744] text-white px-4 py-2 rounded text-xs border border-[#203744]">
                    お気に入りに登録
                  </span>
                </div>
                <h3 className="text-3xl font-semibold mb-4">{blog.item_name}</h3>
                <p className="text-sm text-gray-600 mb-4">
                  家具調仏壇は、現代のインテリアに調和するデザインで、収納も兼ねたお仏壇です。<br />
                </p>
                <div className="flex items-center">
                  <p className="font- text-xl">{blog.item_price_tax} 円（税込）</p>
                  <p className="text-sm">{blog.item_price} 円（税抜）</p>
                </div>
                <p className="text-xl mb-5">SIZE {blog.item_size}</p>
                <p>材質: {blog.item_material}</p>
                <p>発送まで: {blog.until_shipping}</p>
                <div className=" mt-4 flex justify-center">
                  <Button onClick={() => { /* カートに入れる処理 */ }}>
                    カートに入れる
                  </Button>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </main>
  );
}
