import dynamic from "next/dynamic";
import { useRef, forwardRef, useState, useEffect } from "react";
import { fetchWrapper } from "../utils/api";
import showToast from "./toast";
import { useGlobalState } from "./view";

type Params = {
  onNewCard?: Function
}

const Editor = dynamic(() => import("./editor"), { ssr: false });
// eslint-disable-next-line react/display-name
const ForwardedEditor = forwardRef((props, ref) => (
  <Editor {...props} editorRef={ref} />
));

const Card = (params: Params) => {
  const { card, session, componentName } = useGlobalState();
  const editorRef = useRef<any>(null);
  const [titleValue, setTitleValue] = useState(card?.title || "new Card");

  const handleClick = async () => {
    if (componentName === 'review' && params.onNewCard) {
      const res = await fetchWrapper(`/api/review?id=${card?._id}&email=${session.user?.email}`)
      if (res.success) {
        params.onNewCard(true)
      }
    } else if (componentName === 'edit') {
      if (editorRef.current && editorRef.current.editor) {
        const data = await editorRef.current.editor.save();
        const res = await fetchWrapper("/api/edit", {
          method: "POST",
          body: JSON.stringify({
            title: titleValue,
            content: data,
            id: card?._id,
            email: session.user?.email
          }),
        });
        if (res.success) {
          showToast("save success", "success");
        }
      } else {
        showToast("error", "error");
      }
    } else {
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
          setTitleValue('new Card')
          editorRef.current.editor.clear();
          showToast("save success", "success");
        }
      } else {
        showToast("error", "error");
      }
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
          placeholder="new Card"
          value={titleValue}
          onChange={handleChange}
          className="input bg-gray-300 w-full"
        />
        <ForwardedEditor ref={editorRef} />
        <button
          className="btn btn-primary w-36 absolute text-white right-6 bottom-6 z-10"
          onClick={handleClick}
        >
          {componentName === 'review' ? 'Finished' : 'Save'}
        </button>
      </div>
    </div>
  );
};

export default Card;
