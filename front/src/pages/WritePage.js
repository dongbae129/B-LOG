import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import { Quill } from "react-quill"; //이거
// import ImageUpload from "quill-image-uploader"; //이거

// import { ImageResize } from "quill-image-resize-module";
import "../css/quill.snow.css";
import "../css/write.css";
import { UPLOAD_POST_REQUEST } from "../reducers/post";
import { useMemo } from "react";

// Quill.register("modules/imageUpload", ImageUpload);
// Quill.register("modules/imageResize", ImageResize);

let image_src_arr = [];
// let Quill = typeof window !== "undefined" && require("quill");
// let ImageUpload =
//   typeof window !== "undefined" && require("quill-image-upload");
// Quill.register("modules/imageUpload", ImageUpload.constructor);
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
const uploadImage = {
  upload: (file) => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("image", file);

      fetch("http://211.193.71.154:8020/api/user/uploads", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((result) => {
          image_src_arr.push(...result);
          resolve(`http://211.193.71.154:8020/${result}`);
        })
        .catch((error) => {
          reject("Upload failed");
          console.error("Error:", error);
        });
    });
  },
};

const WritePage = (props) => {
  const [value, setValue] = useState();
  const [title, setTitle] = useState("");
  const [hashtag, setHashtag] = useState("");

  console.log(image_src_arr, "&&&&&");
  let Quill = useMemo(
    () => (typeof window === "object" ? require("quill") : null),
    []
  );
  let ImageUpload = useMemo(
    () =>
      typeof window === "object"
        ? require("quill-image-uploader").default
        : null,
    []
  );

  Quill &&
    ImageUpload &&
    Quill.register("modules/imageUpload", ImageUpload, true);
  console.log(value, "!!");

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
    imageUpload: uploadImage,
  };

  let ReactQuill =
    typeof window === "object" ? require("react-quill") : () => false;

  const dispatch = useDispatch();

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
    image_src_arr = [];
    setValue(null);
  };

  return (
    <div className="write-container">
      <form>
        <div>
          <input
            type="text"
            value={title}
            className="write-input"
            onChange={onChangeTitle}
            placeholder="제목을 입력하세요"
          />
          {!!ReactQuill && (
            <ReactQuill
              modules={modules}
              formats={formats}
              placeholder={"내용 입력"}
              style={{
                height: "550px",
                marginTop: "20px",
                paddingBottom: "55px",
              }}
              onChange={onChangevalue}
            />
          )}
        </div>
        <div>
          <div>
            <label>
              <span style={{ marginRight: "10px" }}>해쉬태크</span>
              <input type="text" value={hashtag} onChange={onChangeHashtag} />
            </label>
          </div>

          <button className="write-button" onClick={onSubmitForm}>
            작성
          </button>
        </div>
      </form>
    </div>
  );
};

export default React.memo(WritePage);
