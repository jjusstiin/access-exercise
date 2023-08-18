import { useLazyLoadQuery } from "react-relay";
import { graphql } from "relay-runtime";
import Story from "./Stroy";

export default function Newsfeed({}) {
  //   const data = useLazyLoadQuery<NewsfeedQueryType>(NewsfeedQuery, {});
  //   const story = data.topStory;
  //   console.log(story);

  return (
    <div className="newsfeed">
      <Story />
    </div>
  );
}
