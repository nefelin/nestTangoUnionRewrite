export interface IndexedSongData {
  songs: SloppedSong[];
  selectIndex: SelectIndex;
}

export type SloppedSong = SimpleTrack & SlopMeta;
export type SelectIndexCount = Record<DropdownCategory, MemberToTrackCount>;

const indexedCategories = ['singer', 'orchestra', 'genre', 'year'] as const;
const dropdownCategories = ['singer', 'orchestra', 'genre'] as const;

export type IndexedCategory = typeof indexedCategories[number];
export type DropdownCategory = typeof dropdownCategories[number];

export type TrackId = SimpleTrack['id'];

export type CategoryMember = string; // in case we want to type differently at some point

export type MemberToTracks = Record<CategoryMember, TrackId[]>;
export type MemberToTrackCount = Record<CategoryMember, number>;

// Index types
export type SelectIndex = Record<IndexedCategory, MemberToTracks>;
export type ReverseSelectIndex = Record<TrackId, Record<IndexedCategory, Array<CategoryMember>>>;
export interface SelectIndexPair {
  index: SelectIndex;
  reverseIndex: ReverseSelectIndex;
}

interface SlopMeta {
  slop: string;
}

export interface SimpleTrack {
  id: number;
  singer?: string[];
  orchestra?: string[];
  title: string;
  genre?: string;
  secondsLong?: number;
  year?: number;
}

export const emptySelectIndex = (): SelectIndex => ({
  orchestra: {},
  genre: {},
  singer: {},
  year: {},
});

export const emptySelectIndexCount = (): SelectIndexCount => ({
  orchestra: {},
  genre: {},
  singer: {},
});