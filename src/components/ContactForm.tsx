import React, { useState } from "react";

const ContactForm: React.FC = () => {
  const [selectedReason, setSelectedReason] = useState<string | null>(null);

  const handleReasonClick = (reason: string) => {
    setSelectedReason(reason);
  };

  return (
    <div className="contact-container">
      <form
        className="contact-form"
        onSubmit={async (e) => {
          e.preventDefault();
          const form = e.currentTarget;

          const formData = new FormData(form);
          const name = formData.get("name") as string;
          const email = formData.get("email") as string;
          const message = formData.get("message") as string;

          const res = await fetch("/api/hook", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              title: `Contact Form Submission from ${name}`,
              description: `**Reason:** ${selectedReason}\n**Email:** ${email}\n**Message:** ${message}`,
              color: 3447003,
            }),
          });

          if (res.status === 429) {
            alert(
              "You've already submitted a form. Please wait 30 minutes before submitting again."
            );
          } else if (res.ok) {
            alert("Form submitted successfully!");
            form.reset();
            setSelectedReason(null);
          } else {
            alert("Failed to submit form. Please try again later.");
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
          <ul className="reasons">
            {["Commissions", "Question", "Feedback", "Other"].map((reason) => (
              <li key={reason}>
                <button
                  type="button"
                  id={reason.toLowerCase()}
                  className={`reason ${
                    selectedReason === reason ? "enabled" : ""
                  }`}
                  onClick={() => handleReasonClick(reason)}
                >
                  {reason}
                </button>
              </li>
            ))}
          </ul>
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
