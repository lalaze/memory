import dynamic from "next/dynamic";
import { useRef, forwardRef, useState, useEffect } from "react";
import { fetchWrapper } from "../utils/api";
import showToast from "./toast";
import { useGlobalState } from "./view";

const Editor = dynamic(() => import("./editor"), { ssr: false });
// eslint-disable-next-line react/display-name
const ForwardedEditor = forwardRef((props, ref) => (
  <Editor {...props} editorRef={ref} />
));

const Card = () => {
  const { card, session } = useGlobalState();
  const editorRef = useRef<any>(null);
  const [titleValue, setTitleValue] = useState(card?.title || "新卡片");

  const handleClickSave = async () => {
    if (editorRef.current && editorRef.current.editor) {
      const data = await editorRef.current.editor.save();
      const res = await fetchWrapper("/api/new", {
        method: "POST",
        body: JSON.stringify({
          title: titleValue,
          content: data,
          email: session.user?.email
        }),
      });
      if (res.success) {
        setTitleValue('新卡片')
        editorRef.current.editor.clear();
        showToast("save success", "success");
      }
    } else {
      showToast("发生错误", "error");
    }
  };

  const handleChange = (event: any) => {
    setTitleValue(event.target.value);
  };

  return (
    <div className="card bg-gray-300 text-primary-content shadow-sm w-5/6 h-5/6 card-heigh">
      <div className="card-body h-full">
        <input
          type="text"
          placeholder="新卡片"
          value={titleValue}
          onChange={handleChange}
          className="input bg-gray-300 w-full"
        />
        <ForwardedEditor ref={editorRef} />
        <button
          className="btn btn-primary w-36 absolute text-white right-6 bottom-6 z-10"
          onClick={handleClickSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Card;
