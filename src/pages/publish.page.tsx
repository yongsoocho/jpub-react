import { React, MutableRefObject, useState, useRef, useContext } from "react";
import { Stack, Input, Button } from "@chakra-ui/react";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import { PostContext } from "../context/post.context";
import { useNavigate } from "react-router-dom";

const PublishPage = () => {
  const editorRef = useRef(null) as MutableRefObject<any>;
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const { posts, setPosts } = useContext(PostContext);
  const navi = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    const {
      data: { content, ...newPost },
    }: {
      id: string;
      title: string;
      subTitle: string;
      thumbnail: string;
      content: string;
      createdAt: Date;
      authorId: string;
    } = await axios.post(
      "http://localhost:3000/post",
      {
        title,
        subTitle,
        content: editorRef.current.getContent({ format: "raw" }),
      },
      { withCredentials: true }
    );

    setPosts(() => [newPost, ...posts]);
    navi(`/detail/${newPost.id}`);
  };

  function images_upload_handler(blobInfo, progress): Promise<string> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      const baseURL = "http://localhost:3000";
      xhr.open("POST", `${baseURL}/image`);

      xhr.upload.onprogress = (e) => {
        progress((e.loaded / e.total) * 100);
      };

      xhr.onload = () => {
        if (xhr.status < 200 || xhr.status >= 300) {
          reject("HTTP Error: " + xhr.status);
        }

        resolve(`${baseURL}/${xhr.responseText}`);
      };

      xhr.onerror = () => {
        reject("Image upload failed Code: " + xhr.status);
      };

      const formData = new FormData();
      formData.append("image", blobInfo.blob(), blobInfo.filename());

      xhr.send(formData);
    });
  }

  return (
    <form className="w-[50%] mx-auto py-8" onSubmit={onSubmit}>
      <Stack spacing={8}>
        <Input
          variant="flushed"
          placeholder="Title"
          size="lg"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
        />
        <Input
          variant="flushed"
          placeholder="Sub title"
          size="md"
          value={subTitle}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSubTitle(e.target.value)
          }
        />
        <Editor
          // 발급받은 키
          apiKey="hfpyojmdpfzi521phto7zn3wh1j2bu79yctzeqjqie88hfq4"
          onInit={(evt, editor) => (editorRef.current = editor)}
          init={{
            height: 800,
            menubar: true,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "code",
              "help",
              "wordcount",
            ],
            toolbar:
              "undo redo | blocks | " +
              "bold italic forecolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            automatic_uploads: true,
            images_upload_handler,
          }}
        />

        <Button colorScheme="twitter" type="submit">
          publish
        </Button>
      </Stack>
    </form>
  );
};

export default PublishPage;
