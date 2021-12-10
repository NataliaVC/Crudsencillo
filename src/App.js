import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter} from 'reactstrap';

const data = [
  {
    id: 1,
    pelicula: "Apocalypto",
    director: "Mel Gibson",
    img:"https://es.web.img3.acsta.net/pictures/21/04/23/22/00/0364927.jpg"

  }, {
    id: 2,
    pelicula: "Encanto",
    director: "Disney"
  }, {
    id: 3,
    pelicula: "Kill Bill",
    director: "Quentin Tarantino"
  }

]

/*function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}*/

class App extends React.Component {
  state = {
    data: data,
    form: {
      id: '',
      pelicula: '',
      director: '',
      img:''
    },
    modalInsertar: false,
    modalEditar: false,

  };

  handleChange = e => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    });
  }

  mostrarModalInsertar=()=>{
    this.setState({modalInsertar: true});
  }

  ocultarModalInsertar=()=>{
    this.setState({modalInsertar: false});
  }

  mostrarModalEditar=(registro)=>{
    this.setState({modalEditar: true, form: registro});
  }

  ocultarModalEditar=()=>{
    this.setState({modalEditar: false});
  }


  insertar=()=>{
    var valorNuevo={...this.state.form};
    valorNuevo.id=this.state.data.length+1;
    var lista=this.state.data;
    lista.push(valorNuevo);
    this.setState({data: lista, modalInsertar: false});
  }

  editar=(dato)=>{
    var contador=0;
    var lista=this.state.data;
    lista.map((registro)=>{
      if(dato.id==registro.id){
        lista[contador].pelicula=dato.pelicula;
        lista[contador].director=dato.director;
      }
      contador++;
    });
    this.setState({data: lista, modalEditar: false});
  }

eliminar=(dato)=>{
  var opcion=window.confirm("Realmente desea eliminar el registro"+dato.id);
  if(opcion){
    var contador=0;
    var lista = this.state.data;
    lista.map((registro)=>{
      if(registro.id==dato.id){
        lista.splice(contador, 1);
      }
      contador++;
    });
    this.setState({data: lista});
  }
}


  render() {
    return (<> <Container> <br/>
    <Button color="success" onClick={()=>this.mostrarModalInsertar()}>Insertar nueva pelicula</Button>
    <br/><br/>
    <Table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Pelicula</th>
          <th>Director</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {
          this.state.data.map((elemento) => (<tr>
            <td>{elemento.id}</td>
            <td>{elemento.pelicula}</td>
            <td>{elemento.director}</td>
            <td>
              <Button color="primary" onClick={()=>this.mostrarModalEditar(elemento)} >Editar</Button>{"  "}
              <Button color="danger" onClick={()=>this.eliminar(elemento)}>Eliminar</Button>
            </td>
          </tr>))
        }
      </tbody>

    </Table>

  </Container>


  <Modal isOpen = {this.state.modalInsertar} > <ModalHeader>
      <div>
        <h3>Insertar registro</h3>
      </div>
    </ModalHeader>

    <ModalBody>
      <FormGroup>
        <label>
          Id:
        </label>

        <input className="form-control" readOnly="readOnly" type="text" value={this.state.data.length + 1}/>
      </FormGroup>
      <FormGroup>
        <label>
          Pelicula:
        </label>
        <input className="form-control" name="pelicula" type="text" onChange={this.handleChange}/>
      </FormGroup>
      <FormGroup>
        <label>
          Director:
        </label>
        <input className="form-control" name="director" type="text" onChange={this.handleChange}/>
      </FormGroup>
    </ModalBody>

    <ModalFooter>
      <Button color="primary" onClick={()=>this.insertar()}>Insertar</Button>
      <Button color="danger" onClick={()=>this.ocultarModalInsertar()}> Cancelar</Button>

    </ModalFooter> </Modal>





    <Modal isOpen = {this.state.modalEditar} > <ModalHeader>
        <div>
          <h3>Editar registro</h3>
        </div>
      </ModalHeader>

      <ModalBody>
        <FormGroup>
          <label>
            Id:
          </label>

          <input className="form-control" readOnly="readOnly" type="text" value={this.state.form.id} />
        </FormGroup>
        <FormGroup>
          <label>
            Pelicula:
          </label>
          <input className="form-control" name="pelicula" type="text" onChange={this.handleChange} value={this.state.form.pelicula}/>
        </FormGroup>
        <FormGroup>
          <label>
            Director:
          </label>
          <input className="form-control" name="director" type="text" onChange={this.handleChange} value={this.state.form.director}/>
        </FormGroup>
      </ModalBody>

      <ModalFooter>
        <Button color="primary" onClick={()=>this.editar(this.state.form)}>Editar</Button>
        <Button color="danger" onClick={()=>this.ocultarModalEditar()} > Cancelar</Button>

      </ModalFooter> </Modal>


    </ >
    )

  }
}

export default App;
