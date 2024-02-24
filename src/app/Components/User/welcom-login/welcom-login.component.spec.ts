import { ComponentFixture, TestBed } from "@angular/core/testing";

import { WelcomLoginComponent } from "./welcom-login.component";

describe("WelcomLoginComponent", () => {
    let component: WelcomLoginComponent;
    let fixture: ComponentFixture<WelcomLoginComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [WelcomLoginComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(WelcomLoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
