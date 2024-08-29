import { useState, useEffect } from "react"
import { selectColorsList } from "@/tailwind.config"
import { DeleteIcon } from "../icon"
import { useAtom } from "jotai"
import { selectToolsStateAtom } from "@/store/index"

const SelecTools = ({ x, y, deleteFunc }: { x: number, y: number, deleteFunc: Function }) => {
  const [color, setColor] = useState(selectColorsList[0])
  const [content, setContent] = useState('')
  const [tags, setTags] = useState<String[]>([])
  const [text, setText] = useState('')
  const [toolsState, setToolsState] = useAtom(selectToolsStateAtom)
  useEffect(() => {
    setColor(toolsState.color)
    setContent(toolsState.content)
    setTags(toolsState.tags)
    setText(toolsState.text)
  }, [toolsState])

  const changeColor = (color: string) => {
    setColor(color)
    setToolsState({
      ...toolsState,
      color
    });
  }

  return <div className="flex justify-center items-center w-70 h-10 px-2 py-2 absolute bg-[#71717A] rounded-lg z-[1000] cursor-pointer" style={{
    left: `${x - 100}px`,
    top: `${y}px`
  }}>
    <div className=" flex justify-around items-center">
      {selectColorsList.map((c, i) => <div onClick={() => changeColor(c)} key={c} className={`px-2 border-r-2`}>
        <div className={`w-5 h-5 rounded-[50%] ${c === color && 'border'}`} style={{
          backgroundColor: c,
        }}></div>
      </div>)}
    </div>
    <div className="ml-2 mb-[3px]" onClick={() => deleteFunc()}>
      <DeleteIcon />
    </div>
  </div>
}

export default SelecTools
