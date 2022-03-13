/**
 * @jest-environment jsdom
 */

 import { describe, expect, test } from '@jest/globals'

describe("Sample", () => {
    
    test("sample test", () => {
    
        expect(window).toBeDefined();
    
    });

});

