import { Card, Image, CardBody, Stack, Heading, Text } from "@chakra-ui/react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

export type PostCardProps = {
  postId: number;
  title: string;
  subTitle: string;
  thumbnail: string | undefined;
  createdAt: string;
};

const PostCard = (props: Partial<PostCardProps>) => {
  const navi = useNavigate();

  const routeToDetailPage = useCallback(() => {
    navi(`/detail/${props.postId}`);
  }, [navi, props.postId]);

  return (
    <Card
      className="hover:cursor-pointer hover:shadow-lg duration-300"
      onClick={routeToDetailPage}
    >
      <CardBody>
        <Image
          src={
            props.thumbnail ??
            "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          }
          alt="thumbnail"
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">{props.title ?? "Living room Sofa"}</Heading>
          <Text fontSize="lg">
            {props.subTitle ??
              `This sofa is perfect for modern tropical spaces, baroque inspired
               spaces, earthy toned spaces and for people.`}
          </Text>
          <Text color="gray.400" fontSize="md">
            {props.createdAt
              ? moment(props.createdAt).fromNow()
              : moment(new Date(2023, 7, 19, 9, 30)).fromNow()}
          </Text>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default PostCard;
