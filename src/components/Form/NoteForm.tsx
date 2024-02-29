import { FormEvent, useRef, useState } from "react"
import { Button, Col, Form, FormGroup, Row, Stack } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import ReactSelect from "react-select/creatable"
import { Tag } from "../../types"
import { CreateNoteProps } from "./CreateNote"
import { v4 } from 'uuid';

const NoteForm = ({
  onSubmit,
  availableTags,
  createTag,
  markdown= '',
  tags = [],
  title= '',

}: CreateNoteProps) => {
  const titleRef = useRef<HTMLInputElement>(null)
  const markdownRef = useRef<HTMLTextAreaElement>(null)
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags)
  const navigate = useNavigate()
  //form gönderilince
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    //yeni not olustur
    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags,
    })
    //form gönderilince önceki sayfaya yönlendir
    navigate(-1)
  }
  return (
    <Form onSubmit={handleSubmit}
      className="mt-5">
      <Stack>
        {/* ÜST KISIM */}
        <Row>
          <Col>
            <FormGroup>

              <Form.Label>Başlık</Form.Label>
              <Form.Control
              defaultValue={title}
              ref={titleRef}
                required className="shadow" />
            </FormGroup>
          </Col>

          <Col>
            <FormGroup>

              <Form.Label>Etiketler</Form.Label>
              <ReactSelect
                //seçtiğimiz elemanlar sabit kalıyor silinmiyor
                value={selectedTags}
                //elemalar silindiğinde state'i gunceeller
                //@ts-ignore
                onChange={(all_tags) => setSelectedTags(all_tags)
                }
                //yeni etlet olusturulduğunda
                onCreateOption={(text) => {
                  //etikete id ekle
                  const newTag: Tag = { label: text, value: v4() }
                  //lokale yeni etiketi kaydet
                  createTag(newTag);
                  //state'i güncelle
                  setSelectedTags([...selectedTags, newTag])
                }}
                //daha önce olustulanları listele
                options={availableTags}
                className="shadow" isMulti />
            </FormGroup>
          </Col>
        </Row>
        {/* İÇERİK ALANI */}
        <Form.Group className="mt-4">
          <Form.Label>İçerik </Form.Label>
          <Form.Control
          defaultValue={markdown}
            ref={markdownRef}
            as={'textarea'}
            className="shadow"
            style={{ minHeight: '300px', maxHeight: '500px' }}

          />

        </Form.Group>
        {/* BUTONLAR */}
        <Stack direction="horizontal"
          className="justify-content-end mt-5"
          gap={4}
        >
          <Button
            type="submit">Kaydet</Button>

          <Button
            onClick={() => navigate(-1)} //bulunan sayfadan bir adım geri gönderme kısmı
            type="button"
            variant="secondary"
          >Geri</Button>
        </Stack>
      </Stack>

    </Form>
  )
}
export default NoteForm
