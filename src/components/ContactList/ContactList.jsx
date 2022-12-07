import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from 'redux/operations';
import { selectVisibleContacts } from 'redux/selectors';
import css from './ContactList.module.css';

const ContactList = () => {
  const dispatch = useDispatch();

  const visibleContacts = useSelector(selectVisibleContacts);

  const removeContact = contactId => {
    dispatch(deleteContact(contactId));
  };

  return (
    <ul className={css.contactList}>
      {visibleContacts.map(contact => {
        return (
          <li className={css.contactList__item} key={contact.id}>
            {contact.name}: {contact.phone}
            <button
              className={css.contactList__btn}
              type="button"
              onClick={() => removeContact(contact.id)}
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default ContactList;

// const selector = useSelector(selectContacts);
// const contact = useSelector(selectFilter);

// const getVisibleContacts = () => {
//   const normalizedFilter = contact.toLowerCase();
//   return selector.filter(contact =>
//     contact.name.toLowerCase().includes(normalizedFilter)
//   );
// };
