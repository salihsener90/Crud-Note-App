import { NoteData, Tag } from "../../types"
import NoteForm from "./NoteForm"

export type CreateNoteProps = {
  onSubmit: (data:NoteData) => void;
  createTag : (tag: Tag) => void;
  availableTags: Tag[];
} & Partial <NoteData>; //partials sayesinde miras aldığımız butun verileri zorunlu 
//olması yerine opsiyonel yaptık

const CreateNote = ( {
   onSubmit,
    createTag, 
    availableTags
   }:CreateNoteProps) => {
  return (
    <div className="container py-5">
      <h2>Yeni Not Olustur</h2>
      <NoteForm 
       onSubmit ={onSubmit} 
       createTag={createTag} 
       availableTags={availableTags} 
       />
    </div>
  )
}

export default CreateNote
