import { Injectable } from '@angular/core';
import { ApiService } from '../_core/api.service';
import { Review } from '../../models/Review';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class ReviewService extends ApiService<Review> {
    constructor(private http: HttpClient) {
        super(http, Review, 'reviews/');
    }
}
