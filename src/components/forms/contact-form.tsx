export default function ContactForm() {
  return (
    <form>
      <fieldset>
        <legend>Contact form</legend>
        <label>
          Name
          <input name="name" type="text" placeholder="Your name" />
        </label>
        <label>
          Email
          <input name="email" type="email" placeholder="you@example.com" />
        </label>
        <label>
          Message
          <textarea name="message" placeholder="Tell us about your project" />
        </label>
        <button type="submit">Send inquiry</button>
      </fieldset>
    </form>
  );
}
