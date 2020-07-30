/* eslint-disable no-underscore-dangle */
export interface APIActor {
  id: string;
  name: string;
  character: string;
  profile_path: string;
}

export interface APICredits {
  cast: APIActor[];
}

class Actor {
  static tmdbBaseImageUrl = process.env.TMDB_BASE_IMAGE_URL;

  id: string;

  name: string;

  character: string;

  profilePath: string;

  constructor({ id, name, character, profile_path }: APIActor) {
    this.id = id;
    this.name = name;
    this.character = character;
    this.profilePath = `${Actor.tmdbBaseImageUrl}/w138_and_h175_face${profile_path}`;
  }
}

export default Actor;
