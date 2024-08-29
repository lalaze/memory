import showToast from "@/components/toast";
import { fetchWrapper } from "./api";
import { Selection } from '@/models/selection'

export const isCFIInRange = (cfiA: string, cfiB: string) => {
  const parseCFI = (cfi: string) => cfi.split('!').map(part => part.split('/').filter(p => p));
  const [pathA, positionA] = parseCFI(cfiA);
  const [pathB, positionB] = parseCFI(cfiB);

  for (let i = 0; i < pathB.length; i++) {
    if (pathA[i] !== pathB[i]) {
      return false;
    }
  }

  for (let i = 0; i < positionB.length; i++) {
    if (positionA[i] !== positionB[i]) {
      return false;
    }
  }

  return true;
}

export const saveSelection = async (bookName: string, cfi: string, color: string, tags: string[], content: string, text: string) => {
  const c = cfi.split('/')
  const cfiBase = [c[1], c[2]].join('/')
  const res = await fetchWrapper('/api/selection', {
    method: 'POST',
    body: JSON.stringify({
      cfi,
      cfiBase,
      bookName,
      content,
      tags,
      color,
      text
    })
  })

  return {
    id: res.id,
    cfi,
    cfiBase,
    bookName,
    content,
    tags,
    color,
    text
  }
}

export const updateSelection = async (id: string, obj: Selection) => {
  const res = await fetchWrapper('/api/selection', {
    method: 'PUT',
    body: JSON.stringify({
      id,
      ...obj
    })
  })

  if (!res.success) {
    showToast('error', 'error')
  }
}

export const deleteSelection = async (id: string) => {
  const res = await fetchWrapper(`/api/selection?id=${id}`, {
    method: 'DELETE'
  })

  return res.success
}

export const selectionList = async (bookName: string, cfiBase: string) => {
  const res = await fetchWrapper(`/api/selection?bookName=${bookName}&cfiBase=${cfiBase}`)

  if (res.success) {
    return res.data
  }
}
