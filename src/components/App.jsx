import React, { Component } from 'react';
import { nanoid } from 'nanoid';

import {
  Container,
  Title,
  ContactsTitle,
  FindContactsTitle,
} from 'components/App.styled';
import ContactForm from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parseContacts = JSON.parse(contacts);

    if (parseContacts) {
      this.setState({ contacts: parseContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  formSubmitData = data => {
    const currentName = this.state.contacts.find(
      item => item.name.toLowerCase() === data.name.toLowerCase()
    );
    if (currentName)
      return alert(currentName.name + ' is already in contacts.');

    // data.id = nanoid();
    // this.setState(prev => ({ contacts: [data, ...prev.contacts] }));
    this.setState(prev => ({
      contacts: [{ ...data, id: nanoid() }, ...prev.contacts],
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getFilteredContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteContacts = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { filter, contacts } = this.state;

    return (
      <Container>
        <div>
          <Title>Phonebook</Title>
          <ContactForm onSubmit={this.formSubmitData} />
          <ContactsTitle>Contacts</ContactsTitle>
          <FindContactsTitle>Find contacts by name</FindContactsTitle>
          <Filter value={filter} onChange={this.changeFilter} />
          {contacts.length ? (
            <ContactList
              contacts={this.getFilteredContacts()}
              onDelete={this.deleteContacts}
            />
          ) : (
            <p>No any contacts</p>
          )}
        </div>
      </Container>
    );
  }
}

export default App;
