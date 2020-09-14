import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import { Quill } from "react-quill";
// import ImageUpload from "quill-image-uploader";

// import { ImageResize } from "quill-image-resize-module";
import "../css/quill.snow.css";
import "../css/write.css";
import { UPLOAD_POST_REQUEST } from "../reducers/post";
import { useEffect } from "react";

// Quill.register("modules/imageUpload", ImageUpload);
// Quill.register("modules/imageResize", ImageResize);

const image_src_arr = [];

// const modules = {
//   toolbar: {
//     container: [
//       [{ header: "1" }, { header: "2" }, { font: [] }],
//       [{ size: [] }],
//       ["bold", "italic", "underline", "strike", "blockquote"],
//       [
//         { list: "ordered" },
//         { list: "bullet" },
//         { indent: "-1" },
//         { indent: "+1" },
//       ],
//       ["link", "image", "video"],
//     ],
//   },
//   imageUpload: {
//     upload: (file) => {
//       return new Promise((resolve, reject) => {
//         const formData = new FormData();
//         formData.append("image", file);

//         fetch("http://localhost:8020/api/user/uploads", {
//           method: "POST",
//           body: formData,
//         })
//           .then((response) => response.json())
//           .then((result) => {
//             image_src_arr.push(...result);
//             resolve(`http://localhost:8020/${result}`);
//           })
//           .catch((error) => {
//             reject("Upload failed");
//             console.error("Error:", error);
//           });
//       });
//     },
//   },
// };
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
  const [isOpen, setOpen] = useState(false);
  const [quillOpen, setQuill] = useState(false);

  let Quill =
    quillOpen && typeof window === "object"
      ? require("react-quill")
      : () => false;

  // Quill.register("modules/imageUpload", ImageUpload);
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
    // imageUpload: {
    //   upload: (file) => {
    //     return new Promise((resolve, reject) => {
    //       const formData = new FormData();
    //       formData.append("image", file);

    //       fetch("http://localhost:8020/api/user/uploads", {
    //         method: "POST",
    //         body: formData,
    //       })
    //         .then((response) => response.json())
    //         .then((result) => {
    //           image_src_arr.push(...result);
    //           resolve(`http://localhost:8020/${result}`);
    //         })
    //         .catch((error) => {
    //           reject("Upload failed");
    //           console.error("Error:", error);
    //         });
    //     });
    //   },
    // },
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

  let ReactQuill =
    isOpen && typeof window === "object" ? require("react-quill") : () => false;

  useEffect(() => {
    setOpen(true);
    setQuill(true);
  }, []);

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
        <div>
          <input
            type="text"
            value={title}
            className="write-input"
            onChange={onChangeTitle}
            placeholder="제목을 입력하세요"
          />
          {!!ReactQuill && isOpen && (
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

export default WritePage;
