import { test, expect } from "vitest";
import { GET as bookListGET } from "@/app/api/book-list/route";
import { GET as CardGET } from "@/app/api/card/route";
import { GET as CardsGET } from "@/app/api/cards/route";
import { GET as DeleteGET } from "@/app/api/delete/route";
import Cards from "@/models/cards";
import mongoose from 'mongoose';
import { todayCardId } from "./setup";
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

  expect(data.data).toMatchInlineSnapshot(`
    {
      "__v": 0,
      "_id": "66b485fc6542ae3026d0f057",
      "content": "1111searchValue22222",
      "email": "lalaze1996@gmail.com",
      "nextDay": "2024-08-08",
      "time": 1,
      "title": "today-card",
    }
  `);
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

  expect(data.data).toMatchInlineSnapshot(`
    [
      {
        "__v": 0,
        "_id": "66b485fc6542ae3026d0f057",
        "content": "1111searchValue22222",
        "email": "lalaze1996@gmail.com",
        "nextDay": "2024-08-08",
        "time": 1,
        "title": "today-card",
      },
    ]
  `);
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

  expect(res).toMatchInlineSnapshot(`null`)
});

test("download book", async () => {
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

  expect(res).toMatchInlineSnapshot(`null`)
});

// test("edit card", async () => {});

// test("new card", async () => {});

// test("review card", async () => {});

// test("search card", async () => {});

// test("upload File", async () => {});
