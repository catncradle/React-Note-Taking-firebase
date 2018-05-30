import React, { Component } from "react";
import "./NoteForm.css";

class NoteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newNoteContent: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.writeNote = this.writeNote.bind(this);
  }
  handleChange(e) {
    this.setState({ newNoteContent: e.target.value });
  }
  writeNote() {
    // call a method that sets the noteContent to the value of the input
    this.props.addNote(this.state.newNoteContent);
    // set new note content to empy
    this.setState({ newNoteContent: "" });
  }
  render() {
    return (
      <div className="formWrapper">
        <input
          className="noteInput"
          placeholder="Write a new note..."
          value={this.state.newNoteContent}
          onChange={this.handleChange}
        />
        <button className="noteButton" onClick={this.writeNote}>
          Add Note
        </button>
      </div>
    );
  }
}

export default NoteForm;
