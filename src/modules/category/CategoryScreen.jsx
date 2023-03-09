import { Axios } from 'axios';
import React, { useEffect,useState } from 'react'
import { Badge, Card, Col, Row } from 'react-bootstrap'
import DataTable from 'react-data-table-component';
import ButtonCircle from '../../shared/components/ButtonCircle'
import { Loading } from '../../shared/components/Loading';
import AxiosClient from '../../shared/plugins/axios';
import {FilterComponent} from '../../shared/components/FilterComponent';
import { CategoryForm } from './CategoryForm';
import { EditCategoryForm } from './components/EditCategoryForm';


export const CategoryScreen = () => {
    const[categories, setCategories]= useState([]);
    const [selectedCategory, setSelectedCategory] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [filterText, setFilterText] = useState('')
    const [isOpen, setIsOpen] = useState(false)

const options ={
  rowsPerPageText:"registros por pagina",
  rangeSeparatorText:"de"

}

const getCategories= async()=>{
  try {
    const data=await AxiosClient({url:"category/"});
    if (!data.error) setCategories(data.data);
  } catch (error) {
    //poner alerta de error
    //suitalert
    setIsLoading(false);
  }
}

    const filteredCategories = categories.filter(
      category =>
       category.name &&
        category.name.toLowerCase()
      .includes(filterText.toLowerCase())
    )
    useEffect(()=>{
     getCategories()
    },[]);

const headerComponent= React.useMemo(()=>{
const handleClear =()=>{
  if (filterText) setFilterText('')
};


return(
  <filterComponent
  onFilter={(e)=> setFilterText(e.target.value)}
  onClear={handleClear}
  filterText={filterText}
  />
)
},[filterText]);


const columns = React.useMemo(()=>[
  {
    name:"#",
    cell:(row, index)=> <div>{index+1}</div>,
    sortable: true,
  },
  {
    name: "categoria",
    cell:(row) => <div>{row.name}</div>,
    sortable: true,
    selector: (row) => row.name
  },
  {
    name: 'estado',
    cell:(row) => row.status ? (<Badge bg='success'>Activo</Badge>):(<Badge bg='danger'>inactivo</Badge>),
    sortable:true,
    selector: (row)=> row.status,
  },
  {
  name: "Acciones",
  cell: (row) => <>
  <ButtonCircle
  icon='edit'
  type={"btn btn-outline-warning btn-circle"}
  size={16}
  onClick={()=>{
    setIsEditing(true);
    setSelectedCategory(row);
  }}
  />
  {
    row.status ? (<ButtonCircle
    icon='trash-2'
    type={"btn btn-outline-danger btn-cirle"}
    onClick={()=>{}}
    size={16}
    />)
    :
    (<ButtonCircle
      icon='pocket'
      type={"btn btn-outline-success btn-cirle"}
      onClick={()=>{}}
      size={16}
      
    />) 
  }
  </>//esto es un fragment
  }
  ]);
  
  return (<Card>
    <Card.Header>
        <Row>
            <Col>Categorias</Col>
            <Col className='text-end'>
                <ButtonCircle
                type={'btn btn-outline-success'}
                onClick={()=>setIsOpen(true)}
                icon='plus'
                size={16}
                />
                <CategoryForm isOpen={isOpen} onClose={()=>setIsOpen(false)} setCategories={setCategories}/>
                <EditCategoryForm isOpen={isEditing} onClose={()=>setIsEditing(false)} setCategories={setCategories} categories={selectedCategory} />
            </Col>
        </Row>
    </Card.Header>
    <Card.Body>
    <DataTable
       columns={columns}
       data={filteredCategories}
        progressPending={isLoading}
        progressComponent={<Loading/>}
        noDataComponent={'sin registros'}
        pagination
        paginationComponentOptions={options}
        subHeader
        subHeaderComponent={headerComponent}
        persistTableHead
        striped={true}
        highlightOnHover={true}

    />
    </Card.Body>
  </Card>
  )
}
