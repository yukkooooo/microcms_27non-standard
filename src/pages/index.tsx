import { GetStaticProps } from "next";
import { client } from "../../libs/client.js";
import Link from "next/link.js";

// ブログデータの型を定義
interface Blog {
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
  const data = await client.get({ endpoint: "blog" });
  console.log(data);

  return {
    props: {
      blog: data.contents,  // dataの構造に応じて修正
    },
  }
};

const Home: React.FC<HomeProps> = ({ blog }) => {
  return (
    <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
      {blog.map((blog) => (
        <li key={blog.id}>
          <Link href={'blog${blog.id}'}></Link>
          <a href="">{blog.title}</a>
        </li>
      ))}
    </div>
  );
}

export default Home;