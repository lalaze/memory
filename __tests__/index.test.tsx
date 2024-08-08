import { test, expect } from "vitest";
import { GET } from "@/app/api/book-list/route";
import { NextRequest } from "next/server";

test("Page", async () => {
    const headers = {
      'Content-Type': 'application/json',
      'accept-language': 'en-US',
      'email': process.env.TEST_EMAIL || ''
    }

    const params = {
      headers: headers,
      method: "GET"
    }

    const req = await GET(new NextRequest("http://doesntmatter", params));

    const data = await req.json()

    expect(req).toBeDefined();
});
