import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import ReactQuill, { Quill } from "react-quill";
import ImageUpload from "quill-image-uploader";

// import { ImageResize } from "quill-image-resize-module";
import "react-quill/dist/quill.snow.css";
import { UPLOAD_POST_REQUEST } from "../reducers/post";

Quill.register("modules/imageUpload", ImageUpload);
// Quill.register("modules/imageResize", ImageResize);

const image_src_arr = [];

const modules = {
  toolbar: {
    container: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
    ],
  },
  imageUpload: {
    upload: (file) => {
      return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append("image", file);

        fetch("http://localhost:8020/api/user/uploads", {
          method: "POST",
          body: formData,
        })
          .then((response) => response.json())
          .then((result) => {
            image_src_arr.push(...result);
            resolve(`http://localhost:8020/${result}`);
          })
          .catch((error) => {
            reject("Upload failed");
            console.error("Error:", error);
          });
      });
    },
  },
};
const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

const WritePage = (props) => {
  const [value, setValue] = useState();
  const [title, setTitle] = useState("");
  const [hashtag, setHashtag] = useState("");
  const dispatch = useDispatch();
  // const quillElement = useRef(null);
  // const quillInstance = useRef(null);

  const onChangevalue = (e) => {
    setValue(e);
  };

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const onChangeHashtag = (e) => {
    setHashtag(e.target.value);
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    let hash_arr = hashtag.split("#");
    hash_arr = hash_arr.map((v) => v.replace(",", "").trim());
    hash_arr.shift(0);
    // const formData = new FormData();

    // image_src_arr.map((v, i) => formData.append("image", v));
    // formData.append("content", {
    //   title: title,
    //   description: value,
    //   hashtag: hash_arr,
    // });

    dispatch({
      type: UPLOAD_POST_REQUEST,
      data: {
        image_src_arr,
        title,
        description: value,
        hashtag: hash_arr,
      },
      push: props.history.push,
    });
  };

  return (
    <div className="write-container">
      <form>
        <div style={{ border: "1px solid black" }}>
          <input
            type="text"
            value={title}
            onChange={onChangeTitle}
            placeholder="제목을 입력하세요"
          />
          <ReactQuill
            // ref={quillElement}
            modules={modules}
            formats={formats}
            placeholder={"내용 입력"}
            style={{ width: "500px", height: "300px", border: "1px solid red" }}
            onChange={onChangevalue}
          />
          <div style={{ marginTop: "80px" }}>
            <label>
              <span>해쉬태크</span>
              <input type="text" value={hashtag} onChange={onChangeHashtag} />
            </label>
          </div>
        </div>
      </form>
      <button onClick={onSubmitForm}>작성</button>
    </div>
  );
};

export default WritePage;
