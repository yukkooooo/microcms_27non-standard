import Button from "@/components/Button";
import { client } from "../../../libs/client";


export const getStaticProps = async (context: any) => {
  const id = context.params.id;
  console.log(context)
  const data = await client.get({ endpoint: "blog", contentId: id });

  // getStaticPathsを設定しないとダイナミック
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
  }

};

export default function BlogId({ blog }: { blog: any }) {

  return (
    <main className="p-10">

      <h1 className="pb-5 font-medium text-xl">{blog.title}</h1>
      <div className="">
        <div className=" p-5 max-w-sm rounded overflow-hidden shadow-lg">

          <div className="m-auto w-1/2">
            <img src={blog.item_image.url} alt={blog.title} width={blog.item_image.width} height={blog.item_image.height} />

          </div>

          <p className="flex m-2 items-end">{blog.item_name}</p>

          <div className="flex m-2 items-end">
            <p className="font-medium text-xl pr-1 ">{blog.item_price_tax} 円（税込）</p>
            <p className=" text-sm " >{blog.item_price} 円（税抜）</p>

          </div>

          <p className="font-medium text-xl pr-3 mb-5 m-2">SIZE {blog.item_size}</p>




          <div className="m-2 items-end ">
            <p>材質: {blog.item_material}</p>
            <p>発送まで: {blog.until_shipping}</p>
            <div className="m-auto w-1/2">
              <Button onClick={() => SubmitEvent}>  カートに入れる </Button>
            </div>
          </div>



        </div>

      </div>
    </main>
  )

}
