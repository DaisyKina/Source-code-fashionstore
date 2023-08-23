import { Breadcrumb, Button, Form, Input, Upload } from "antd"
import { Editor } from '@tinymce/tinymce-react';
import { useRef, useState } from "react";
import { UploadOutlined } from '@ant-design/icons';
import { createProduct, editProduct } from "../../services";
import {toast} from 'react-hot-toast'
import { useParams } from "react-router-dom";

const AddEditProduct = () => {
    const {id} = useParams()
    const editorRef = useRef(null);
    const [description, setDescription] = useState("")
    const [content, setContent] = useState("")
    const [image, setImage] = useState(null)

    const [form] = Form.useForm();

    const getProduct = async () => {
        try{
            const result = await getProductById(id)

            setContent(result.data?.content)
            setDescription(result.data?.description)
            setImage(result.data?.image)
            form.setFieldValue("name", result.data?.name)
            form.setFieldValue("slug", result.data?.slug)
            form.setFieldValue("price", result.data?.price)
            form.setFieldValue("quantity", result.data?.quantity)
        }catch (err) {
            console.log(err)
        }
    }


    const uploadProduct = async () => {
        try {
            const name = form.getFieldValue("name")
            const slug = form.getFieldValue("slug")
            const quantity = form.getFieldValue("quantity")
            const price = form.getFieldValue("price")

            const data = new FormData()

            data.append("name", name)
            data.append("slug", slug)
            data.append("quantity", quantity)
            data.append("price", price)
            data.append("description", description)
            data.append("content", content)

            if(image){
                data.append("image", image.originFileObj)
            }
            
            if(!id){
                const result = await createProduct(data)
            }else {
                const result = await editProduct(id,data)
                toast.success("Updated product successfully")
                return;
            }
            toast.success("Created product successfully")
            
        } catch (error) {
            toast.error("This didn't work.")
            console.log(error)
        }
    }



    return (
        <>
            <Breadcrumb items={[{ title: id ? "Fix products detail" : "Add more products" }]} style={{fontWeight:'bold', fontSize: '25px'}} />
            <Form form={form} style={{ marginTop: '15px' }} onFinish={uploadProduct}>
                <Form.Item label="Product's name" name="name">
                    <Input placeholder="Add name's product" />
                </Form.Item>
                <Form.Item label="Slugs" name="slug">
                    <Input placeholder="Add slug's product" />
                </Form.Item>
                <Form.Item label="Amounts" name="quantity">
                    <Input placeholder="Add amount of products" />
                </Form.Item>
                <Form.Item label="Prices" name="price">
                    <Input placeholder="Add price's product" />
                </Form.Item>
                <div style={{ marginTop: '10px' }}>
                    <label>Details: </label>
                    <Editor
                        apiKey="nd00bvnpe8hd4z4yyagh14uhnfdc2t85uhk3yevkvdei3rqv"
                        onEditorChange={(value) => setDescription(value)}
                        onInit={(evt, editor) => editorRef.current = editor}
                        initialValue="Please input description"
                        value={description}
                        init={{
                            height: 300,
                            menubar: false,
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount'
                            ],
                            toolbar: 'undo redo | formatselect | ' +
                                'bold italic backcolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                    />
                </div>

                <div style={{ marginTop: '10px' }}>
                    <label>Content: </label>
                    <Editor
                        apiKey="nd00bvnpe8hd4z4yyagh14uhnfdc2t85uhk3yevkvdei3rqv"
                        onEditorChange={(value) => setContent(value)}
                        initialValue="Please input content"
                        value={content}
                        init={{
                            height: 300,
                            menubar: true,
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount' 
                            ],
                            toolbar: 'undo redo | formatselect | ' +
                                'bold italic backcolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help' +
                                'image',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                    />
                </div>
                <div style={{ marginTop: '10px' }}>
                    <label>Thumbnail: </label>
                    <Upload type="single" action={false} onChange={(file) => setImage(file.file)}>
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                </div>
                <Button style={{marginTop: '15px', marginBottom: '15px'}} type="primary" htmlType="submit">{ id ? "Updates the products" : "Export the products"}</Button>
            </Form>

        </>
    )
}

export default AddEditProduct