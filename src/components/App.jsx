import React, { Component } from 'react';

import { Container } from 'components/App.styled';
import { ContactForm } from 'components/ContactForm/ContactForm';

class App extends Component {
  state = {
    contacts: [],
    name: '',
  };

  render() {
    return (
      <Container>
        <h1>Phonebook</h1>
        <ContactForm />
        <h2>Contacts</h2>
      </Container>
    );
  }
}

export default App;
