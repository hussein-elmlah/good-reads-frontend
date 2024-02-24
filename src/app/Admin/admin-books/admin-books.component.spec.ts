import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AdminBooksComponent } from "./admin-books.component";

describe("AdminBooksComponent", () => {
    let component: AdminBooksComponent;
    let fixture: ComponentFixture<AdminBooksComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AdminBooksComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(AdminBooksComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
