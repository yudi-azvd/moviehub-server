import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import User from './User';

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

  tmdbId?: string;

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  author?: string;

  @Column()
  author_id?: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'author_id' })
  user?: User;

  @Column()
  movie_id?: number;

  @Column()
  content: string;

  @CreateDateColumn()
  created_at?: Date;

  constructor(id: string, author: string, content: string) {
    this.tmdbId = id;
    this.author = author;
    this.content = content;
  }
}

export default Review;
