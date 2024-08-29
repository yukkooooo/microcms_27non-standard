import Button from "@/components/Button";
import { client } from "../../../libs/client";
import { HeartIcon } from "@heroicons/react/16/solid";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/outline";

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
                <div className="mb-1">
                  <span className=" text-[#4682b4] px-1 py-1">
                    <HeartIcon className="w-7 h-7  text-[#4682b4] hover:text-yellow-500 transition-colors duration-300" />
                  </span>

                </div>
                <h3 className="text-3xl font-semibold mb-4">{blog.item_name}</h3>
                <p className="text-sm text-gray-600 mb-4">
                  家具調仏壇は、現代のインテリアに調和するデザインで、収納も兼ねたお仏壇です。<br />
                </p>
                <div className="flex items-center mx-auto justify-center">
                  <p className="text-[35px] font-semibold mb-1">{blog.item_price_tax} </p> <p className=" px-2 text-xs">円(税込)</p>
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
