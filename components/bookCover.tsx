import { Card, CardFooter, Image, CardBody } from "@nextui-org/react";
import ePub from "epubjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function BookCover({ url, bookId, target }: { url: string, bookId: string, target: string }) {
  const [title, setTitle] = useState("");
  const [cover, setCover] = useState("");
  const router = useRouter();

  const openBook = async () => {
    try {
      const book = ePub(`/api/book/${url}?id=${bookId}`, {});
      book.loaded.metadata.then((m) => {
        setTitle(m.title);
      });
      book.coverUrl().then((url) => {
        setCover(String(url));
      });
    } catch (error) {
      // Handle any errors that occur during the loading process
      console.error("Failed to load book:", error);
    }
  };

  useEffect(() => {
    openBook();
  }, []);

  const goBook = () => {
    if (target === 'note') {
      router.push(`/note?bookId=${bookId}`)
    } else {
      router.push(`/book/${url}?bookId=${bookId}`)
    }
  }

  return (
    <Card
      isFooterBlurred
      radius="lg"
      isPressable
      className="border-none w-[200px] h-[200px]"
      onPress={goBook}
    >
      <CardBody className="overflow-visible p-0">
        <Image
          alt="image"
          className="object-cover"
          height={200}
          src={cover}
          width={200}
        />
      </CardBody>
      <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <p className="text-tiny text-white/80">{title}</p>
      </CardFooter>
    </Card>
  );
}
