import React from "react";
import { useFormik } from "formik";
import { Button, Col, Row, Form, Modal, FormControl } from "react-bootstrap";
import * as yup from "yup";
import AxiosClient from "../../../shared/plugins/axios";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import Alert, {
  confirmMsj,
  confirmTitle,
  errorMsj,
  errorTitle,
  successMsj,
  successTitle,
} from "../../../shared/plugins/alerts";

export const EditCategoryForm = ({ isOpen, setCategories, onClose, categories }) => {
  const form = useFormik({
    initialValues: {
name:'',
id:'',
status:false
    },
    validationSchema: yup.object().shape({
      name: yup
        .string()
        .required("campo obligatorio")
        .min(4, "minimo 4 caracteres"),
    }),
    onSubmit: async (values) => {
      Alert.fire({
        title: confirmTitle,
        text: confirmMsj,
        icon: "warning",
        confirmButtonColor: "#009574",
        confirmButtonText: "aceptar",
        cancelButtonColor: "#DD6B55",
        confirmButtonText: "Aceptar",
        reverseButtons: true,
        backdrop: true,
        showCancelButton: true,
        showLoaderOnConfirm: true,
        allowOutsideClick: () => !Alert.isLoading,
        preConfirm: async () => {
          try {
            const response = await AxiosClient({
              method: "PUT",
              url: "/category/",
              data: JSON.stringify(values),
            });
            if (!response.error) {
              setCategories((categories) => [response.data, ...categories.filter((category)=>category.id !== values.id,)
            ]);
              Alert.fire({
                title: successTitle,
                text: successMsj,
                icon: "success",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "aceptar",
              }).then((result) => {
                if (result.isConfirmed) {
                  handleClose();
                }
              });
            }
            return response;
          } catch (error) {
            Alert.fire({
              title: errorTitle,
              text: errorMsj,
              icon: "error",
              confirmButtonColor: "#3085d6",
              confirmButtonText: "ERROR",
            }).then((result) => {
              if (result.isConfirmed) {
                handleClose();
              }
            });
          }
        },
      });
    },
  });

  React.useMemo(()=>{
    const {name, id, status}= categories
    form.values.name = name;
    form.values.id = id;
    form.values.status = status;
  }, [categories])
  const handleClose = () => {
    form.resetForm();
    onClose();
  };
  return (
    <Modal
      backdrop="static"
      keyboard={false}
      show={isOpen}
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title> Registrar Categorias</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={form.handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <FormControl
              name="name"
              placeholder="calzado"
              value={form.values.name}
              onChange={form.handleChange}
            />
            {form.errors.name && (
              <span className="erro-text">{form.errors.name}</span>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Row>
              <Col className="text-end">
                <Button
                  className="me-2"
                  variant="outline-danger"
                  onClick={handleClose}
                >
                  <FeatherIcon icon="x" />
                  &nbsp;Cerrar
                </Button>

                <Button type="sumbit" variant="outline-succes">
                  <FeatherIcon icon="check" />
                  &nbsp;Guardar
                </Button>
              </Col>
            </Row>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
