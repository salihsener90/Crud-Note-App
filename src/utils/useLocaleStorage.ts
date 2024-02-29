//!CUSTOM HOOK 
//REACT hooklarına benzer sekilde görev yapan 
//projenin ihtiyacına göre kendimiz olsuturdugumuz
//ve görevinin bizim belirlediğimiz hooklardır
//custom hooklar genelde verileri ve veriyi
//güncellemeye yarayan fonksiyonu dizi içerisinde döndürür

import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T){

//1> STATE İN İLK DEGERİN TANIMLA 
//EĞERKİ LOCAL DE BİR DEĞER VARSA ONU AL 
//YOKSA GELENİNİTİAL STATE İ KULLAN
const [value, setValue] = useState<T>(()=> {
    //localden ilgili değeri al
    const jsonValue = localStorage.getItem(key);
//localde eleman yoksa iinitial value u ilk değer olsun
    if(jsonValue === null ) {
        return initialValue;
        } else {
            //localde eleman varsa localdeki  veri ilk deger olsun
            return JSON.parse(jsonValue);
        }
})

//2> STATE HER DEĞİŞTİĞİNDE LOCALİ GÜNCELLE
useEffect(()=> {
localStorage.setItem(key, JSON.stringify(value));
}, [key,value]) 
//3 STATE'İ VE GÜNCELLEMEYE YARAYAN FONKSİYONU DÖNDÜR
// tuple ile tip tanımladık  ilk elemanun tipi 
// generic tip olarak gelen tipte 
// ikinci elemanın tipi ise sabit olarak
// carsayılan tipi olacak
return [value,setValue] as [T,typeof setValue ]
}