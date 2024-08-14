import { Card, CardFooter, Image, CardBody } from "@nextui-org/react";
import ePub, { Book } from "epubjs";
import { useEffect, useState } from "react";

export default function BookCover({ url }: { url: string }) {
  const [title, setTitle] = useState("");
  const [cover, setCover] = useState("");

  const openBook = async () => {
    try {
      const book = ePub(`/api/download/${url}`, {});
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

  return (
    <Card
      isFooterBlurred
      radius="lg"
      isPressable
      className="border-none w-[200px] h-[200px]"
    >
      <CardBody className="overflow-visible p-0">
        <Image
          alt="Woman listing to music"
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
