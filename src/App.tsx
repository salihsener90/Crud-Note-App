
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import CreateNote from './components/Form/CreateNote'
import EditNote from './components/Form/EditNote'
import { useMemo} from 'react'
import { NoteData, RawNote, Tag } from './types'
import { v4 } from 'uuid'
import { useLocalStorage } from './utils/useLocaleStorage'
import MainPage from './components/MainPage'
import DetailPage from './components/DetailPage'
import Layout from './components/Layout'

const App = () => {
  const [notes,setNotes] = useLocalStorage<RawNote[]>('NOTES',[]) 
  const [tags,setTags] = useLocalStorage<Tag[]>('TAGS', []) 

  //note verilerindeki  etiket id lerine göre
  // etiketlerin isimlerini al ve notlara ekle 
  //her render sırasında tekrardan bütün bote ların etiketelrini 
  //tekrar hesaplamaması için useMemo kullancaz
  const noteWithTags = useMemo (
    ()=>
    notes.map((note) =>({
    ...note,
    tags: tags.filter((tag) => note.tagIds.includes(tag.value))
  })), [notes,tags])
 
  //yeni not olustur
   //lokale notu eklerken notun etiketlerinin
   //sadece id sini ekleycez

  const addNote = ({tags, ...data} : NoteData) => {
    //yeni notu olsuturma 
    const newnote = {
      id:v4(),
      ...data,
      tagIds:tags.map((tag) => tag.value) //etiketlerin sadcce id lerini aldık
    }
    //state e yeni not ekledik
    //setState fonksiyonlarında fonksiyon tanımlayınca 
    //fonksiyon paramatre olarak state deki verileri alır
    setNotes((prevNotes) => [...prevNotes, newnote])
  }
  
      //yeni etiket olustur
   const createTag = (tag: Tag) => { 
    setTags((prevTags)=> [...prevTags, tag])
    }
//note'u sil 
const deleteNote = (id: string) => {
setNotes((prev)=> prev.filter((n)=> n.id !==id))
}


//note'u güncelle 
const  updateNote = (id:string,{tags, ...data}:NoteData) => {
//guncellenecek note'un state'de tuttugumuz halini 
//bulucaz onu kaldırıp yerşne gönderilen yeni note'u koycaz
//bunu yaparken etiketlerin sadece id lerini alcaz
const updated = notes.map((note) => (note.id === id ? {
  ...note,//state deki note'un bilgileri
  ...data,//state deki note'un güncel bilgileri
  tagIds:tags.map((tag) => tag.value)//note'un yeni id'leri
}:note))
//state i guncelle
setNotes(updated);
}

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage avaliableTags={tags} notes={noteWithTags}/> }  />
        <Route path='/new' element={
           <CreateNote 
           availableTags={tags}
           createTag={createTag}
            onSubmit={addNote}
            />
          } 
             />

        <Route element={<Layout notes={noteWithTags} />} path='/:id'>
          <Route index element={ <DetailPage deleteNote={deleteNote}/>} />
          <Route path='edit' element={ <EditNote
          avaliabletags={tags}
          createTag={createTag}
          onSubmit={updateNote} /> } />
        </Route>
       <Route path='*' element={ <Navigate to = "/"/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
