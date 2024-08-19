import { test, expect } from "vitest";
import { GET as bookListGET } from "@/app/api/book-list/route";
import { GET as CardGET } from "@/app/api/will-delete/card/route";
import { GET as CardsGET } from "@/app/api/will-delete/cards/route";
import { GET as DeleteGET } from "@/app/api/will-delete/delete/route";
import { GET as DownloadGET } from "@/app/api/book/[file]/route";
import { POST as EditPOST } from "@/app/api/will-delete/edit/route";
import { POST as NewPOST } from "@/app/api/will-delete/new/route";
import { GET as ReviewGET } from "@/app/api/review/route";
import { POST as SearchPOST } from "@/app/api/search/route";
import { POST as UploadPost } from "@/app/api/book-upload/route";
import Cards from "@/models/cards";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { FormData, File, Blob } from "formdata-node";
import { todayCardId, testFileName } from "./setup";
import { NextRequest } from "next/server";

test("get book List", async () => {
  const headers = {
    "Content-Type": "application/json",
    "accept-language": "en-US",
    email: process.env.TEST_EMAIL || "",
  };

  const params = {
    headers: headers,
    method: "GET",
  };

  const req = await bookListGET(new NextRequest("http://doesntmatter", params));

  const data = await req.json();

  expect(data.data).toMatchInlineSnapshot(`
    [
      {
        "name": "test.epub",
      },
    ]
  `);
});

test("get card", async () => {
  const headers = {
    "Content-Type": "application/json",
    "accept-language": "en-US",
    email: process.env.TEST_EMAIL || "",
  };

  const params = {
    headers: headers,
    method: "GET",
  };

  const req = await CardGET(new NextRequest("http://doesntmatter", params));

  const data = await req.json();

  expect(data.data._id).toMatchInlineSnapshot(`"66b485fc6542ae3026d0f057"`);
});

test("card-list", async () => {
  const headers = {
    "Content-Type": "application/json",
    "accept-language": "en-US",
    email: process.env.TEST_EMAIL || "",
  };

  const params = {
    headers: headers,
    method: "GET",
  };

  const req = await CardsGET(new NextRequest("http://doesntmatter", params));

  const data = await req.json();

  expect(data.data._id).toMatchInlineSnapshot(`undefined`);
});

test("delete card", async () => {
  const headers = {
    "Content-Type": "application/json",
    "accept-language": "en-US",
    email: process.env.TEST_EMAIL || "",
  };

  const params = {
    headers: headers,
    method: "GET",
  };

  const req = await DeleteGET(
    new NextRequest(`http://doesntmatter?id=${todayCardId}`, params)
  );

  const res = await Cards.findOne({
    _id: new mongoose.Types.ObjectId(todayCardId),
  });

  expect(res).toMatchInlineSnapshot(`null`);
});

test("download book", async () => {
  const headers = {
    "Content-Type": "application/json",
    "accept-language": "en-US",
    email: process.env.TEST_EMAIL || "",
  };

  const params = {
    headers: headers,
    method: "POST",
  };

  const res = await DownloadGET(
    new NextRequest(`http://doesntmatter/${testFileName}`, params)
  );

  expect(res.status).toMatchInlineSnapshot(`200`);
});

test("edit card", async () => {
  const headers = {
    "Content-Type": "application/json",
    "accept-language": "en-US",
    email: process.env.TEST_EMAIL || "",
  };

  const params = {
    headers: headers,
    method: "POST",
    body: JSON.stringify({
      title: "today-card-edit",
      content: "1111searchValue22222",
      id: todayCardId,
    }),
  };

  const res = await EditPOST(new NextRequest(`http://doesntmatter/`, params));

  const data = await res.json();

  expect(data.success).toMatchInlineSnapshot(`true`);
});

test("new card", async () => {
  const headers = {
    "Content-Type": "application/json",
    "accept-language": "en-US",
    email: process.env.TEST_EMAIL || "",
  };

  const params = {
    headers: headers,
    method: "POST",
    body: JSON.stringify({
      title: "today-card-new",
      content: "1111searchValue22222",
    }),
  };

  const res = await NewPOST(new NextRequest(`http://doesntmatter/`, params));

  const data = await res.json();

  expect(data.success).toMatchInlineSnapshot(`true`);
});

test("review card", async () => {
  const headers = {
    "Content-Type": "application/json",
    "accept-language": "en-US",
    email: process.env.TEST_EMAIL || "",
  };

  const params = {
    headers: headers,
    method: "GET",
  };

  const res = await ReviewGET(
    new NextRequest(`http://doesntmatter/?id=${todayCardId}`, params)
  );

  const data = await res.json();

  expect(data.success).toMatchInlineSnapshot(`true`);
});

test("search card", async () => {
  const headers = {
    "Content-Type": "application/json",
    "accept-language": "en-US",
    email: process.env.TEST_EMAIL || "",
  };

  const params = {
    headers: headers,
    method: "POST",
    body: JSON.stringify({
      content: "searchValue",
    }),
  };

  const res = await SearchPOST(new NextRequest(`http://doesntmatter/`, params));

  const data = await res.json();

  expect(data.data.length).toMatchInlineSnapshot(`1`);
});

test("upload File", async () => {
  const headers = {
    "Content-Type": "multipart/form-data",
    email: process.env.TEST_EMAIL || "",
    get(name: string) {
      return (this as any)[name];
    }
  };

  const filePath = path.join(__dirname, "./alice.epub");

  const file = fs.readFileSync(filePath);

  const formData = new FormData();

  const b = new Blob([file])

  formData.set("file", b, "test_upload.epub");

  const params = {
    headers: headers,
    method: "POST",
    body: formData,
    formData: () => {
      return formData;
    },
  };

  // const res = await UploadPost( new NextRequest(`http://doesntmatter/`, params))
  const res = await UploadPost(params as any);

  const data = await res.json();

  expect(data.success).toMatchInlineSnapshot(`true`);
});
