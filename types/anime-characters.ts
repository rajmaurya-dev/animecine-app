export interface CharacterImage {
  image_url: string;
  small_image_url: string;
}

export interface CharacterImages {
  jpg: CharacterImage;
  webp: CharacterImage;
}

export interface Character {
  mal_id: number;
  url: string;
  images: CharacterImages;
  name: string;
}

export interface VoiceActorImage {
  image_url: string;
}

export interface VoiceActorImages {
  jpg: VoiceActorImage;
}

export interface Person {
  mal_id: number;
  url: string;
  images: VoiceActorImages;
  name: string;
}

export interface VoiceActor {
  person: Person;
  language: string;
}

export interface AnimeCharacter {
  character: Character;
  role: string;
  voice_actors: VoiceActor[];
}

export interface GetAnimeCharactersResponse {
  data: AnimeCharacter[];
}
