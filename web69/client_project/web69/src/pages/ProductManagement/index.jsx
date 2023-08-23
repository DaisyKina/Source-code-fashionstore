import { Breadcrumb, Button, Pagination, Popconfirm, Table } from "antd"
import { Link } from "react-router-dom"
import {AiOutlineEdit} from "react-icons/ai"
import {BsFillTrashFill} from 'react-icons/bs'
import { getProduct } from "../../services"
import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"


const ProductManagement = () => {
    const [pageSize, setPageSize] = useState(3)
    const [pageIndex, setPageIndex] = useState(1)
    const [count, setCount] = useState(0)
    const [totalPage, setTotalPage] = useState(0)
    const [products, setProducts] = useState([])

    const deleteProductById = async(id) => {
        try{
            const result = await deleteProductById(id)
            setProducts(products.filter(product => product?. _id != id))
            setCount(count - 1)
            toast.success("Delete products successfully")
        }catch(err){
            console.log(err)
            toast.error("Delete product unsuccessful")
        }
    }

    const column = [
        {
            title: "Product's name",
            dataIndex: "name"
        },
        {
            title: "Creator",
            dataIndex: "user"
        },
        {
            title: "Price",
            dataIndex: "price"
        },
        {
            title: "Amounts",
            dataIndex: "quantity"
        },
        {
            title: "Action",
            render: (_,record) => {
                return <><Link to={`/add-product/${record?._id}`}><AiOutlineEdit style={{ textDecoration: 'none', color: 'black', marginRight: '10px'}}/></Link><Popconfirm title= {"You sure wanna delete this products?"} onConfirm={() => {deleteProductById(record?._id)}}><BsFillTrashFill/></Popconfirm></>
            }
        }
    ]

    const getData = async () => {
        try {
            const result = await getProduct(pageSize, pageIndex)
            setProducts(result.data?.result?.products)
            setCount(result.data?.result?.count)
            setTotalPage(result.data?.result?.totalPage)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getData()
    },[pageSize, pageIndex])

    return (
        <div>
            <Breadcrumb items={[{ title: 'Products management' }]} style={{fontSize: '25px', fontWeight: 'bold'}} />
            <Button type="primary" style={{marginTop: '10px', marginBottom: '5px', backgroundColor:'grey'}}><Link to={'/add-product'}>Add more products</Link></Button>
            <Table
             style={{marginTop: '10px'}}
                dataSource={products}
                columns={column}
                pagination={false}
            ></Table>
            <Pagination
                style={{marginTop: '10px'}}
                pageSize={pageSize}
                total={count}
                current={pageIndex}
                onChange={(pageIndex, pageSize) => {
                    setPageIndex(pageIndex)
                    setPageSize(pageSize)
                }}
                showSizeChanger
            />
        </div>
    )
}

export default ProductManagement