import React, { Component } from "react";
import "./App.css";
import Note from "./Note/Note";
import NoteForm from "./NoteForm/NoteForm";
import { DB_CONFIG } from "./config/config";
import firebase from "firebase/app";
import "firebase/database";

class App extends Component {
  constructor(props) {
    super(props);
    //We're going to setup the React state of our component

    this.app = firebase.initializeApp(DB_CONFIG);
    this.db = this.app
      .database()
      .ref()
      .child("notes");

    // .firestore();

    this.state = {
      notes: []
    };
    this.addNote = this.addNote.bind(this);
    this.removeNote = this.removeNote.bind(this);
  }

  componentWillMount() {
    const previousNotes = this.state.notes;

    //everytime we recieve info from our firebase we recieve a snapshot, where we can read it with the snap.val()
    this.db.on("child_added", snap => {
      previousNotes.push({
        id: snap.key,
        noteContent: snap.val().noteContent
      });
      this.setState({
        notes: previousNotes
      });
    });
    this.db.on("child_removed", snap => {
      for (let i = 0; i < previousNotes.length; i++) {
        if (previousNotes[i].id === snap.key) {
          previousNotes.splice(i, 1);
        }
      }
      this.setState({
        notes: previousNotes
      });
    });
  }

  addNote(note) {
    this.db.push().set({ noteContent: note });
  }

  removeNote(noteId) {
    console.log(this.db);
    this.db.child(noteId).remove();
  }

  render() {
    return (
      <div className="notesWrapper">
        <div className="notesHeader">
          <div className="heading">WHY IS EVERYTHING SO HARD</div>
        </div>
        <div className="notesBody">
          {this.state.notes.map(note => {
            return (
              <Note
                noteContent={note.noteContent}
                removeNote={this.removeNote}
                noteId={note.id}
                key={note.id}
              />
            );
          })}
        </div>
        <div className="notesFooter">
          <NoteForm addNote={this.addNote} />
        </div>
      </div>
    );
  }
}

export default App;
