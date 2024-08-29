import React from 'react';
import Button from './Button';
import { client } from '../../libs/client';



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

export default function MyComponents({ blog }: { blog: any }) {


  return

  // ここの処理をかいて
};
