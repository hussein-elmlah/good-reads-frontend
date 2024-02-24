import { TestBed } from "@angular/core/testing";

import { BokksService } from "./bokks.service";

describe("BokksService", () => {
    let service: BokksService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(BokksService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
