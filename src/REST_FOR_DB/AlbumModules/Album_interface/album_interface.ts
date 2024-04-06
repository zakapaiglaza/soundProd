import { ObjectId } from 'mongodb';

export interface Album {
    title: string;
    artist: string;
    sound: Sound[];
    likeForUser: ObjectId[];
}


export interface Sound {
    _id?: ObjectId;
    title: string;
    url: string;
}


export interface AlbumP {
    title: string;
    artist: string;
    image: string;
    url: string;
}


export interface SoundP {
    title: string;
    url: string;
}