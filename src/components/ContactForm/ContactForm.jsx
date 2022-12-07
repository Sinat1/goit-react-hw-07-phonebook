import css from './ContactForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/operations';
import { selectContacts } from 'redux/selectors';
import { nanoid } from 'nanoid';

const ContactForm = () => {
  const dispatch = useDispatch();
  const selector = useSelector(selectContacts);

  const handleSumbit = event => {
    event.preventDefault();

    const form = event.target.elements;
    const id = nanoid();
    const name = form.name.value;
    const phone = form.number.value;
    const NewName = selector.find(data => data.name === name);
    event.target.reset();
    const NewNumber = selector.find(data => data.phone === phone);

    if (NewName) {
      return alert(`${NewName.name} is already in contacts`);
    } else if (NewNumber) {
      return alert(`${NewNumber.phone} is already in contacts`);
    } else {
      return dispatch(addContact({ id, name, phone }));
    }
  };

  return (
    <form className={css.contactForm} onSubmit={handleSumbit}>
      <label className={css.formLabel}>
        Name
        <input
          className={css.formInput}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label className={css.formLabel}>
        Number
        <input
          className={css.formInput}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button className={css.formBtn} type="submit">
        Add contact
      </button>
    </form>
  );
};

export default ContactForm;
