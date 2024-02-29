//notedata'nın tilplerini miras al ve üzerine id ekle
export type Note ={
    id:string;
} & NoteData;

export type NoteData ={
    title:string;
    markdown:string;
    tags:Tag[];
}


export type Tag ={
    label:string;
    value:string;
}
//verileri lokalde tutarken etiketlerin
//sadece is'sini tutucaz b yuzden 
//bunun için yeni brir tip olusturalım
export type RawNote ={
    id:string;
} & RawNoteData;

export type RawNoteData ={
    title:string;
    markdown:string;
    tagIds:string[]; //note'ların id lerini lokalde saklayacagımız için boyle kullanım yaparız
}