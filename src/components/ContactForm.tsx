import React from "react";

const ContactForm: React.FC = () => {
  return (
    <div className="contact-container">
      <form
        className="contact-form"
        onSubmit={async (e) => {
          e.preventDefault();

          const formData = new FormData(e.currentTarget);
          const name = formData.get("name") as string;
          const reason = formData.get("reason") as string;
          const email = formData.get("email") as string;
          const message = formData.get("message") as string;

          const res = await fetch("/api/hook", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: `Contact Form Submission from ${name}`,
              description: `**Reason:** ${reason}\n**Email:** ${email}\n**Message:** ${message}`,
              color: 3447003,
            }),
          });

          if (res.ok) {
            alert("Form submitted successfully!");
          } else {
            alert("Failed to submit form.");
          }
        }}
      >
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="Your Name Here"
            id="name"
            name="name"
            required
          />
        </div>
        <div>
          <label htmlFor="reason">Reason</label>
          <select className="option" id="reason" name="reason" required>
            <option value="commission">Commissions</option>
            <option value="question">Question</option>
            <option value="feedback">Feedback</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Your Email Here"
            id="email"
            name="email"
            required
          />
        </div>
        <div>
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            placeholder="Your Message Here"
            rows={4}
            required
          ></textarea>
        </div>
        <button className="submit" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
