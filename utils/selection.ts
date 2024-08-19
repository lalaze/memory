import { fetchWrapper } from "./api";

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

export const saveSelection = async (bookName: string, cfi: string, color: string, tags: string[], content: string) => {
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
      color
    })
  })
}

export const selectionList = async (bookName: string, cfiBase: string) => {
  const res = await fetchWrapper(`/api/selection?bookName=${bookName}&cfiBase=${cfiBase}`)

  if (res.success) {
    return res.data
  }
}
