import { useState, useEffect } from "react"
import { selectColorsList } from "@/tailwind.config"
import { DeleteIcon, EidtIcon } from "../icon"
import { useAtom } from "jotai"
import SelectionContent from './content'
import { selectToolsStateAtom } from "@/store/index"

const SelecTools = ({ x, y, deleteFunc }: { x: number, y: number, deleteFunc: Function }) => {
  const [color, setColor] = useState(selectColorsList[0])
  const [content, setContent] = useState(false)
  const [tags, setTags] = useState<String[]>([])
  const [text, setText] = useState('')
  const [toolsState, setToolsState] = useAtom(selectToolsStateAtom)

  useEffect(() => {
    setColor(toolsState.color)
    // setContent(toolsState.content)
    // setTags(toolsState.tags)
    // setText(toolsState.text)
  }, [toolsState])

  const changeColor = (color: string) => {
    setColor(color)
    setToolsState({
      ...toolsState,
      color
    });
  }

  const openContent = () => {
    setContent(true)
  }

  return <div className="absolute z-[1000]" style={{
    left: `${x - 100}px`,
    top: `${y}px`
  }}>
    {content ? <SelectionContent content={toolsState.content}></SelectionContent> : <div className="flex justify-center items-center w-70 h-10 px-2 bg-[#71717A] rounded-lg cursor-pointer">
      <div className="mr-0.5 border-r-2 h-full flex items-center" onClick={openContent}>
        <EidtIcon />
      </div>
      <div className=" flex justify-around items-center h-full">
        {selectColorsList.map((c, i) => <div onClick={() => changeColor(c)} key={c} className={`px-2 border-r-2 h-full flex items-center`}>
          <div className={`w-5 h-5 rounded-[50%] ${c === color && 'border'}`} style={{
            backgroundColor: c,
          }}></div>
        </div>)}
      </div>
      <div className="ml-2 h-full flex items-center" onClick={() => deleteFunc()}>
        <DeleteIcon />
      </div>
    </div>}

  </div>

}

export default SelecTools
