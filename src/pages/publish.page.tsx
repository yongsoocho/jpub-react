import { useState } from "react";
import { Stack, Input, Button } from "@chakra-ui/react";
import { Editor } from "react-draft-wysiwyg";
import { DraftHandleValue, EditorState, convertToRaw } from "draft-js";
import draftjsToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import axios from "axios";

const PublishPage = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [content, setContent] = useState("");

  const onEditorStateChange = async (state) => {
    await setEditorState(state);
    const html = draftjsToHtml(convertToRaw(editorState.getCurrentContent()));
    setContent(html);
  };

  const uploadCallback = async (file: Blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = async () => {
        const formData = new FormData();
        formData.append("image", file);
        const res = await axios.post("http://localhost:3000/image", formData);

        resolve({ data: { link: res.data } });
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <form className="w-[50%] mx-auto py-8">
      <Stack spacing={8}>
        <Input variant="flushed" placeholder="Title" size="lg" />
        <Input variant="flushed" placeholder="Sub title" size="md" />
        <Editor
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
          toolbar={{
            image: { uploadCallback },
          }}
          localization={{ locale: "ko" }}
          editorStyle={{
            height: "800px",
            width: "100%",
            border: "1px solid lightgray",
            padding: "12px",
          }}
        />
        <Button colorScheme="twitter">publish</Button>
      </Stack>
    </form>
  );
};

export default PublishPage;
