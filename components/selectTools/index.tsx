import { useState, useEffect } from "react"
import { selectColorsList } from "@/tailwind.config"
import { useAtom } from "jotai"
import { selectToolsStateAtom } from "@/store/index"

const SelecTools = ({ x, y }: { x: number, y: number }) => {
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

  return <div className="w-40 h-10 px-2 py-2 absolute bg-[#71717A] rounded-lg flex justify-around items-center z-[1000]" style={{
    left: `${x - 100}px`,
    top: `${y}px`
  }}>
    {selectColorsList.map((c, i) => <div onClick={() => changeColor(c)} key={c} className={`px-2 ${i === selectColorsList.length - 1 ? 'border-0' : 'border-r-2'}`}>
      <div className={`w-5 h-5 rounded-[50%] ${c === color && 'border'}`} style={{
        backgroundColor: c,
      }}></div>
    </div>)}
  </div>
}

export default SelecTools
