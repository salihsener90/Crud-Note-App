import { useOutletContext } from "react-router-dom"
import NoteForm from "./NoteForm"
import { Note, NoteData, Tag } from "../../types";

type EditNoteProps = {
  onSubmit: (id:string,data:NoteData) => void;
  createTag: (tag:Tag) => void;
  avaliabletags:Tag[]
}

const EditNote = ({onSubmit,createTag,avaliabletags}:EditNoteProps) => {
  const data:Note= useOutletContext()
  return (
    <div className="container py-5">
     
     <h2>Note'u Düzenle</h2>
     <NoteForm
     //onsubmiti noteform da 1 parametre alan fonskiyon seklınde 
     //tanımladık ama guncelleme fonksiyon 2 parametre alıyor
     //bu yuzden tek parametre alan bir fonksiyon tanımlayıp 
     //içerisinde guncelleme fonksiyon calıstrıdık
     onSubmit={(updateNote)=> {
      onSubmit(data.id, updateNote);
     }}
     createTag={createTag}
     availableTags={avaliabletags}
     title= {data.title}
     tags={data.tags}
     markdown={data.markdown}



/>
     
    </div>
  )
}

export default EditNote
