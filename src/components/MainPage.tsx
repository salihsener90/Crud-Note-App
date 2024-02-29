import { Form, Button, Col, Row, Stack, FormControl } from "react-bootstrap"
import {  Link } from "react-router-dom"
import ReactSelect from "react-select"
import NoteCard from "./NoteCard"
import { Note, Tag } from "../types"
import { useMemo, useState } from "react"

type MainPageProps = {
  notes: Note[],
  avaliableTags: Tag[],

}
const MainPage = ({avaliableTags,notes}: MainPageProps) => {
  const [title,setTitle] = useState<string>("")
  const [selectedTags,setSelectedTags] = useState<Tag[]>([] )

  //filtreleme: 
  //benim aratığım başlığı içeren note varmı
  //benim sectğim bütün etiketere sahip note varmı
  const filtredNotes = useMemo(
    ()=> notes.filter((note)=>{
      return(
        //note'un başlığı arattığım metni içeriyorsa notları döndür
        (title === "" || note.title.toLocaleLowerCase().includes(title.toLocaleLowerCase()))
        &&
        //seçtiğim etiketlerin tamamı note da varsa notu döndür
        (selectedTags.length === 0 || selectedTags.every((s_tag)=>
        note.tags.some((noteTag) => noteTag.value === s_tag.value)
        ))
      )
    }),
     [ title,selectedTags,notes])
  return (
    <div className="container py-5 ">
      {/* ÜST KISIM */}
      <Stack 
      direction="horizontal" className="justify-content-between">
        <h1>Notlar</h1>
        <Link to={'/new'}>
        <Button>
          Olustur
        </Button>
        </Link>
      </Stack>

      {/* FİLTRELEME ALANI*/}
      <Form className="mt-4">

      <Row>
        <Col>
        <Form.Group>
          <Form.Label>
            Başlığa Göre Ara
          </Form.Label>
          <FormControl
          onChange={(e)=> setTitle(e.target.value)}
          className="shadow"/>
        </Form.Group>
        </Col>
        <Col>
        <Form.Group>
          <Form.Label>Etikete Göre Ara</Form.Label>
          <ReactSelect
          //@ts-ignore
          onChange={(all_tags) => setSelectedTags(all_tags)}
          options={avaliableTags}
          isMulti
          className="shadow"/>
        </Form.Group>
        </Col>
      </Row>
      </Form>
      {/* NOT LİSTESİ */}
      <Row xs={1} sm={2} lg={3} xl={4} className="g-3 mt-4">      
      {
        filtredNotes.map((note) => (
          <Col key={note.id} >
        <NoteCard note= {note}/>
        </Col>
        ))
      }
      </Row>
    </div>
  )
}

export default MainPage
