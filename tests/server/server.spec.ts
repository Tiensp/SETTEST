import { Express } from "express";
import request from "supertest";
import { beforeAll, describe, expect, test } from '@jest/globals'
import createServer from "../../src/server/server";

let server: Express;


beforeAll(() => {
    server = createServer();
})

describe("Server requests", ()=> {
    
    test("test home route", async () => {
    
        const response = await request(server).get("/");
    
        expect(response.statusCode).toBe(200);
        expect(response.headers["content-type"]).toMatch(/text\/html/);
        expect(response.text).toMatch(/<title>Document<\/title>/);
    
    });
    
    test("test serving static content", async () => {
    
        const response = await request(server).get("/foo.js");
    
        expect(response.statusCode).toBe(200);
        expect(response.header["content-type"]).toMatch("application/javascript; charset=UTF-8");
        expect(response.text).toMatch(/console.log\('foo'\);/);
    
    });

    
    test("test user page route", async () => {
    
        const response = await request(server).get("/user");
    
        expect(response.statusCode).toBe(200);
        expect(response.headers["content-type"]).toMatch(/text\/html/);
        expect(response.text).toMatch(/Ta\sQuang\sTien/);
    
    });

});