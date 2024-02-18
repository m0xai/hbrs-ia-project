import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";

interface accountsResponse {
  salesmen: any[];
  customers: any[];
}

@Injectable({
  providedIn: "root",
})
export class OpenCRXService {
  constructor(private http: HttpClient) {}

  listAccounts(): Observable<any[]> {
    return this.http.get<any[]>(environment.apiEndpoint + "/api/orders/accounts", {
      withCredentials: true,
    });
  }

  listCustomers(): Observable<any[]> {
    return this.http.get<any[]>(environment.apiEndpoint + `/api/orders/accounts/customer`, {
      withCredentials: true,
    });
  }

  listSalesmen(): Observable<any[]> {
    return this.http.get<any[]>(environment.apiEndpoint + `/api/orders/accounts/salesman`, {
      withCredentials: true,
    });
  }

  getCustomerAccount(uid: string | number): Observable<any[]> {
    return this.http.get<any[]>(environment.apiEndpoint + `/api/orders/accounts/customer/${uid}`, {
      withCredentials: true,
    });
  }

  getSalesmanAccount(uid: string | number): Observable<any[]> {
    return this.http.get<any[]>(environment.apiEndpoint + `/api/orders/accounts/salesman/${uid}`, {
      withCredentials: true,
    });
  }

  getSalesmanContracts(uid: string | number): Observable<object> {
    return this.http.get<object>(
      environment.apiEndpoint + `/api/orders/accounts/salesman/${uid}/contracts`,
      {withCredentials: true},
    );
  }

  listProducts(): Observable<object> {
    return this.http.get<object>(environment.apiEndpoint + `/api/orders/products`, {
      withCredentials: true,
    });
  }

  getSalesOrderData(contractID: string | undefined): Observable<object> {
    if (!contractID) return;

    return this.http.get<object>(environment.apiEndpoint + `/api/orders/salesOrder/${contractID}`, {
      withCredentials: true,
    });
  }

  getSalesOrderPosition(contractID: string): Observable<object> {
    return this.http.get<object>(
      environment.apiEndpoint + `/api/orders/salesOrder/${contractID}/position`,
      {withCredentials: true},
    );
  }
}
