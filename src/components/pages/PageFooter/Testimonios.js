import React, { Component } from "react";
import "./Testimonios.css";
import Nota from "./Nota/Nota";
import FormaDeNota from "./FormaDeNota/FormaDeNota";
import { db } from "../../.././utils/firebaseApp";
import "firebase/database";
import firebase from "firebase/compat";

class Testimonios extends Component {
    constructor () {
        super();
    
        this.state = {
          notes: []
        }
      }
    
      componentDidMount () {
        this.db = firebase.database();
    
        this.listenForChange();
      }
    
      listenForChange () {
        this.db.ref('notes').on('child_added', snapshot => {
          let note = {
            id: snapshot.key,
            title: snapshot.val().title,
            note: snapshot.val().note
          }
    
          let notes = this.state.notes;
          notes.push(note);
    
          this.setState({
            notes: notes
          });
        });
    
        this.db.ref('notes').on('child_removed', snapshot => {
          let notes = this.state.notes;
          notes = notes.filter(note => note.id !== snapshot.key);
    
          this.setState({
            notes: notes
          });
        });
      }
      
      render() {
        return (
          <div className="App">
            <main>
              <FormaDeNota />
              <Nota notes={this.state.notes} />
            </main>
          </div>
        );
      }
    }
export default Testimonios;