import React from "react";
import Skeleton from "react-loading-skeleton";

// Email Skeleton component for loading
const Loading: React.FC<{}> = () => {
  return (
    <div>
      <Skeleton height={30} width={120} />
      <Skeleton style={{ marginLeft: "235px" }} height={30} width={120} />
      <Skeleton count={5} />
      <Skeleton
        width={80}
        style={{ marginLeft: "40px" }}
        height={20}
        count={Math.floor(Math.random() * 4)}
      />
    </div>
  );
};
export default Loading;
