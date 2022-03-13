import { JSDOM } from "jsdom";
import {describe, expect, test} from '@jest/globals'
import { PrerenderData } from "../../src/shared/PrerenderedData";

const getHtml = () => `
<html>
    <head>
    <head/>
    <body>
    </body>
</html>`

describe("PrerenderData", () => {

    test("general tests", () => {
    
        const expected = {
            name: "name",
            value: 1,
            nested: {
                otherName: "other name",
                otherData: true
            }
        };
    
        const dataTag = PrerenderData.saveToDom(expected);
        const html = getHtml().replace("<body>", `<body>${  dataTag}`);
        globalThis.window = new JSDOM(html, {
            runScripts: "dangerously"
        }).window as unknown as (Window & typeof globalThis);
    
        let actual = PrerenderData.readFromDom(true);
        expect(actual).toEqual(expected);

        actual = PrerenderData.readFromDom();
        expect(actual).toBeNull();
    
    });

});