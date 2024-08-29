import { useState, useEffect } from "react";

export const fetchWrapper = async (url: string, options = {}) => {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      // 处理HTTP错误
      const error = new Error(`HTTP error! Status: ${response.status}`);
      error.message = JSON.stringify(response);
      throw error;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // 处理其他类型的错误，比如网络错误
    console.error('Fetch error:', error);
    throw error; // 或者返回一个自定义的错误对象
  }
};

export const useFetchBook = (bookName: string, id: string, dependencies = []) => {
  const [url, setUrl] = useState('');
  const [hash, setHash] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/book/${bookName}?id=${id}`)
      const h = String(res.headers.get('Hash'))
      const localUrl = URL.createObjectURL(await res.blob());
      setUrl(localUrl)
      setHash(h)
    }

    fetchData()
  }, dependencies)

  return {url, hash}
}
