import { Entity, PrimaryColumn, PrimaryGeneratedColumn, Column } from 'typeorm';

export interface APIReview {
  id: string;
  author: string;
  content: string;
}

export interface APIReviewsResponse {
  results: APIReview[];
}

@Entity('reviews')
class Review {
  static tmdbBaseImageUrl = process.env.TMDB_BASE_IMAGE_URL;

  @PrimaryColumn()
  tmdbId?: string;

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  author: string;

  @Column()
  content: string;

  constructor(id = '1', author = 'author', content = 'blah') {
    this.tmdbId = id;
    this.author = author;
    this.content = content;
  }
}

export default Review;
