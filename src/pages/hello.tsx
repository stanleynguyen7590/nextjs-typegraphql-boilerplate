import { useHelloQuery } from "generated/graphql";
import React from "react";

interface Props {}

const hello = (props: Props) => {
  const { data, isLoading } = useHelloQuery();
  if (isLoading) return <p>...Loading</p>;
  if (data) return <div>{data.hello}</div>;
};

export default hello;
