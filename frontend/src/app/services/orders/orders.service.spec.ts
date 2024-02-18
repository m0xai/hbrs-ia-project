import {TestBed} from "@angular/core/testing";
import {OpenCRXService} from "./orders.service";

describe("OrdersService", () => {
  let service: OpenCRXService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenCRXService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
