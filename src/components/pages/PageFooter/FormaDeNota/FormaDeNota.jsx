import React, { Component } from 'react';
import './FormaDeNota.css';
import firebase from "firebase/compat";

class FormaDeNota extends Component {
	constructor () {
		super();
		this.state = {
		  title: '',
		  note: ''
		}
	
		this.createNote = this.createNote.bind(this);
	  }
	
	  onChangeHandler (evt, key) {
		this.setState({
		  [key]: evt.target.value
		});
	  }
	
	  createNote () {
		if (this.state.title !== '' && this.state.note !== '') {
		  firebase.database().ref('notes').push({
			title: this.state.title,
			note: this.state.note
		  })
		}
	  }
	
	  render() {
		return (
		  <section className="noteform">
			<h3>Escriba su Testimonios</h3>
			<div className="form-group">
			  <label htmlFor="noteform-title">Nombre</label>
			  <input placeholder="Ingrese su Nombre" required type="text" id="noteform-title" name="noteform-title" value={this.state.title} onChange={(evt) => this.onChangeHandler(evt, 'title')} />
			</div>
			<div className="form-group">
			  <label htmlFor="noteform-note">Testimonio</label>
			  <textarea  placeholder="Ingrese su Testimonio" required name="noteform-note" id="noteform-note" value={this.state.note} onChange={(evt) => this.onChangeHandler(evt, 'note')}></textarea>
			</div>
			<button className='boton_feed' onClick={this.createNote}>Enviar FeedBack</button>
		  </section>
		)
	  }
	}
	

export default FormaDeNota; 